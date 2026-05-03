/**
 * analytics.ts
 *
 * Typed wrappers around posthog.capture().
 * Use `trackEvent(posthog, 'event_name', { ...props })` everywhere instead of
 * calling posthog.capture() directly — keeps event names & schemas consistent.
 */

import type { PostHog } from 'posthog-js';

// ---------------------------------------------------------------------------
// Event property types
// ---------------------------------------------------------------------------

export interface AuthEventProps {
  method?: 'email' | 'google' | 'github';
  error?: string;
}

export interface UserIdentifyProps {
  email?: string;
  plan?: string;
  subscription_status?: string;
  is_admin?: boolean;
}

export interface PricingPageViewedProps {
  is_premium: boolean;
  subscription_status?: string;
  trial_days_left?: number | null;
  is_trial?: boolean;
  is_past_due?: boolean;
  is_cancelled?: boolean;
}

export interface PlanCardViewedProps {
  plan_id: string;
  plan_title: string;
  plan_price: string;
  has_trial: boolean;
}

export interface CheckoutInitiatedProps {
  plan_type: string;
  plan_title?: string;
  plan_price?: string;
}

export interface CheckoutOutcomeProps {
  plan_type?: string;
  order_id?: string | null;
  status: 'completed' | 'failed' | 'cancelled';
}

export interface SubscriptionCancelledProps {
  confirmed: boolean; // true = user confirmed, false = just opened dialog
}

export interface ProblemListSearchedProps {
  query: string;
  result_count: number;
  category_filter?: string | null;
  difficulty_filter?: string | null;
  list_type_filter?: string | null;
}

export interface ProblemFilterAppliedProps {
  filter_type: 'category' | 'difficulty' | 'list_type' | 'sort';
  filter_value: string;
  result_count: number;
}

export interface ProblemViewModeChangedProps {
  mode: 'list' | 'grid';
}

export interface ProblemOpenedProps {
  algorithm_id: string;
  algorithm_title?: string;
  difficulty?: string;
  category?: string;
  is_premium?: boolean;
  list_type?: string;
  user_plan?: string;
}

export interface LanguageChangedProps {
  algorithm_id?: string;
  from_language: string;
  to_language: string;
}

export interface PaywallProps {
  source?: string; // which page/component showed the paywall
}

export interface NavbarCtaClickedProps {
  cta_label: string;
  destination: string;
}

export interface HomeCtaClickedProps {
  cta_label: string;
  destination: string;
  section?: string;
}

export interface RunCodeProps {
  problemId?: string;
  language: string;
  status: 'pass' | 'fail' | 'error';
  executionTimeMs?: number;
}

export interface SubmitCodeProps {
  problemId?: string;
  language: string;
  status: 'pass' | 'fail' | 'error';
  executionTimeMs?: number;
}

// ---------------------------------------------------------------------------
// Event map — maps event name → its property type
// ---------------------------------------------------------------------------

export interface AnalyticsEvents {
  // Auth
  login_page_viewed: AuthEventProps;
  login_attempted: AuthEventProps;
  login_success: AuthEventProps;
  login_failed: AuthEventProps;
  signed_out: Record<string, never>;

  // Identity
  user_identified: UserIdentifyProps;

  // Pricing / Revenue
  pricing_page_viewed: PricingPageViewedProps;
  plan_card_viewed: PlanCardViewedProps;
  checkout_initiated: CheckoutInitiatedProps;
  checkout_completed: CheckoutOutcomeProps;
  checkout_failed: CheckoutOutcomeProps;
  checkout_cancelled: CheckoutOutcomeProps;
  subscription_cancel_dialog_opened: Record<string, never>;
  subscription_cancelled: SubscriptionCancelledProps;
  trial_activated: Record<string, never>;

  // Problem list
  problem_list_searched: ProblemListSearchedProps;
  problem_filter_applied: ProblemFilterAppliedProps;
  problem_view_mode_changed: ProblemViewModeChangedProps;

  // Problem detail
  problem_opened: ProblemOpenedProps;
  language_changed: LanguageChangedProps;
  problem_completed: { algorithm_id: string; algorithm_name?: string; language?: string };
  problem_favorited: { algorithm_id: string; algorithm_name?: string; favorited: boolean };
  problem_shared: { algorithm_id?: string; algorithm_name?: string };

  // Code execution
  run_code: RunCodeProps;
  submit_code: SubmitCodeProps;

  // Paywall
  paywall_viewed: PaywallProps;
  paywall_upgrade_clicked: PaywallProps;
  paywall_dismissed: PaywallProps;

  // Navigation
  navbar_cta_clicked: NavbarCtaClickedProps;
  home_cta_clicked: HomeCtaClickedProps;
}

// ---------------------------------------------------------------------------
// Core helper
// ---------------------------------------------------------------------------

/**
 * Type-safe PostHog event capture.
 *
 * @example
 * const posthog = usePostHog();
 * trackEvent(posthog, 'problem_opened', { algorithm_id: '123', difficulty: 'Medium' });
 */
export function trackEvent<K extends keyof AnalyticsEvents>(
  posthog: PostHog | null | undefined,
  event: K,
  properties?: AnalyticsEvents[K],
): void {
  if (!posthog) return;
  posthog.capture(event, properties ?? {});
}

/**
 * Identify the authenticated user in PostHog.
 * Call once after sign-in or on initial load when session exists.
 */
export function identifyUser(
  posthog: PostHog | null | undefined,
  userId: string,
  props: UserIdentifyProps,
): void {
  if (!posthog || !userId) return;
  posthog.identify(userId, props);
}

/**
 * Reset PostHog identity on sign-out.
 */
export function resetUser(posthog: PostHog | null | undefined): void {
  if (!posthog) return;
  posthog.reset();
}
