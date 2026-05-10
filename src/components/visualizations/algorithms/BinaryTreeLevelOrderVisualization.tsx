import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { SimpleStepControls } from '../shared/SimpleStepControls';
import { VariablePanel } from '../shared/VariablePanel';
import { AnimatedCodeEditor } from '../shared/AnimatedCodeEditor';
import { VisualizationLayout } from '../shared/VisualizationLayout';
import { TreeDeciduous, Inbox, ListChecks } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  queue: number[];
  result: number[][];
  currentLevel: number[];
  levelSize: number;
  i: number | string;
  currentNode: number | string;
  explanation: string;
  highlightedLines: number[];
}

export const BinaryTreeLevelOrderVisualization: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const code = `function levelOrder(root: TreeNode | null): number[][] {
  if (root === null) return [];
  const result: number[][] = [];
  const queue: TreeNode[] = [root];
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentLevel);
  }
  return result;
}`;

  const treeData = {
    val: 3,
    left: { val: 9, left: null, right: null },
    right: {
      val: 20,
      left: { val: 15, left: null, right: null },
      right: { val: 7, left: null, right: null }
    }
  };

  const steps = useMemo(() => {
    const stepsList: Step[] = [];
    const root = treeData;
    
    if (!root) {
        stepsList.push({
          queue: [], result: [], currentLevel: [], levelSize: 0, i: '-', currentNode: '-',
          explanation: "Root is null, return empty array.",
          highlightedLines: [2]
        });
        return stepsList;
    }

    const result: number[][] = [];
    const queue: any[] = [root];

    stepsList.push({
      queue: [root.val], result: [], currentLevel: [], levelSize: 0, i: '-', currentNode: '-',
      explanation: "Initialize an empty result array and a queue with the root node.",
      highlightedLines: [3, 4]
    });

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel: number[] = [];

        stepsList.push({
          queue: queue.map(q => q.val), result: result.map(r => [...r]), currentLevel: [], levelSize, i: '-', currentNode: '-',
          explanation: `Enter loop. Current queue has ${levelSize} nodes for the current level.`,
          highlightedLines: [5, 6, 7]
        });

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;

            stepsList.push({
              queue: queue.map(q => q.val), result: result.map(r => [...r]), currentLevel: [...currentLevel], levelSize, i, currentNode: node.val,
              explanation: `Dequeue node ${node.val} (i=${i}).`,
              highlightedLines: [8, 9]
            });

            currentLevel.push(node.val);

            stepsList.push({
              queue: queue.map(q => q.val), result: result.map(r => [...r]), currentLevel: [...currentLevel], levelSize, i, currentNode: node.val,
              explanation: `Add ${node.val} to the current level list.`,
              highlightedLines: [10]
            });

            if (node.left) {
                queue.push(node.left);
                stepsList.push({
                  queue: queue.map(q => q.val), result: result.map(r => [...r]), currentLevel: [...currentLevel], levelSize, i, currentNode: node.val,
                  explanation: `Left child ${node.left.val} exists, add to queue.`,
                  highlightedLines: [11]
                });
            }

            if (node.right) {
                queue.push(node.right);
                stepsList.push({
                  queue: queue.map(q => q.val), result: result.map(r => [...r]), currentLevel: [...currentLevel], levelSize, i, currentNode: node.val,
                  explanation: `Right child ${node.right.val} exists, add to queue.`,
                  highlightedLines: [12]
                });
            }
        }
        result.push([...currentLevel]);
        stepsList.push({
          queue: queue.map(q => q.val), result: result.map(r => [...r]), currentLevel: [...currentLevel], levelSize, i: '-', currentNode: '-',
          explanation: `Finished level. Push [${currentLevel.join(', ')}] to the result array.`,
          highlightedLines: [14]
        });
    }

    stepsList.push({
      queue: [], result: result.map(r => [...r]), currentLevel: [], levelSize: 0, i: '-', currentNode: '-',
      explanation: "Queue is empty. Return the final level-order traversal.",
      highlightedLines: [16]
    });

    return stepsList;
  }, []);

  const step = steps[currentStep];

  const renderTree = () => {
    const positions: Record<number, { x: number, y: number }> = {
      3: { x: 200, y: 40 },
      9: { x: 100, y: 120 },
      20: { x: 300, y: 120 },
      15: { x: 250, y: 200 },
      7: { x: 350, y: 200 }
    };

    const edges = [[3, 9], [3, 20], [20, 15], [20, 7]];
    const nodeVals = Object.keys(positions).map(Number);

    return (
      <div className="w-full aspect-[400/240] relative">
        <svg viewBox="0 0 400 240" className="w-full h-full">
          {edges.map(([u, v], i) => (
            <line 
              key={i} 
              x1={positions[u].x} y1={positions[u].y} 
              x2={positions[v].x} y2={positions[v].y} 
              stroke="currentColor" className="text-border" strokeWidth="2" 
            />
          ))}
          {nodeVals.map(val => {
            const isCurrent = val === step.currentNode;
            const inQueue = step.queue.includes(val);
            const isVisited = step.result.flat().includes(val) || step.currentLevel.includes(val);
            
            return (
              <g key={val}>
                <motion.circle
                  cx={positions[val].x} cy={positions[val].y} r="18"
                  animate={{
                    fill: isCurrent ? '#3b82f6' : isVisited ? '#10b98120' : inQueue ? '#3b82f620' : 'hsl(var(--card))',
                    stroke: isCurrent ? '#3b82f6' : isVisited ? '#10b981' : inQueue ? '#3b82f6' : 'hsl(var(--border))',
                    scale: isCurrent ? 1.2 : 1
                  }}
                  transition={{ duration: 0 }}
                  strokeWidth="2"
                />
                <text 
                  x={positions[val].x} y={positions[val].y + 4} textAnchor="middle" 
                  className={`text-[11px] font-bold select-none ${isCurrent ? 'fill-white' : 'fill-foreground'}`}
                >
                  {val}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <VisualizationLayout
      controls={
        <SimpleStepControls
          currentStep={currentStep}
          totalSteps={steps.length}
          onStepChange={setCurrentStep}
        />
      }
      leftContent={
        <div className="space-y-6 flex flex-col h-full">
          <div>
            <h2 className="text-sm font-bold text-foreground mb-4 opacity-90 flex items-center gap-2">
              <TreeDeciduous size={16} className="text-primary" />
              Level Order Traversal
            </h2>
            <Card className="p-8 bg-card/60 backdrop-blur border-border/50 shadow-sm overflow-hidden flex justify-center items-center">
              {renderTree()}
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Card className="p-4 bg-primary/5 border-l-4 border-primary shadow-sm h-full flex flex-col justify-center">
               <h4 className="text-[9px] font-bold uppercase tracking-widest text-primary/80 mb-2">Commentary</h4>
               <p className="text-[13px] font-medium leading-relaxed text-foreground/90">
                 {step.explanation}
               </p>
             </Card>
             
             <Card className="p-4 bg-muted/30 border-muted">
                <h4 className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <Inbox size={12} />
                  Queue Status
                </h4>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence mode="popLayout">
                    {step.queue.map((q, idx) => (
                      <motion.div 
                        key={`${q}-${idx}`}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0 }}
                        className="p-2 bg-background rounded border border-border shadow-sm min-w-[35px] text-center"
                      >
                        <span className="text-[12px] font-bold text-primary">{q}</span>
                      </motion.div>
                    ))}
                    {step.queue.length === 0 && (
                      <span className="text-xs text-muted-foreground italic">Empty</span>
                    )}
                  </AnimatePresence>
                </div>
             </Card>
          </div>

          <Card className="p-4 bg-muted/30 border-muted">
             <h4 className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
               <ListChecks size={12} />
               Result (Levels)
             </h4>
             <div className="space-y-2">
               {step.result.map((level, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 5 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="flex items-center gap-2"
                 >
                   <span className="text-[10px] font-bold text-muted-foreground w-12">Level {idx}:</span>
                   <div className="flex gap-1">
                     {level.map((v, i) => (
                       <span key={i} className="px-2 py-1 bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20 rounded text-[11px] font-bold">
                         {v}
                       </span>
                     ))}
                   </div>
                 </motion.div>
               ))}
               {step.result.length === 0 && <span className="text-xs text-muted-foreground italic">No levels processed yet</span>}
             </div>
          </Card>

          <VariablePanel
            variables={{
              levelSize: step.levelSize,
              "i": step.i,
              currentNode: step.currentNode,
              "currentLevel": JSON.stringify(step.currentLevel)
            }}
          />
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