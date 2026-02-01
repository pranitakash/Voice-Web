'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Command, RotateCcw } from 'lucide-react';
import { useWebsiteStore } from '@/store/useWebsiteStore';

const Waveform = ({ isListening }: { isListening: boolean }) => {
    return (
        <div className="flex items-center gap-0.5 h-4 ml-3">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="w-1 bg-blue-400 rounded-full"
                    animate={{
                        height: isListening ? [4, 16, 4] : 4,
                        opacity: isListening ? 1 : 0.3,
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

export default function CommandCenter() {
    const { isListening, setIsListening, transcript, isGenerating, generationError } = useWebsiteStore();
    const [localError, setLocalError] = useState<string | null>(null);

    // Sync generation error to local state
    useEffect(() => {
        if (generationError) {
            setLocalError(generationError);
        }
    }, [generationError]);

    // Keyboard shortcut Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setLocalError(null);
                setIsListening(!isListening);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isListening, setIsListening]);

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1,
                    borderColor: localError
                        ? '#ef4444'
                        : isGenerating
                            ? '#3b82f6'
                            : 'rgba(255,255,255,0.1)',
                    boxShadow: localError
                        ? '0 0 20px rgba(239, 68, 68, 0.5), 0 0 40px rgba(239, 68, 68, 0.3)'
                        : isGenerating
                            ? '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)'
                            : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between gap-4 px-1 py-1 pr-6 bg-[#0A0A0A]/90 backdrop-blur-xl rounded-full border shadow-2xl ring-1 ring-white/5"
            >
                <div className="flex items-center gap-3 flex-1 overflow-hidden min-h-[48px]">
                    {/* Toggle Button */}
                    <button
                        onClick={() => setIsListening(!isListening)}
                        className={`p-3 rounded-full transition-all duration-300 ${isListening ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        {isListening ? <Mic size={20} /> : <MicOff size={20} />}
                    </button>

                    {/* Transcript / Placeholder */}
                    <div className="flex-1 flex flex-col justify-center overflow-hidden">
                        <AnimatePresence mode="wait">
                            {localError ? (
                                <motion.div
                                    key="error"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="flex items-center gap-2 px-2"
                                >
                                    <p className="text-sm font-medium text-red-400 truncate flex-1">
                                        {localError}
                                    </p>
                                    <button
                                        onClick={() => {
                                            setLocalError(null);
                                            setIsListening(true);
                                        }}
                                        className="p-1.5 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors"
                                        title="Restart"
                                    >
                                        <RotateCcw size={14} className="text-red-400" />
                                    </button>
                                </motion.div>
                            ) : isGenerating ? (
                                <motion.p
                                    key="processing"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm font-medium text-blue-400 truncate px-2"
                                >
                                    Gemini is designing your site...
                                </motion.p>
                            ) : transcript ? (
                                <motion.p
                                    key={transcript}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="text-sm font-medium text-white truncate px-2"
                                >
                                    {transcript}
                                </motion.p>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col px-2"
                                >
                                    <span className="text-sm font-medium text-white/80">Voice Web</span>
                                    <span className="text-[10px] text-white/40 font-mono flex items-center gap-1">
                                        <Command size={10} /> Press Ctrl+K
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Visualizer */}
                <Waveform isListening={isListening} />
            </motion.div >
        </div >
    );
}
