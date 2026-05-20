"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePostHog } from "@posthog/react";
import { trackEvent } from "@/lib/analytics";
import {
  Brain,
  Trophy,
  Target,
  Layers,
  ArrowRight,
  Sparkles,
  Zap,
  Compass,
  Award,
  Globe,
  TrendingUp,
  Activity,
  Shield,
  LayoutGrid,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TopicNode {
  name: string;
  count: number;
  icon: any;
  colorClass: string;
  bgClass: string;
  glowColor: string;
}

const TOPIC_NODES: TopicNode[] = [
  {
    name: "Arrays & Hashing",
    count: 12,
    icon: Layers,
    colorClass: "text-orange-500 dark:text-orange-400",
    bgClass: "from-orange-500/10 to-amber-500/10 dark:from-orange-500/5 dark:to-amber-500/5",
    glowColor: "rgba(249,115,22,0.08)"
  },
  {
    name: "Two Pointers",
    count: 8,
    icon: Compass,
    colorClass: "text-blue-500 dark:text-blue-400",
    bgClass: "from-blue-500/10 to-indigo-500/10 dark:from-blue-500/5 dark:to-indigo-500/5",
    glowColor: "rgba(59,130,246,0.08)"
  },
  {
    name: "Sliding Window",
    count: 6,
    icon: Zap,
    colorClass: "text-yellow-600 dark:text-yellow-400",
    bgClass: "from-yellow-500/10 to-amber-500/10 dark:from-yellow-500/5 dark:to-amber-500/5",
    glowColor: "rgba(234,179,8,0.08)"
  },
  {
    name: "Stack",
    count: 7,
    icon: Layers,
    colorClass: "text-purple-500 dark:text-purple-400",
    bgClass: "from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5",
    glowColor: "rgba(168,85,247,0.08)"
  },
  {
    name: "Binary Search",
    count: 9,
    icon: Target,
    colorClass: "text-emerald-500 dark:text-emerald-400",
    bgClass: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5",
    glowColor: "rgba(16,185,129,0.08)"
  },
  {
    name: "Linked List",
    count: 8,
    icon: Activity,
    colorClass: "text-cyan-500 dark:text-cyan-400",
    bgClass: "from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/5 dark:to-cyan-500/5",
    glowColor: "rgba(6,182,212,0.08)"
  },
  {
    name: "Trees",
    count: 15,
    icon: Globe,
    colorClass: "text-rose-500 dark:text-rose-400",
    bgClass: "from-rose-500/10 to-red-500/10 dark:from-rose-500/5 dark:to-red-500/5",
    glowColor: "rgba(244,63,94,0.08)"
  },
  {
    name: "Heap / Priority Queue",
    count: 6,
    icon: Trophy,
    colorClass: "text-violet-500 dark:text-violet-400",
    bgClass: "from-violet-500/10 to-indigo-500/10 dark:from-violet-500/5 dark:to-indigo-500/5",
    glowColor: "rgba(139,92,246,0.08)"
  },
  {
    name: "Backtracking",
    count: 9,
    icon: Sparkles,
    colorClass: "text-fuchsia-500 dark:text-fuchsia-400",
    bgClass: "from-fuchsia-500/10 to-pink-500/10 dark:from-fuchsia-500/5 dark:to-pink-500/5",
    glowColor: "rgba(217,70,239,0.08)"
  },
  {
    name: "Tries",
    count: 4,
    icon: Award,
    colorClass: "text-sky-500 dark:text-sky-400",
    bgClass: "from-sky-500/10 to-blue-500/10 dark:from-sky-500/5 dark:to-sky-500/5",
    glowColor: "rgba(14,165,233,0.08)"
  },
  {
    name: "Graphs",
    count: 14,
    icon: Globe,
    colorClass: "text-indigo-500 dark:text-indigo-400",
    bgClass: "from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/5 dark:to-purple-500/5",
    glowColor: "rgba(99,102,241,0.08)"
  },
  {
    name: "Advanced Graphs",
    count: 6,
    icon: Brain,
    colorClass: "text-red-500 dark:text-red-400",
    bgClass: "from-red-500/10 to-orange-500/10 dark:from-red-500/5 dark:to-orange-500/5",
    glowColor: "rgba(239,68,68,0.08)"
  },
  {
    name: "1-D Dynamic Programming",
    count: 13,
    icon: TrendingUp,
    colorClass: "text-green-500 dark:text-green-400",
    bgClass: "from-green-500/10 to-emerald-500/10 dark:from-green-500/5 dark:to-emerald-500/5",
    glowColor: "rgba(34,197,94,0.08)"
  },
  {
    name: "2-D Dynamic Programming",
    count: 9,
    icon: Layers,
    colorClass: "text-blue-500 dark:text-blue-400",
    bgClass: "from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5",
    glowColor: "rgba(59,130,246,0.08)"
  },
  {
    name: "Greedy",
    count: 8,
    icon: Sparkles,
    colorClass: "text-amber-500 dark:text-amber-400",
    bgClass: "from-amber-500/10 to-yellow-500/10 dark:from-amber-500/5 dark:to-yellow-500/5",
    glowColor: "rgba(245,158,11,0.08)"
  },
  {
    name: "Intervals",
    count: 6,
    icon: Activity,
    colorClass: "text-violet-500 dark:text-violet-400",
    bgClass: "from-violet-500/10 to-purple-500/10 dark:from-violet-500/5 dark:to-purple-500/5",
    glowColor: "rgba(139,92,246,0.08)"
  },
  {
    name: "Math & Geometry",
    count: 8,
    icon: Shield,
    colorClass: "text-orange-500 dark:text-orange-400",
    bgClass: "from-orange-500/10 to-red-500/10 dark:from-orange-500/5 dark:to-red-500/5",
    glowColor: "rgba(249,115,22,0.08)"
  },
  {
    name: "Bit Manipulation",
    count: 7,
    icon: Zap,
    colorClass: "text-teal-500 dark:text-teal-400",
    bgClass: "from-teal-500/10 to-cyan-500/10 dark:from-teal-500/5 dark:to-cyan-500/5",
    glowColor: "rgba(20,184,166,0.08)"
  }
];

export function TopicRoadmapSection() {
  const posthog = usePostHog();
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const handleCtaClick = (label: string, destination: string, section: string) => {
    trackEvent(posthog, "home_cta_clicked", {
      cta_label: label,
      destination,
      section
    });
  };

  return (
    <section className="py-36 lg:py-48 bg-[#FAFAFA] dark:bg-[#050505] text-zinc-900 dark:text-white relative overflow-hidden">
      {/* Grid Canvas Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40"></div>

      {/* Subtle dotted canvas style overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none opacity-45"></div>

      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-[#EAFF96]/5 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[1500px] mx-auto px-6 relative z-10"
      >

        {/* Heading with navigation actions - Now left-aligned and outside */}
        <div className="max-w-[1400px] mx-auto mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10 text-left">
          <div className="w-full lg:w-auto">
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900 dark:text-white mb-4 leading-[1.1] flex items-center gap-3">
              <LayoutGrid className="w-[1em] h-[1em] text-primary shrink-0" />
              <span>Start Your Journey Topic-Wise</span>
            </h3>

            <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base max-w-2xl font-medium leading-relaxed">
              Click on any category cell inside our visual learning map to load high-impact problem nodes. Master arrays, pointers, trees, and dynamic graphs connected dynamically.
            </p>
          </div>

          {/* Quick paths selector */}
          <div className="flex flex-wrap items-center justify-start gap-3.5 shrink-0 w-full lg:w-auto">
            <Button variant="outline" size="sm" className="rounded-xl font-medium border-zinc-200 dark:border-zinc-800 text-xs h-10 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-300" asChild>
              <Link href="/dsa/problems" onClick={() => handleCtaClick("Canvas - All Problems", "/dsa/problems", "canvas_header_quicklinks")}>
                DSA Library
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl font-medium border-zinc-200 dark:border-zinc-800 text-xs h-10 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-300" asChild>
              <Link href="/dsa/core" onClick={() => handleCtaClick("Canvas - Core Patterns", "/dsa/core", "canvas_header_quicklinks")}>
                Core Patterns
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl font-medium border-zinc-200 dark:border-zinc-800 text-xs h-10 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-300" asChild>
              <Link href="/dsa/blind-75" onClick={() => handleCtaClick("Canvas - Blind 75", "/dsa/blind-75", "canvas_header_quicklinks")}>
                Blind 75
              </Link>
            </Button>
          </div>
        </div>

        {/* TOPIC PARENT CARD CONTAINER */}
        <div className="max-w-[1400px] mx-auto border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/30 dark:bg-[#080808]/40 backdrop-blur-xl rounded-xl p-6 sm:p-10 relative overflow-hidden z-10">

          {/* Featured Core Patterns & Blind 75 Cards inside */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Link
              href="/dsa/core"
              onClick={() => handleCtaClick("Core Patterns - Parent Card", "/dsa/core", "featured_parent_cards")}
              className="group block"
            >
              <Card className="flex items-center justify-between p-5 bg-white dark:bg-[#0c0c0c] border border-zinc-200 dark:border-zinc-800/80 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-all duration-200 rounded-xl shadow-none">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-primary fill-primary" />
                  </div>
                  <div className="flex flex-col text-left">
                    <h4 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors leading-tight">
                      Core Patterns
                    </h4>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                      15 essential templates forming technical interview foundations
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-400 dark:text-zinc-500 group-hover:translate-x-0.5 group-hover:text-primary transition-all shrink-0" />
              </Card>
            </Link>

            <Link
              href="/dsa/blind-75"
              onClick={() => handleCtaClick("Blind 75 - Parent Card", "/dsa/blind-75", "featured_parent_cards")}
              className="group block"
            >
              <Card className="flex items-center justify-between p-5 bg-white dark:bg-[#0c0c0c] border border-zinc-200 dark:border-zinc-800/80 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-all duration-200 rounded-xl shadow-none">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex flex-col text-left">
                    <h4 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors leading-tight">
                      Blind 75
                    </h4>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                      75 high-frequency problems curated for FAANG preparation
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-400 dark:text-zinc-500 group-hover:translate-x-0.5 group-hover:text-primary transition-all shrink-0" />
              </Card>
            </Link>
          </div>

          <div className="pt-4">
            <h4 className="text-xs font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-widest mb-6">
              Topic-Wise Categories
            </h4>

            {/* Accordion List Layout - Flat Design mimicking native DSA accordions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {TOPIC_NODES.map((topic, index) => {
                const Icon = topic.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.015 }}
                  >
                    <Link
                      href={`/dsa/query?topic=${encodeURIComponent(topic.name)}`}
                      onClick={() => handleCtaClick(topic.name, `/dsa/query?topic=${encodeURIComponent(topic.name)}`, "learning_canvas_node")}
                      className="group block"
                    >
                      <Card
                        className="flex items-center justify-between p-4 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20 transition-all duration-200 rounded-xl shadow-none"
                      >
                        {/* Left Block: Icon & Title info */}
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/5 border border-primary/20 flex items-center justify-center shrink-0">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex flex-col text-left">
                            <h4 className="text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-primary transition-colors leading-tight">
                              {topic.name}
                            </h4>
                            <span className="text-xs text-zinc-500 mt-1">
                              {topic.count} essential problems
                            </span>
                          </div>
                        </div>

                        {/* Right Block: Chevron Indicator */}
                        <ChevronRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:translate-x-0.5 group-hover:text-primary transition-all shrink-0" />
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Connected banner guide at bottom */}
        <div className="mt-12 text-center  relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-xs sm:text-sm font-semibold text-zinc-400 dark:text-zinc-500">
            Not sure where to begin? We recommend starting with our
          </span>

          <Link
            href="/dsa/core"
            onClick={() => handleCtaClick("Banner bottom - Core Patterns", "/dsa/core", "canvas_bottom_banner")}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-primary hover:underline underline-offset-4 group/bottom"
          >
            15 Core Patterns Track
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/bottom:translate-x-1" />
          </Link>
        </div>

      </motion.div>
    </section>
  );
}
