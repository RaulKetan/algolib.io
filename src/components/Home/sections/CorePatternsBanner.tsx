"use client";

import React from "react";
import Link from "next/link";
import { usePostHog } from "@posthog/react";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, CheckCircle2, Sparkles, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CorePatternsBanner() {
  const posthog = usePostHog();

  const handleCtaClick = (label: string, destination: string, section: string) => {
    trackEvent(posthog, "home_cta_clicked", {
      cta_label: label,
      destination,
      section
    });
  };

  return (
    <section className="py-16 bg-white dark:bg-[#050505] text-zinc-900 dark:text-white border-t border-zinc-100 dark:border-zinc-900 relative overflow-hidden">
      <div className="w-full max-w-[1500px] mx-auto px-6 relative z-10">
        
        {/* CORE PATTERNS HIGH CONVERSION BANNER */}
        <div className="max-w-[1400px] mx-auto rounded-[36px] bg-gradient-to-br from-zinc-50 via-zinc-100/50 to-white dark:from-[#0c0c0c] dark:via-[#070707] dark:to-black text-zinc-900 dark:text-white p-8 sm:p-14 border border-zinc-200/80 dark:border-zinc-900 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(132,204,22,0.08),transparent_50%)] pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAFF96]/10 border border-[#EAFF96]/20 text-xs font-bold text-primary dark:text-[#EAFF96] mb-6 tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Don&apos;t Memorize Answers
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
                Master the 15 Core Patterns
              </h3>
              
              <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg mb-8 leading-relaxed max-w-2xl font-medium">
                Ditch the brute-force grind of memorizing 500+ isolated solutions. 80% of technical interview questions boil down to 15 core algorithmic patterns. Mastering Sliding Window, Two Pointers, or Backtracking empowers you to visually construct code solutions for any new, unseen problem effortlessly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  "Sliding Window (Handles contiguous subarrays)",
                  "Two Pointers (Linear bounds searching)",
                  "Backtracking (Exhaustive search spaces)",
                  "Monotonic Stack (Linear range bounds)"
                ].map((pt, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-zinc-700 dark:text-zinc-300 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-semibold">{pt}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="rounded-2xl py-6 text-base bg-primary hover:bg-[#A3E635] text-black font-medium tracking-tight transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] shadow-[0_0_20px_rgba(132,204,22,0.15)] flex items-center justify-center gap-2 group/btn w-full sm:w-fit px-8"
                asChild
              >
                <Link
                  href="/dsa/core"
                  onClick={() => handleCtaClick("Explore Core Patterns", "/dsa/core", "core_patterns_advertisement")}
                >
                  Explore Core Patterns
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Pattern Abstraction Model Graphic - Light Aware */}
            <div className="lg:col-span-5 aspect-square bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-900 rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl relative">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider block mb-4">
                Pattern Mapping Engine
              </span>
              
              <div className="flex-1 flex flex-col justify-center gap-4 relative">
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Problem: &quot;Longest Substring...&quot;</span>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded border border-primary/20">Active</span>
                </div>
                
                <div className="flex justify-center my-2">
                  <svg className="w-8 h-12 text-primary" viewBox="0 0 24 48" fill="none">
                    <path d="M12 0V48" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M8 36L12 40L16 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-800 dark:text-white mb-0.5">Sliding Window Pattern Map</h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Syncs left & right index tracking with a hash-map bounds checker.</p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
