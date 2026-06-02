import React, { useMemo } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface QueueDiagramProps {
    data: string;
    className?: string;
}

export const QueueDiagram: React.FC<QueueDiagramProps> = ({ data, className = "" }) => {
    const queueData = useMemo(() => {
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

    if (queueData.length === 0) {
        return (
            <div className={`p-4 text-center text-muted-foreground text-sm border border-dashed rounded-lg ${className}`}>
                Invalid or Empty Queue
            </div>
        );
    }

    return (
        <div className={`relative bg-background/50 border rounded-lg p-12 overflow-auto no-scrollbar flex items-center justify-center ${className}`}>
            <div className="flex flex-col items-center gap-2">
                
                {/* Top Pointers Layer (Rear for Enqueue) */}
                <div className="flex w-full relative h-8">
                    {queueData.map((_, idx) => (
                        <div key={`rear-${idx}`} className="w-12 sm:w-16 flex-shrink-0 flex justify-center">
                            {idx === queueData.length - 1 && (
                                <div className="absolute -top-6 flex flex-col items-center text-amber-500 font-mono text-xs font-bold uppercase tracking-wider animate-bounce">
                                    Rear
                                    <ArrowDown className="w-4 h-4 mt-1" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* The Queue Pipe */}
                <div className="flex border-y-4 border-muted-foreground/30 px-2 py-1 min-h-[64px] items-center">
                    {queueData.map((val, idx) => (
                        <div 
                            key={`node-${idx}`} 
                            className="group flex flex-col items-center"
                        >
                            <div className={`
                                flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 mx-1
                                border-2 border-primary/40 rounded-md bg-card
                                transition-all duration-300 hover:scale-110 hover:bg-primary/10 hover:border-primary hover:shadow-lg hover:shadow-primary/20
                            `}>
                                <span className="font-mono text-foreground font-medium">{val}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Pointers Layer (Front for Dequeue) */}
                <div className="flex w-full relative h-8">
                    {queueData.map((_, idx) => (
                        <div key={`front-${idx}`} className="w-12 sm:w-16 flex-shrink-0 flex justify-center">
                            {idx === 0 && (
                                <div className="absolute top-2 flex flex-col items-center text-primary font-mono text-xs font-bold uppercase tracking-wider animate-pulse">
                                    <ArrowUp className="w-4 h-4 mb-1" />
                                    Front
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};
