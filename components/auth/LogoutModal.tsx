"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LogOut, X } from "lucide-react";

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const LogoutModal = ({ isOpen, onClose, onConfirm }: LogoutModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-brand-card border border-brand-border rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
                    >
                        {/* Glow effect */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-600/10 blur-3xl rounded-full" />

                        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center">
                                <LogOut className="w-8 h-8 text-red-500" />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-brand-foreground tracking-tight">Confirm Logout</h3>
                                <p className="text-brand-foreground/40 leading-relaxed">
                                    Are you sure you want to sign out of <span className="text-brand-foreground/60 font-medium">Voice Web</span>?
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 w-full">
                                <button
                                    onClick={onClose}
                                    className="py-4 bg-brand-foreground/5 border border-brand-border rounded-2xl font-bold text-brand-foreground/80 hover:bg-brand-foreground/10 transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className="py-4 bg-red-600 rounded-2xl font-bold text-white shadow-lg shadow-red-600/20 hover:bg-red-500 transition-all active:scale-95"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full bg-brand-foreground/5 text-brand-foreground/40 hover:text-brand-foreground hover:bg-brand-foreground/10 transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
