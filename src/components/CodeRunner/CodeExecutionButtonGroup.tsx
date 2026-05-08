import React from "react";
import { Play, Loader2, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { FeatureGuard } from "@/components/FeatureGuard";

interface CodeExecutionButtonGroupProps {
    onRun: () => void;
    onSubmit: () => void;
    isLoading: boolean;
    isSubmitting: boolean;
    lastRunSuccess: boolean;
    algorithm?: any;
    hasPremiumAccess?: boolean;
    hideUserMenu?: boolean;
    className?: string;
    showTooltips?: boolean;
}

export const CodeExecutionButtonGroup: React.FC<CodeExecutionButtonGroupProps> = ({
    onRun,
    onSubmit,
    isLoading,
    isSubmitting,
    lastRunSuccess,
    algorithm,
    hasPremiumAccess = false,
    hideUserMenu = false,
    className = "",
    showTooltips = true,
}) => {
    const isUnlockRequired = (algorithm?.is_premium || algorithm?.metadata?.is_pro) && !hasPremiumAccess && !hideUserMenu;

    const runButton = (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Button
                onClick={onRun}
                disabled={isLoading || isSubmitting}
                size="sm"
                variant="secondary"
                className="h-9 px-4 text-xs rounded-l-lg rounded-r-none border border-r-0 border-border font-semibold transition-all hover:bg-secondary dark:hover:text-white relative overflow-hidden group shrink-0 shadow-sm"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-foreground/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {isLoading ? (
                    <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                ) : (
                    <Play className="w-3.5 h-3.5 mr-2 fill-current text-primary dark:group-hover:text-white group-hover:scale-110 transition-all" />
                )}
                <span className="relative z-10">Run</span>
            </Button>
        </motion.div>
    );

    const submitButton = (
        <motion.div
            whileHover={!isUnlockRequired && lastRunSuccess ? { scale: 1.02 } : {}}
            whileTap={!isUnlockRequired && lastRunSuccess ? { scale: 0.98 } : {}}
        >
            <Button
                onClick={() => {
                    if (!lastRunSuccess && !isLoading && !isSubmitting) {
                        toast.warning("Please run your code successfully before submitting", {
                            description: "You need to pass all sample test cases first."
                        });
                        return;
                    }
                    onSubmit();
                }}
                disabled={isLoading || isSubmitting || isUnlockRequired}
                size="sm"
                className={cn(
                    "h-9 px-5 text-xs rounded-r-lg rounded-l-none border relative overflow-hidden transition-all duration-300 font-bold shrink-0 shadow-sm",
                    lastRunSuccess && !isUnlockRequired
                        ? "bg-primary text-black hover:text-black border-primary/20 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(var(--primary),0.4)]"
                        : "bg-zinc-400 text-black border-border opacity-60"
                )}
            >
                {/* Shine effect for enabled Submit button */}
                {lastRunSuccess && !isUnlockRequired && !isSubmitting && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "linear",
                            repeatDelay: 3
                        }}
                        className="absolute inset-0 z-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
                    />
                )}

                <div className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                        <Send className="w-3.5 h-3.5" />
                    )}
                    <span>Submit</span>
                </div>
            </Button>
        </motion.div>
    );

    return (
        <div className={`flex items-center ${className}`}>
            <TooltipProvider delayDuration={300}>
                <FeatureGuard flag="code_runner">
                    {showTooltips ? (
                        <Tooltip>
                            <TooltipTrigger asChild>{runButton}</TooltipTrigger>
                            <TooltipContent side="bottom" className="text-[11px]">
                                Run Code <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"><span className="text-xs">Ctrl</span> + '</kbd>
                            </TooltipContent>
                        </Tooltip>
                    ) : runButton}
                </FeatureGuard>

                <FeatureGuard flag="submit_button">
                    {showTooltips ? (
                        <Tooltip>
                            <TooltipTrigger asChild>{submitButton}</TooltipTrigger>
                            <TooltipContent side="bottom" className="max-w-[250px] text-[11px]">
                                {isUnlockRequired ? (
                                    <span className="text-orange-500 font-medium">Unlock Pro mode to submit this problem</span>
                                ) : !lastRunSuccess && !isLoading && !isSubmitting ? (
                                    <span className="text-orange-500 font-medium">Run all test cases successfully to enable submission</span>
                                ) : (
                                    <>Submit Solution <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"><span className="text-xs">Ctrl</span> + Enter</kbd></>
                                )}
                            </TooltipContent>
                        </Tooltip>
                    ) : submitButton}
                </FeatureGuard>
            </TooltipProvider>
        </div>
    );
};
