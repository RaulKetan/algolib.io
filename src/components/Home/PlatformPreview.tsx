import React from "react";
import dynamic from "next/dynamic";
const AlgorithmPreview = dynamic(() => import("@/components/AlgorithmPreview").then(mod => mod.AlgorithmPreview), { ssr: false });
import { platformPreviewData } from "../../data/platformPreviewData";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const INITIAL_CODE = `function twoSum(nums: number[], target: number): number[] {
    // Hash map to store number and its index
    const seen = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        // Check if complement exists in hash map
        if (seen.has(complement)) {
            return [seen.get(complement)!, i];
        }
        
        // Store current number and its index
        seen.set(nums[i], i);
    }
    
    return [-1,-1]; // No solution found
}`;

export default function PlatformPreview() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-[1400px] mx-auto"
        >
            <div className="relative w-full max-w-full">
                <div className="relative bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden w-full">
                    <div className="h-[800px] md:h-[850px] w-full">
                        <AlgorithmPreview algorithm={platformPreviewData} initialCode={INITIAL_CODE} isPlatformPreview={true} />
                    </div>
                </div>

            </div>

            {/* CTA button — links to the Two Sum problem */}
            <div className="mt-8 flex justify-center">
                <Button
                    size="lg"
                    className="rounded-lg py-6 text-base bg-zinc-950 dark:bg-white hover:bg-zinc-900 dark:hover:bg-zinc-100 text-white dark:text-black font-medium tracking-tight transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] shadow-xl flex items-center justify-center gap-2 group/btn w-full sm:w-fit px-8"
                    asChild
                >
                    <Link
                        href="/problem/two-sum"
                    >
                        <div className="flex gap-1 shrink-0 mr-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-[#558600] animate-pulse"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-[#558600] animate-pulse [animation-delay:200ms]"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-[#558600] animate-pulse [animation-delay:400ms]"></span>
                        </div>
                        Interactive Playground <span className="hidden sm:inline">— Try editing the code</span>
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                </Button>
            </div>
        </motion.div>
    );
}

