
"use client";

import { motion } from "framer-motion";

interface HeroSectionProps {
    content?: {
        title?: string;
        subtitle?: string;
        cta?: string;
    };
}

export function HeroSection({ content }: HeroSectionProps) {
    const title = content?.title || 'Build at the Speed of Thought';
    const subtitle = content?.subtitle || 'Just speak your vision, and watch it come to life instantly. No drag-and-drop, just pure creation.';
    const cta = content?.cta || 'Get Started';

    return (
        <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center p-8 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-xl relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="z-10 max-w-3xl"
            >
                <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs text-blue-400 font-medium mb-6">
                    AI-Powered Experience
                </span>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent mb-6">
                    {title}
                </h1>
                <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                    {subtitle}
                </p>
                <div className="flex gap-4 justify-center">
                    <button className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition-colors">
                        {cta}
                    </button>
                    <button className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors">
                        View Components
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
