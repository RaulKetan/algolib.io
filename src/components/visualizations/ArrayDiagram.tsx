import React, { useMemo } from 'react';

interface ArrayDiagramProps {
    data: string;
    className?: string;
}

export const ArrayDiagram: React.FC<ArrayDiagramProps> = ({ data, className = "" }) => {
    const arrayData = useMemo(() => {
        try {
            const parsed = JSON.parse(data.trim());
            if (Array.isArray(parsed)) return parsed;
        } catch {
            // fallback for plain comma separated values if JSON.parse fails
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

    if (arrayData.length === 0) {
        return (
            <div className={`p-4 text-center text-muted-foreground text-sm border border-dashed rounded-lg ${className}`}>
                Invalid or Empty Array
            </div>
        );
    }

    return (
        <div className={`relative bg-background/50 border rounded-lg p-8 overflow-auto no-scrollbar flex items-center justify-center ${className}`}>
            <div className="flex">
                {arrayData.map((val, idx) => (
                    <div 
                        key={idx} 
                        className="group flex flex-col items-center"
                    >
                        <div className={`
                            flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 
                            border-y-2 border-r-2 border-primary/40 bg-card
                            ${idx === 0 ? 'border-l-2 rounded-l-md' : ''} 
                            ${idx === arrayData.length - 1 ? 'rounded-r-md' : ''} 
                            transition-all duration-300 hover:-translate-y-1 hover:bg-primary/10 hover:border-primary hover:shadow-lg hover:shadow-primary/20 hover:z-10 relative
                        `}>
                            <span className="font-mono text-foreground font-medium">{val}</span>
                        </div>
                        <span className="text-[10px] sm:text-xs text-muted-foreground font-mono mt-3 transition-colors duration-300 group-hover:text-primary">
                            {idx}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
