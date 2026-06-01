import React, { useEffect, useRef, useState } from "react";

import { AnimatedCodeEditor } from "../shared/AnimatedCodeEditor";
import { StepControls } from "../shared/StepControls";
import { VariablePanel } from "../shared/VariablePanel";

interface Step {
  dp: number[][];
  nums: number[];
  i: number;
  j: number;
  k: number;
  len: number;
  message: string;
  lineNumber: number;
}

export const BurstBalloonsVisualization: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef<number | null>(null);

  const code = `function maxCoins(nums: number[]): number {
    nums = [1, ...nums, 1];
    const n = nums.length;
    const dp: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));
    
    for (let len = 2; len < n; len++) {
        for (let i = 1; i < n - len + 1; i++) {
            let j = i + len - 1;
            for (let k = i; k < j; k++) {
                dp[i][j] = Math.max(
                    dp[i][j], 
                    dp[i][k] + dp[k + 1][j] + nums[i - 1] * nums[k] * nums[j]
                );
            }
        }
    }
    return dp[1][n - 1];
}`;

  const generateSteps = () => {
    const originalNums = [3, 1, 5, 8];
    const nums = [1, ...originalNums, 1];
    const n = nums.length;

    const dp = Array.from({ length: n }, () => Array(n).fill(0));
    const newSteps: Step[] = [];

    newSteps.push({
      dp: dp.map((row) => [...row]),
      nums,
      i: -1,
      j: -1,
      k: -1,
      len: -1,
      message: `Welcome to the Burst Balloons game! We add a magic '1' balloon at both ends to make math easy. Our array becomes [${nums.join(", ")}].`,
      lineNumber: 2,
    });

    newSteps.push({
      dp: dp.map((row) => [...row]),
      nums,
      i: -1,
      j: -1,
      k: -1,
      len: -1,
      message: `Brain Teaser: Instead of guessing what to pop FIRST, we think about what to pop LAST. If balloon K is the last one left, we already know its neighbors are exactly the left and right edges!`,
      lineNumber: 4,
    });

    newSteps.push({
      dp: dp.map((row) => [...row]),
      nums,
      i: -1,
      j: -1,
      k: -1,
      len: -1,
      message: `We create a grid where row i and column j represent the score for popping everything between boundaries i-1 and j. We start with small gaps and grow larger!`,
      lineNumber: 6,
    });

    for (let len = 2; len < n; len++) {
      for (let i = 1; i < n - len + 1; i++) {
        let j = i + len - 1;
        
        for (let k = i; k < j; k++) {
          newSteps.push({
            dp: dp.map((row) => [...row]),
            nums,
            i,
            j,
            k,
            len,
            message: `Looking at balloons from index ${i} to ${j - 1}. Let's see what happens if balloon ${k} (value ${nums[k]}) is the VERY LAST one to pop in this group!`,
            lineNumber: 9,
          });

          const leftScore = dp[i][k];
          const rightScore = dp[k + 1][j];
          const popScore = nums[i - 1] * nums[k] * nums[j];
          const currentTotal = leftScore + rightScore + popScore;

          let msg = `If balloon ${k} pops last, its left neighbor is ${nums[i-1]} and right is ${nums[j]}. Score = ${nums[i-1]} * ${nums[k]} * ${nums[j]} = ${popScore}.`;
          msg += ` Plus points from popping balloons before it (${leftScore} + ${rightScore}) = ${currentTotal}.`;

          if (currentTotal > dp[i][j]) {
            dp[i][j] = currentTotal;
            msg += ` This is a NEW RECORD for this group! Saving ${dp[i][j]} in our grid at row ${i}, col ${j}.`;
          } else {
            msg += ` But our previous record for this group was ${dp[i][j]}, which is better or equal. We keep ${dp[i][j]}.`;
          }

          newSteps.push({
            dp: dp.map((row) => [...row]),
            nums,
            i,
            j,
            k,
            len,
            message: msg,
            lineNumber: 10,
          });
        }
      }
    }

    newSteps.push({
      dp: dp.map((row) => [...row]),
      nums,
      i: 1,
      j: n - 1,
      k: -1,
      len: -1,
      message: `All done! The very top-right box (row 1, col ${n-1}) tells us the maximum coins we can get for popping all balloons: ${dp[1][n - 1]}!`,
      lineNumber: 16,
    });

    setSteps(newSteps);
    setCurrentStepIndex(0);
  };

  useEffect(() => {
    generateSteps();
  }, []);

  useEffect(() => {
    if (isPlaying && currentStepIndex < steps.length - 1) {
      intervalRef.current = window.setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000 / Math.max(0.5, speed));
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentStepIndex, steps.length, speed]);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleStepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  const handleStepBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  if (steps.length === 0) return null;

  const currentStep = steps[currentStepIndex];
  const n = currentStep.nums.length;

  return (
    <div className="space-y-6">
      <StepControls
        onPlay={handlePlay}
        onPause={handlePause}
        onStepForward={handleStepForward}
        onStepBack={handleStepBack}
        onReset={handleReset}
        isPlaying={isPlaying}
        currentStep={currentStepIndex}
        totalSteps={steps.length - 1}
        speed={speed}
        onSpeedChange={setSpeed}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card rounded-lg p-6 border shadow-sm w-full overflow-hidden">
            <h3 className="text-lg font-semibold mb-4">Burst Balloons DP Table</h3>
            
            <div className="flex w-full overflow-x-auto pb-6 mb-2">
              <div className="flex gap-3 px-4 pt-4 m-auto">
                {currentStep.nums.map((num, idx) => {
                    const isBoundary = idx === 0 || idx === n - 1;
                    const isK = idx === currentStep.k;
                    const isLeftBoundary = idx === currentStep.i - 1;
                    const isRightBoundary = idx === currentStep.j;
                    
                    return (
                        <div key={idx} className="flex flex-col items-center">
                            <div className="text-[10px] text-muted-foreground font-mono mb-1">{idx}</div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-all ${
                                isK ? 'bg-primary text-primary-foreground scale-110 ring-4 ring-primary/30' :
                                isLeftBoundary || isRightBoundary ? 'bg-orange-500/20 text-orange-600 border-2 border-orange-500/50 scale-105' :
                                isBoundary ? 'bg-muted border border-dashed border-muted-foreground/50 text-muted-foreground' : 
                                'bg-secondary text-secondary-foreground border border-border'
                            }`}>
                                {num}
                            </div>
                            <div className="text-[10px] h-4 mt-1 font-medium text-primary">
                                {isK ? 'Last Pop (k)' : (isLeftBoundary ? 'Left Border' : (isRightBoundary ? 'Right Border' : ''))}
                            </div>
                        </div>
                    );
                })}
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border border-border p-2 bg-muted text-muted-foreground font-normal">
                      i \\ j
                    </th>
                    {Array.from({length: n}).map((_, idx) => (
                      <th key={idx} className="border border-border p-2 bg-muted text-center font-mono">
                        {idx}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentStep.dp.map((row, i) => (
                    <tr key={i}>
                      <td className="border border-border p-2 bg-muted font-semibold text-center font-mono">
                        {i}
                      </td>
                      {row.map((val, j) => {
                        const isCurrent = i === currentStep.i && j === currentStep.j;
                        const isDependency = currentStep.k !== -1 && (
                            (i === currentStep.i && j === currentStep.k) || 
                            (i === currentStep.k + 1 && j === currentStep.j)
                        );

                        return (
                          <td
                            key={j}
                            className={`border border-border p-2 text-center transition-all min-w-[40px] ${
                              isCurrent
                                ? "bg-primary/20 ring-2 ring-primary ring-inset font-bold text-primary"
                                : isDependency
                                ? "bg-primary/10 text-primary border-primary animate-pulse"
                                : j >= i && val > 0
                                ? "bg-green-500/10 text-green-700 dark:text-green-400 font-medium"
                                : j >= i
                                ? "text-muted-foreground"
                                : "bg-muted/30 text-transparent"
                            }`}
                          >
                            {j >= i ? val : ""}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-accent/20 rounded-lg border border-accent/50 p-5 mt-2">
            <p className="text-base text-foreground leading-relaxed font-medium">
              {currentStep.message}
            </p>
          </div>

          <div className="rounded-lg mt-4">
            <VariablePanel
              variables={{
                "current length (len)": currentStep.len > 0 ? currentStep.len : "-",
                "start boundary (i-1)": currentStep.i > 0 ? currentStep.i - 1 : "-",
                "start balloon (i)": currentStep.i > 0 ? currentStep.i : "-",
                "end boundary (j)": currentStep.j > 0 ? currentStep.j : "-",
                "last pop (k)": currentStep.k > 0 ? currentStep.k : "-",
              }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <AnimatedCodeEditor
            code={code}
            highlightedLines={[currentStep.lineNumber]}
            language="TypeScript"
          />
        </div>
      </div>
    </div>
  );
};
