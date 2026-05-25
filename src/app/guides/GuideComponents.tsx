"use client";

import * as React from "react";

import {
  BookMarked,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageSquare,
  User,
  Cpu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { GuideItem } from "@/data/guidesData";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getVisualizationMetadata } from "@/utils/visualizationMapping";

interface GuideHeaderProps {
  guide: GuideItem;
  categoryLabel: string;
  categoryHref: string;
}

export function GuideHeader({
  guide,
  categoryLabel,
  categoryHref,
}: GuideHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mb-2 select-none">
        <Link
          href="/guides"
          className="hover:text-foreground transition-colors"
        >
          Guides
        </Link>
        {categoryLabel !== "Guides" && (
          <>
            <span className="opacity-50">/</span>
            <Link
              href={categoryHref}
              className="hover:text-foreground transition-colors"
            >
              {categoryLabel}
            </Link>
          </>
        )}
        <span className="opacity-50">/</span>
        <span className="text-foreground truncate max-w-[200px] sm:max-w-[300px]">
          {guide.title}
        </span>
      </div>

      <div className="flex flex-col">
        <h1 className="text-pretty text-neutral-900 dark:text-neutral-100 font-semibold text-3xl ">
          {guide.title}
        </h1>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300">
          {guide.description}
        </p>

        {/* Author details & issue report */}
        <div className="mt-6 flex justify-between gap-4">
          {guide.author ? (
            <div className="flex items-center gap-x-2 group relative">
              {guide.author.linkedin && (
                <a
                  className="underline-offset-[3.5px] transition-colors break-words font-medium absolute inset-0"
                  href={guide.author.linkedin}
                  rel="noreferrer noopener"
                  target="_blank"
                />
              )}
              <span className="inline-flex shrink-0 items-center justify-center select-none overflow-hidden rounded-full size-5 bg-muted text-muted-foreground border border-border/50">
                <User className="size-3" />
              </span>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-neutral-900 dark:text-neutral-100 text-sm font-medium block whitespace-nowrap group-hover:underline">
                  {guide.author.name}
                </span>
                <span className="text-neutral-600 dark:text-neutral-400 text-xs block whitespace-nowrap">
                  {guide.author.role}
                </span>
              </div>
              {guide.author.linkedin && (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="text-neutral-700 dark:text-neutral-300 size-4 shrink-0"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.3362 18.339H15.6707V14.1622C15.6707 13.1662 15.6505 11.8845 14.2817 11.8845C12.892 11.8845 12.6797 12.9683 12.6797 14.0887V18.339H10.0142V9.75H12.5747V10.9207H12.6092C12.967 10.2457 13.837 9.53325 15.1367 9.53325C17.8375 9.53325 18.337 11.3108 18.337 13.6245V18.339H18.3362ZM7.00373 8.57475C6.14573 8.57475 5.45648 7.88025 5.45648 7.026C5.45648 6.1725 6.14648 5.47875 7.00373 5.47875C7.85873 5.47875 8.55173 6.1725 7.00373 8.57475ZM8.34023 18.339H5.66723V9.75H8.34023V18.339ZM19.6697 3H4.32923C3.59498 3 3.00098 3.5805 3.00098 4.29675V19.7033C3.00098 20.4202 3.59498 21 4.32923 21H19.6675C20.401 21 21.001 20.4202 21.001 19.7033V4.29675C21.001 3.5805 20.401 3 19.6675 3H19.6697Z" />
                </svg>
              )}
            </div>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={() => window.open("/feedback", "_blank")}
            className="inline-flex items-center justify-center h-7 px-2 py-1.5 gap-x-1 text-xs whitespace-nowrap font-medium rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors bg-transparent border-none"
          >
            <div>Report an issue</div>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="shrink-0 size-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 19.9C15.2822 19.4367 17 17.419 17 15V12C17 11.299 16.8564 10.6219 16.5846 10H7.41538C7.14358 10.6219 7 11.299 7 12V15C7 17.419 8.71776 19.4367 11 19.9V14H13V19.9ZM5.5358 17.6907C5.19061 16.8623 5 15.9534 5 15H2V13H5V12C5 11.3573 5.08661 10.7348 5.2488 10.1436L3.0359 8.86602L4.0359 7.13397L6.05636 8.30049C6.11995 8.19854 6.18609 8.09835 6.25469 8H17.7453C17.8139 8.09835 17.88 8.19854 17.9436 8.30049L19.9641 7.13397L20.9641 8.86602L18.7512 10.1436C18.9134 10.7348 19 11.3573 19 12V13H22V15H19C19 15.9534 18.8094 16.8623 18.4642 17.6907L20.9641 19.134L19.9641 20.866L17.4383 19.4077C16.1549 20.9893 14.1955 22 12 22C9.80453 22 7.84512 20.9893 6.56171 19.4077L4.0359 20.866L3.0359 19.134L5.5358 17.6907ZM8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6H8Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

interface GuideFooterProps {
  currentIndex: number;
  allGuidesCount: number;
  prevGuide: GuideItem | null;
  nextGuide: GuideItem | null;
  isCompleted: boolean;
  toggleComplete: () => void;
  getGuideUrl: (g: GuideItem) => string;
  allGuides: GuideItem[];
}

export function GuideFooter({
  currentIndex,
  allGuidesCount,
  prevGuide,
  nextGuide,
  isCompleted,
  toggleComplete,
  getGuideUrl,
  allGuides,
}: GuideFooterProps) {
  return (
    <div className="flex flex-col gap-6 mt-14">
      {/* Navigation Actions */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {prevGuide ? (
          <Link
            href={getGuideUrl(prevGuide)}
            className="flex-1 max-w-[260px] min-w-[140px]"
          >
            <div className="flex flex-col gap-1 p-3 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-all hover:border-primary/20 group">
              <span className="text-[10px] text-muted-foreground font-bold flex items-center gap-1">
                <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                PREVIOUS GUIDE
              </span>
              <span className="text-xs font-semibold text-foreground truncate">
                {prevGuide.title}
              </span>
            </div>
          </Link>
        ) : (
          <div className="flex-1 max-w-[260px]" />
        )}

        <div className="flex flex-col items-center gap-1.5 select-none">
          <span className="text-xs text-muted-foreground font-medium">
            Guide {currentIndex + 1} of {allGuidesCount}
          </span>
          <div className="flex gap-1 h-1 w-24 bg-muted rounded-full overflow-hidden">
            {allGuides.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 h-full",
                  i <= currentIndex ? "bg-primary" : "bg-muted-foreground/15",
                )}
              />
            ))}
          </div>
        </div>

        {nextGuide ? (
          <Link
            href={getGuideUrl(nextGuide)}
            className="flex-1 max-w-[260px] min-w-[140px]"
          >
            <div className="flex flex-col gap-1 p-3 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-all hover:border-primary/20 text-right group">
              <span className="text-[10px] text-muted-foreground font-bold flex items-center gap-1 justify-end">
                NEXT GUIDE
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <span className="text-xs font-semibold text-foreground truncate">
                {nextGuide.title}
              </span>
            </div>
          </Link>
        ) : (
          <div className="flex-1 max-w-[260px]" />
        )}
      </div>

      {/* Completion Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-border/50 bg-muted/10">
        <div className="flex items-center gap-3">
          <Button
            onClick={toggleComplete}
            variant={isCompleted ? "secondary" : "default"}
            size="sm"
            className={cn(
              "gap-1.5 h-9 rounded-md font-semibold text-xs transition-all",
              isCompleted
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20"
                : "bg-primary text-primary-foreground hover:opacity-90 shadow-md",
            )}
          >
            {isCompleted ? (
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            ) : (
              <BookMarked className="w-3.5 h-3.5" />
            )}
            {isCompleted ? "Completed" : "Mark as Complete"}
          </Button>
          <span className="text-xs text-muted-foreground hidden sm:inline select-none">
            {isCompleted
              ? "Nicely done! Keep up the momentum."
              : "Finished reading? Mark this guide completed."}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="h-8">
            <a
              href="/feedback"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground"
              onClick={(e) => {
                e.preventDefault();
                window.open("/feedback", "_blank");
              }}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Feedback
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

interface GuideHeadingProps {
  id?: string;
  children: React.ReactNode;
}

export function GuideHeading({ id, children }: GuideHeadingProps) {
  return (
    <h3
      id={id}
      className="scroll-mt-20 border-b border-border/40 pb-2 mt-14 mb-6 text-2xl font-medium tracking-tight text-foreground"
    >
      {children}
    </h3>
  );
}

export function GuideSubHeading({ id, children }: GuideHeadingProps) {
  return (
    <h3
      id={id}
      className="scroll-mt-20 mt-8 mb-4 text-xl font-semibold text-foreground tracking-tight"
    >
      {children}
    </h3>
  );
}

interface GuideParagraphProps {
  children: React.ReactNode;
}

export function GuideParagraph({ children }: GuideParagraphProps) {
  return (
    <p className="!mt-0 !mb-5 text-neutral-700 dark:text-neutral-300 leading-relaxed text-[15px]">
      {children}
    </p>
  );
}

interface GuideTableProps {
  children: React.ReactNode;
}

export function GuideTable({ children }: GuideTableProps) {
  return (
    <div className="overflow-x-auto mb-6 mt-2 border border-border/40 rounded-lg">
      <table className="min-w-full divide-y divide-border/30 text-sm">
        {children}
      </table>
    </div>
  );
}

interface GuideVisualizationsSectionProps {
  visualizations: string[];
  activeViz: string;
  setActiveViz: (viz: string) => void;
  showVisualizer: boolean;
  setShowVisualizer: React.Dispatch<React.SetStateAction<boolean>>;
}

export function GuideVisualizationsSection({
  visualizations,
  activeViz,
  setActiveViz,
  showVisualizer,
  setShowVisualizer,
}: GuideVisualizationsSectionProps) {
  if (!visualizations || visualizations.length === 0) return null;

  return (
    <section className="flex flex-col scroll-mt-20 mt-14 mb-6 animate-fadeIn">
      <GuideHeading id="interactive-visualizations">Interactive Visualizations</GuideHeading>
      <GuideParagraph>
        Engage with these concepts dynamically. Click on any card below to launch the interactive simulator and step through the algorithm execution.
      </GuideParagraph>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {visualizations.map((vizId) => {
          const { title, description } = getVisualizationMetadata(vizId);
          const isActive = showVisualizer && activeViz === vizId;

          return (
            <div
              key={vizId}
              onClick={() => {
                if (isActive) {
                  setShowVisualizer(false);
                } else {
                  setActiveViz(vizId);
                  setShowVisualizer(true);
                }
              }}
              className={cn(
                "group relative p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between h-full hover:shadow-md",
                isActive
                  ? "border-primary/50 bg-primary/[0.03] dark:bg-primary/[0.015] shadow-sm"
                  : "border-border/60 bg-card/45 hover:border-primary/30 hover:bg-muted/10 dark:hover:bg-muted/5"
              )}
            >
              <div className="flex gap-4 items-start mb-4">
                <div className={cn(
                  "p-2.5 rounded-lg shrink-0 transition-colors duration-300",
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                )}>
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    {title}
                    {isActive && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 pt-3 border-t border-border/10">
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider",
                  isActive ? "text-emerald-500 dark:text-emerald-400" : "text-muted-foreground group-hover:text-primary transition-colors"
                )}>
                  {isActive ? "Running in Simulator" : "Simulator Ready"}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-7 px-3 gap-1.5 text-xs font-semibold rounded-md border transition-all pointer-events-none",
                    isActive
                      ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10"
                      : "border-border text-muted-foreground group-hover:border-primary/20 group-hover:text-primary group-hover:bg-primary/5"
                  )}
                >
                  <Eye className="w-3 h-3" />
                  {isActive ? "Close" : "Open"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function InlineVizTrigger({
  vizId,
  label,
  showVisualizer,
  setShowVisualizer,
  activeViz,
  setActiveViz
}: {
  vizId: string;
  label: string;
  showVisualizer: boolean;
  setShowVisualizer: React.Dispatch<React.SetStateAction<boolean>>;
  activeViz: string;
  setActiveViz: (viz: string) => void;
}) {
  const { title, description } = getVisualizationMetadata(vizId);
  const isActive = showVisualizer && activeViz === vizId;

  return (
    <span className="block my-6 not-prose max-w-[420px]">
      <div
        onClick={() => {
          if (isActive) {
            setShowVisualizer(false);
          } else {
            setActiveViz(vizId);
            setShowVisualizer(true);
          }
        }}
        className={cn(
          "group relative p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-md",
          isActive
            ? "border-primary/50 bg-primary/[0.03] dark:bg-primary/[0.015] shadow-sm"
            : "border-border/60 bg-card/45 hover:border-primary/30 hover:bg-muted/10 dark:hover:bg-muted/5"
        )}
      >
        <div className="flex gap-4 items-start mb-4">
          <div className={cn(
            "p-2.5 rounded-lg shrink-0 transition-colors duration-300",
            isActive
              ? "bg-primary/15 text-primary"
              : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
          )}>
            <Cpu className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              {title}
              {isActive && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 pt-3 border-t border-border/10">
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-wider",
            isActive ? "text-emerald-500 dark:text-emerald-400" : "text-muted-foreground group-hover:text-primary transition-colors"
          )}>
            {isActive ? "Running in Simulator" : "Simulator Ready"}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-7 px-3 gap-1.5 text-xs font-semibold rounded-md border transition-all pointer-events-none",
              isActive
                ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10"
                : "border-border text-muted-foreground group-hover:border-primary/20 group-hover:text-primary group-hover:bg-primary/5"
            )}
          >
            <Eye className="w-3 h-3" />
            {isActive ? "Close" : "Open"}
          </Button>
        </div>
      </div>
    </span>
  );
}

