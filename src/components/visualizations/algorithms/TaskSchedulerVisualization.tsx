import { useState, useEffect } from 'react';
import { SimpleStepControls } from '../shared/SimpleStepControls';
import { VariablePanel } from '../shared/VariablePanel';
import { AnimatedCodeEditor } from '../shared/AnimatedCodeEditor';
import { VisualizationLayout } from '../shared/VisualizationLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface Step {
    maxHeap: number[];
    queue: [number, number][];
    time: number;
    explanation: string;
    highlightedLines: number[];
    variables: Record<string, any>;
    timeline: string[];
}

export const TaskSchedulerVisualization = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState<Step[]>([]);
    
    const tasks = ["A","A","A","B","B","B"];
    const nParam = 2;

    const code = `function leastInterval(tasks: string[], n: number): number {
    const count = new Map<string, number>();
    for (const task of tasks) {
        count.set(task, (count.get(task) || 0) + 1);
    }
    const maxHeap: number[] = [];
    for (const freq of count.values()) {
        maxHeap.push(freq);
    }
    maxHeap.sort((a, b) => b - a);
    let time = 0;
    const queue: [number, number][] = [];
    while (maxHeap.length > 0 || queue.length > 0) {
        time++;
        if (maxHeap.length > 0) {
            const cnt = maxHeap.shift()! - 1;
            if (cnt > 0) {
                queue.push([cnt, time + n]);
            }
        }
        if (queue.length > 0 && queue[0][1] === time) {
            const [cnt] = queue.shift()!;
            maxHeap.push(cnt);
            maxHeap.sort((a, b) => b - a);
        }
    }
    return time;
}`;

    const generateSteps = () => {
        const s: Step[] = [];
        let time = 0;
        let maxHeap: number[] = [];
        let queue: [number, number][] = [];
        let timeline: string[] = [];

        s.push({
            maxHeap: [...maxHeap], queue: [...queue], time,
            explanation: "Initialize Map to count frequencies of each task.",
            highlightedLines: [2],
            variables: { tasks: '["A","A","A","B","B","B"]', n: nParam },
            timeline: [...timeline]
        });

        const count = new Map<string, number>();
        for (const task of tasks) {
            count.set(task, (count.get(task) || 0) + 1);
        }

        s.push({
            maxHeap: [...maxHeap], queue: [...queue], time,
            explanation: "Count frequencies of each task: A -> 3, B -> 3.",
            highlightedLines: [3, 4, 5],
            variables: { count: 'Map { A: 3, B: 3 }' },
            timeline: [...timeline]
        });

        for (const freq of count.values()) {
            maxHeap.push(freq);
        }
        maxHeap.sort((a, b) => b - a);

        s.push({
            maxHeap: [...maxHeap], queue: [...queue], time,
            explanation: "Add all frequencies to a maxHeap and sort it descending.",
            highlightedLines: [6, 7, 8, 9, 10],
            variables: { maxHeap: '[' + maxHeap.join(', ') + ']' },
            timeline: [...timeline]
        });

        s.push({
            maxHeap: [...maxHeap], queue: [...queue], time,
            explanation: "Initialize time = 0 and a queue to hold tasks in cooldown.",
            highlightedLines: [11, 12],
            variables: { time, queue: '[]' },
            timeline: [...timeline]
        });

        while (maxHeap.length > 0 || queue.length > 0) {
            s.push({
                maxHeap: [...maxHeap], queue: [...queue], time,
                explanation: "Check condition: MaxHeap has " + maxHeap.length + " items, queue has " + queue.length + " items.",
                highlightedLines: [13],
                variables: { time },
                timeline: [...timeline]
            });

            time++;

            s.push({
                maxHeap: [...maxHeap], queue: [...queue], time,
                explanation: "Increment time to " + time + ".",
                highlightedLines: [14],
                variables: { time },
                timeline: [...timeline]
            });

            if (maxHeap.length > 0) {
                const cnt = maxHeap.shift()! - 1;
                timeline.push("T"); // Task
                s.push({
                    maxHeap: [...maxHeap], queue: [...queue], time,
                    explanation: "Process the most frequent task. Decrement its count to " + cnt + ".",
                    highlightedLines: [15, 16],
                    variables: { time, cnt },
                    timeline: [...timeline]
                });

                if (cnt > 0) {
                    queue.push([cnt, time + nParam]);
                    s.push({
                        maxHeap: [...maxHeap], queue: [...queue], time,
                        explanation: "Task still needs to run " + cnt + " more times. Push to queue with available time " + (time + nParam) + ".",
                        highlightedLines: [17, 18],
                        variables: { time, queueItem: '[' + cnt + ', ' + (time + nParam) + ']' },
                        timeline: [...timeline]
                    });
                }
            } else {
                timeline.push("idle");
                s.push({
                    maxHeap: [...maxHeap], queue: [...queue], time,
                    explanation: "MaxHeap is empty. No task can run, so we idle.",
                    highlightedLines: [15],
                    variables: { time },
                    timeline: [...timeline]
                });
            }

            if (queue.length > 0 && queue[0][1] === time) {
                const [cnt] = queue.shift()!;
                maxHeap.push(cnt);
                maxHeap.sort((a, b) => b - a);
                
                s.push({
                    maxHeap: [...maxHeap], queue: [...queue], time,
                    explanation: "A task in cooldown has reached its available time (" + time + "). Return it to the maxHeap.",
                    highlightedLines: [21, 22, 23, 24],
                    variables: { time, cntRestored: cnt },
                    timeline: [...timeline]
                });
            } else {
                 s.push({
                    maxHeap: [...maxHeap], queue: [...queue], time,
                    explanation: "No task in the queue is ready to be returned to the heap at time " + time + ".",
                    highlightedLines: [21],
                    variables: { time },
                    timeline: [...timeline]
                });               
            }
        }
        
        s.push({
            maxHeap: [...maxHeap], queue: [...queue], time,
            explanation: "MaxHeap and Queue are empty. Return total time: " + time + ".",
            highlightedLines: [27],
            variables: { time },
            timeline: [...timeline]
        });

        setSteps(s);
    };

    useEffect(() => {
        generateSteps();
    }, []);

    if (steps.length === 0) return null;
    const step = steps[currentStep];

    return (
        <VisualizationLayout
            leftContent={
                <div className="space-y-6">
                    <SimpleStepControls
                        currentStep={currentStep}
                        totalSteps={steps.length}
                        onStepChange={setCurrentStep}
                    />

                    <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Max Heap (Frequencies)</h3>
                                <div className="flex flex-wrap gap-2 min-h-[60px]">
                                    <AnimatePresence mode="popLayout">
                                        {step.maxHeap.length === 0 && (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-muted-foreground text-xs italic py-2">
                                                Empty
                                            </motion.div>
                                        )}
                                        {step.maxHeap.map((freq, idx) => (
                                            <motion.div
                                                key={'heap-' + idx + '-' + currentStep}
                                                layout
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="w-10 h-10 rounded-lg bg-primary/20 border border-primary text-primary flex items-center justify-center font-bold"
                                            >
                                                {freq}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Cooldown Queue</h3>
                                <div className="flex flex-wrap gap-2 min-h-[60px]">
                                    <AnimatePresence mode="popLayout">
                                        {step.queue.length === 0 && (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-muted-foreground text-xs italic py-2">
                                                Empty
                                            </motion.div>
                                        )}
                                        {step.queue.map(([freq, availTime], idx) => (
                                            <motion.div
                                                key={'queue-' + idx + '-' + currentStep}
                                                layout
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="h-10 px-3 rounded-lg bg-accent/20 border border-accent text-foreground flex flex-col items-center justify-center"
                                            >
                                                <span className="text-sm font-bold">{freq}</span>
                                                <span className="text-[10px] uppercase opacity-70">t={availTime}</span>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Timeline (Current Time: {step.time})</h3>
                            <div className="flex flex-wrap gap-1">
                                {step.timeline.map((event, idx) => (
                                    <div 
                                        key={idx}
                                        className={'w-8 h-8 rounded flex items-center justify-center text-xs font-bold ' + (event === 'idle' ? 'bg-muted text-muted-foreground' : 'bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30')}
                                    >
                                        {event === 'idle' ? 'I' : 'T'}
                                    </div>
                                ))}
                                {step.time === 0 && (
                                    <div className="text-muted-foreground text-xs italic py-2">Not started</div>
                                )}
                            </div>
                        </div>
                    </Card>

                    <VariablePanel variables={step.variables} />

                    <Card className="p-4 bg-primary/5 border-primary/20 mt-auto">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Algorithm Logic</h4>
                        <p className="text-sm text-foreground leading-relaxed font-medium">{step.explanation}</p>
                    </Card>
                </div>
            }
            rightContent={
                <AnimatedCodeEditor
                    code={code}
                    language="typescript"
                    highlightedLines={step.highlightedLines}
                />
            }
        />
    );
};
