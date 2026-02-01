"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, Menu, X, ArrowRight, LayoutDashboard, LogOut, Settings, User, LogIn } from "lucide-react";
import Link from "next/link";
import { useWebsiteStore } from "@/store/useWebsiteStore";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LogoutModal } from "@/components/auth/LogoutModal";

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
            <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
                {/* Left: Branding */}
                <Link href="/" className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-sm group hover:bg-white/10 transition-all">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                        <Waves className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">Voice Web</span>
                </Link>

                {/* Middle: Links */}
                <div className="hidden md:flex items-center gap-10 px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-sm">
                    <Link href="/pricing" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Pricing</Link>
                    <Link href="/about" className="text-sm font-medium text-white/60 hover:text-white transition-colors">About</Link>
                    <Link href="/developer" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Developer</Link>
                    {user && (
                        <Link href="/dashboard" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
                            Dashboard
                        </Link>
                    )}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    {/* Auth Actions */}
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-white text-sm font-bold rounded-full hover:bg-white/10 transition-all active:scale-95"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={onLogin}
                            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-white/90 transition-all active:scale-95 shadow-lg"
                        >
                            <LogIn className="w-4 h-4" />
                            Login
                        </button>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white"
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
                        className="absolute top-24 left-6 right-6 p-8 bg-[#0A0A0A] border border-white/10 rounded-3xl flex flex-col gap-6 md:hidden pointer-events-auto shadow-2xl"
                    >
                        <Link href="/pricing" className="text-lg font-medium text-white/60">Pricing</Link>
                        <Link href="/about" className="text-lg font-medium text-white/60">About</Link>
                        <Link href="/developer" className="text-lg font-medium text-white/60">Developer</Link>
                        {user && (
                            <Link href="/dashboard" className="text-lg font-medium text-blue-400 flex items-center gap-2">
                                Dashboard
                            </Link>
                        )}
                        <hr className="border-white/5" />
                        {user ? (
                            <button
                                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                                className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-2"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => { onLogin(); setIsMobileMenuOpen(false); }}
                                className="w-full py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2"
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
