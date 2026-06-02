import React, { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';

interface StackDiagramProps {
    data: string;
    className?: string;
}

export const StackDiagram: React.FC<StackDiagramProps> = ({ data, className = "" }) => {
    const stackData = useMemo(() => {
        try {
            const parsed = JSON.parse(data.trim());
            if (Array.isArray(parsed)) return parsed;
        } catch {
            const cleaned = data.replace(/[\[\]]/g, '').trim();
            if (cleaned) {
                return cleaned.split(',').map(s => {
                    const str = s.trim();
                    const num = Number(str);
                    return isNaN(num) ? str.replace(/['"]/g, '') : num;
                });
            }
        }
        return [];
    }, [data]);

    if (stackData.length === 0) {
        return (
            <div className={`p-4 text-center text-muted-foreground text-sm border border-dashed rounded-lg ${className}`}>
                Invalid or Empty Stack
            </div>
        );
    }

    // We render the stack top-to-bottom, so we reverse the array for display
    const reversedData = [...stackData].reverse();

    return (
        <div className={`relative bg-background/50 border rounded-lg p-8 overflow-auto no-scrollbar flex flex-col items-center justify-center ${className}`}>
            <div className="flex items-start">
                {/* The Stack Bucket */}
                <div className="flex flex-col border-x-4 border-b-4 border-muted-foreground/30 rounded-b-xl px-2 pb-2 pt-4 min-w-[100px] items-center gap-1">
                    {reversedData.map((val, idx) => (
                        <div 
                            key={idx} 
                            className="group relative flex items-center w-full"
                        >
                            <div className={`
                                flex items-center justify-center w-full h-12 
                                border-2 border-primary/40 rounded-md bg-card
                                transition-all duration-300 hover:scale-105 hover:bg-primary/10 hover:border-primary hover:shadow-lg hover:shadow-primary/20
                            `}>
                                <span className="font-mono text-foreground font-medium">{val}</span>
                            </div>
                            
                            {/* Top Pointer */}
                            {idx === 0 && (
                                <div className="absolute -right-20 flex items-center text-primary font-mono text-xs font-bold uppercase tracking-wider animate-pulse">
                                    <ArrowLeft className="w-4 h-4 mr-1" />
                                    Top
                                </div>
                            )}
                        </div>
                    ))}
                    
                    {/* Ghost element to represent bottom when animating, or just spacing */}
                    {reversedData.length === 0 && (
                        <div className="w-full h-12 border-2 border-dashed border-muted-foreground/20 rounded-md" />
                    )}
                </div>
            </div>
        </div>
    );
};
