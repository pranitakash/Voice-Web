
"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, Code2, Rocket, Heart } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { AuthModal } from "@/components/auth/AuthModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeveloperPage() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const router = useRouter();

    return (
        <main className="min-h-screen bg-brand-background text-brand-foreground selection:bg-brand-accent/30">
            <Navbar onLogin={() => setIsAuthModalOpen(true)} />

            <div className="pt-32 pb-24 px-4 max-w-4xl mx-auto">
                <div className="flex flex-col items-center text-center">
                    {/* Profile Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative mb-8"
                    >
                        <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-brand-accent to-brand-accent/60 p-1">
                            <div className="w-full h-full rounded-full bg-brand-background flex items-center justify-center overflow-hidden">
                                {/* Avatar Placeholder */}
                                <span className="text-6xl font-black text-brand-foreground/10 select-none">PA</span>
                            </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-brand-accent p-2 rounded-xl border-4 border-brand-background">
                            <Code2 className="w-5 h-5 text-brand-accent-foreground" />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold mb-4 text-brand-foreground"
                    >
                        Pranit Akash
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-brand-accent font-medium mb-8 uppercase tracking-widest text-sm"
                    >
                        Visionary Developer & Creator
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-8 rounded-3xl bg-brand-card border border-brand-border backdrop-blur-xl mb-12 text-left shadow-2xl shadow-black/5 dark:shadow-none"
                    >
                        <p className="text-brand-foreground/60 leading-relaxed mb-6">
                            Hey there! I&apos;m Pranit, the developer behind **Voice Web**. I&apos;m obsessed with bridging the gap between human language and digital creation. My goal is to build tools that feel like extensions of our mind.
                        </p>
                        <p className="text-brand-foreground/60 leading-relaxed">
                            When I&apos;m not architecting LLM-driven interfaces, you&apos;ll find me exploring the latest in frontend performance or tinkering with hardware.
                        </p>
                    </motion.div>

                    {/* Social Links */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
                        {[
                            { name: "GitHub", icon: Github, href: "https://github.com/pranitakash", color: "hover:bg-gray-800" },
                            { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/pranit-akash/", color: "hover:bg-brand-accent" },
                            { name: "Instagram", icon: Instagram, href: "https://instagram.com/pranit_akash", color: "hover:bg-pink-600" },
                            { name: "Email", icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=pranit.dot.akash@gmail.com", color: "hover:bg-brand-accent" }
                        ].map((social, i) => (
                            <motion.a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + (i * 0.1) }}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full bg-brand-card border border-brand-border ${social.color} transition-all active:scale-95 group shadow-lg shadow-black/5 dark:shadow-none`}
                            >
                                <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform text-brand-foreground" />
                                <span className="font-medium text-brand-foreground">{social.name}</span>
                            </motion.a>
                        ))}
                    </div>
                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                        {[
                            { label: "Coffee Consumed", value: "∞ cups", icon: Heart, image: "/features/coffee.png", color: "text-brand-accent" },
                            { label: "Lines of Code", value: "1M+", icon: Code2, image: "/features/code.png", color: "text-brand-accent" },
                            { label: "Projects Shipped", value: "25+", icon: Rocket, image: "/features/rocket.png", color: "text-brand-accent" }
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                whileHover={{ y: -8 }}
                                className="relative group rounded-[2rem] bg-brand-card border border-brand-border overflow-hidden flex flex-col p-2 shadow-2xl shadow-black/5 dark:shadow-none"
                            >
                                <div className="relative h-44 rounded-[1.5rem] overflow-hidden mb-4 bg-brand-foreground/5">
                                    <motion.img
                                        src={stat.image}
                                        alt={stat.label}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                                        whileHover={{ scale: 1.15 }}
                                        transition={{ duration: 1, ease: "circOut" }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent opacity-60" />
                                    <div className="absolute bottom-4 left-4 p-2 rounded-xl bg-brand-background/60 backdrop-blur-xl border border-brand-border">
                                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                                    </div>
                                </div>
                                <div className="px-6 pb-6 pt-2 text-center">
                                    <span className="text-3xl font-black text-brand-foreground group-hover:text-brand-accent transition-colors tracking-tighter">
                                        {stat.value}
                                    </span>
                                    <p className="text-[10px] text-brand-foreground/30 uppercase font-black tracking-[0.2em] mt-2">
                                        {stat.label}
                                    </p>
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
