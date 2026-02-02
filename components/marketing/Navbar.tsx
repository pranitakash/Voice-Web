"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, Menu, X, ArrowRight, LayoutDashboard, LogOut, Settings, User, LogIn } from "lucide-react";
import Link from "next/link";
import { useWebsiteStore } from "@/store/useWebsiteStore";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LogoutModal } from "@/components/auth/LogoutModal";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavbarProps {
    onLogin: () => void;
}

export const Navbar = ({ onLogin }: NavbarProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const user = useWebsiteStore((state) => state.user);

    const handleLogout = async () => {
        setIsLogoutModalOpen(true);
    };

    const confirmLogout = async () => {
        if (auth) {
            await signOut(auth);
            setIsLogoutModalOpen(false);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 pointer-events-none">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 items-center pointer-events-auto">
                {/* Left: Branding */}
                <div className="flex justify-start">
                    <Link href="/" className="flex items-center gap-3 px-6 py-3 bg-brand-background/5 backdrop-blur-xl border border-brand-border rounded-full shadow-sm group hover:bg-brand-foreground/10 transition-all">
                        <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-brand-accent/20">
                            <Waves className="w-5 h-5 text-brand-accent-foreground" />
                        </div>
                        <span className="text-xl font-bold text-brand-foreground tracking-tight">Voice Web</span>
                    </Link>
                </div>

                {/* Middle: Links */}
                <div className="hidden md:flex justify-center">
                    <div className="flex items-center gap-10 px-8 py-3 bg-brand-background/5 backdrop-blur-xl border border-brand-border rounded-full shadow-sm">
                        <Link href="/pricing" className="text-sm font-medium text-brand-foreground/60 hover:text-brand-foreground transition-colors">Pricing</Link>
                        <Link href="/about" className="text-sm font-medium text-brand-foreground/60 hover:text-brand-foreground transition-colors">About</Link>
                        <Link href="/developer" className="text-sm font-medium text-brand-foreground/60 hover:text-brand-foreground transition-colors">Developer</Link>
                        {user && (
                            <Link href="/dashboard" className="text-sm font-medium text-brand-accent hover:opacity-80 transition-colors flex items-center gap-2">
                                Dashboard
                            </Link>
                        )}
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center justify-end gap-4">
                    <ThemeToggle />
                    {/* Auth Actions */}
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-brand-foreground/5 border border-brand-border text-brand-foreground text-sm font-bold rounded-full hover:bg-brand-foreground/10 transition-all active:scale-95"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={onLogin}
                            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-brand-foreground text-brand-background text-sm font-bold rounded-full hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-brand-accent/10"
                        >
                            <LogIn className="w-4 h-4" />
                            Login
                        </button>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-brand-foreground/5 border border-brand-border text-brand-foreground"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-24 left-6 right-6 p-8 bg-brand-card border border-brand-border rounded-3xl flex flex-col gap-6 md:hidden pointer-events-auto shadow-2xl"
                    >
                        <Link href="/pricing" className="text-lg font-medium text-brand-foreground/60">Pricing</Link>
                        <Link href="/about" className="text-lg font-medium text-brand-foreground/60">About</Link>
                        <Link href="/developer" className="text-lg font-medium text-brand-foreground/60">Developer</Link>
                        {user && (
                            <Link href="/dashboard" className="text-lg font-medium text-brand-accent flex items-center gap-2">
                                Dashboard
                            </Link>
                        )}
                        <hr className="border-brand-border/50" />
                        {user ? (
                            <button
                                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                                className="w-full py-4 bg-brand-foreground/5 border border-brand-border text-brand-foreground font-bold rounded-2xl flex items-center justify-center gap-2"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => { onLogin(); setIsMobileMenuOpen(false); }}
                                className="w-full py-4 bg-brand-foreground text-brand-background font-bold rounded-2xl flex items-center justify-center gap-2"
                            >
                                <LogIn className="w-5 h-5" />
                                Login
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={confirmLogout}
            />
        </nav>
    );
};
