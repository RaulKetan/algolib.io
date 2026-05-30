import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { SimpleStepControls } from '../shared/SimpleStepControls';
import { VariablePanel } from '../shared/VariablePanel';
import { AnimatedCodeEditor } from '../shared/AnimatedCodeEditor';
import { VisualizationLayout } from '../shared/VisualizationLayout';

interface Step {
  prices: number[];
  buy: number[];
  sell: number[];
  cooldown: number[];
  i: number;
  variables: Record<string, any>;
  explanation: string;
  lineExecution: string;
  highlightedLines: number[];
}

export const BestTimeToBuyAndSellStockWithCooldownVisualization: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const prices = [1, 2, 3, 0, 2];
  
  const code = `function maxProfit(prices: number[]): number {
    if (!prices || prices.length <= 1) {
        return 0;
    }
    const n = prices.length;
    const buy = new Array(n).fill(0);
    const sell = new Array(n).fill(0);
    const cooldown = new Array(n).fill(0);
    buy[0] = -prices[0];
    cooldown[0] = 0;
    sell[0] = 0;
    for (let i = 1; i < n; i++) {
        buy[i] = Math.max(cooldown[i - 1] - prices[i], buy[i - 1]);
        sell[i] = buy[i - 1] + prices[i];
        cooldown[i] = Math.max(cooldown[i - 1], sell[i - 1]);
    }
    return Math.max(sell[n - 1], cooldown[n - 1]);
}`;

  const steps = useMemo(() => {
    const stepsList: Step[] = [];
    const n = prices.length;
    let buy = new Array(n).fill(0);
    let sell = new Array(n).fill(0);
    let cooldown = new Array(n).fill(0);

    stepsList.push({
      prices,
      buy: [...buy],
      sell: [...sell],
      cooldown: [...cooldown],
      i: -1,
      variables: { prices: `[${prices.join(', ')}]` },
      explanation: "Function started. Input prices array received.",
      lineExecution: "function maxProfit(prices: number[]): number {",
      highlightedLines: [1]
    });

    stepsList.push({
      prices,
      buy: [...buy],
      sell: [...sell],
      cooldown: [...cooldown],
      i: -1,
      variables: { prices: `[${prices.join(', ')}]` },
      explanation: `Check if prices array is empty or has only 1 day. Prices length is ${prices.length}, so we continue.`,
      lineExecution: "if (!prices || prices.length <= 1) {",
      highlightedLines: [2]
    });

    stepsList.push({
      prices,
      buy: [...buy],
      sell: [...sell],
      cooldown: [...cooldown],
      i: -1,
      variables: { n, buy: `[${buy.join(', ')}]`, sell: `[${sell.join(', ')}]`, cooldown: `[${cooldown.join(', ')}]` },
      explanation: "Initialize DP arrays `buy`, `sell`, and `cooldown` with 0s. Size is equal to the number of days.",
      lineExecution: "const buy = new Array(n).fill(0);\nconst sell = new Array(n).fill(0);\nconst cooldown = new Array(n).fill(0);",
      highlightedLines: [6, 7, 8]
    });

    buy[0] = -prices[0];
    cooldown[0] = 0;
    sell[0] = 0;
    
    stepsList.push({
      prices,
      buy: [...buy],
      sell: [...sell],
      cooldown: [...cooldown],
      i: 0,
      variables: { "prices[0]": prices[0], "buy[0]": buy[0], "sell[0]": sell[0], "cooldown[0]": cooldown[0] },
      explanation: `Initialize base cases for day 0.\nbuy[0] = -prices[0] = -${prices[0]}\ncooldown[0] = 0\nsell[0] = 0`,
      lineExecution: "buy[0] = -prices[0];\ncooldown[0] = 0;\nsell[0] = 0;",
      highlightedLines: [9, 10, 11]
    });

    for (let i = 1; i < n; i++) {
      stepsList.push({
        prices,
        buy: [...buy],
        sell: [...sell],
        cooldown: [...cooldown],
        i,
        variables: { i, "prices[i]": prices[i] },
        explanation: `Processing day ${i}. Price of stock is $${prices[i]}.`,
        lineExecution: "for (let i = 1; i < n; i++) {",
        highlightedLines: [12]
      });

      const prevCooldown = cooldown[i - 1];
      const prevBuy = buy[i - 1];
      buy[i] = Math.max(prevCooldown - prices[i], prevBuy);
      
      stepsList.push({
        prices,
        buy: [...buy],
        sell: [...sell],
        cooldown: [...cooldown],
        i,
        variables: { i, "prices[i]": prices[i], "cooldown[i-1]": prevCooldown, "buy[i-1]": prevBuy, "buy[i]": buy[i] },
        explanation: `Update buy[${i}]: Max of (buying today after cooling down yesterday, OR holding the previously bought stock)\nMax(${prevCooldown} - ${prices[i]}, ${prevBuy}) = ${buy[i]}`,
        lineExecution: "buy[i] = Math.max(cooldown[i - 1] - prices[i], buy[i - 1]);",
        highlightedLines: [13]
      });

      sell[i] = prevBuy + prices[i];
      stepsList.push({
        prices,
        buy: [...buy],
        sell: [...sell],
        cooldown: [...cooldown],
        i,
        variables: { i, "prices[i]": prices[i], "buy[i-1]": prevBuy, "sell[i]": sell[i] },
        explanation: `Update sell[${i}]: We can only sell today if we bought or held a stock up to yesterday.\n${prevBuy} + ${prices[i]} = ${sell[i]}`,
        lineExecution: "sell[i] = buy[i - 1] + prices[i];",
        highlightedLines: [14]
      });

      const prevSell = sell[i - 1];
      cooldown[i] = Math.max(prevCooldown, prevSell);
      stepsList.push({
        prices,
        buy: [...buy],
        sell: [...sell],
        cooldown: [...cooldown],
        i,
        variables: { i, "cooldown[i-1]": prevCooldown, "sell[i-1]": prevSell, "cooldown[i]": cooldown[i] },
        explanation: `Update cooldown[${i}]: Max of (staying in cooldown, OR having sold stock yesterday)\nMax(${prevCooldown}, ${prevSell}) = ${cooldown[i]}`,
        lineExecution: "cooldown[i] = Math.max(cooldown[i - 1], sell[i - 1]);",
        highlightedLines: [15]
      });
    }

    const result = Math.max(sell[n - 1], cooldown[n - 1]);
    stepsList.push({
      prices,
      buy: [...buy],
      sell: [...sell],
      cooldown: [...cooldown],
      i: n,
      variables: { "sell[n-1]": sell[n-1], "cooldown[n-1]": cooldown[n-1], result },
      explanation: `Return the max profit on the last day, which must be either after selling or resting in cooldown.\nMax(${sell[n-1]}, ${cooldown[n-1]}) = ${result}`,
      lineExecution: "return Math.max(sell[n - 1], cooldown[n - 1]);",
      highlightedLines: [17]
    });

    return stepsList;
  }, [prices]);

  const step = steps[currentStep];

  return (
    <VisualizationLayout
      leftContent={
        <div className="space-y-6 flex flex-col h-full">
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4 opacity-90">
              Buy and Sell Stock with Cooldown (DP)
            </h2>
            <Card className="p-6 bg-card/60 backdrop-blur border-border/50 shadow-sm overflow-hidden relative">
              
              <div className="flex flex-col gap-4">
                
                {/* Headers */}
                <div className="flex items-center gap-2">
                  <div className="w-20 font-mono text-sm opacity-50">Day</div>
                  {prices.map((_, idx) => (
                    <div key={idx} className={`flex-1 text-center font-mono text-sm ${idx === step.i ? 'text-primary font-bold' : 'opacity-70'}`}>
                      {idx}
                    </div>
                  ))}
                </div>
                
                {/* Prices */}
                <div className="flex items-center gap-2">
                  <div className="w-20 font-bold text-sm">Price</div>
                  {prices.map((price, idx) => (
                    <div 
                      key={idx} 
                      className={`flex-1 h-12 flex items-center justify-center border rounded-lg font-bold transition-all duration-300 ${
                        idx === step.i 
                          ? 'border-primary bg-primary/20 text-primary scale-110 shadow-sm' 
                          : 'border-border/50 bg-background/50'
                      }`}
                    >
                      ${price}
                    </div>
                  ))}
                </div>

                <div className="h-px bg-border/50 my-2"></div>
                
                {/* Buy Array */}
                <div className="flex items-center gap-2">
                  <div className="w-20 font-bold text-sm text-blue-500">Buy</div>
                  {prices.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`flex-1 h-10 flex items-center justify-center border rounded font-mono transition-all ${
                        idx <= step.i || (idx === 0 && step.i >= 0)
                          ? idx === step.i ? 'bg-blue-500/20 border-blue-500 text-blue-600 dark:text-blue-400' : 'bg-blue-500/10 border-blue-500/30 text-blue-600/80 dark:text-blue-400/80'
                          : 'border-dashed border-border/30 text-muted-foreground/30'
                      }`}
                    >
                      {(idx <= step.i || (idx === 0 && step.i >= 0)) ? step.buy[idx] : '-'}
                    </div>
                  ))}
                </div>

                {/* Sell Array */}
                <div className="flex items-center gap-2">
                  <div className="w-20 font-bold text-sm text-green-500">Sell</div>
                  {prices.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`flex-1 h-10 flex items-center justify-center border rounded font-mono transition-all ${
                        idx <= step.i || (idx === 0 && step.i >= 0)
                          ? idx === step.i ? 'bg-green-500/20 border-green-500 text-green-600 dark:text-green-400' : 'bg-green-500/10 border-green-500/30 text-green-600/80 dark:text-green-400/80'
                          : 'border-dashed border-border/30 text-muted-foreground/30'
                      }`}
                    >
                      {(idx <= step.i || (idx === 0 && step.i >= 0)) ? step.sell[idx] : '-'}
                    </div>
                  ))}
                </div>

                {/* Cooldown Array */}
                <div className="flex items-center gap-2">
                  <div className="w-20 font-bold text-sm text-purple-500">Cooldown</div>
                  {prices.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`flex-1 h-10 flex items-center justify-center border rounded font-mono transition-all ${
                        idx <= step.i || (idx === 0 && step.i >= 0)
                          ? idx === step.i ? 'bg-purple-500/20 border-purple-500 text-purple-600 dark:text-purple-400' : 'bg-purple-500/10 border-purple-500/30 text-purple-600/80 dark:text-purple-400/80'
                          : 'border-dashed border-border/30 text-muted-foreground/30'
                      }`}
                    >
                      {(idx <= step.i || (idx === 0 && step.i >= 0)) ? step.cooldown[idx] : '-'}
                    </div>
                  ))}
                </div>

              </div>
            </Card>
          </div>

          <div>
             <Card className="p-5 border-l-4 border-primary bg-primary/5 shadow-sm">
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
