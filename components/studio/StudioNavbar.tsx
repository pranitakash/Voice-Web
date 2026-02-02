"use client";

import Link from "next/link";
import { useWebsiteStore } from "@/store/useWebsiteStore";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LogOut, LayoutDashboard, Waves } from "lucide-react";
import { useState } from "react";
import { LogoutModal } from "@/components/auth/LogoutModal";
import { ThemeToggle } from "@/components/ThemeToggle";

export const StudioNavbar = () => {
    const user = useWebsiteStore((state) => state.user);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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
                    <Link href="/" className="flex items-center gap-3 px-6 py-3 bg-brand-card/80 backdrop-blur-xl border border-brand-border rounded-full shadow-sm group hover:bg-brand-card transition-all">
                        <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-brand-accent/20">
                            <Waves className="w-5 h-5 text-brand-accent-foreground" />
                        </div>
                        <span className="text-xl font-bold text-brand-foreground tracking-tight">Voice Web</span>
                    </Link>
                </div>

                {/* Middle: Capsule */}
                <div className="hidden md:flex justify-center">
                    <div className="flex items-center gap-10 px-8 py-3 bg-brand-card/80 backdrop-blur-xl border border-brand-border rounded-full shadow-sm">
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium text-brand-accent hover:text-brand-accent transition-colors flex items-center gap-2"
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                        </Link>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center justify-end gap-4">
                    <ThemeToggle />
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-5 py-2.5 bg-brand-card/80 backdrop-blur-xl border border-brand-border text-brand-foreground text-sm font-bold rounded-full hover:bg-brand-card transition-all active:scale-95"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </div>

            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={confirmLogout}
            />
        </nav>
    );
};
