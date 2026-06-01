import React, { useEffect, useRef, useState } from "react";

import { AnimatedCodeEditor } from "../shared/AnimatedCodeEditor";
import { StepControls } from "../shared/StepControls";
import { VariablePanel } from "../shared/VariablePanel";

interface Step {
  dp: number[][];
  s: string;
  t: string;
  i: number;
  j: number;
  message: string;
  lineNumber: number;
}

export const DistinctSubsequencesVisualization: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef<number | null>(null);

  const code = `function numDistinct(s: string, t: string): number {
    const n = s.length;
    const m = t.length;
    const dp: number[][] = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));
    for (let i = 0; i <= n; i++) {
        dp[i][0] = 1;
    }
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (s[i - 1] === t[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    return dp[n][m];
}`;

  const generateSteps = () => {
    const s = "babgbag";
    const t = "bag";
    const n = s.length;
    const m = t.length;

    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    const newSteps: Step[] = [];

    newSteps.push({
      dp: dp.map((row) => [...row]),
      s,
      t,
      i: -1,
      j: -1,
      message: `Welcome! We want to find how many ways we can form the short word "${t}" by picking letters from the long word "${s}".`,
      lineNumber: 4,
    });

    // Base cases
    for (let i = 0; i <= n; i++) {
      dp[i][0] = 1;
    }
    newSteps.push({
      dp: dp.map((row) => [...row]),
      s,
      t,
      i: -1,
      j: 0,
      message: `Base case: To form an empty string (column 0), there is exactly 1 way: just pick 0 letters! So we fill the first column with 1s.`,
      lineNumber: 6,
    });

    // Main DP
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        const sChar = s[i - 1];
        const tChar = t[j - 1];

        newSteps.push({
          dp: dp.map((row) => [...row]),
          s,
          t,
          i,
          j,
          message: `Looking at row ${i} (letter '${sChar}') and col ${j} (letter '${tChar}'). Do they match?`,
          lineNumber: 10,
        });

        if (sChar === tChar) {
          dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
          newSteps.push({
            dp: dp.map((row) => [...row]),
            s,
            t,
            i,
            j,
            message: `Match! '${sChar}' === '${tChar}'. We can either use this letter (ways from diagonal ↖: ${dp[i - 1][j - 1]}) or NOT use it (ways from above ↑: ${dp[i - 1][j]}). Total ways = ${dp[i][j]}.`,
            lineNumber: 11,
          });
        } else {
          dp[i][j] = dp[i - 1][j];
          newSteps.push({
            dp: dp.map((row) => [...row]),
            s,
            t,
            i,
            j,
            message: `No match! '${sChar}' !== '${tChar}'. We can't use this letter. So we just bring down the ways from the box above ↑: ${dp[i][j]}.`,
            lineNumber: 13,
          });
        }
      }
    }

    newSteps.push({
      dp: dp.map((row) => [...row]),
      s,
      t,
      i: n,
      j: m,
      message: `All done! The number in the very last box tells us there are ${dp[n][m]} ways to form "${t}" from "${s}".`,
      lineNumber: 17,
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
      }, 1000 / speed);
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
            <h3 className="text-lg font-semibold mb-4">Distinct Subsequences DP Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border border-border p-2 bg-muted text-muted-foreground font-normal">
                      s \ t
                    </th>
                    <th className="border border-border p-2 bg-muted text-center text-muted-foreground">
                      ∅
                      <div className="text-[10px] font-normal">0</div>
                    </th>
                    {currentStep.t.split("").map((char, idx) => (
                      <th key={idx} className="border border-border p-2 bg-muted text-center font-mono">
                        {char}
                        <div className="text-[10px] text-muted-foreground font-normal">{idx + 1}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentStep.dp.map((row, i) => (
                    <tr key={i}>
                      <td className="border border-border p-2 bg-muted font-semibold text-center font-mono">
                        {i === 0 ? "∅" : currentStep.s[i - 1]}
                        <div className="text-[10px] text-muted-foreground font-normal">{i}</div>
                      </td>
                      {row.map((val, j) => {
                        const isCurrent = i === currentStep.i && j === currentStep.j;
                        // Determine dependencies if a match occurs
                        const sChar = i > 0 ? currentStep.s[i - 1] : "";
                        const tChar = j > 0 ? currentStep.t[j - 1] : "";
                        const isMatch = sChar === tChar;
                        
                        let isDependency = false;
                        if (currentStep.i === i && currentStep.j === j) {
                            // Current cell
                        } else if (currentStep.i !== -1 && currentStep.j !== -1) {
                           if (currentStep.i > 0 && currentStep.j > 0) {
                              const currSChar = currentStep.s[currentStep.i - 1];
                              const currTChar = currentStep.t[currentStep.j - 1];
                              if (currSChar === currTChar) {
                                  // dependencies are (i-1, j-1) and (i-1, j)
                                  if (i === currentStep.i - 1 && (j === currentStep.j - 1 || j === currentStep.j)) {
                                      isDependency = true;
                                  }
                              } else {
                                  // dependency is (i-1, j)
                                  if (i === currentStep.i - 1 && j === currentStep.j) {
                                      isDependency = true;
                                  }
                              }
                           }
                        }

                        return (
                          <td
                            key={j}
                            className={`border border-border p-2 text-center transition-all min-w-[40px] ${
                              isCurrent
                                ? "bg-primary/20 ring-2 ring-primary ring-inset font-bold text-primary"
                                : isDependency
                                ? "bg-primary/10 text-primary border-primary animate-pulse"
                                : val > 0
                                ? "bg-green-500/10 text-green-700 dark:text-green-400 font-medium"
                                : "text-muted-foreground"
                            }`}
                          >
                            {val}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-accent/20 rounded-lg border border-accent/50 p-5">
            <p className="text-base text-foreground leading-relaxed font-medium">
              {currentStep.message}
            </p>
          </div>

          <div className="rounded-lg">
            <VariablePanel
              variables={{
                "long word (s)": currentStep.s,
                "short word (t)": currentStep.t,
                "row index (i)": currentStep.i >= 0 ? currentStep.i : "-",
                "col index (j)": currentStep.j >= 0 ? currentStep.j : "-",
                "current s char": currentStep.i > 0 ? currentStep.s[currentStep.i - 1] : "-",
                "current t char": currentStep.j > 0 ? currentStep.t[currentStep.j - 1] : "-",
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
