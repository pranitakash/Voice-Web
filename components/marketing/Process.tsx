"use client";

import { motion } from "framer-motion";
import { Mic, Zap, Edit3 } from "lucide-react";

const steps = [
    {
        title: "Speak",
        description: "Describe your vision naturally. Our voice AI listens and understands your intent.",
        icon: Mic,
        color: "text-blue-400",
        image: "/features/speak.png"
    },
    {
        title: "Generate",
        description: "Watch as high-fidelity sections appear in real-time on your eternal canvas.",
        icon: Zap,
        color: "text-blue-400",
        image: "/features/generate.png"
    },
    {
        title: "Refine",
        description: "Tweak spacing, colors, and content using simple voice commands or quick edits.",
        icon: Edit3,
        color: "text-pink-400",
        image: "/features/refine.png"
    }
];

export const Process = () => {
    return (
        <section className="py-32 px-4 bg-[#030303] overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6"
                    >
                        How it works
                    </motion.span>
                    <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">From thought to live site.</h2>
                    <p className="text-white/40 text-xl max-w-2xl mx-auto">A seamless, interactive workflow designed for modern creators.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            whileHover={{ y: -10 }}
                            className="relative group h-full rounded-[2.5rem] bg-[#0A0A0A] border border-white/10 overflow-hidden flex flex-col p-2"
                        >
                            {/* Card Header: Image Container */}
                            <div className="relative h-64 rounded-[2rem] overflow-hidden mb-6 bg-black/40">
                                <motion.img
                                    src={step.image}
                                    alt={step.title}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                                    whileHover={{ scale: 1.15, rotate: 1 }}
                                    transition={{ duration: 1, ease: "circOut" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />

                                {/* Floating Icon Overlay */}
                                <div className="absolute bottom-6 left-6 p-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10">
                                    <step.icon className={`w-6 h-6 ${step.color}`} />
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="px-8 pb-10 pt-2 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-white/40 leading-relaxed font-medium text-sm">
                                    {step.description}
                                </p>
                            </div>

                            {/* Background Glow */}
                            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
