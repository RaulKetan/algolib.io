"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { guidesData } from "@/data/guidesData";
import { Clock, Layers, Target, ArrowRight, Eye, FileText, HardDrive } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GuidesPage() {
  const groups = useMemo(() => {
    const timeCompCat = guidesData.find((c) => c.id === "time-complexity");
    const spaceCompCat = guidesData.find((c) => c.id === "space-complexity");
    const fundamentalsCat = guidesData.find((c) => c.id === "fundamentals");

    const patternIds = [
      "arrays-hashing",
      "two-pointers",
      "frequency-counter",
      "sliding-window",
      "stack",
      "binary-search",
    ];
    const patternGuides = guidesData
      .filter((c) => patternIds.includes(c.id))
      .flatMap((c) => c.guides);

    return [
      {
        id: "time-complexity",
        title: "Time Complexity",
        tagline: "Big O Analysis & Efficiency",
        description: "Master the foundations of computational complexity, operation budgets, and standard execution scales.",
        icon: Clock,
        colorClass: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        guides: timeCompCat ? timeCompCat.guides : [],
      },
      {
        id: "space-complexity",
        title: "Space Complexity",
        tagline: "Memory Budgets & Allocation",
        description: "Understand recursion stacks, heap allocations, and auxiliary memory structures to build memory-efficient applications.",
        icon: HardDrive,
        colorClass: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
        guides: spaceCompCat ? spaceCompCat.guides : [],
      },
      {
        id: "fundamentals",
        title: "Fundamentals",
        tagline: "Core Structures & Basics",
        description: "Build deep intuition for fundamental memory structures, lists, binary search trees, and prefix indexes.",
        icon: Layers,
        colorClass: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
        guides: fundamentalsCat ? fundamentalsCat.guides : [],
      },
      {
        id: "patterns",
        title: "Patterns",
        tagline: "Interview-Proven Blueprints",
        description: "Drill high-impact coding patterns like pointers, sliding windows, and monotonic stacks to crack system designs and DSA.",
        icon: Target,
        colorClass: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        guides: patternGuides,
      },
    ];
  }, []);

  return (
    <div className="flex flex-1 flex-col min-h-[calc(100vh-48px)] bg-background font-sans text-foreground relative">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-12 sm:py-16 relative w-full">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 text-xs font-semibold tracking-wider uppercase">
            Reference Guides
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
            RulCode Guidebook
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Accelerate your learning curve with clean cheat sheets, step-by-step logic explanations, and visual pattern guides designed to help you solve problems with confidence.
          </p>
        </div>

        {/* Categories Sections */}
        <div className="space-y-16">
          {groups.map((group) => (
            <div key={group.id} className="space-y-6">
              {/* Group Title Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${group.colorClass} flex items-center justify-center shrink-0`}>
                    <group.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                      {group.title}
                    </h2>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mt-0.5">
                      {group.tagline}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground max-w-md md:text-right leading-relaxed">
                  {group.description}
                </p>
              </div>

              {/* Grid of Guide Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.guides.map((guide) => {
                  const vizCount = guide.visualizations?.length ?? 0;
                  return (
                    <Link
                      key={guide.slug}
                      href={
                        group.id === "time-complexity"
                          ? "/guides/time-complexity"
                          : group.id === "space-complexity"
                          ? "/guides/space-complexity"
                          : group.id === "fundamentals"
                          ? `/guides/fundamentals/${guide.slug}`
                          : `/guides/patterns/${guide.slug}`
                      }
                      className="group flex flex-col justify-between p-6 rounded-2xl border border-border/50 bg-card hover:bg-muted/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/20 overflow-hidden relative cursor-pointer"
                    >
                      {/* Decorative internal top-right accent */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="text-[11px] font-semibold text-muted-foreground/80 uppercase tracking-wider">
                            DSA Guide
                          </span>
                        </div>
                        <h3 className="font-bold text-[17px] text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {guide.title}
                        </h3>
                        <p className="text-[13px] text-muted-foreground line-clamp-3 leading-relaxed">
                          {guide.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-6">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                          {vizCount > 0 ? (
                            <div className="flex items-center gap-1 text-primary">
                              <Eye className="w-3.5 h-3.5" />
                              <span>{vizCount} Interactive Sim{vizCount > 1 ? "s" : ""}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground/60">Static Guide</span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                          <span>Read</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

