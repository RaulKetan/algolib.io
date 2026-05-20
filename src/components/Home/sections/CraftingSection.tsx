import React from "react";

export function CraftingSection() {
    return (
        <div className="py-36 lg:py-48 bg-[#FAFAFA] dark:bg-[#050505]">
            <div className="w-full max-w-[1600px] mx-auto px-4 text-center">
                <h2 className="text-xl md:text-2xl font-medium mb-20 text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                    We're crafting <span className="inline-block px-4 py-1 bg-[#EAFF96] text-black">rulcode.com</span> with<br className="hidden md:block" />passion, precision and quality.
                </h2>

                <div className="bg-white dark:bg-zinc-900 p-6 md:p-20 border-[1px] border-gray-100 dark:border-zinc-800 text-left max-w-4xl mx-auto relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="text-gray-800 dark:text-gray-200 mb-16 text-lg md:text-xl leading-relaxed tracking-tight">
                            <span className="text-[#EAFF96] text-xl md:text-2xl block mb-6">"</span>
                            Over my career, I have conducted hundreds of technical interviews and have personally received multiple offers from leading technology companies. Through these experiences, I have gained a deep understanding of the challenges engineers face when preparing for technical interviews.                  <br /><br />
                            Rulcode.com is the culmination of this experience and knowledge, created to help fellow engineers prepare efficiently and confidently for technical interviews.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
