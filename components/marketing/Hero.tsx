
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
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-accent/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[300px] bg-brand-accent/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/5 border border-brand-accent/10 backdrop-blur-3xl text-brand-accent text-sm font-medium"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                    Revolutionizing Web Design with Voice
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl font-black tracking-tight text-brand-foreground leading-[1.1]"
                >
                    Speak your website <br />
                    <span className="bg-gradient-to-r from-brand-accent via-brand-accent/80 to-brand-accent bg-clip-text text-transparent">
                        into existence.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl md:text-2xl text-brand-foreground/40 max-w-2xl mx-auto"
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
                        className="group px-8 py-4 bg-brand-foreground text-brand-background font-semibold rounded-full flex items-center gap-2 hover:bg-brand-foreground/90 transition-all active:scale-95 shadow-xl shadow-brand-accent/10"
                    >
                        Enter Studio
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 bg-brand-foreground/5 backdrop-blur-md border border-brand-foreground/10 text-brand-foreground font-semibold rounded-full flex items-center gap-2 hover:bg-brand-foreground/10 transition-all active:scale-95">
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
