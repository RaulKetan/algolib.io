import { useState, useEffect } from 'react';
import { SimpleStepControls } from '../shared/SimpleStepControls';
import { VariablePanel } from '../shared/VariablePanel';
import { AnimatedCodeEditor } from '../shared/AnimatedCodeEditor';
import { VisualizationLayout } from '../shared/VisualizationLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface Step {
  minHeap: number[];
  k: number;
  valToAdd: number | null;
  returnedValue: number | null;
  explanation: string;
  highlightedLines: number[];
  variables: Record<string, any>;
  operation?: string;
}

export const KthLargestElementInAStreamVisualization = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<Step[]>([]);

  const kParam = 3;
  const initialNums = [4, 5, 8, 2];
  const streamAdds = [3, 5, 10, 9, 4];

  const code = `class KthLargest {
  private minHeap: number[];
  private k: number;

  constructor(k: number, nums: number[]) {
    this.k = k;
    this.minHeap = [];
    for (const num of nums) {
      this.add(num);
    }
  }

  add(val: number): number {
    this.minHeap.push(val);
    this.minHeap.sort((a, b) => a - b);
    while (this.minHeap.length > this.k) {
      this.minHeap.shift();
    }
    return this.minHeap[0];
  }
}`;

  const generateSteps = () => {
    const s: Step[] = [];
    
    let k = kParam;
    let minHeap: number[] = [];

    // Constructor setup
    s.push({
      minHeap: [...minHeap],
      k,
      valToAdd: null,
      returnedValue: null,
      explanation: `Initializing KthLargest with k = ${k} and initial stream [${initialNums.join(', ')}].`,
      highlightedLines: [5],
      variables: { k, nums: `[${initialNums.join(', ')}]` },
      operation: 'constructor'
    });

    s.push({
      minHeap: [...minHeap],
      k,
      valToAdd: null,
      returnedValue: null,
      explanation: `Set internal k to ${k} and initialize an empty minHeap array.`,
      highlightedLines: [6, 7],
      variables: { k, minHeap: `[]` },
      operation: 'constructor'
    });

    const simulateAdd = (val: number, isConstructor: boolean) => {
      s.push({
        minHeap: [...minHeap],
        k,
        valToAdd: val,
        returnedValue: null,
        explanation: isConstructor ? `Constructor calling add(${val}) for initial stream element.` : `Client calls add(${val}) to add a new score to the stream.`,
        highlightedLines: isConstructor ? [9] : [13],
        variables: { val, k },
        operation: 'add'
      });

      minHeap.push(val);
      s.push({
        minHeap: [...minHeap],
        k,
        valToAdd: val,
        returnedValue: null,
        explanation: `Push ${val} to the end of the minHeap array.`,
        highlightedLines: [14],
        variables: { val, minHeapLength: minHeap.length },
        operation: 'add'
      });

      minHeap.sort((a, b) => a - b);
      s.push({
        minHeap: [...minHeap],
        k,
        valToAdd: val,
        returnedValue: null,
        explanation: `Sort the minHeap array in ascending order to maintain heap properties (smallest at index 0).`,
        highlightedLines: [15],
        variables: { val, minHeapLength: minHeap.length },
        operation: 'add'
      });

      s.push({
        minHeap: [...minHeap],
        k,
        valToAdd: val,
        returnedValue: null,
        explanation: `Check if minHeap size (${minHeap.length}) > k (${k}).`,
        highlightedLines: [16],
        variables: { minHeapLength: minHeap.length, k },
        operation: 'add'
      });

      while (minHeap.length > k) {
        const removed = minHeap.shift();
        s.push({
          minHeap: [...minHeap],
          k,
          valToAdd: val,
          returnedValue: null,
          explanation: `Size exceeds k. Shift out the smallest element (${removed}) from the front.`,
          highlightedLines: [17],
          variables: { removedValue: removed, minHeapLength: minHeap.length },
          operation: 'add'
        });

        s.push({
          minHeap: [...minHeap],
          k,
          valToAdd: val,
          returnedValue: null,
          explanation: `Check if minHeap size (${minHeap.length}) > k (${k}).`,
          highlightedLines: [16],
          variables: { minHeapLength: minHeap.length, k },
          operation: 'add'
        });
      }

      const result = minHeap[0];
      s.push({
        minHeap: [...minHeap],
        k,
        valToAdd: val,
        returnedValue: result,
        explanation: `Return the smallest element in our size-k array, which is at index 0: ${result}. This is the kth largest element overall!`,
        highlightedLines: [19],
        variables: { returnedResult: result },
        operation: 'add'
      });
    };

    // Iterate through initialNums
    for (const num of initialNums) {
      s.push({
        minHeap: [...minHeap],
        k,
        valToAdd: null,
        returnedValue: null,
        explanation: `Looping through initial stream numbers. Current num is ${num}.`,
        highlightedLines: [8],
        variables: { num },
        operation: 'constructor'
      });
      simulateAdd(num, true);
    }

    s.push({
      minHeap: [...minHeap],
      k,
      valToAdd: null,
      returnedValue: null,
      explanation: `Constructor finishes. The minHeap is now fully initialized with the first ${initialNums.length} elements.`,
      highlightedLines: [11],
      variables: { },
      operation: 'constructor'
    });

    // Iterate through streamAdds
    for (const num of streamAdds) {
      simulateAdd(num, false);
    }

    setSteps(s);
  };

  useEffect(() => {
    generateSteps();
  }, []);

  if (steps.length === 0) return null;
  const step = steps[currentStep];

  return (
    <VisualizationLayout
      leftContent={
        <div className="space-y-6">
          <SimpleStepControls
            currentStep={currentStep}
            totalSteps={steps.length}
            onStepChange={setCurrentStep}
          />
          
          <Card className="p-4 bg-primary/5 border-primary/20">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Algorithm Logic</h4>
            <p className="text-sm text-foreground leading-relaxed font-medium">{step.explanation}</p>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">minHeap Array (Size: {step.minHeap.length} / k: {step.k})</h3>
              {step.operation === 'add' && step.valToAdd !== null && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase">Incoming:</span>
                  <span className="w-8 h-8 rounded-lg bg-accent/20 text-accent font-bold flex items-center justify-center border border-accent/40">{step.valToAdd}</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap items-end gap-3 min-h-[100px] mb-8">
              <AnimatePresence mode="popLayout">
                {step.minHeap.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-muted-foreground text-sm italic w-full text-center py-4"
                  >
                    Array is empty
                  </motion.div>
                )}
                {step.minHeap.map((val, idx) => {
                  const isKthLargest = idx === 0 && step.minHeap.length > 0;
                  const isNewlyAdded = step.operation === 'add' && val === step.valToAdd && step.highlightedLines.includes(14); // Pushed
                  
                  return (
                    <motion.div
                      key={`${idx}-${val}-${currentStep}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        borderColor: isNewlyAdded ? 'var(--accent)' : isKthLargest ? 'var(--primary)' : 'var(--border)'
                      }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center border-2 shadow-sm relative ${isKthLargest ? 'bg-primary/20' : 'bg-card'}`}
                    >
                      <span className={`text-lg font-bold ${isKthLargest ? 'text-primary' : 'text-foreground'}`}>{val}</span>
                      
                      {isKthLargest && (
                        <div className="absolute -bottom-6 flex flex-col items-center whitespace-nowrap">
                          <span className="text-[8px] font-bold text-primary">kth largest</span>
                        </div>
                      )}
                      {!isKthLargest && (
                        <div className="absolute -bottom-4 flex flex-col items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30"></span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            
            {step.returnedValue !== null && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-between"
              >
                <span className="text-sm font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">Result Returned:</span>
                <span className="text-2xl font-black text-green-600 dark:text-green-400">{step.returnedValue}</span>
              </motion.div>
            )}
          </Card>

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
    />
  );
};
