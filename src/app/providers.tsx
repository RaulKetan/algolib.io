'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import posthog from 'posthog-js';
import { PostHogProvider } from '@posthog/react';

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { AppProvider } from "@/contexts/AppContext";
import { FeatureFlagProvider } from "@/contexts/FeatureFlagContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import PostHogIdentify from "./PostHogIdentify";


export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize PostHog only on the client and only in production
    const isProduction =
      window.location.hostname === "rulcode.com" ||
      window.location.hostname === "www.rulcode.com";

    if (isProduction && !posthog.has_opted_out_capturing()) {
      console.log("Posthog init")
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_TOKEN || '', {
        api_host: `${window.location.origin}/ingest`,
        person_profiles: 'identified_only',
        ui_host: 'https://app.posthog.com',
        capture_pageview: false // Next.js handles this better with its own router events
      });
    }
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
                    {/* Reactively identifies the user in PostHog using Redux auth state.
                        No extra Supabase calls — avoids lock contention. */}
                    <PostHogIdentify />
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