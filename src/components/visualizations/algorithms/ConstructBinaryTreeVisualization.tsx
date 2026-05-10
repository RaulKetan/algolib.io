import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { SimpleStepControls } from '../shared/SimpleStepControls';
import { VariablePanel } from '../shared/VariablePanel';
import { AnimatedCodeEditor } from '../shared/AnimatedCodeEditor';
import { VisualizationLayout } from '../shared/VisualizationLayout';
import { TreeDeciduous, Braces, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  id: string;
}

interface Step {
  message: string;
  highlightedLines: number[];
  variables: Record<string, any>;
  builtNodes: string[];
  currentNodeId: string | null;
  preorder: number[];
  inorder: number[];
}

export const ConstructBinaryTreeVisualization: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const code = `function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  if (!preorder.length || !inorder.length) return null;

  const rootVal = preorder[0];
  const root = new TreeNode(rootVal);
  const mid = inorder.indexOf(rootVal);

  root.left = buildTree(
    preorder.slice(1, mid + 1), 
    inorder.slice(0, mid)
  );
  root.right = buildTree(
    preorder.slice(mid + 1), 
    inorder.slice(mid + 1)
  );

  return root;
}`;

  const steps = useMemo(() => {
    const preorder = [3, 9, 20, 15, 7];
    const inorder = [9, 3, 15, 20, 7];
    const generatedSteps: Step[] = [];
    const builtNodes: string[] = [];
    let idCounter = 0;

    function build(pre: number[], ino: number[]): TreeNode | null {
      const preStr = `[${pre.join(',')}]`;
      const inoStr = `[${ino.join(',')}]`;

      generatedSteps.push({
        message: `Calling buildTree with preorder=${preStr} and inorder=${inoStr}`,
        highlightedLines: [1],
        variables: { preorder: preStr, inorder: inoStr },
        builtNodes: [...builtNodes],
        currentNodeId: null,
        preorder: [...pre],
        inorder: [...ino]
      });

      if (!pre.length || !ino.length) {
        generatedSteps.push({
          message: "Empty input detected. Returning null for this branch.",
          highlightedLines: [2],
          variables: { 'pre.length': pre.length, 'ino.length': ino.length },
          builtNodes: [...builtNodes],
          currentNodeId: null,
          preorder: [...pre],
          inorder: [...ino]
        });
        return null;
      }

      const rootVal = pre[0];
      const nodeId = `node-${idCounter++}`;

      generatedSteps.push({
        message: `Root value is preorder[0] = ${rootVal}.`,
        highlightedLines: [4],
        variables: { rootVal },
        builtNodes: [...builtNodes],
        currentNodeId: nodeId,
        preorder: [...pre],
        inorder: [...ino]
      });

      const root: TreeNode = { val: rootVal, left: null, right: null, id: nodeId };
      builtNodes.push(nodeId);

      generatedSteps.push({
        message: `Created TreeNode(${rootVal}).`,
        highlightedLines: [5],
        variables: { rootVal, node: `TreeNode(${rootVal})` },
        builtNodes: [...builtNodes],
        currentNodeId: nodeId,
        preorder: [...pre],
        inorder: [...ino]
      });

      const mid = ino.indexOf(rootVal);
      generatedSteps.push({
        message: `Found ${rootVal} at index ${mid} in inorder array. This partitions left and right subtrees.`,
        highlightedLines: [6],
        variables: { rootVal, mid, inorder: inoStr },
        builtNodes: [...builtNodes],
        currentNodeId: nodeId,
        preorder: [...pre],
        inorder: [...ino]
      });

      generatedSteps.push({
        message: `Recursively constructing left subtree...`,
        highlightedLines: [8, 9, 10, 11],
        variables: {
          'leftPre': `[${pre.slice(1, mid + 1).join(',')}]`,
          'leftIno': `[${ino.slice(0, mid).join(',')}]`
        },
        builtNodes: [...builtNodes],
        currentNodeId: nodeId,
        preorder: [...pre],
        inorder: [...ino]
      });

      root.left = build(pre.slice(1, mid + 1), ino.slice(0, mid));

      generatedSteps.push({
        message: `Left subtree for node ${rootVal} complete. Now constructing right subtree...`,
        highlightedLines: [12, 13, 14, 15],
        variables: {
          'rightPre': `[${pre.slice(mid + 1).join(',')}]`,
          'rightIno': `[${ino.slice(mid + 1).join(',')}]`
        },
        builtNodes: [...builtNodes],
        currentNodeId: nodeId,
        preorder: [...pre],
        inorder: [...ino]
      });

      root.right = build(pre.slice(mid + 1), ino.slice(mid + 1));

      generatedSteps.push({
        message: `Successfully constructed tree rooted at ${rootVal}. Returning node.`,
        highlightedLines: [17],
        variables: { rootVal, 'root.left': root.left?.val ?? 'null', 'root.right': root.right?.val ?? 'null' },
        builtNodes: [...builtNodes],
        currentNodeId: nodeId,
        preorder: [...pre],
        inorder: [...ino]
      });

      return root;
    }

    build(preorder, inorder);
    return generatedSteps;
  }, []);

  const step = steps[currentStep];

  const renderTree = () => {
    // Static positions for the known final structure for demo purposes
    const positions: Record<string, { x: number, y: number, val: number }> = {
      'node-0': { x: 200, y: 40, val: 3 },
      'node-1': { x: 100, y: 120, val: 9 },
      'node-2': { x: 300, y: 120, val: 20 },
      'node-3': { x: 250, y: 200, val: 15 },
      'node-4': { x: 350, y: 200, val: 7 }
    };

    const edges = [['node-0', 'node-1'], ['node-0', 'node-2'], ['node-2', 'node-3'], ['node-2', 'node-4']];

    return (
      <div className="w-full aspect-[400/240] relative">
        <svg viewBox="0 0 400 240" className="w-full h-full">
          {edges.map(([u, v], i) => {
             const uBuilt = step.builtNodes.includes(u);
             const vBuilt = step.builtNodes.includes(v);
             return (
               <line 
                 key={i} 
                 x1={positions[u].x} y1={positions[u].y} 
                 x2={positions[v].x} y2={positions[v].y} 
                 stroke="currentColor" 
                 className={`transition-all duration-0 ${uBuilt && vBuilt ? 'text-primary' : 'text-border opacity-20'}`} 
                 strokeWidth="2" 
               />
             );
          })}
          {Object.entries(positions).map(([id, pos]) => {
            const isCurrent = id === step.currentNodeId;
            const isBuilt = step.builtNodes.includes(id);
            
            return (
              <g key={id}>
                <motion.circle
                  cx={pos.x} cy={pos.y} r="18"
                  animate={{
                    fill: isCurrent ? '#3b82f6' : isBuilt ? '#3b82f620' : 'hsl(var(--card))',
                    stroke: isCurrent ? '#3b82f6' : isBuilt ? '#3b82f6' : 'hsl(var(--border))',
                    opacity: isBuilt || isCurrent ? 1 : 0.2,
                    scale: isCurrent ? 1.2 : 1
                  }}
                  transition={{ duration: 0 }}
                  strokeWidth="2"
                />
                <text 
                  x={pos.x} y={pos.y + 4} textAnchor="middle" 
                  className={`text-[10px] font-bold select-none ${isCurrent ? 'fill-white' : (isBuilt ? 'fill-foreground' : 'fill-muted-foreground opacity-20')}`}
                >
                  {pos.val}
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
              Construction Workspace
            </h2>
            <Card className="p-8 bg-card/60 backdrop-blur border-border/50 shadow-sm overflow-hidden flex justify-center items-center">
              {renderTree()}
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Card className="p-4 bg-primary/5 border-l-4 border-primary shadow-sm h-full flex flex-col justify-center">
               <h4 className="text-[9px] font-bold uppercase tracking-widest text-primary/80 mb-2">Commentary</h4>
               <p className="text-[13px] font-medium leading-relaxed text-foreground/90">
                 {step.message}
               </p>
             </Card>
             
             <Card className="p-4 bg-muted/30 border-muted">
                <h4 className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <Braces size={12} />
                  Input Data
                </h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold text-muted-foreground uppercase">Preorder</span>
                    <div className="flex gap-1">
                      {step.preorder.map((v, i) => (
                        <span key={i} className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${i === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                          {v}
                        </span>
                      ))}
                      {step.preorder.length === 0 && <span className="text-[10px] italic text-muted-foreground">[]</span>}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold text-muted-foreground uppercase">Inorder</span>
                    <div className="flex gap-1">
                      {step.inorder.map((v, i) => (
                        <span key={i} className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${v === step.preorder[0] ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                          {v}
                        </span>
                      ))}
                      {step.inorder.length === 0 && <span className="text-[10px] italic text-muted-foreground">[]</span>}
                    </div>
                  </div>
                </div>
             </Card>
          </div>

          <VariablePanel variables={step.variables} />
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
