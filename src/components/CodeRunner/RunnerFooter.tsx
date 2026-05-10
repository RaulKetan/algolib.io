import React from "react";
import { ChevronUp, ChevronDown, Shuffle, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { User } from "@supabase/supabase-js";
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
    user?: User | null;
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
    user,
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
                    user={user}
                    hideUserMenu={hideUserMenu}
                    hasPremiumAccess={hasPremiumAccess}
                    showTooltips={true}
                />
            </div>

            {/* Right: Spacer */}
            <div className="flex-1 flex justify-end">
            </div>
        </div>
    );
};
