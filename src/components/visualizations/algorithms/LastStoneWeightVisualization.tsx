import { useState, useMemo } from 'react';
import { SimpleStepControls } from '../shared/SimpleStepControls';
import { VariablePanel } from '../shared/VariablePanel';
import { AnimatedCodeEditor } from '../shared/AnimatedCodeEditor';
import { VisualizationLayout } from '../shared/VisualizationLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface Step {
  maxHeap: number[];
  first: number | null;
  second: number | null;
  resultStone: number | null;
  explanation: string;
  highlightedLines: number[];
  variables: Record<string, any>;
  phase: 'init' | 'check' | 'sort' | 'extract_first' | 'extract_second' | 'compare' | 'push_diff' | 'done';
}

export const LastStoneWeightVisualization = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const initialStones = [2, 7, 4, 1, 8, 1];

  const steps: Step[] = useMemo(() => {
    const s: Step[] = [];
    let heap = [...initialStones];

    // 1. Initial State
    s.push({
      maxHeap: [...heap],
      first: null,
      second: null,
      resultStone: null,
      explanation: `Receive array of stones: [${heap.join(', ')}].`,
      highlightedLines: [1],
      variables: { stones: `[${initialStones.join(', ')}]` },
      phase: 'init'
    });

    // 2. Sort descending
    heap.sort((a, b) => b - a);
    s.push({
      maxHeap: [...heap],
      first: null,
      second: null,
      resultStone: null,
      explanation: `Initialize the maxHeap with the stones sorted in descending order: [${heap.join(', ')}].`,
      highlightedLines: [2],
      variables: { stones: `[${initialStones.join(', ')}]`, maxHeap: `[${heap.join(', ')}]` },
      phase: 'sort'
    });

    while (heap.length > 1) {
      // Loop condition check
      s.push({
        maxHeap: [...heap],
        first: null,
        second: null,
        resultStone: null,
        explanation: `Check loop condition: heap size is ${heap.length} (> 1). Continue smashing.`,
        highlightedLines: [4],
        variables: { maxHeap: `[${heap.join(', ')}]`, 'maxHeap.length': heap.length },
        phase: 'check'
      });

      // Sort
      heap.sort((a, b) => b - a);
      s.push({
        maxHeap: [...heap],
        first: null,
        second: null,
        resultStone: null,
        explanation: `Sort the heap descending to ensure heaviest stones are at the beginning: [${heap.join(', ')}].`,
        highlightedLines: [5],
        variables: { maxHeap: `[${heap.join(', ')}]` },
        phase: 'sort'
      });

      // Extract first
      const first = heap.shift()!;
      s.push({
        maxHeap: [...heap],
        first,
        second: null,
        resultStone: null,
        explanation: `Extract the heaviest stone: first = ${first}. Remaining heap: [${heap.join(', ')}].`,
        highlightedLines: [7],
        variables: { maxHeap: `[${heap.join(', ')}]`, first },
        phase: 'extract_first'
      });

      // Extract second
      const second = heap.shift()!;
      s.push({
        maxHeap: [...heap],
        first,
        second,
        resultStone: null,
        explanation: `Extract the second heaviest stone: second = ${second}. Remaining heap: [${heap.join(', ')}].`,
        highlightedLines: [8],
        variables: { maxHeap: `[${heap.join(', ')}]`, first, second },
        phase: 'extract_second'
      });

      // Compare
      s.push({
        maxHeap: [...heap],
        first,
        second,
        resultStone: null,
        explanation: `Compare weights: first (${first}) and second (${second}). Are they different?`,
        highlightedLines: [10],
        variables: { first, second, 'first !== second': first !== second },
        phase: 'compare'
      });

      if (first !== second) {
        const diff = first - second;
        heap.push(diff);
        s.push({
          maxHeap: [...heap],
          first,
          second,
          resultStone: diff,
          explanation: `Since ${first} !== ${second}, a new stone of weight first - second = ${diff} is added back to the heap.`,
          highlightedLines: [11],
          variables: { maxHeap: `[${heap.join(', ')}]`, first, second, added: diff },
          phase: 'push_diff'
        });
      } else {
        s.push({
          maxHeap: [...heap],
          first,
          second,
          resultStone: 0,
          explanation: `Since both stones have the same weight (${first}), they completely destroy each other. No new stone is added.`,
          highlightedLines: [10],
          variables: { maxHeap: `[${heap.join(', ')}]`, first, second },
          phase: 'push_diff'
        });
      }
    }

    // Loop end check
    s.push({
      maxHeap: [...heap],
      first: null,
      second: null,
      resultStone: null,
      explanation: `Check loop condition: heap size is ${heap.length} (not > 1). Exit the loop.`,
      highlightedLines: [4],
      variables: { maxHeap: `[${heap.join(', ')}]`, 'maxHeap.length': heap.length },
      phase: 'check'
    });

    // Final result
    const result = heap.length === 0 ? 0 : heap[0];
    s.push({
      maxHeap: [...heap],
      first: null,
      second: null,
      resultStone: null,
      explanation: `Game over. Return weight of last remaining stone: ${result}.`,
      highlightedLines: [15],
      variables: { maxHeap: `[${heap.join(', ')}]`, result },
      phase: 'done'
    });

    return s;
  }, []);

  const code = `function lastStoneWeight(stones: number[]): number {
    const maxHeap: number[] = [...stones].sort((a, b) => b - a);

    while (maxHeap.length > 1) {
        maxHeap.sort((a, b) => b - a);

        const first = maxHeap.shift()!;
        const second = maxHeap.shift()!;

        if (first !== second) {
            maxHeap.push(first - second);
        }
    }

    return maxHeap.length === 0 ? 0 : maxHeap[0];
}`;

  const step = steps[currentStep];

  return (
    <VisualizationLayout
      leftContent={
        <div className="space-y-6">
          {/* Game Board Card */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 relative overflow-hidden">
            <h3 className="text-sm font-semibold mb-6 text-muted-foreground uppercase tracking-widest text-center">
              Stone Smashing Game Arena
            </h3>

            {/* Heap View */}
            <div className="mb-8">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-4">
                Current Heap Status (Sorted Descending)
              </span>
              <div className="flex flex-wrap items-center gap-4 min-h-[80px] p-4 bg-muted/20 border-2 border-dashed border-border rounded-xl">
                <AnimatePresence mode="popLayout">
                  {step.maxHeap.map((weight, idx) => (
                    <motion.div
                      key={`stone-${idx}-${weight}`}
                      layout
                      initial={{ opacity: 0, scale: 0.3 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.3 }}
                      transition={{ duration: 0.15 }}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <div
                        style={{
                          width: `${32 + weight * 5}px`,
                          height: `${32 + weight * 5}px`,
                        }}
                        className="rounded-full bg-gradient-to-br from-slate-400 via-slate-500 to-slate-700 dark:from-slate-600 dark:via-zinc-700 dark:to-zinc-950 border-2 border-slate-300 dark:border-zinc-800 shadow-md flex items-center justify-center relative select-none"
                      >
                        <span className="font-extrabold text-white text-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          {weight}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {step.maxHeap.length === 0 && (
                  <span className="text-xs text-muted-foreground uppercase py-2">
                    No stones left
                  </span>
                )}
              </div>
            </div>

            {/* Smash Zone */}
            <div className="relative p-6 bg-red-500/5 dark:bg-red-500/10 border-2 border-red-500/20 rounded-2xl overflow-hidden min-h-[220px] flex flex-col justify-between">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-black text-red-500 uppercase tracking-widest bg-red-500/10 px-2.5 py-0.5 rounded">
                Smash Zone
              </div>

              <div className="flex justify-around items-center h-full my-auto py-4">
                {/* First Stone */}
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Heaviest</span>
                  <div className="h-20 flex items-center justify-center">
                    {step.first !== null ? (
                      <motion.div
                        layoutId="first-stone"
                        style={{
                          width: `${32 + step.first * 5}px`,
                          height: `${32 + step.first * 5}px`,
                        }}
                        className="rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-amber-700 border-2 border-orange-300 shadow-lg shadow-orange-500/20 flex items-center justify-center relative select-none"
                      >
                        <span className="font-extrabold text-white text-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          {step.first}
                        </span>
                      </motion.div>
                    ) : (
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/20 flex items-center justify-center text-xs text-muted-foreground/30 font-bold uppercase select-none">
                        ?
                      </div>
                    )}
                  </div>
                </div>

                {/* Smash Action indicator */}
                <div className="flex flex-col items-center justify-center">
                  {step.phase === 'compare' || step.phase === 'push_diff' ? (
                    <motion.div
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="text-red-500 text-3xl font-extrabold select-none"
                    >
                      💥
                    </motion.div>
                  ) : (
                    <span className="text-xl font-bold text-muted-foreground/30 select-none">VS</span>
                  )}
                </div>

                {/* Second Stone */}
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">2nd Heaviest</span>
                  <div className="h-20 flex items-center justify-center">
                    {step.second !== null ? (
                      <motion.div
                        layoutId="second-stone"
                        style={{
                          width: `${32 + step.second * 5}px`,
                          height: `${32 + step.second * 5}px`,
                        }}
                        className="rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-amber-700 border-2 border-orange-300 shadow-lg shadow-orange-500/20 flex items-center justify-center relative select-none"
                      >
                        <span className="font-extrabold text-white text-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          {step.second}
                        </span>
                      </motion.div>
                    ) : (
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/20 flex items-center justify-center text-xs text-muted-foreground/30 font-bold uppercase select-none">
                        ?
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Smash Result Box */}
              {step.resultStone !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-red-400 uppercase">Smash Result:</span>
                  <div className="flex items-center gap-2">
                    {step.resultStone > 0 ? (
                      <>
                        <span className="text-xs text-muted-foreground">Stone survives with weight:</span>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-700 border border-slate-300 flex items-center justify-center font-bold text-white text-xs select-none">
                          {step.resultStone}
                        </div>
                      </>
                    ) : (
                      <span className="text-xs font-black text-red-500 uppercase">Both stones destroyed!</span>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </Card>

          {/* Explanation Box */}
          <Card className="p-4 bg-primary/5 border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
              <Info className="w-3.5 h-3.5" />
              Interactive Guide
            </h4>
            <p className="text-sm text-foreground leading-relaxed font-medium">{step.explanation}</p>
          </Card>

          {/* Variables Inspector */}
          <VariablePanel variables={step.variables} />
        </div>
      }
      rightContent={
        <AnimatedCodeEditor
          code={code}
          language="typescript"
          highlightedLines={step.highlightedLines}
        />
      }
      controls={
        <SimpleStepControls
          currentStep={currentStep}
          totalSteps={steps.length}
          onStepChange={setCurrentStep}
        />
      }
    />
  );
};
