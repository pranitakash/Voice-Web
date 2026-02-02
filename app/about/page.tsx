
"use client";

import { motion } from "framer-motion";
import { Mic, Zap, Globe, Cpu, Workflow, ShieldCheck, Brain } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { AuthModal } from "@/components/auth/AuthModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AboutPage() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const router = useRouter();

    return (
        <main className="min-h-screen bg-brand-background text-brand-foreground selection:bg-brand-accent/30">
            <Navbar onLogin={() => setIsAuthModalOpen(true)} />

            <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-24 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-8"
                    >
                        Mission: To give every human <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-accent/60">
                            digital superpowers.
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-brand-foreground/40 text-xl max-w-3xl mx-auto leading-relaxed"
                    >
                        Voice Web was born from a simple idea: Designing for the web shouldn&apos;t be restricted to mouse clicks and complex UI. It should be as fast as your thoughts.
                    </motion.p>
                </div>

                {/* Workflow Section */}
                <div className="mb-32">
                    <div className="flex-1 space-y-8">
                        <div className="w-12 h-12 bg-brand-accent/20 rounded-2xl flex items-center justify-center text-brand-accent border border-brand-accent/20">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight text-brand-foreground">The Workflow</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {[
                            {
                                title: "Voice-to-Intent",
                                desc: "We use browsers' native speech recognition combined with specialized parsing logic to convert your natural language into structured design intents. Whether it's \"Add a dark hero\" or \"Make this grid more spaced out\", we understand you.",
                                icon: Mic,
                                color: "text-brand-accent",
                                image: "/features/speak.png"
                            },
                            {
                                title: "Gemini-Powered Generation",
                                desc: "Once intent is captured, our backend leverages the Google Gemini AI models to generate high-fidelity component schemas with modern aesthetics, optimized for the Tailwind and Next.js ecosystem.",
                                icon: Cpu,
                                color: "text-brand-accent",
                                image: "/features/ai_brain.png"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                whileHover={{ y: -8 }}
                                className="relative group rounded-[2.5rem] bg-brand-card border border-brand-border overflow-hidden flex flex-col p-2"
                            >
                                <div className="relative h-64 rounded-[2rem] overflow-hidden mb-8 bg-brand-foreground/5">
                                    <motion.img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                                        whileHover={{ scale: 1.12 }}
                                        transition={{ duration: 0.8, ease: "circOut" }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-card to-transparent opacity-60" />
                                    <div className="absolute bottom-6 left-6 p-3 rounded-2xl bg-brand-background/60 backdrop-blur-xl border border-brand-border">
                                        <item.icon className={`w-6 h-6 ${item.color}`} />
                                    </div>
                                </div>
                                <div className="px-8 pb-10">
                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-accent transition-colors text-brand-foreground">{item.title}</h3>
                                    <p className="text-brand-foreground/40 leading-relaxed font-medium">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack Grid */}
                <div className="mb-32">
                    <h2 className="text-3xl font-bold mb-12 tracking-tight text-brand-foreground">Built with the Best</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: "Next.js 15", role: "Frontend Framework", icon: Globe },
                            { name: "Gemini 1.5 Pro", role: "AI Model", icon: Cpu },
                            { name: "Framer Motion", role: "Animation Library", icon: Zap },
                            { name: "Tailwind CSS", role: "Styling Framework", icon: ShieldCheck }
                        ].map((tech, i) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="p-8 rounded-3xl bg-brand-card border border-brand-border hover:border-brand-accent/30 transition-all group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/[0.02] transition-colors" />
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-brand-accent-foreground transition-all shadow-lg shadow-brand-accent/0 group-hover:shadow-brand-accent/20">
                                        <tech.icon className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2 group-hover:text-brand-accent transition-colors text-brand-foreground">{tech.name}</h4>
                                    <p className="text-brand-foreground/20 text-xs font-mono uppercase tracking-widest">{tech.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer onEnter={() => router.push('/studio')} />
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </main>
    );
}
