import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { SimpleStepControls } from '../shared/SimpleStepControls';
import { VariablePanel } from '../shared/VariablePanel';
import { AnimatedCodeEditor } from '../shared/AnimatedCodeEditor';
import { VisualizationLayout } from '../shared/VisualizationLayout';
import { User } from 'lucide-react';

interface Step {
  nums: number[];
  i: number | null;
  currentEnd: number;
  farthest: number;
  jumps: number;
  variables: Record<string, any>;
  explanation: string;
  highlightedLines: number[];
}

export const JumpGameIIVisualization: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [caseType, setCaseType] = useState<'case1' | 'case2'>('case1');

  const nums = useMemo(() => 
    caseType === 'case1' ? [2, 3, 1, 1, 4] : [2, 1, 1, 1, 4], 
  [caseType]);

  const code = `function jump(nums: number[]): number {
  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
    }
  }
  return jumps;
}`;

  const steps = useMemo(() => {
    const stepsList: Step[] = [];
    const n = nums.length;
    let jumps = 0;
    let currentEnd = 0;
    let farthest = 0;

    stepsList.push({
      nums,
      i: null,
      currentEnd,
      farthest,
      jumps,
      variables: { jumps, currentEnd, farthest, "nums.length": n },
      explanation: `Initialize variables. We start at index 0. 'jumps' tracks total jumps made. 'currentEnd' tracks the maximum reachable index with the current number of jumps. 'farthest' tracks the maximum reachable index we have discovered so far.`,
      highlightedLines: [2, 3, 4]
    });

    for (let i = 0; i < n - 1; i++) {
      stepsList.push({
        nums,
        i,
        currentEnd,
        farthest,
        jumps,
        variables: { i, "nums[i]": nums[i], jumps, currentEnd, farthest },
        explanation: `Iterating through the array. We are currently at index ${i}.`,
        highlightedLines: [5]
      });

      const nextFarthest = Math.max(farthest, i + nums[i]);
      const updatedFarthest = nextFarthest > farthest;
      farthest = nextFarthest;

      stepsList.push({
        nums,
        i,
        currentEnd,
        farthest,
        jumps,
        variables: { i, "nums[i]": nums[i], jumps, currentEnd, farthest },
        explanation: `From index ${i}, we can reach up to index ${i} + ${nums[i]} = ${i + nums[i]}.` + (updatedFarthest ? ` We update 'farthest' to ${farthest} because it's further than our previous known farthest reach.` : ` 'farthest' remains ${farthest} as this doesn't extend our maximum reach.`),
        highlightedLines: [6]
      });

      stepsList.push({
        nums,
        i,
        currentEnd,
        farthest,
        jumps,
        variables: { i, jumps, currentEnd, farthest, "i === currentEnd": i === currentEnd },
        explanation: `Check if we have reached 'currentEnd' (${currentEnd}). 'currentEnd' is the boundary of our current jump window.`,
        highlightedLines: [7]
      });

      if (i === currentEnd) {
        jumps++;
        currentEnd = farthest;
        stepsList.push({
          nums,
          i,
          currentEnd,
          farthest,
          jumps,
          variables: { i, jumps, currentEnd, farthest },
          explanation: `We reached the end of our current jump window (index ${i}). We must take a jump here to continue. We increment 'jumps' to ${jumps} and update our 'currentEnd' boundary to our 'farthest' known reach (${currentEnd}).`,
          highlightedLines: [8, 9]
        });
      }
    }

    stepsList.push({
      nums,
      i: nums.length - 1, // Show the final position
      currentEnd,
      farthest,
      jumps,
      variables: { jumps },
      explanation: `We have processed up to the second-to-last element. We are guaranteed to reach the end. The minimum number of jumps required is ${jumps}.`,
      highlightedLines: [12]
    });

    return stepsList;
  }, [nums]);

  const handleCaseToggle = (type: 'case1' | 'case2') => {
    setCaseType(type);
    setCurrentStep(0);
  };

  const step = steps[currentStep];

  return (
    <VisualizationLayout
      leftContent={
        <div className="space-y-4 flex flex-col h-full">
          <div className="flex gap-2 mb-2">
            <button 
              onClick={() => handleCaseToggle('case1')}
              className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${
                caseType === 'case1' ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Case: [2,3,1,1,4]
            </button>
            <button 
              onClick={() => handleCaseToggle('case2')}
              className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${
                caseType === 'case2' ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Case: [2,1,1,1,4]
            </button>
          </div>

          <div>
            <h2 className="text-sm font-bold text-foreground mb-3 opacity-90">
              Jump Game II Array State
            </h2>
            <Card className="p-8 bg-card/60 backdrop-blur border-border/50 shadow-sm overflow-hidden relative">
              <div className="mb-8 mt-12 relative">
                
                {/* Connection lines for reachability */}
                {step.i !== null && step.farthest > step.i && (
                  <div className="absolute top-[-30px] left-0 w-full h-[30px] overflow-hidden opacity-30 pointer-events-none">
                     <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                       <path 
                         d={`M ${(step.i * 56) + 28} 30 Q ${((step.i + step.farthest) / 2) * 56 + 28} -10 ${(Math.min(step.farthest, nums.length - 1) * 56) + 28} 30`}
                         fill="none" 
                         stroke="currentColor" 
                         strokeWidth="2" 
                         strokeDasharray="4 4" 
                         className="text-green-500"
                       />
                     </svg>
                  </div>
                )}

                <div className="flex gap-4 justify-center items-end relative">
                  {nums.map((num, idx) => {
                    const isCurrent = idx === step.i;
                    const inCurrentWindow = idx <= step.currentEnd && idx >= (step.i !== null ? step.i : 0);
                    const isFarthest = idx === step.farthest;
                    
                    return (
                      <div key={idx} className="flex flex-col items-center gap-1 group relative w-10">
                        {/* Jumping Person Icon */}
                        <div 
                          className={`absolute -top-10 transition-all duration-300 ease-in-out ${
                            isCurrent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                          }`}
                        >
                          <div className="bg-orange-500 text-white p-1.5 rounded-full shadow-lg shadow-orange-500/30 animate-bounce">
                            <User size={16} strokeWidth={2.5} />
                          </div>
                        </div>

                        <div 
                          className={`w-10 h-10 flex items-center justify-center rounded border-2 font-black transition-colors duration-0 ${
                            isCurrent ? "border-orange-500 bg-orange-100 text-black shadow-md z-10" :
                            inCurrentWindow ? "border-blue-300 bg-blue-50 text-blue-900" :
                            "border-gray-200 bg-white text-black"
                          }`}
                        >
                          <span className="text-sm">{num}</span>
                        </div>
                        <div className="h-6 flex flex-col items-center justify-start mt-1 gap-0.5">
                          {isCurrent && <div className="text-[9px] font-black text-orange-700 bg-orange-200 px-1.5 rounded-sm uppercase tracking-tighter shadow-sm">i</div>}
                          {isFarthest && <div className="text-[9px] font-black text-green-700 bg-green-200 px-1.5 rounded-sm uppercase tracking-tighter shadow-sm">Farthest</div>}
                          {!isFarthest && idx === step.currentEnd && <div className="text-[9px] font-black text-purple-700 bg-purple-200 px-1.5 rounded-sm uppercase tracking-tighter shadow-sm">End</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-2 space-y-4">
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
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col">
           <Card className="flex-1 overflow-hidden flex flex-col shadow-sm border-border/50">
             <AnimatedCodeEditor
               code={code}
               language="typescript"
               highlightedLines={step.highlightedLines}
             />
           </Card>
        </div>
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
