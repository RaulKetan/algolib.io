import { useEffect, useRef, useState } from "react";

import { AnimatedCodeEditor } from "../shared/AnimatedCodeEditor";
import { StepControls } from "../shared/StepControls";
import { VariablePanel } from "../shared/VariablePanel";

interface Step {
  dp: number[];
  nums: number[];
  target: number;
  newTarget: number;
  i: number;
  j: number | null;
  message: string;
  lineNumber: number;
}

export const TargetSumVisualization = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const code = `function findTargetSumWays(nums: number[], target: number): number {
    let sum = 0;
    for (const num of nums) {
        sum += num;
    }
    if (Math.abs(target) > sum) {
        return 0;
    }
    if ((sum + target) % 2 !== 0) {
        return 0;
    }
    const newTarget = (sum + target) / 2;
    const dp: number[] = new Array(newTarget + 1).fill(0);
    dp[0] = 1;
    for (const num of nums) {
        for (let j = newTarget; j >= num; j--) {
            dp[j] += dp[j - num];
        }
    }
    return dp[newTarget];
}`;

  const generateSteps = () => {
    const nums = [1, 1, 2];
    const target = 0;
    const newSteps: Step[] = [];

    let sum = 0;
    for (const num of nums) {
      sum += num;
    }

    newSteps.push({
      dp: [],
      nums,
      target,
      newTarget: -1,
      i: -1,
      j: null,
      message: `Welcome! We have numbers [${nums.join(", ")}] and we want them to add up to ${target} by putting + or - in front of them. The sum of all numbers is ${sum}.`,
      lineNumber: 2,
    });

    if (Math.abs(target) > sum) {
      newSteps.push({
        dp: [],
        nums,
        target,
        newTarget: -1,
        i: -1,
        j: null,
        message: `Oops! Our target ${target} is bigger than our total sum ${sum}. It's impossible to reach!`,
        lineNumber: 6,
      });
      setSteps(newSteps);
      return;
    }

    if ((sum + target) % 2 !== 0) {
      newSteps.push({
        dp: [],
        nums,
        target,
        newTarget: -1,
        i: -1,
        j: null,
        message: `Math trick: The sum (${sum}) plus target (${target}) is odd, so we can't divide it evenly into + and - groups. Target is impossible!`,
        lineNumber: 9,
      });
      setSteps(newSteps);
      return;
    }

    const newTarget = (sum + target) / 2;
    newSteps.push({
      dp: [],
      nums,
      target,
      newTarget,
      i: -1,
      j: null,
      message: `Magic Math Trick! Instead of guessing + or -, we just need to find a group of numbers that add up exactly to (sum + target) / 2. Here, that's ${newTarget}!`,
      lineNumber: 12,
    });

    const dp: number[] = new Array(newTarget + 1).fill(0);
    newSteps.push({
      dp: [...dp],
      nums,
      target,
      newTarget,
      i: -1,
      j: null,
      message: `Let's make a row of boxes from 0 to ${newTarget}. Each box will hold "how many ways can we make this sum?". We start with 0 ways.`,
      lineNumber: 13,
    });

    dp[0] = 1;
    newSteps.push({
      dp: [...dp],
      nums,
      target,
      newTarget,
      i: -1,
      j: null,
      message: `There is exactly 1 way to make a sum of 0: just don't pick any numbers! So we put a '1' in the 0 box.`,
      lineNumber: 14,
    });

    for (let idx = 0; idx < nums.length; idx++) {
      const num = nums[idx];
      newSteps.push({
        dp: [...dp],
        nums,
        target,
        newTarget,
        i: idx,
        j: null,
        message: `Now let's look at our number: ${num}.`,
        lineNumber: 15,
      });

      for (let j = newTarget; j >= num; j--) {
        newSteps.push({
          dp: [...dp],
          nums,
          target,
          newTarget,
          i: idx,
          j,
          message: `Can we make sum ${j} using our number ${num}? We just need to check if we already figured out how to make sum ${j - num}!`,
          lineNumber: 16,
        });

        const prevWays = dp[j - num];
        if (prevWays > 0) {
          dp[j] += prevWays;
          newSteps.push({
            dp: [...dp],
            nums,
            target,
            newTarget,
            i: idx,
            j,
            message: `Yes! There are ${prevWays} ways to make sum ${j - num}. If we just add our number ${num} to them, we make sum ${j}! So we add ${prevWays} to box ${j}.`,
            lineNumber: 17,
          });
        } else {
          newSteps.push({
            dp: [...dp],
            nums,
            target,
            newTarget,
            i: idx,
            j,
            message: `Oh no! We have 0 ways to make sum ${j - num}. Adding ${num} won't help us make sum ${j}. Box ${j} stays the same.`,
            lineNumber: 17,
          });
        }
      }
    }

    newSteps.push({
      dp: [...dp],
      nums,
      target,
      newTarget,
      i: -1,
      j: null,
      message: `All done! The number in the last box tells us there are ${dp[newTarget]} ways to reach our target sum!`,
      lineNumber: 20,
    });

    setSteps(newSteps);
    setCurrentStepIndex(0);
  };

  useEffect(() => {
    generateSteps();
  }, []);

  useEffect(() => {
    if (isPlaying && currentStepIndex < steps.length - 1) {
      intervalRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000 / speed);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, currentStepIndex, steps.length, speed]);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleStepForward = () =>
    currentStepIndex < steps.length - 1 &&
    setCurrentStepIndex((prev) => prev + 1);
  const handleStepBack = () =>
    currentStepIndex > 0 && setCurrentStepIndex((prev) => prev - 1);
  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
    generateSteps();
  };

  if (steps.length === 0) return null;
  const currentStep = steps[currentStepIndex];

  return (
    <div className="space-y-6">
      <StepControls
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        onStepForward={handleStepForward}
        onStepBack={handleStepBack}
        onReset={handleReset}
        speed={speed}
        onSpeedChange={setSpeed}
        currentStep={currentStepIndex}
        totalSteps={steps.length - 1}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-muted/30 rounded-lg border border-border/50 p-6 overflow-hidden flex justify-center w-full">
            <div className="space-y-6 w-full">
              {currentStep.dp.length > 0 && (
                <div className="bg-card w-full p-6 rounded-md shadow-sm border border-border/40">
                  <h4 className="text-sm font-semibold mb-4 flex justify-between items-center text-foreground">
                    Ways to reach sum (DP Array)
                    <span className="text-xs font-normal text-muted-foreground">
                      Target Sum: {currentStep.newTarget}
                    </span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentStep.dp.map((ways, idx) => {
                      const isCurrent = currentStep.j === idx;
                      const isDependency =
                        currentStep.i !== -1 &&
                        currentStep.j !== null &&
                        idx === currentStep.j - currentStep.nums[currentStep.i];
                      return (
                        <div
                          key={idx}
                          className={`flex flex-col items-center gap-1 p-1 rounded transition-all ${
                            isCurrent ? "ring-2 ring-primary ring-offset-2" : ""
                          }`}
                        >
                          <div className="text-[10px] text-muted-foreground font-mono">
                            idx {idx}
                          </div>
                          <div
                            className={`w-10 h-10 rounded flex items-center justify-center text-sm font-bold border-2 transition-all ${
                              ways > 0 && !isCurrent && !isDependency
                                ? "bg-green-500/20 border-green-500 text-green-700 dark:text-green-400"
                                : isDependency
                                ? "bg-primary/20 border-primary text-primary animate-pulse"
                                : isCurrent
                                ? "bg-accent border-primary text-foreground"
                                : "bg-muted border-border text-muted-foreground"
                            }`}
                          >
                            {ways}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="bg-accent/20 rounded-lg border border-accent/50 p-5 mt-2">
                <p className="text-base text-foreground leading-relaxed font-medium">
                  {currentStep.message}
                </p>
              </div>

              <div className="rounded-lg mt-4">
                <VariablePanel
                  variables={{
                    nums: `[${currentStep.nums.join(", ")}]`,
                    "target sum": currentStep.target,
                    "new target subset sum": currentStep.newTarget >= 0 ? currentStep.newTarget : "N/A",
                    "current index (i)": currentStep.i >= 0 ? currentStep.i : "N/A",
                    "current num (nums[i])": currentStep.i >= 0 ? currentStep.nums[currentStep.i] : "N/A",
                    "current checking sum (j)": currentStep.j !== null ? currentStep.j : "N/A",
                  }}
                />
              </div>
            </div>
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
