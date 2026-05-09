import React from 'react';
import Link from 'next/link';
import { Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AuthNudgeProps {
    className?: string;
    message?: string;
    description?: string;
}

export const AuthNudge: React.FC<AuthNudgeProps> = ({ 
    className,
    message = "Sign in to unlock full interactive features",
    description = "Log in to execute code, step through visualizations, and track your progress."
}) => {
    return (
        <div className={cn(
            "flex items-center justify-between gap-4 p-2.5 px-4 bg-primary/5 border border-primary/10 rounded-xl animate-in slide-in-from-bottom-2 duration-500 shadow-sm backdrop-blur-sm",
            className
        )}>
            <div className="flex items-center gap-3 min-w-0">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Lock className="w-3 h-3 text-primary" />
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-bold text-foreground leading-tight">
                        {message}
                    </span>
                    <span className="text-[10px] text-muted-foreground truncate hidden md:block">
                        {description}
                    </span>
                </div>
            </div>
            <Link href="/login">
                <Button 
                    size="sm" 
                    className="h-7 px-4 text-[10px] rounded-full font-bold shadow-sm flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
                >
                    Sign In
                    <ArrowRight className="w-3 h-3" />
                </Button>
            </Link>
        </div>
    );
};
