import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders })
    }

    try {
        const supabaseUrl = Deno.env.get('RULCODE_SUPABASE_URL') ?? Deno.env.get('SUPABASE_URL')!
        const supabaseAnonKey = Deno.env.get('RULCODE_SUPABASE_PUBLISHABLE_KEY') ?? Deno.env.get('SUPABASE_PUBLISHABLE_KEY')!

        // Authenticate caller using their JWT
        const authHeader = req.headers.get('Authorization')
        if (!authHeader) throw new Error('No authorization header')

        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
            global: { headers: { Authorization: authHeader } },
        })

        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) throw new Error('Unauthorized')

        // Fetch subscription_id from profile (already in React state client-side,
        // but we read it server-side so the client can't spoof it)
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('subscription_id, subscription_status')
            .eq('id', user.id)
            .single()

        if (profileError || !profile?.subscription_id) {
            throw new Error('No subscription found')
        }

        // Prefer live key first — subscriptions are in the live environment even when testing locally.
        // Fall back to the test key for test subscriptions.
        const lsLiveKey = Deno.env.get('LS_API_KEY')?.trim()
        const lsTestKey = Deno.env.get('LS_TEST_API_KEY')?.trim()

        const keysToTry = [
            { key: lsLiveKey, label: 'LIVE' },
            { key: lsTestKey, label: 'TEST' },
        ].filter(k => !!k.key)

        if (keysToTry.length === 0) {
            throw new Error('No LemonSqueezy API key configured (LS_API_KEY or LS_TEST_API_KEY)')
        }

        let portalUrl: string | null = null

        for (const { key, label } of keysToTry) {
            console.log(`[lemon-get-portal-url] Trying ${label} key for subscription_id="${profile.subscription_id}"`)

            const response = await fetch(
                `https://api.lemonsqueezy.com/v1/subscriptions/${profile.subscription_id}`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/vnd.api+json',
                        'Authorization': `Bearer ${key}`,
                    },
                }
            )

            if (response.status === 404) {
                console.warn(`[lemon-get-portal-url] ${label} key: subscription not found, trying next...`)
                continue
            }

            if (!response.ok) {
                const rawBody = await response.text().catch(() => '')
                console.error(`[lemon-get-portal-url] ${label} key returned ${response.status}. Body: ${rawBody}`)
                throw new Error(`LemonSqueezy API Error (${response.status})`)
            }

            const data = await response.json()
            const urls = data?.data?.attributes?.urls || {}
            // Prefer the direct payment update link; it's a magic link — no LS login required
            portalUrl = urls.update_payment_method || urls.customer_portal || null
            console.log(`[lemon-get-portal-url] Success with ${label} key. URL found: ${!!portalUrl}`)
            break
        }

        if (!portalUrl) {
            throw new Error('Subscription not found in any LemonSqueezy environment')
        }

        return new Response(
            JSON.stringify({ url: portalUrl }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        )

    } catch (error: any) {
        console.error('lemon-get-portal-url error:', error.message)
        return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})
