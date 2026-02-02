"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, History } from "lucide-react";
import { Section } from "@/store/useWebsiteStore";
import { HeroSection } from "@/components/sections/HeroSection";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { Navbar } from "@/components/sections/Navbar";
import { ContactSection } from "@/components/sections/ContactSection";
import { useRouter } from "next/navigation";

interface HistoryPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    sections: Section[];
    prompt: string;
}

export const HistoryPreviewModal = ({ isOpen, onClose, sections, prompt }: HistoryPreviewModalProps) => {
    const router = useRouter();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 pointer-events-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-6xl h-full max-h-[90vh] bg-brand-card border border-brand-border rounded-[2.5rem] flex flex-col shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 md:p-8 border-b border-brand-border bg-brand-foreground/[0.02] flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-accent/10 border border-brand-accent/20 rounded-2xl flex items-center justify-center">
                                    <History className="w-6 h-6 text-brand-accent" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-brand-foreground/20 uppercase tracking-widest font-mono">Archive Preview</p>
                                    <h3 className="text-xl font-bold text-brand-foreground tracking-tight line-clamp-1">&quot;{prompt}&quot;</h3>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => router.push('/studio')}
                                    className="px-6 py-2.5 bg-brand-accent rounded-full text-sm font-bold text-brand-accent-foreground hover:opacity-90 transition-all flex items-center gap-2 group shadow-lg shadow-brand-accent/20"
                                >
                                    Open in Studio
                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-3 rounded-full bg-brand-foreground/5 text-brand-foreground/40 hover:text-brand-foreground hover:bg-brand-foreground/10 transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Preview Body */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar bg-brand-background p-6 md:p-12">
                            <div className="max-w-4xl mx-auto flex flex-col gap-12">
                                {sections.map((section, index) => (
                                    <motion.div
                                        key={section.id || index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="w-full"
                                    >
                                        {section.type === 'hero' && <HeroSection content={section.content} />}
                                        {section.type === 'bento' && <BentoGrid content={section.content} />}
                                        {section.type === 'navbar' && <Navbar content={section.content} />}
                                        {section.type === 'contact' && <ContactSection content={section.content} />}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="p-4 border-t border-brand-border bg-brand-foreground/[0.01] text-center shrink-0">
                            <p className="text-[10px] text-brand-foreground/10 font-mono tracking-widest uppercase">
                                Generated locally via Gemini 2.0 Flash • {sections.length} Components
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
