import { useState, useMemo } from 'react';
import { SimpleStepControls } from '../shared/SimpleStepControls';
import { VariablePanel } from '../shared/VariablePanel';
import { AnimatedCodeEditor } from '../shared/AnimatedCodeEditor';
import { VisualizationLayout } from '../shared/VisualizationLayout';
import { Card } from '@/components/ui/card';

interface Step {
  grid: number[][];
  highlighting: {r: number, c: number}[];
  variables: Record<string, any>;
  explanation: string;
  highlightedLines: number[];
  lineExecution: string;
}

export const CoinChangeIIVisualization = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const coins = [1, 2, 5];
  const amount = 5;

  const steps = useMemo(() => {
    const s: Step[] = [];
    
    s.push({
      grid: [],
      highlighting: [],
      variables: { coins: '[1, 2, 5]', amount: 5 },
      explanation: "Starting with coins [1, 2, 5] and target amount 5.\nOur goal is to find the total number of combinations using a 2D DP table.",
      highlightedLines: [1],
      lineExecution: "function change(amount, coins) {"
    });
    
    const dp = Array.from({ length: amount + 1 }, () => Array(coins.length + 1).fill(0));
    
    s.push({
      grid: dp.map(row => [...row]),
      highlighting: [],
      variables: { coins: '[1, 2, 5]', amount: 5 },
      explanation: "Initialize a 2D DP table of size (amount + 1) x (coins.length + 1) filled with 0s.\ndp[a][i] represents ways to make amount 'a' using coins from index 'i' to the end.",
      highlightedLines: [2, 3, 4, 5],
      lineExecution: "const dp: number[][] = Array.from(..."
    });

    for (let i = 0; i <= coins.length; i++) {
      dp[0][i] = 1;
    }
    
    s.push({
      grid: dp.map(row => [...row]),
      highlighting: Array.from({ length: coins.length + 1 }, (_, i) => ({ r: 0, c: i })),
      variables: { amount: 5 },
      explanation: "Base case setup: If the target amount is 0, there is exactly 1 way to make it (by using no coins) regardless of which coins are available.",
      highlightedLines: [7],
      lineExecution: "dp[0] = Array(coins.length + 1).fill(1);"
    });

    s.push({
      grid: dp.map(row => [...row]),
      highlighting: [],
      variables: { amount: 5 },
      explanation: "Iterate through all target amounts from 1 to the given amount.",
      highlightedLines: [9],
      lineExecution: "for (let a = 1; a <= amount; a++) {"
    });

    for (let a = 1; a <= amount; a++) {
      for (let i = coins.length - 1; i >= 0; i--) {
        s.push({
          grid: dp.map(row => [...row]),
          highlighting: [],
          variables: { a, i, coin: coins[i] },
          explanation: `For amount ${a}, consider using coin ${coins[i]} (at index ${i}).`,
          highlightedLines: [10],
          lineExecution: `for (let i = coins.length - 1; i >= 0; i--) // a = ${a}, i = ${i}`
        });

        dp[a][i] = dp[a][i + 1];
        
        s.push({
          grid: dp.map(row => [...row]),
          highlighting: [{r: a, c: i}, {r: a, c: i + 1}],
          variables: { a, i, [`dp[${a}][${i}]`]: dp[a][i] },
          explanation: `Initially, the ways to make amount ${a} using coins[${i}..end] includes the ways to make it WITHOUT using the current coin ${coins[i]} (which is dp[${a}][${i + 1}]).`,
          highlightedLines: [11],
          lineExecution: `dp[a][i] = dp[a][i + 1]; // ${dp[a][i]}`
        });

        s.push({
          grid: dp.map(row => [...row]),
          highlighting: [],
          variables: { a, i, coin: coins[i] },
          explanation: `Check if we can use the current coin: is ${a} - ${coins[i]} >= 0? ${a - coins[i] >= 0 ? "Yes" : "No"}.`,
          highlightedLines: [12],
          lineExecution: `if (a - coins[i] >= 0)`
        });

        if (a - coins[i] >= 0) {
          const added = dp[a - coins[i]][i];
          dp[a][i] += added;
          s.push({
            grid: dp.map(row => [...row]),
            highlighting: [{r: a, c: i}, {r: a - coins[i], c: i}],
            variables: { a, i, coin: coins[i], added, [`dp[${a}][${i}]`]: dp[a][i] },
            explanation: `We CAN use the coin! Add the ways to make the remaining amount ${a - coins[i]} using the same available coins (dp[${a - coins[i]}][${i}] = ${added}).\ndp[${a}][${i}] becomes ${dp[a][i]}.`,
            highlightedLines: [13],
            lineExecution: `dp[a][i] += dp[a - coins[i]][i];`
          });
        }
      }
    }

    s.push({
      grid: dp.map(row => [...row]),
      highlighting: [{r: amount, c: 0}],
      variables: { amount, result: dp[amount][0] },
      explanation: `Finished processing. The total number of combinations to make amount ${amount} using all coins (coins[0..end]) is at dp[${amount}][0], which is ${dp[amount][0]}.`,
      highlightedLines: [18],
      lineExecution: "return dp[amount][0];"
    });

    return s;
  }, []);

  const code = `function change(amount: number, coins: number[]): number {
  const dp: number[][] = Array.from(
    { length: amount + 1 },
    () => Array(coins.length + 1).fill(0)
  );

  dp[0] = Array(coins.length + 1).fill(1);

  for (let a = 1; a <= amount; a++) {
    for (let i = coins.length - 1; i >= 0; i--) {
      dp[a][i] = dp[a][i + 1];
      if (a - coins[i] >= 0) {
        dp[a][i] += dp[a - coins[i]][i];
      }
    }
  }

  return dp[amount][0];
}`;

  const step = steps[currentStep];

  return (
    <VisualizationLayout
      leftContent={
        <div className="space-y-6 flex flex-col h-full">
          <div>
            <Card className="p-6 bg-card/60 backdrop-blur border-border/50 shadow-sm relative overflow-hidden">
               <div className="flex flex-col gap-4 mb-6 border-b-2 border-primary/10 pb-4">
                 <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Available Coins</h3>
                    <div className="flex gap-3">
                       {coins.map((coinValue, idx) => {
                          const isTesting = step.variables.coin === coinValue;
                          return (
                            <div key={idx} className={`relative flex items-center justify-center w-12 h-12 rounded-full border-[3px] font-black text-lg ${
                              isTesting 
                                ? 'bg-orange-500/20 border-orange-500 text-orange-500 scale-[1.15] shadow-[0_0_15px_rgba(249,115,22,0.4)] z-10' 
                                : 'bg-yellow-500/10 border-yellow-500/70 text-yellow-600 dark:text-yellow-500 opacity-70'
                            }`}>
                               <div className="absolute w-[80%] h-[80%] rounded-full border border-current opacity-30 pointer-events-none"></div>
                               {coinValue}
                            </div>
                          )
                       })}
                    </div>
                 </div>
                 <div>
                    <h3 className="text-xs font-normal text-primary/70 mb-1">Objective</h3>
                    <div className="text-sm font-normal text-primary bg-primary/10 px-4 py-2 rounded inline-block text-center shadow-sm border border-primary/10">
                        <div className="text-xs text-primary/80 mb-0.5">Target</div>
                        <div className="text-lg font-semibold">{amount}</div>
                    </div>
                 </div>
               </div>

              <h3 className="text-xs font-black uppercase tracking-widest text-primary/70 mb-3">
                 2D DP Table (Combinations Count)
              </h3>
              
              <div className="overflow-x-auto pb-4 pt-2 px-1">
                {step.grid.length > 0 ? (
                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr>
                        <th className="text-[10px] font-mono font-bold text-muted-foreground/50 p-2 border-b border-border/50">Amt / Idx</th>
                        {step.grid[0].map((_, colIdx) => (
                          <th key={colIdx} className="text-[10px] font-mono font-bold text-muted-foreground/50 p-2 border-b border-border/50">
                            i={colIdx} <br/> {colIdx < coins.length ? `(${coins[colIdx]})` : '(∅)'}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {step.grid.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                          <td className="text-[10px] font-mono font-bold text-muted-foreground/50 p-2 border-r border-border/50">
                            Amt {rowIdx}
                          </td>
                          {row.map((val, colIdx) => {
                            const isHighlighted = step.highlighting.some(h => h.r === rowIdx && h.c === colIdx);
                            const isBase = rowIdx === 0;
                            return (
                              <td key={colIdx} className="p-1.5">
                                <div className={`w-8 h-8 mx-auto rounded flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                                  isHighlighted
                                    ? 'bg-primary text-primary-foreground border-2 border-primary shadow-lg ring-2 ring-primary/30 z-10 scale-110'
                                    : isBase
                                      ? 'bg-green-500/10 border border-green-500/30 text-green-500/80'
                                      : 'bg-muted/80 text-foreground/80 border border-border'
                                }`}>
                                  {val}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-sm text-muted-foreground italic h-[52px] flex items-center justify-center">Table not initialized yet</div>
                )}
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-5 border-l-4 border-primary bg-primary/5 relative overflow-hidden shadow-sm">
              <div className="space-y-4">
                <div>
                   <h4 className="text-[10px] font-bold uppercase tracking-[0.1em] text-primary/80 mb-2">
                     Current Execution
                   </h4>
                   <div className="text-sm font-mono bg-background/80 p-2.5 rounded-lg border border-border/50 shadow-sm inline-block">
                     {step.lineExecution}
                   </div>
                </div>
                <div>
                   <h4 className="text-[10px] font-bold uppercase tracking-[0.1em] text-primary/80 mb-1">
                     Commentary
                   </h4>
                   <p className="text-[14px] font-medium leading-relaxed text-foreground/90 whitespace-pre-wrap">
                     {step.explanation}
                   </p>
                </div>
              </div>
            </Card>
          </div>
          
        </div>
      }
      rightContent={
        <div className="space-y-6 flex flex-col h-full">
           <div className="flex-1 overflow-hidden min-h-[400px]">
             <AnimatedCodeEditor
               code={code}
               language="typescript"
               highlightedLines={step.highlightedLines}
             />
           </div>
           <div className="p-1">
             <VariablePanel variables={step.variables} />
           </div>
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
