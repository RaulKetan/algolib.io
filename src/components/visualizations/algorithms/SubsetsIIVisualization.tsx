import React, { useEffect, useState } from "react";

import { AnimatedCodeEditor } from "../shared/AnimatedCodeEditor";
import { SimpleStepControls } from "../shared/SimpleStepControls";
import { VariablePanel } from "../shared/VariablePanel";

interface Step {
  nums: number[];
  subset: number[];
  i: number;
  j: number | null;
  res: number[][];
  message: string;
  lineNumber: number;
}

export const SubsetsIIVisualization: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const code = `function subsetsWithDup(nums: number[]): number[][] {
    const res: number[][] = [];
    nums.sort((a, b) => a - b);

    function backtrack(i: number, subset: number[]) {
        res.push([...subset]);

        for (let j = i; j < nums.length; j++) {
            if (j > i && nums[j] === nums[j - 1]) {
                continue;
            }

            subset.push(nums[j]);
            backtrack(j + 1, subset);
            subset.pop();
        }
    }

    backtrack(0, []);
    return res;
}`;

  const generateSteps = () => {
    const nums = [1, 2, 2];
    const newSteps: Step[] = [];
    const res: number[][] = [];
    const subset: number[] = [];

    newSteps.push({
      nums,
      subset: [...subset],
      i: 0,
      j: null,
      res: [...res],
      message: "Initialize res array and sort nums (nums is now [1, 2, 2])",
      lineNumber: 3,
    });

    function backtrack(i: number) {
      newSteps.push({
        nums,
        subset: [...subset],
        i,
        j: null,
        res: res.map((s) => [...s]),
        message: `backtrack(${i}, [${subset.join(", ")}]) called`,
        lineNumber: 5,
      });

      res.push([...subset]);
      newSteps.push({
        nums,
        subset: [...subset],
        i,
        j: null,
        res: res.map((s) => [...s]),
        message: `Add copy of current subset [${subset.join(", ")}] to res`,
        lineNumber: 6,
      });

      for (let j = i; j < nums.length; j++) {
        newSteps.push({
          nums,
          subset: [...subset],
          i,
          j,
          res: res.map((s) => [...s]),
          message: `Loop from j = ${j} to ${nums.length - 1}`,
          lineNumber: 8,
        });

        newSteps.push({
          nums,
          subset: [...subset],
          i,
          j,
          res: res.map((s) => [...s]),
          message: `Check duplicate: j > i (${j} > ${i}) && nums[${j}] === nums[${j - 1}] (${nums[j]} === ${nums[j - 1]})`,
          lineNumber: 9,
        });

        if (j > i && nums[j] === nums[j - 1]) {
          newSteps.push({
            nums,
            subset: [...subset],
            i,
            j,
            res: res.map((s) => [...s]),
            message: `Duplicate found! nums[${j}] == nums[${j - 1}]. Skip to next iteration.`,
            lineNumber: 10,
          });
          continue;
        }

        subset.push(nums[j]);
        newSteps.push({
          nums,
          subset: [...subset],
          i,
          j,
          res: res.map((s) => [...s]),
          message: `Include nums[${j}] (${nums[j]}) in subset. subset is now [${subset.join(", ")}]`,
          lineNumber: 13,
        });

        newSteps.push({
          nums,
          subset: [...subset],
          i,
          j,
          res: res.map((s) => [...s]),
          message: `Recursive call backtrack(${j + 1}, [${subset.join(", ")}])`,
          lineNumber: 14,
        });
        backtrack(j + 1);

        const popped = subset.pop();
        newSteps.push({
          nums,
          subset: [...subset],
          i,
          j,
          res: res.map((s) => [...s]),
          message: `Backtrack: pop ${popped} from subset. subset is now [${subset.join(", ")}]`,
          lineNumber: 15,
        });
      }

      newSteps.push({
        nums,
        subset: [...subset],
        i,
        j: null,
        res: res.map((s) => [...s]),
        message: `Loop finished for i = ${i}, returning to caller.`,
        lineNumber: 16,
      });
    }

    newSteps.push({
      nums,
      subset: [...subset],
      i: 0,
      j: null,
      res: [...res],
      message: "Start backtracking process from index 0 with empty subset",
      lineNumber: 19,
    });
    backtrack(0);

    newSteps.push({
      nums,
      subset: [...subset],
      i: 0,
      j: null,
      res: [...res],
      message: "Backtracking complete. Return final result.",
      lineNumber: 20,
    });

    setSteps(newSteps);
  };

  useEffect(() => {
    generateSteps();
  }, []);

  if (steps.length === 0) return null;

  const currentStep = steps[currentStepIndex];

  return (
    <div className="space-y-6">
      <SimpleStepControls
        currentStep={currentStepIndex}
        totalSteps={steps.length}
        onStepChange={setCurrentStepIndex}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6 border shadow-sm flex flex-col">
          <div className="rounded-lg mb-6">
            <VariablePanel
              variables={{
                "i (backtrack index)": currentStep.i,
                "j (loop index)": currentStep.j !== null ? currentStep.j : "null",
                "subset": `[${currentStep.subset.join(", ")}]`,
                "res.length": currentStep.res.length,
              }}
            />
          </div>

          <h3 className="text-lg font-semibold mb-4">Input Array (nums)</h3>
          <div className="flex gap-2 mb-6">
            {currentStep.nums.map((val, idx) => {
              const isI = idx === currentStep.i;
              const isJ = idx === currentStep.j;

              let highlightClass = "bg-card border-border";
              if (isJ && isI) {
                highlightClass = "bg-purple-500/20 border-purple-500 scale-110 z-10";
              } else if (isJ) {
                highlightClass = "bg-blue-500/20 border-blue-500 scale-110 z-10";
              } else if (isI) {
                highlightClass = "bg-primary/20 border-primary scale-110 z-10";
              }

              return (
                <div
                  key={idx}
                  className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 font-bold transition-all relative ${highlightClass}`}
                >
                  <div className="flex flex-col items-center">
                    <span>{val}</span>
                  </div>
                  {(isI || isJ) && (
                    <div className="absolute -bottom-6 text-xs font-mono text-muted-foreground">
                      {isI && isJ ? "i,j" : isJ ? "j" : "i"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <h3 className="text-lg font-semibold mb-4">Current Subset</h3>
          <div className="flex gap-2 mb-6 min-h-[3rem]">
            {currentStep.subset.length > 0 ? (
              currentStep.subset.map((val, idx) => (
                <div
                  key={idx}
                  className="w-12 h-12 flex items-center justify-center text-primary-foreground font-bold rounded-lg border-2 bg-primary border-primary transition-all animate-in zoom-in"
                >
                  {val}
                </div>
              ))
            ) : (
              <div className="text-muted-foreground italic flex items-center h-12 px-2">
                Empty []
              </div>
            )}
          </div>

          <h3 className="text-lg font-semibold mb-4">
            Result Array `res` ({currentStep.res.length})
          </h3>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto w-full p-2 border rounded-lg bg-muted/20 min-h-[6rem]">
            {currentStep.res.map((sub, idx) => (
              <div
                key={idx}
                className="px-3 py-1 bg-green-500/10 text-green-700 dark:text-green-400 font-mono rounded border border-green-500 text-sm animate-in fade-in"
              >
                [{sub.join(", ")}]
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted/60 border rounded-lg shadow-inner mt-auto">
            <p className="text-sm font-medium">{currentStep.message}</p>
          </div>
        </div>

        <AnimatedCodeEditor
          code={code}
          highlightedLines={[currentStep.lineNumber]}
          language="TypeScript"
        />
      </div>
    </div>
  );
};
