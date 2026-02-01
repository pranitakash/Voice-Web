"use client";

import Link from "next/link";
import { useWebsiteStore } from "@/store/useWebsiteStore";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { LogoutModal } from "@/components/auth/LogoutModal";

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
            <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
                {/* Left: Branding */}
                <Link href="/" className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-sm group hover:bg-white/10 transition-all">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                        <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">Voice Web</span>
                </Link>

                {/* Middle: Capsule */}
                <div className="hidden md:flex items-center gap-10 px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-sm">
                    <Link
                        href="/dashboard"
                        className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-white text-sm font-bold rounded-full hover:bg-white/10 transition-all active:scale-95"
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
