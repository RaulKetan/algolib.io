import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import ComplexityGraph from './ComplexityGraph';
import { ComplexityType, generateComplexityData, complexityConfig } from '@/utils/complexityData';
import dynamic from 'next/dynamic';

const SolutionViewer = dynamic(
  () => import("@/components/SolutionViewer").then((mod) => mod.SolutionViewer),
  { ssr: false }
);

interface ComplexityCardProps {
  type: ComplexityType;
  animationComponent: React.ReactNode;
  codes?: Record<string, string>;
  exampleCode?: string;
  n: number;
  onNChange: (value: number) => void;
}

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ComplexityCard: React.FC<ComplexityCardProps> = ({ type, animationComponent, codes, exampleCode, n, onNChange }) => {
  const config = complexityConfig[type];
  const data = generateComplexityData(n, type);

  const implementations = codes
    ? Object.entries(codes).map(([lang, code]) => ({
        lang,
        code: [{ codeType: 'solution', code }]
      }))
    : exampleCode
      ? [{ lang: 'javascript', code: [{ codeType: 'solution', code: exampleCode }] }]
      : [];

  return (
    <Card 
      className="w-full overflow-hidden relative border border-border"
      style={{
        backgroundImage: `radial-gradient(circle at 0% 0%, ${hexToRgba(config.color, 0.09)} 0%, transparent 60%)`
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2.5 text-2xl font-medium tracking-tight text-foreground">
              {config.title}
              <Badge 
                variant="outline" 
                className="font-mono px-2 py-0.5 text-xs font-medium border"
                style={{ 
                  borderColor: `${config.color}40`, 
                  color: config.color,
                  backgroundColor: `${config.color}10` 
                }}
              >
                {type}
              </Badge>
            </CardTitle>
            <CardDescription className="text-[15px] text-muted-foreground/90 font-medium">
              {config.description}
            </CardDescription>
          </div>
        </div>
        <div className="mt-4 text-[14px] leading-relaxed text-muted-foreground bg-muted/30 dark:bg-muted/10 p-3.5 rounded-lg border border-border/40">
          {config.detailedDescription}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Common Examples List */}
        <div className="bg-background/40 border border-border/60 rounded-xl p-4">
          <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80 mb-3 flex items-center gap-2">
            Common Algorithms
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {config.examples.map((ex, i) => (
              <li key={i} className="flex items-start gap-2.5 text-muted-foreground p-2 rounded-lg hover:bg-muted/20 transition-colors">
                <span 
                  className="w-5 h-5 rounded-md flex items-center justify-center text-xs font-mono font-medium shrink-0 mt-0.5"
                  style={{ 
                    backgroundColor: `${config.color}15`, 
                    color: config.color 
                  }}
                >
                  {i + 1}
                </span>
                <span className="text-[14px] leading-relaxed text-neutral-700 dark:text-neutral-300">{ex}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Visualization & Graph Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Animation Area */}
          <div className="flex flex-col gap-4 min-h-[200px] justify-center">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80 mb-2">Visual Representation (N = {n})</div>
            <div className="bg-muted/10 rounded-lg p-4 border flex items-center justify-center min-h-[240px] relative overflow-hidden">
              {animationComponent}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Input Size (N)</span>
                <span>{n}</span>
              </div>
              <Slider
                value={[n]}
                min={1}
                max={50}
                onValueChange={(val) => onNChange(val[0])}
                step={1}
              />
            </div>
          </div>

          {/* Graph Area */}
          <div className="flex flex-col">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80 mb-2">Growth Rate</div>
            <ComplexityGraph data={data} color={config.color} />
          </div>
        </div>

        {/* Code Snippet - Standard Solution Viewer */}
        <div className="space-y-2 mt-4">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80 mb-2">Implementation</div>
          <React.Suspense
            fallback={
              <div className="h-64 w-full animate-pulse bg-muted rounded-md" />
            }
          >
            <SolutionViewer
              implementations={implementations}
              approachName="Code"
              controls={{ approaches: false }}
            />
          </React.Suspense>
        </div>

      </CardContent>
    </Card>
  );
};

export default ComplexityCard;

