"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Waves } from "lucide-react";
import { useState } from "react";
import { LegalModal } from "./LegalModal";

interface FooterProps {
    onEnter: () => void;
}

export const Footer = ({ onEnter }: FooterProps) => {
    const [legalType, setLegalType] = useState<"privacy" | "terms" | null>(null);

    return (
        <footer className="py-24 px-4 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 text-center">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to speak your vision?</h2>
                    <p className="text-white/40 text-lg max-w-xl mx-auto">
                        Join the elite designers crafting the future of the web with Voice Web.
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onEnter}
                    className="group px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full flex items-center gap-3 transition-colors shadow-2xl shadow-blue-600/20"
                >
                    Enter Voice Web
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <div className="w-full pt-20 flex flex-col md:flex-row items-center justify-between border-t border-white/5 gap-6 text-center md:text-left">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
                            <Waves className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-white tracking-tight">Voice Web</span>
                    </div>

                    <div className="text-white/20 text-sm">
                        © {new Date().getFullYear()} Voice Web. All rights reserved.
                    </div>

                    <div className="flex gap-8 text-white/40 text-sm font-medium">
                        <button onClick={() => setLegalType("privacy")} className="hover:text-white transition-colors">Privacy</button>
                        <button onClick={() => setLegalType("terms")} className="hover:text-white transition-colors">Terms</button>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
                    </div>
                </div>
            </div>

            <LegalModal
                isOpen={legalType !== null}
                onClose={() => setLegalType(null)}
                type={legalType || "privacy"}
            />
        </footer>
    );
};
