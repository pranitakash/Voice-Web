
"use client";

import { motion } from "framer-motion";

export const LivePreview = () => {
    return (
        <section className="py-24 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-2xl border border-white/10 bg-[#050505] shadow-2xl shadow-blue-500/10 overflow-hidden"
                >
                    {/* Browser Header */}
                    <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="mx-auto w-1/3 h-5 rounded bg-white/5" />
                    </div>

                    {/* Preview Content (Mockup of the Studio) */}
                    <div className="aspect-video relative bg-[#050505] p-8">
                        <div className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: 'radial-gradient(#333333 1px, transparent 1px)',
                                backgroundSize: '20px 20px'
                            }}
                        />

                        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                            <div className="w-full max-w-2xl space-y-4">
                                <div className="h-12 w-3/4 bg-white/5 rounded-lg border border-white/10 mx-auto" />
                                <div className="h-32 w-full bg-white/5 rounded-2xl border border-white/10" />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-24 bg-white/5 rounded-xl border border-white/10" />
                                    <div className="h-24 bg-white/5 rounded-xl border border-white/10" />
                                    <div className="h-24 bg-white/5 rounded-xl border border-white/10" />
                                </div>
                            </div>

                            {/* Floating Voice Indicator */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 h-12 bg-blue-600/20 backdrop-blur-xl border border-blue-500/30 rounded-full flex items-center justify-center gap-3 px-4">
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                <div className="h-2 w-full bg-blue-500/20 rounded-full overflow-hidden">
                                    <div className="h-full w-2/3 bg-blue-500 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="mt-12 text-center">
                    <p className="text-white/40 italic font-mono text-sm leading-6">
                        &quot;Add a hero section with a dark theme and a glass card...&quot;
                    </p>
                </div>
            </div>
        </section>
    );
};
