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
    <section className="py-20 bg-white dark:bg-black text-zinc-900 dark:text-white relative overflow-hidden">
      {/* Grid Canvas Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40"></div>

      <div className="w-full max-w-[1500px] mx-auto px-6 relative z-10">
        
        {/* INTERACTIVE DSA TOPIC CANVAS */}
        <div className="max-w-[1400px] mx-auto border border-zinc-200 dark:border-zinc-900 bg-zinc-50/80 dark:bg-[#060606]/80 backdrop-blur-xl rounded-xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          
          {/* Subtle dotted canvas style overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none opacity-45"></div>
          
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-[#EAFF96]/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Heading with navigation actions */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 relative z-10 border-b border-zinc-200 dark:border-zinc-900 pb-6 text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start w-full lg:w-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-4 tracking-wide uppercase">
                <LayoutGrid className="w-3.5 h-3.5" /> Interactive Roadmap Canvas
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900 dark:text-white mb-3">
                Start Your Journey Topic-Wise
              </h3>
              
              <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base max-w-2xl font-medium leading-relaxed">
                Click on any category cell inside our visual learning map to load high-impact problem nodes. Master arrays, pointers, trees, and dynamic graphs connected dynamically.
              </p>
            </div>
            
            {/* Quick paths selector */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0 w-full lg:w-auto">
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

          {/* Accordion List Layout - Flat Design mimicking native DSA accordions */}
          <div className="max-w-[950px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-3.5 relative z-10">
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
                      className="flex items-center justify-between p-4 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20 transition-all duration-200 rounded-xl"
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

          {/* Connected banner guide at bottom */}
          <div className="mt-12 text-center border-t border-zinc-200 dark:border-zinc-900 pt-6 relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
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

        </div>

      </div>
    </section>
  );
}
