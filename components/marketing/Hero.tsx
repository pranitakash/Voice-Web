
"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Play } from "lucide-react";

interface HeroProps {
    onEnter: () => void;
}

export const Hero = ({ onEnter }: HeroProps) => {
    const router = useRouter();

    const handleEnter = () => {
        onEnter();
    };

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/10 backdrop-blur-3xl text-blue-400 text-sm font-medium"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    Revolutionizing Web Design with Voice
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl font-black tracking-tight text-white leading-[1.1]"
                >
                    Speak your website <br />
                    <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                        into existence.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto"
                >
                    Describe. Refine. Ship. Voice Web is the visionary AI canvas that turns your words into high-end web experiences.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                >
                    <button
                        onClick={handleEnter}
                        className="group px-8 py-4 bg-white text-black font-semibold rounded-full flex items-center gap-2 hover:bg-white/90 transition-all active:scale-95"
                    >
                        Enter Studio
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold rounded-full flex items-center gap-2 hover:bg-white/10 transition-all active:scale-95">
                        <Play className="w-4 h-4 fill-current" />
                        Watch Demo
                    </button>
                </motion.div>
            </div>

            {/* Floating Elements/Grid visual */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
                    backgroundSize: '48px 48px'
                }}
            />
        </section>
    );
};
