import React from "react";
import { ChevronUp, ChevronDown, Shuffle, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CodeExecutionButtonGroup } from "./CodeExecutionButtonGroup";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface RunnerFooterProps {
    // Console state
    isExpanded: boolean;
    onToggleExpand: () => void;

    // Action props (passed to CodeExecutionButtonGroup)
    onRun: () => void;
    onSubmit: () => void;
    isLoading: boolean;
    isSubmitting: boolean;
    lastRunSuccess: boolean;
    algorithm?: any;
    hideUserMenu?: boolean;
    hasPremiumAccess?: boolean;
    handleRandomProblem?: () => void;
    handleNextProblem?: () => void;
    handlePreviousProblem?: () => void;
}

export const RunnerFooter: React.FC<RunnerFooterProps> = ({
    isExpanded,
    onToggleExpand,
    onRun,
    onSubmit,
    isLoading,
    isSubmitting,
    lastRunSuccess,
    algorithm,
    hideUserMenu,
    hasPremiumAccess,
    handleRandomProblem,
    handleNextProblem,
    handlePreviousProblem,
}) => {
    return (
        <div className="flex items-center pl-0 pr-1 bg-background border-t-0 border-border shrink-0 z-20 h-10 relative">
            {/* Left: Console Toggle */}
            <div className="flex-1 flex justify-start">
                <button
                    onClick={onToggleExpand}
                    className="flex items-center gap-2 text-xs font-semibold py-1.5 pl-4  pr-3 rounded-md hover:bg-muted transition-colors text-foreground/80 hover:text-foreground group h-[40px]"
                >
                    <span>Console</span>
                    {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                    ) : (
                        <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                    )}
                </button>
            </div>

            {/* Center: Actions */}
            <div className="flex-none flex justify-center">
                <CodeExecutionButtonGroup
                    onRun={onRun}
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    isSubmitting={isSubmitting}
                    lastRunSuccess={lastRunSuccess}
                    algorithm={algorithm}
                    hideUserMenu={hideUserMenu}
                    hasPremiumAccess={hasPremiumAccess}
                    showTooltips={true}
                />
            </div>

            {/* Right: Problem Navigation */}
            <div className="flex-1 flex justify-end">
                <div className="flex items-center shadow-sm rounded-lg overflow-hidden border border-border bg-secondary/80 dark:bg-secondary/50 h-9">
                    <TooltipProvider>
                        {handlePreviousProblem && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={handlePreviousProblem}
                                            className="h-9 w-9 rounded-none text-black dark:text-white hover:text-primary hover:bg-muted border-r border-border transition-colors px-0"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                </TooltipTrigger>
                                <TooltipContent side="top">Previous Problem</TooltipContent>
                            </Tooltip>
                        )}
                        {handleRandomProblem && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={handleRandomProblem}
                                            className="h-9 w-9 rounded-none text-black dark:text-white hover:text-primary hover:bg-muted border-r border-border transition-colors px-0"
                                        >
                                            <Shuffle className="h-3.5 w-3.5" />
                                        </Button>
                                    </motion.div>
                                </TooltipTrigger>
                                <TooltipContent side="top">Random Problem</TooltipContent>
                            </Tooltip>
                        )}
                        {handleNextProblem && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={handleNextProblem}
                                            className="h-9 w-9 rounded-none text-black dark:text-white hover:text-primary hover:bg-muted transition-colors px-0"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                </TooltipTrigger>
                                <TooltipContent side="top">Next Problem</TooltipContent>
                            </Tooltip>
                        )}
                    </TooltipProvider>
                </div>
            </div>
        </div>
    );
};
