"use client";
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { AlertCircle, ExternalLink, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const GlobalDunningBanner: React.FC = () => {
    const { profile } = useApp();
    const [isLoadingPortal, setIsLoadingPortal] = useState(false);
    if (!profile) return null;

    // Users don't have a LemonSqueezy account/login — the signed magic link lets them
    // update payment directly without any LS credentials.
    const handleUpdatePayment = async () => {
        try {
            setIsLoadingPortal(true);
            const { data, error } = await supabase.functions.invoke('lemon-get-portal-url');
            if (error || !data?.url) throw new Error(error?.message || 'Could not open billing portal');
            window.open(data.url, '_blank', 'noopener,noreferrer');
        } catch (err: any) {
            toast.error(err.message || 'Could not open billing portal. Try again.');
        } finally {
            setIsLoadingPortal(false);
        }
    };

    const isPastDue = profile.subscription_status === 'past_due';

    // Trial logic
    const isTrial = profile.subscription_status === 'on_trial' ||
        profile.subscription_status === 'trialing' ||
        (profile.trial_end_date && new Date(profile.trial_end_date) > new Date());

    const trialEnd = profile.trial_end_date ? new Date(profile.trial_end_date) : null;
    const trialDaysLeft = trialEnd ? Math.ceil((trialEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null;
    const isTrialEndingSoon = isTrial && trialDaysLeft !== null && trialDaysLeft >= 0 && trialDaysLeft <= 2;

    // Only show global banner for urgent edge cases: past_due or trial ending very soon (0-2 days)
    if (!isPastDue && !isTrialEndingSoon) return null;

    return (
        <div className={cn(
            "w-full px-4 py-1.5 flex items-center justify-center gap-2 text-[11px] md:text-xs font-semibold tracking-wide z-[60] shadow-sm animate-in slide-in-from-top duration-300",
            isPastDue
                ? "bg-red-600 text-white"
                : "bg-amber-500 text-black"
        )}>
            {isPastDue ? (
                <>
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Payment failed. Update your billing details to maintain Pro access.</span>
                    <button
                        onClick={handleUpdatePayment}
                        disabled={isLoadingPortal}
                        className={cn(
                            "flex items-center gap-1 underline underline-offset-2 ml-1 hover:opacity-80 transition-opacity",
                            isLoadingPortal && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {isLoadingPortal ? 'Opening...' : 'Update Now'}
                        <ExternalLink className="w-3 h-3" />
                    </button>
                </>
            ) : (
                <>
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>Your Pro trial ends in {trialDaysLeft} {trialDaysLeft === 1 ? 'day' : 'days'}.</span>
                    <a
                        href="/pricing"
                        className="underline underline-offset-2 ml-1 hover:opacity-80 transition-opacity"
                    >
                        View Plans
                    </a>
                </>
            )}
        </div>
    );
};
