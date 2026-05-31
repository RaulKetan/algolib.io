import React, { useEffect, useState } from "react";

import { AnimatedCodeEditor } from "../shared/AnimatedCodeEditor";
import { SimpleStepControls } from "../shared/SimpleStepControls";
import { VariablePanel } from "../shared/VariablePanel";

interface Step {
  s: string;
  part: string[];
  i: number;
  j: number | null;
  res: string[][];
  message: string;
  lineNumber: number;
}

export const PalindromePartitioningVisualization: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const code = `function partition(s: string): string[][] {
    const res: string[][] = [];
    const part: string[] = [];

    function isPalindrome(left: number, right: number): boolean {
        while (left < right) {
            if (s[left] !== s[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    function dfs(i: number): void {
        if (i >= s.length) {
            res.push([...part]);
            return;
        }

        for (let j = i; j < s.length; j++) {
            if (isPalindrome(i, j)) {
                part.push(s.substring(i, j + 1));
                dfs(j + 1);
                part.pop();
            }
        }
    }

    dfs(0);
    return res;
}`;

  const generateSteps = () => {
    const s = "aab";
    const newSteps: Step[] = [];
    const res: string[][] = [];
    const part: string[] = [];

    newSteps.push({
      s,
      part: [...part],
      i: 0,
      j: null,
      res: [...res],
      message: `Initialize res and part arrays, s = "${s}"`,
      lineNumber: 2,
    });

    function isPalindrome(left: number, right: number): boolean {
      newSteps.push({
        s,
        part: [...part],
        i: left,
        j: right,
        res: [...res],
        message: `isPalindrome(${left}, ${right}) called for substring "${s.substring(left, right + 1)}"`,
        lineNumber: 5,
      });

      let l = left;
      let r = right;
      while (l < r) {
        newSteps.push({
          s,
          part: [...part],
          i: left,
          j: right,
          res: [...res],
          message: `Check if s[${l}] ('${s[l]}') !== s[${r}] ('${s[r]}')`,
          lineNumber: 7,
        });

        if (s[l] !== s[r]) {
          newSteps.push({
            s,
            part: [...part],
            i: left,
            j: right,
            res: [...res],
            message: `Mismatch! '${s[l]}' !== '${s[r]}', return false`,
            lineNumber: 8,
          });
          return false;
        }
        l++;
        r--;
      }
      
      newSteps.push({
        s,
        part: [...part],
        i: left,
        j: right,
        res: [...res],
        message: `Substring "${s.substring(left, right + 1)}" is a valid palindrome`,
        lineNumber: 13,
      });
      return true;
    }

    function dfs(i: number) {
      newSteps.push({
        s,
        part: [...part],
        i,
        j: null,
        res: res.map((p) => [...p]),
        message: `dfs(${i}) called, current part = [${part.map(p => `"${p}"`).join(", ")}]`,
        lineNumber: 16,
      });

      newSteps.push({
        s,
        part: [...part],
        i,
        j: null,
        res: res.map((p) => [...p]),
        message: `Check base case: i (${i}) >= s.length (${s.length})`,
        lineNumber: 17,
      });

      if (i >= s.length) {
        res.push([...part]);
        newSteps.push({
          s,
          part: [...part],
          i,
          j: null,
          res: res.map((p) => [...p]),
          message: `Base case met! Add copy of part [${part.map(p => `"${p}"`).join(", ")}] to res`,
          lineNumber: 18,
        });
        return;
      }

      for (let j = i; j < s.length; j++) {
        newSteps.push({
          s,
          part: [...part],
          i,
          j,
          res: res.map((p) => [...p]),
          message: `Loop j from ${i} to ${s.length - 1}. Current j = ${j}. Checking substring "${s.substring(i, j + 1)}"`,
          lineNumber: 22,
        });

        const isPal = isPalindrome(i, j);

        newSteps.push({
          s,
          part: [...part],
          i,
          j,
          res: res.map((p) => [...p]),
          message: `isPalindrome(${i}, ${j}) returned ${isPal}`,
          lineNumber: 23,
        });

        if (isPal) {
          const sub = s.substring(i, j + 1);
          part.push(sub);
          newSteps.push({
            s,
            part: [...part],
            i,
            j,
            res: res.map((p) => [...p]),
            message: `Valid palindrome! Add "${sub}" to part. part is now [${part.map(p => `"${p}"`).join(", ")}]`,
            lineNumber: 24,
          });

          newSteps.push({
            s,
            part: [...part],
            i,
            j,
            res: res.map((p) => [...p]),
            message: `Recursive call dfs(${j + 1})`,
            lineNumber: 25,
          });
          dfs(j + 1);

          const popped = part.pop();
          newSteps.push({
            s,
            part: [...part],
            i,
            j,
            res: res.map((p) => [...p]),
            message: `Backtrack: pop "${popped}" from part. part is now [${part.map(p => `"${p}"`).join(", ")}]`,
            lineNumber: 26,
          });
        }
      }
      
      newSteps.push({
        s,
        part: [...part],
        i,
        j: null,
        res: res.map((p) => [...p]),
        message: `Loop finished for dfs(${i}), returning to caller.`,
        lineNumber: 28,
      });
    }

    newSteps.push({
      s,
      part: [...part],
      i: 0,
      j: null,
      res: [...res],
      message: `Start DFS from index 0 with empty partition array`,
      lineNumber: 31,
    });
    dfs(0);

    newSteps.push({
      s,
      part: [...part],
      i: 0,
      j: null,
      res: [...res],
      message: `DFS complete. Return final result res.`,
      lineNumber: 32,
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
          <h3 className="text-lg font-semibold mb-4">Input String (s)</h3>
          <div className="flex gap-2 mb-6">
            {currentStep.s.split("").map((char, idx) => {
              const isI = idx === currentStep.i;
              const isJ = idx === currentStep.j;
              
              let highlightClass = "bg-card border-border";
              if (currentStep.i !== null && currentStep.j !== null && idx >= currentStep.i && idx <= currentStep.j) {
                highlightClass = "bg-blue-500/20 border-blue-500";
              }

              if (isJ && isI) {
                highlightClass += " ring-2 ring-purple-500 z-10 scale-110";
              } else if (isJ) {
                highlightClass += " ring-2 ring-blue-500 z-10 scale-110";
              } else if (isI) {
                highlightClass += " ring-2 ring-primary z-10 scale-110";
              }

              return (
                <div
                  key={idx}
                  className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 font-bold transition-all relative ${highlightClass}`}
                >
                  <div className="flex flex-col items-center text-foreground">
                    <span>{char}</span>
                  </div>
                  {(isI || isJ) && (
                    <div className="absolute -bottom-6 text-xs font-mono text-muted-foreground whitespace-nowrap">
                      {isI && isJ ? "i,j" : isJ ? "j" : "i"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <h3 className="text-lg font-semibold mb-4">Current Partition (part)</h3>
          <div className="flex gap-2 mb-6 min-h-[3rem] flex-wrap">
            {currentStep.part.length > 0 ? (
              currentStep.part.map((str, idx) => (
                <div
                  key={idx}
                  className="px-4 h-12 flex items-center justify-center text-primary-foreground font-bold rounded-lg border-2 bg-primary border-primary transition-all animate-in zoom-in"
                >
                  "{str}"
                </div>
              ))
            ) : (
              <div className="text-muted-foreground italic flex items-center h-12 px-2">
                Empty []
              </div>
            )}
          </div>

          <div className="mb-6 p-4 bg-muted/60 border rounded-lg shadow-inner">
            <p className="text-sm font-medium">{currentStep.message}</p>
          </div>

          <div className="rounded-lg mb-6">
            <VariablePanel
              variables={{
                "i (start index)": currentStep.i,
                "j (end index)": currentStep.j !== null ? currentStep.j : "null",
                "part (current partition)": `[${currentStep.part.map((p) => `"${p}"`).join(", ")}]`,
                "res.length": currentStep.res.length,
              }}
            />
          </div>

          <h3 className="text-lg font-semibold mb-4">
            Result Array (res) ({currentStep.res.length})
          </h3>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto w-full p-2 border rounded-lg bg-muted/20 min-h-[6rem]">
            {currentStep.res.map((sub, idx) => (
              <div
                key={idx}
                className="px-3 py-1 bg-green-500/10 text-green-700 dark:text-green-400 font-mono rounded border border-green-500 text-sm animate-in fade-in"
              >
                [{sub.map((s) => `"${s}"`).join(", ")}]
              </div>
            ))}
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
