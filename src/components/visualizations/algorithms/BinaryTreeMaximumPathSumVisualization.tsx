import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { SimpleStepControls } from '../shared/SimpleStepControls';
import { VariablePanel } from '../shared/VariablePanel';
import { AnimatedCodeEditor } from '../shared/AnimatedCodeEditor';
import { VisualizationLayout } from '../shared/VisualizationLayout';
import { TreeDeciduous, Activity, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  id: number;
}

interface Step {
  activeNodeId: number | null;
  maxPathFound: number;
  leftMax: number | string;
  rightMax: number | string;
  returnValue: number | string;
  explanation: string;
  highlightedLines: number[];
  completedNodes: number[];
}

export const BinaryTreeMaximumPathSumVisualization: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const code = `function maxPathSum(root: TreeNode | null): number {
  let res = -Infinity;

  function dfs(node: TreeNode | null): number {
    if (!node) return 0;

    let leftMax = Math.max(dfs(node.left), 0);
    let rightMax = Math.max(dfs(node.right), 0);

    res = Math.max(res, node.val + leftMax + rightMax);

    return node.val + Math.max(leftMax, rightMax);
  }

  dfs(root);
  return res;
}`;

  const tree: TreeNode = {
    val: -10,
    id: 0,
    left: { val: 9, id: 1, left: null, right: null },
    right: {
      val: 20,
      id: 2,
      left: { val: 15, id: 3, left: null, right: null },
      right: { val: 7, id: 4, left: null, right: null },
    },
  };

  const steps = useMemo(() => {
    const s: Step[] = [];
    let res = -Infinity;
    const completed: number[] = [];

    function addStep(node: TreeNode | null, left: any, right: any, ret: any, msg: string, lines: number[]) {
      s.push({
        activeNodeId: node ? node.id : null,
        maxPathFound: res,
        leftMax: left ?? '-',
        rightMax: right ?? '-',
        returnValue: ret ?? '-',
        explanation: msg,
        highlightedLines: lines,
        completedNodes: [...completed]
      });
    }

    addStep(null, null, null, null, "Initialize global maximum res = -Infinity.", [2]);

    function dfs(node: TreeNode | null): number {
      if (!node) {
        addStep(null, null, null, 0, "Base case: node is null, return 0.", [5]);
        return 0;
      }

      addStep(node, null, null, null, `Visiting node ${node.val}. Calculating max path through children.`, [4, 7, 8]);
      
      const left = Math.max(dfs(node.left), 0);
      addStep(node, left, null, null, `Left child of ${node.val} processed. Max path from left: ${left}.`, [7]);

      const right = Math.max(dfs(node.right), 0);
      addStep(node, left, right, null, `Right child of ${node.val} processed. Max path from right: ${right}.`, [8]);

      const oldRes = res;
      const currentPathSum = node.val + left + right;
      res = Math.max(res, currentPathSum);

      addStep(node, left, right, null, 
        currentPathSum > oldRes 
          ? `Found new max path sum! max(${oldRes === -Infinity ? '-∞' : oldRes}, ${node.val} + ${left} + ${right}) = ${res}.`
          : `Global max remains ${res}. (Current path sum: ${currentPathSum}).`, 
        [10]
      );

      const ret = node.val + Math.max(left, right);
      addStep(node, left, right, ret, `Returning ${ret} as the max path that can be extended to this node's parent.`, [12]);
      
      completed.push(node.id);
      return ret;
    }

    dfs(tree);
    addStep(null, null, null, res, `DFS complete. Final maximum path sum is ${res}.`, [16]);

    return s;
  }, []);

  const step = steps[currentStep];

  const renderTree = () => {
    const positions: Record<number, { x: number, y: number }> = {
      0: { x: 200, y: 40 },
      1: { x: 100, y: 120 },
      2: { x: 300, y: 120 },
      3: { x: 250, y: 200 },
      4: { x: 350, y: 200 }
    };

    const edges = [[0, 1], [0, 2], [2, 3], [2, 4]];
    const nodeIds = Object.keys(positions).map(Number);
    const nodeMap: Record<number, number> = { 0: -10, 1: 9, 2: 20, 3: 15, 4: 7 };

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
          {nodeIds.map(id => {
            const isCurrent = id === step.activeNodeId;
            const isDone = step.completedNodes.includes(id);
            
            return (
              <g key={id}>
                <motion.circle
                  cx={positions[id].x} cy={positions[id].y} r="18"
                  animate={{
                    fill: isCurrent ? '#3b82f6' : isDone ? '#10b98120' : 'hsl(var(--card))',
                    stroke: isCurrent ? '#3b82f6' : isDone ? '#10b981' : 'hsl(var(--border))',
                    scale: isCurrent ? 1.2 : 1
                  }}
                  transition={{ duration: 0 }}
                  strokeWidth="2"
                />
                <text 
                  x={positions[id].x} y={positions[id].y + 4} textAnchor="middle" 
                  className={`text-[10px] font-bold select-none ${isCurrent ? 'fill-white' : 'fill-foreground'}`}
                >
                  {nodeMap[id]}
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
              Maximum Path Sum Analysis
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
                  <Activity size={12} />
                  DFS Context
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-muted-foreground">Left Max:</span>
                    <span className="font-mono font-bold text-primary">{step.leftMax}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-muted-foreground">Right Max:</span>
                    <span className="font-mono font-bold text-primary">{step.rightMax}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] pt-2 border-t border-border/50">
                    <span className="text-muted-foreground font-bold">Return:</span>
                    <span className="font-mono font-bold text-green-600">{step.returnValue}</span>
                  </div>
                </div>
             </Card>
          </div>

          <Card className="p-4 bg-primary/5 border-primary/20 shadow-inner">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target size={14} className="text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Global Maximum (res)</span>
                </div>
                <span className="text-xl font-black text-primary">
                  {step.maxPathFound === -Infinity ? '-∞' : step.maxPathFound}
                </span>
             </div>
          </Card>

          <VariablePanel
            variables={step.activeNodeId !== null ? {
              "activeNode": tree.id === step.activeNodeId ? tree.val : "...", // simplified
              "leftMax": step.leftMax,
              "rightMax": step.rightMax,
              "currentRes": step.maxPathFound
            } : { "res": step.maxPathFound }}
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