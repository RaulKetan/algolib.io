import React from 'react';
import Link from 'next/link';
import { LogIn, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AuthNudgeProps {
    className?: string;
    message?: string;
    description?: string;
}

export const AuthNudge: React.FC<AuthNudgeProps> = ({ 
    className,
    message = "Sign in to unlock interactive features",
    description = "Execute code, step through visualizations, and track your progress."
}) => {
    return (
        <div className={cn(
            "flex items-center justify-between gap-4 p-3 px-5 bg-orange-500/[0.03] dark:bg-orange-500/[0.05] border border-orange-500/20 rounded-2xl animate-in slide-in-from-bottom-2 duration-500 shadow-sm backdrop-blur-md relative overflow-hidden group",
            className
        )}>
            {/* Subtle animated background glow */}
            <div className="absolute -left-10 -top-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-colors duration-500" />
            
            <div className="flex items-center gap-4 min-w-0 relative z-10">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 shadow-inner">
                    <LogIn className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="text-[12px] font-medium text-foreground leading-tight tracking-tight">
                        {message}
                    </span>
                    <span className="text-[10px] text-muted-foreground truncate opacity-80 mt-0.5">
                        {description}
                    </span>
                </div>
            </div>
            
            <Link href="/login" className="relative z-10">
                <Button 
                    size="sm" 
                    className="h-8 px-5 text-[11px] rounded-full font-medium bg-orange-600 hover:bg-orange-700 text-white shadow-[0_0_15px_rgba(234,88,12,0.3)] border-none flex items-center gap-2 transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0 group/btn"
                >
                    Sign In
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Button>
            </Link>
        </div>
    );
};
