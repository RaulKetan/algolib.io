import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { SimpleStepControls } from '../shared/SimpleStepControls';
import { VariablePanel } from '../shared/VariablePanel';
import { AnimatedCodeEditor } from '../shared/AnimatedCodeEditor';
import { VisualizationLayout } from '../shared/VisualizationLayout';
import { Layers } from 'lucide-react';

interface Step {
  intervals: [number, number][];
  merged: [number, number][];
  currentInterval: [number, number] | null;
  nextInterval: [number, number] | null;
  currentIdx: number;
  variables: Record<string, any>;
  explanation: string;
  highlightedLines: number[];
}

export const MergeIntervalsVisualization: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [caseType, setCaseType] = useState<'case1' | 'case2'>('case1');

  const initialIntervals: [number, number][] = useMemo(() => 
    caseType === 'case1' 
      ? [[1, 3], [2, 6], [8, 10], [15, 18]] 
      : [[1, 4], [2, 3], [8, 12], [9, 10]], 
  [caseType]);

  const code = `function merge(intervals: number[][]): number[][] {
  if (!intervals || intervals.length === 0) {
    return [];
  }

  intervals.sort((a, b) => a[0] - b[0]);

  const merged: number[][] = [];
  let currentInterval = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    const nextInterval = intervals[i];

    if (currentInterval[1] >= nextInterval[0]) {
      currentInterval[1] = Math.max(currentInterval[1], nextInterval[1]);
    } else {
      merged.push(currentInterval);
      currentInterval = nextInterval;
    }
  }

  merged.push(currentInterval);
  return merged;
}`;

  const steps = useMemo(() => {
    const stepsList: Step[] = [];
    const intervals = initialIntervals.map(it => [...it] as [number, number]);
    
    stepsList.push({
      intervals: intervals.map(it => [...it] as [number, number]),
      merged: [],
      currentInterval: null,
      nextInterval: null,
      currentIdx: -1,
      variables: { intervals: JSON.stringify(initialIntervals) },
      explanation: "Given a collection of intervals, we want to merge all overlapping ones into a set of disjoint intervals.",
      highlightedLines: [1],
    });

    stepsList.push({
      intervals: intervals.map(it => [...it] as [number, number]),
      merged: [],
      currentInterval: null,
      nextInterval: null,
      currentIdx: -1,
      variables: { "!intervals": !intervals, "intervals.length": intervals.length },
      explanation: "First, we check if the input is empty or null.",
      highlightedLines: [2, 3, 4],
    });

    const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
    stepsList.push({
      intervals: sorted.map(it => [...it] as [number, number]),
      merged: [],
      currentInterval: null,
      nextInterval: null,
      currentIdx: -1,
      variables: { action: "Sorting by start time" },
      explanation: "We sort the intervals by their start times to process them in chronological order.",
      highlightedLines: [7],
    });

    const merged: [number, number][] = [];
    let currentInterval: [number, number] = [...sorted[0]];
    stepsList.push({
      intervals: sorted.map(it => [...it] as [number, number]),
      merged: [],
      currentInterval: [...currentInterval],
      nextInterval: null,
      currentIdx: 0,
      variables: { currentInterval: JSON.stringify(currentInterval) },
      explanation: `Initialize 'merged' as empty and set 'currentInterval' to the first interval: [${currentInterval[0]}, ${currentInterval[1]}].`,
      highlightedLines: [9, 10],
    });

    for (let i = 1; i < sorted.length; i++) {
      const nextInterval = [...sorted[i]] as [number, number];

      stepsList.push({
        intervals: sorted.map(it => [...it] as [number, number]),
        merged: merged.map(it => [...it] as [number, number]),
        currentInterval: [...currentInterval],
        nextInterval: [...nextInterval],
        currentIdx: i,
        variables: { i, nextInterval: JSON.stringify(nextInterval) },
        explanation: `Comparing currentInterval [${currentInterval[0]}, ${currentInterval[1]}] with nextInterval [${nextInterval[0]}, ${nextInterval[1]}].`,
        highlightedLines: [12, 13],
      });

      const overlaps = currentInterval[1] >= nextInterval[0];

      stepsList.push({
        intervals: sorted.map(it => [...it] as [number, number]),
        merged: merged.map(it => [...it] as [number, number]),
        currentInterval: [...currentInterval],
        nextInterval: [...nextInterval],
        currentIdx: i,
        variables: { 
          "currentInterval.end": currentInterval[1], 
          "nextInterval.start": nextInterval[0],
          "overlaps": overlaps 
        },
        explanation: overlaps 
          ? `Overlapping detected: currentInterval end (${currentInterval[1]}) ≥ nextInterval start (${nextInterval[0]}).`
          : `No overlap: currentInterval end (${currentInterval[1]}) < nextInterval start (${nextInterval[0]}).`,
        highlightedLines: [15],
      });

      if (overlaps) {
        const oldEnd = currentInterval[1];
        currentInterval[1] = Math.max(currentInterval[1], nextInterval[1]);
        stepsList.push({
          intervals: sorted.map(it => [...it] as [number, number]),
          merged: merged.map(it => [...it] as [number, number]),
          currentInterval: [...currentInterval],
          nextInterval: [...nextInterval],
          currentIdx: i,
          variables: { 
            "prev_end": oldEnd, 
            "next_end": nextInterval[1], 
            "new_end": currentInterval[1] 
          },
          explanation: `Merge the intervals by extending the end of currentInterval to max(${oldEnd}, ${nextInterval[1]}) = ${currentInterval[1]}.`,
          highlightedLines: [16],
        });
      } else {
        merged.push([...currentInterval]);
        const prevCurrent = [...currentInterval];
        currentInterval = [...nextInterval];
        stepsList.push({
          intervals: sorted.map(it => [...it] as [number, number]),
          merged: merged.map(it => [...it] as [number, number]),
          currentInterval: [...currentInterval],
          nextInterval: [...nextInterval],
          currentIdx: i,
          variables: { 
            "added_to_merged": JSON.stringify(prevCurrent), 
            "new_currentInterval": JSON.stringify(currentInterval) 
          },
          explanation: `Push currentInterval [${prevCurrent[0]}, ${prevCurrent[1]}] to 'merged' and update currentInterval to the next one.`,
          highlightedLines: [18, 19],
        });
      }
    }

    merged.push([...currentInterval]);
    stepsList.push({
      intervals: sorted.map(it => [...it] as [number, number]),
      merged: merged.map(it => [...it] as [number, number]),
      currentInterval: [...currentInterval],
      nextInterval: null,
      currentIdx: sorted.length,
      variables: { action: "Final push" },
      explanation: `Add the last remaining 'currentInterval' [${currentInterval[0]}, ${currentInterval[1]}] to the merged list.`,
      highlightedLines: [23],
    });

    stepsList.push({
      intervals: sorted.map(it => [...it] as [number, number]),
      merged: merged.map(it => [...it] as [number, number]),
      currentInterval: null,
      nextInterval: null,
      currentIdx: sorted.length,
      variables: { result: JSON.stringify(merged) },
      explanation: "Algorithm complete. Returning the list of merged intervals.",
      highlightedLines: [24],
    });

    return stepsList;
  }, [initialIntervals]);

  const handleCaseToggle = (type: 'case1' | 'case2') => {
    setCaseType(type);
    setCurrentStep(0);
  };

  const step = steps[currentStep];
  const TIMELINE_MAX = useMemo(() => Math.max(...initialIntervals.flat(), 1) + 2, [initialIntervals]);

  const renderIntervalBar = (interval: [number, number], colorClass: string, label?: string, isLarge = false) => {
    const leftPct = (interval[0] / TIMELINE_MAX) * 100;
    const widthPct = ((interval[1] - interval[0]) / TIMELINE_MAX) * 100;

    return (
      <div className={`flex items-center gap-3 w-full group ${isLarge ? 'h-12' : 'h-8'}`}>
        {label && <span className="w-10 text-[10px] font-bold text-muted-foreground uppercase">{label}</span>}
        <div className="flex-1 relative h-full">
          <div className="absolute inset-0 bg-muted/20 rounded-md"></div>
          <div
            className={`absolute h-[80%] top-[10%] rounded flex items-center justify-center text-[11px] font-mono font-bold transition-all border shadow-sm px-2 ${colorClass}`}
            style={{
              left: `${leftPct}%`,
              width: `${Math.max(widthPct, 12)}%`, // Increased minimum percentage
              minWidth: '60px', // Guaranteed minimum width for text visibility
            }}
          >
            <span className="whitespace-nowrap overflow-visible">
              {interval[0]}-{interval[1]}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <VisualizationLayout
      controls={
        <div className="flex items-center gap-4 w-full justify-between">
          <SimpleStepControls
            currentStep={currentStep}
            totalSteps={steps.length}
            onStepChange={setCurrentStep}
          />
          <div className="flex gap-2">
            <button 
              onClick={() => handleCaseToggle('case1')}
              className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${
                caseType === 'case1' ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Case 1
            </button>
            <button 
              onClick={() => handleCaseToggle('case2')}
              className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${
                caseType === 'case2' ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Case 2
            </button>
          </div>
        </div>
      }
      leftContent={
        <div className="space-y-6 flex flex-col h-full">
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-foreground opacity-90 flex items-center gap-2">
              <Layers size={16} className="text-primary" />
              Interval Processing
            </h2>
            
            <Card className="p-6 bg-card/60 backdrop-blur border-border/50 shadow-sm space-y-8">
              {/* Original Intervals */}
              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sorted Input Intervals</div>
                <div className="space-y-2 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                  {step.intervals.map((interval, idx) => (
                    renderIntervalBar(
                      interval,
                      idx === step.currentIdx 
                        ? 'bg-primary/20 border-primary text-primary z-10 scale-[1.02] shadow-md' 
                        : idx < step.currentIdx 
                          ? 'bg-secondary/30 border-transparent text-muted-foreground/60' 
                          : 'bg-muted/50 border-transparent text-muted-foreground/80',
                      `I${idx}`
                    )
                  ))}
                </div>
              </div>

              {/* Working State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border/50">
                <div className="space-y-3">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-primary font-black">Current Interval</div>
                  <div className="min-h-[50px] flex items-center">
                    {step.currentInterval ? (
                      renderIntervalBar(step.currentInterval, 'bg-primary border-primary text-primary-foreground shadow-lg', undefined, true)
                    ) : (
                      <div className="text-[11px] italic text-muted-foreground bg-muted/20 w-full py-3 text-center rounded-md border border-dashed border-muted">None</div>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-orange-600 font-black">Next Interval</div>
                  <div className="min-h-[50px] flex items-center">
                    {step.nextInterval ? (
                      renderIntervalBar(step.nextInterval, 'bg-orange-500/20 border-orange-500 text-orange-700 dark:text-orange-400 shadow-sm', undefined, true)
                    ) : (
                      <div className="text-[11px] italic text-muted-foreground bg-muted/20 w-full py-3 text-center rounded-md border border-dashed border-muted">None</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Merged Results */}
              <div className="space-y-3 pt-6 border-t border-border/50">
                <div className="text-[10px] font-bold uppercase tracking-widest text-green-600 flex items-center gap-2">
                  Merged Results
                  <span className="text-[8px] bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20 font-black">{step.merged.length} intervals</span>
                </div>
                <div className="space-y-2 max-h-[140px] overflow-y-auto pr-2 custom-scrollbar">
                  {step.merged.map((interval, idx) => (
                    renderIntervalBar(interval, 'bg-green-500/10 border-green-500/40 text-green-700 dark:text-green-400 shadow-sm', `M${idx}`)
                  ))}
                  {step.merged.length === 0 && (
                    <div className="text-[11px] italic text-muted-foreground bg-muted/20 w-full py-3 text-center rounded-md">Empty</div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-4 border-l-4 border-primary bg-primary/5 shadow-sm">
            <div className="space-y-2">
              <h4 className="text-[9px] font-bold uppercase tracking-[0.1em] text-primary/80">
                Commentary
              </h4>
              <p className="text-[13px] font-medium leading-relaxed text-foreground/90 whitespace-pre-wrap">
                {step.explanation}
              </p>
            </div>
          </Card>

          <div className="p-1">
            <VariablePanel variables={step.variables} />
          </div>
        </div>
      }
      rightContent={
        <Card className="h-full overflow-hidden flex flex-col shadow-sm border-border/50">
          <AnimatedCodeEditor
            code={code}
            language="typescript"
            highlightedLines={step.highlightedLines}
          />
        </Card>
      }
    />
  );
};