import React, { useMemo } from 'react';
import { ArrowRight, ArrowLeftRight } from 'lucide-react';

interface LinkedListDiagramProps {
    data: string;
    className?: string;
    doubly?: boolean;
}

export const LinkedListDiagram: React.FC<LinkedListDiagramProps> = ({ data, className = "", doubly = false }) => {
    const listData = useMemo(() => {
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

    if (listData.length === 0) {
        return (
            <div className={`p-4 text-center text-muted-foreground text-sm border border-dashed rounded-lg ${className}`}>
                Invalid or Empty Linked List
            </div>
        );
    }

    return (
        <div className={`relative bg-background/50 border rounded-lg p-8 overflow-auto no-scrollbar flex flex-col items-center justify-center ${className}`}>
            <div className="flex items-center">
                {listData.map((val, idx) => (
                    <React.Fragment key={idx}>
                        <div className="group flex flex-col items-center">
                            <div className="
                                flex flex-col
                                transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 rounded-md
                            ">
                                {/* Node Data part */}
                                <div className="flex border-2 border-primary/40 rounded-md bg-card overflow-hidden group-hover:border-primary transition-colors">
                                    <div className="flex items-center justify-center min-w-[3rem] px-3 h-12">
                                        <span className="font-mono text-foreground font-medium">{val}</span>
                                    </div>
                                    {/* The "Next" pointer box part */}
                                    <div className="flex items-center justify-center w-6 h-12 border-l-2 border-primary/40 bg-primary/5 group-hover:bg-primary/10 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                                    </div>
                                </div>
                            </div>
                            {idx === 0 && (
                                <span className="absolute -top-4 text-[10px] text-primary/80 font-mono font-bold uppercase tracking-wider">
                                    Head
                                </span>
                            )}
                        </div>
                        
                        {idx < listData.length - 1 && (
                            <div className="flex items-center justify-center px-2 text-muted-foreground/60 transition-colors duration-300">
                                {doubly ? (
                                    <ArrowLeftRight className="w-5 h-5 text-primary/60" />
                                ) : (
                                    <ArrowRight className="w-5 h-5 text-primary/60" />
                                )}
                            </div>
                        )}
                        
                        {idx === listData.length - 1 && (
                            <div className="flex items-center justify-center px-2 text-muted-foreground/60">
                                <ArrowRight className="w-5 h-5 text-primary/60" />
                                <span className="font-mono text-sm ml-1">null</span>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
