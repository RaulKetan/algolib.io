'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import posthog from 'posthog-js';
import { PostHogProvider } from '@posthog/react';
import { supabase } from '@/integrations/supabase/client';
import { identifyUser, resetUser } from '@/lib/analytics';

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { AppProvider } from "@/contexts/AppContext";
import { FeatureFlagProvider } from "@/contexts/FeatureFlagContext";
import { SidebarProvider } from "@/components/ui/sidebar";


export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize PostHog in useEffect to ensure it only runs on the client
    const isProduction =
      window.location.hostname === "rulcode.com" ||
      window.location.hostname === "www.rulcode.com";

    if (isProduction && !posthog.has_opted_out_capturing()) {
      posthog.init(process.env.NEXT_PUBLIC_PUBLIC_POSTHOG_TOKEN || '', {
        api_host: `${window.location.origin}/ingest`,
        person_profiles: 'identified_only',
        ui_host: 'https://app.posthog.com',
        capture_pageview: false // Next.js handles this better with its own router events
      });
    }

    // Wire up PostHog identity to Supabase auth state
    if (!supabase) return;

    // Identify existing session on load
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session?.user) return;
      const u = session.user;
      // Fetch profile for plan context
      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_status, subscription_tier, role')
        .eq('id', u.id)
        .maybeSingle();

      identifyUser(posthog, u.id, {
        email: u.email,
        plan: profile?.subscription_tier ?? 'free',
        subscription_status: profile?.subscription_status ?? 'none',
        is_admin: profile?.role === 'admin',
      });
    });

    // Keep identity in sync with auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED' || event === 'TOKEN_REFRESHED') {
        if (!session?.user) return;
        const u = session.user;
        const { data: profile } = await supabase
          .from('profiles')
          .select('subscription_status, subscription_tier, role')
          .eq('id', u.id)
          .maybeSingle();

        identifyUser(posthog, u.id, {
          email: u.email,
          plan: profile?.subscription_tier ?? 'free',
          subscription_status: profile?.subscription_status ?? 'none',
          is_admin: profile?.role === 'admin',
        });
      } else if (event === 'SIGNED_OUT') {
        resetUser(posthog);
      }
    });

    return () => { subscription.unsubscribe(); };
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <FeatureFlagProvider>
              <TooltipProvider>
                <SidebarProvider defaultOpen={false}>
                  <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                  >
                    {children}
                    <Toaster />
                    <Sonner />
                  </ThemeProvider>
                </SidebarProvider>
              </TooltipProvider>
            </FeatureFlagProvider>
          </AppProvider>
        </QueryClientProvider>
      </Provider>
    </PostHogProvider>


  );
}