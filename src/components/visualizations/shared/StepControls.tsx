import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useApp } from '@/contexts/AppContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StepControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBack: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  currentStep: number;
  totalSteps: number;
  disabled?: boolean;
}

export const StepControls = ({
  isPlaying,
  onPlay,
  onPause,
  onStepForward,
  onStepBack,
  onReset,
  speed,
  onSpeedChange,
  currentStep,
  totalSteps,
  disabled: propDisabled = false
}: StepControlsProps) => {
  const { user } = useApp();
  const isDisabled = propDisabled || !user;

  const wrapWithAuthTooltip = (children: React.ReactNode, label: string) => {
    if (user) return children;
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-not-allowed">{children}</div>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-[10px]">
            Sign in to {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <div className="flex items-center gap-2">
        {wrapWithAuthTooltip(
          <Button
            onClick={onStepBack}
            disabled={isDisabled || currentStep === 0}
            variant="outline"
            size="icon"
          >
            <SkipBack className="h-4 w-4" />
          </Button>,
          "step back"
        )}
        
        {isPlaying ? (
          wrapWithAuthTooltip(
            <Button onClick={onPause} disabled={isDisabled} size="icon">
              <Pause className="h-4 w-4" />
            </Button>,
            "pause"
          )
        ) : (
          wrapWithAuthTooltip(
            <Button onClick={onPlay} disabled={isDisabled || currentStep >= totalSteps} size="icon">
              <Play className="h-4 w-4" />
            </Button>,
            "play"
          )
        )}
        
        {wrapWithAuthTooltip(
          <Button
            onClick={onStepForward}
            disabled={isDisabled || currentStep >= totalSteps}
            variant="outline"
            size="icon"
          >
            <SkipForward className="h-4 w-4" />
          </Button>,
          "step forward"
        )}
        
        {wrapWithAuthTooltip(
          <Button onClick={onReset} disabled={isDisabled} variant="outline" size="icon">
            <RotateCcw className="h-4 w-4" />
          </Button>,
          "reset"
        )}
      </div>
      
      <div className="flex-1">
        <div className="text-xs text-muted-foreground mb-1">
          Step {currentStep} / {totalSteps}
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
      
      <div className="flex-1">
        <div className="text-xs text-muted-foreground mb-1">
          Speed: {speed.toFixed(1)}x
        </div>
        <Slider
          value={[speed]}
          onValueChange={(values) => onSpeedChange(values[0])}
          min={0.5}
          max={3}
          step={0.5}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};
