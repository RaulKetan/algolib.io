'use client';

/**
 * PostHogIdentify.tsx
 *
 * Reactively identifies (or resets) the PostHog user whenever
 * the Redux auth state changes. Uses the same user/profile objects
 * that AppContext already fetches — no extra Supabase calls.
 *
 * Render this once inside the provider tree (after AppProvider).
 */

import { useEffect, useRef } from 'react';
import { usePostHog } from '@posthog/react';
import { useAppSelector } from '@/store/hooks';
import { identifyUser, resetUser } from '@/lib/analytics';

export default function PostHogIdentify(): null {
  const posthog = usePostHog();
  const user = useAppSelector((state) => state.auth.user);
  const profile = useAppSelector((state) => state.auth.profile);
  const lastIdentifiedId = useRef<string | null>(null);

  useEffect(() => {
    if (!posthog) return;

    if (user?.id) {
      // Only call identify if the user changed (avoid redundant calls)
      if (lastIdentifiedId.current === user.id) return;
      lastIdentifiedId.current = user.id;

      identifyUser(posthog, user.id, {
        email: user.email,
        plan: profile?.subscription_tier ?? 'free',
        subscription_status: profile?.subscription_status ?? 'none',
        is_admin: profile?.role === 'admin',
      });
    } else {
      // User signed out — reset PostHog identity
      if (lastIdentifiedId.current !== null) {
        lastIdentifiedId.current = null;
        resetUser(posthog);
      }
    }
  }, [user?.id, user?.email, profile?.subscription_tier, profile?.subscription_status, profile?.role, posthog]);

  return null;
}
