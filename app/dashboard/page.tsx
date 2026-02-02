"use client";

import { useEffect, useState } from "react";
import { useWebsiteStore, UserProfile } from "@/store/useWebsiteStore";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { AuthModal } from "@/components/auth/AuthModal";
import { User, Mail, Briefcase, History, Clock, Code, ArrowRight, Save } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { HistoryPreviewModal } from "@/components/dashboard/HistoryPreviewModal";
import { Section } from "@/store/useWebsiteStore";

const COUNTRIES = ["United States", "India", "United Kingdom", "Canada", "Germany", "France", "Japan", "Australia", "Brazil", "Other"];
const ROLES = ["Student", "Teacher", "Employee", "Freelancer", "Founder", "Designer", "Developer", "Other"];

import { Suspense } from "react";

function DashboardContent() {
    const user = useWebsiteStore((state) => state.user);
    const userProfile = useWebsiteStore((state) => state.userProfile);
    const setUserProfile = useWebsiteStore((state) => state.setUserProfile);
    const history = useWebsiteStore((state) => state.generationHistory);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UserProfile>({
        name: "",
        bio: "",
        email: "",
        country: "",
        role: "",
        useCase: "",
    });
    const [isSaving, setIsSaving] = useState(false);
    const [selectedHistoryItem, setSelectedHistoryItem] = useState<{ sections: Section[], prompt: string, id: string } | null>(null);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (userProfile) {
            setFormData({
                ...formData,
                ...userProfile
            });
        }
    }, [userProfile]);

    useEffect(() => {
        if (searchParams.get("setup") === "true") {
            setIsEditing(true);
        }
    }, [searchParams]);

    const handleSaveProfile = async () => {
        if (!user) {
            alert("No user found. Please log in again.");
            return;
        }

        if (!db) {
            alert("Firebase database is not connected. Check your configuration.");
            return;
        }

        // Simple Validation
        if (!formData.name.trim() || !formData.country || !formData.role || !formData.useCase.trim()) {
            alert("Please fill in all mandatory fields (Name, Country, Role, Use Case)");
            return;
        }

        setIsSaving(true);
        console.log("Saving profile for user:", user.uid, formData);

        try {
            await setDoc(doc(db, "users", user.uid), formData);
            console.log("Successfully saved to Firestore");
            setUserProfile(formData);
            setIsEditing(false);
            if (searchParams.get("setup") === "true") {
                router.replace('/dashboard');
            }
            alert("Profile saved successfully!");
        } catch (error: any) {
            console.error("Error saving profile:", error);
            if (error.message.includes("offline") || error.code === "unavailable") {
                alert("❌ Connection Error: Firestore is unreachable. \n\nPlease ensure you have: \n1. Created a 'Cloud Firestore' database in your Firebase console. \n2. Set your rules to allow reads/writes.");
            } else {
                alert(`Failed to save profile: ${error.message}`);
            }
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) {
        return (
            <main className="min-h-screen bg-brand-background text-brand-foreground flex flex-col items-center justify-center p-4">
                <Navbar onLogin={() => setIsAuthModalOpen(true)} />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <h2 className="text-3xl font-bold text-brand-foreground">Access Denied</h2>
                    <p className="text-brand-foreground/40">Please sign in to view your dashboard.</p>
                    <button
                        onClick={() => setIsAuthModalOpen(true)}
                        className="px-8 py-4 bg-brand-accent text-brand-accent-foreground rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-brand-accent/20"
                    >
                        Sign In Now
                    </button>
                </motion.div>
                <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            </main>
        );
    }

    const isSetupMode = searchParams.get("setup") === "true";

    return (
        <main className="min-h-screen bg-brand-background text-brand-foreground selection:bg-brand-accent/30">
            <Navbar onLogin={() => setIsAuthModalOpen(true)} />

            <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Sidebar / Profile Card */}
                    <div className="lg:col-span-1 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-brand-card border border-brand-border rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-black/5 dark:shadow-none"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 blur-3xl rounded-full" />

                            <div className="flex flex-col items-center text-center space-y-4 mb-8">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-accent to-brand-accent/60 p-1">
                                    <div className="w-full h-full rounded-full bg-brand-background flex items-center justify-center text-3xl font-bold text-brand-accent">
                                        {userProfile?.avatar ? (
                                            <img src={userProfile.avatar} alt="Avatar" className="w-[88px] h-[88px] rounded-full object-cover" />
                                        ) : (
                                            formData.name?.[0]?.toUpperCase() || "U"
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-brand-foreground">{userProfile?.name || "New Creator"}</h3>
                                    <div className="flex items-center justify-center gap-2 text-brand-foreground/40 text-sm">
                                        {userProfile?.role && <span>{userProfile.role}</span>}
                                        {userProfile?.country && <span>• {userProfile.country}</span>}
                                    </div>
                                </div>
                            </div>

                            {isEditing ? (
                                <div className="space-y-4">
                                    {isSetupMode && (
                                        <div className="p-3 bg-brand-accent/10 border border-brand-accent/20 rounded-xl text-brand-accent text-xs mb-4">
                                            Welcome! Please complete these basic fields to continue.
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <label className="text-xs text-brand-foreground/20 uppercase tracking-widest pl-2">Full Name *</label>
                                        <input
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Your Name"
                                            className="w-full bg-brand-foreground/5 border border-brand-border rounded-xl p-3 focus:border-brand-accent/50 outline-none transition-all text-brand-foreground"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs text-brand-foreground/20 uppercase tracking-widest pl-2">Country *</label>
                                            <select
                                                value={formData.country}
                                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                                className="w-full bg-brand-foreground/5 border border-brand-border rounded-xl p-3 focus:border-brand-accent/50 outline-none transition-all appearance-none text-brand-foreground"
                                            >
                                                <option value="" disabled className="bg-brand-card">Select</option>
                                                {COUNTRIES.map(c => <option key={c} value={c} className="bg-brand-card">{c}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-brand-foreground/20 uppercase tracking-widest pl-2">Role *</label>
                                            <select
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                                className="w-full bg-brand-foreground/5 border border-brand-border rounded-xl p-3 focus:border-brand-accent/50 outline-none transition-all appearance-none text-brand-foreground"
                                            >
                                                <option value="" disabled className="bg-brand-card">Select</option>
                                                {ROLES.map(r => <option key={r} value={r} className="bg-brand-card">{r}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-brand-foreground/20 uppercase tracking-widest pl-2">Primary Use Case *</label>
                                        <input
                                            value={formData.useCase}
                                            onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                                            placeholder="What will you use this tool for?"
                                            className="w-full bg-brand-foreground/5 border border-brand-border rounded-xl p-3 focus:border-brand-accent/50 outline-none transition-all text-brand-foreground"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-brand-foreground/20 uppercase tracking-widest pl-2">Bio</label>
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            placeholder="A short bio..."
                                            rows={2}
                                            className="w-full bg-brand-foreground/5 border border-brand-border rounded-xl p-3 focus:border-brand-accent/50 outline-none transition-all resize-none text-brand-foreground"
                                        />
                                    </div>
                                    <button
                                        onClick={handleSaveProfile}
                                        disabled={isSaving}
                                        className="w-full py-3 bg-brand-accent text-brand-accent-foreground rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isSaving ? "Saving..." : <><Save className="w-4 h-4" /> Save Profile</>}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="p-4 bg-brand-foreground/5 rounded-2xl border border-brand-border/50 space-y-4">
                                        <div>
                                            <p className="text-[10px] text-brand-foreground/20 uppercase tracking-tight mb-1">About</p>
                                            <p className="text-sm text-brand-foreground/60 italic">{userProfile?.bio || "No bio added."}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-brand-foreground/20 uppercase tracking-tight mb-1">Use Case</p>
                                            <p className="text-sm text-brand-foreground/80">{userProfile?.useCase || "Not specified."}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="w-full py-3 border border-brand-border rounded-xl font-medium text-brand-foreground hover:bg-brand-foreground/5 transition-all"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            )}
                        </motion.div>

                        <div className="bg-brand-accent/5 border border-brand-accent/10 rounded-3xl p-6 flex items-center gap-4">
                            <div className="w-10 h-10 bg-brand-accent/20 rounded-xl flex items-center justify-center">
                                <Clock className="w-5 h-5 text-brand-accent" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-brand-foreground">Pro Status</h4>
                                <p className="text-xs text-brand-foreground/40">Active until Dec 2026</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content / History */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-brand-foreground">
                                <History className="w-6 h-6 text-brand-accent" />
                                Generation History
                            </h2>
                            <span className="text-xs text-brand-foreground/20 px-3 py-1 border border-brand-border rounded-full font-mono">
                                {history.length} ITEMS
                            </span>
                        </div>

                        {history.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-brand-card border border-brand-border rounded-3xl p-12 text-center space-y-4 shadow-2xl shadow-black/5 dark:shadow-none"
                            >
                                <div className="w-16 h-16 bg-brand-foreground/5 rounded-full mx-auto flex items-center justify-center">
                                    <Code className="w-8 h-8 text-brand-foreground/10" />
                                </div>
                                <h3 className="text-xl font-medium text-brand-foreground/60">No generations yet</h3>
                                <p className="text-brand-foreground/20 text-sm max-w-xs mx-auto">
                                    Start using your voice in the Studio to see your history here.
                                </p>
                                <button
                                    onClick={() => router.push('/studio')}
                                    className="px-6 py-3 bg-brand-foreground/5 border border-brand-border rounded-xl hover:bg-brand-foreground/10 transition-all font-bold group inline-flex items-center gap-2 text-brand-foreground"
                                >
                                    Go to Studio
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {history.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ scale: 1.01, y: -2 }}
                                        className="bg-brand-card border border-brand-border rounded-2xl p-6 hover:border-brand-accent/30 transition-all cursor-pointer group relative overflow-hidden flex gap-6 shadow-xl shadow-black/5 dark:shadow-none"
                                        onClick={() => {
                                            setSelectedHistoryItem({
                                                id: item.id,
                                                prompt: item.prompt,
                                                sections: item.sections
                                            });
                                            setIsPreviewModalOpen(true);
                                        }}
                                    >
                                        {/* Subtle Glow */}
                                        <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/[0.02] transition-colors duration-500" />

                                        {/* Thumbnail Header */}
                                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-brand-foreground/5 border border-brand-border hidden sm:block shrink-0">
                                            <motion.img
                                                src={`/features/${index % 2 === 0 ? 'ai_brain.png' : 'realtime.png'}`}
                                                alt="Preview"
                                                className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                                                whileHover={{ scale: 1.2 }}
                                                transition={{ duration: 0.8 }}
                                            />
                                        </div>

                                        <div className="flex-1 flex items-start justify-between min-w-0">
                                            <div className="space-y-2 truncate">
                                                <p className="text-sm font-bold text-brand-accent font-mono tracking-tighter uppercase">Prompt</p>
                                                <h4 className="text-lg font-medium leading-tight text-brand-foreground/80 group-hover:text-brand-foreground transition-colors truncate">
                                                    &quot;{item.prompt}&quot;
                                                </h4>
                                                <div className="flex items-center gap-4 text-xs text-brand-foreground/40">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {new Date(item.timestamp).toLocaleDateString()}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Code className="w-3 h-3" />
                                                        {item.sections.length} Sections
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="w-10 h-10 rounded-xl bg-brand-foreground/5 flex items-center justify-center group-hover:bg-brand-accent transition-all shrink-0">
                                                <ArrowRight className="w-5 h-5 group-hover:text-brand-accent-foreground text-brand-foreground/20" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <Footer onEnter={() => router.push('/studio')} />
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

            <HistoryPreviewModal
                isOpen={isPreviewModalOpen}
                onClose={() => setIsPreviewModalOpen(false)}
                sections={selectedHistoryItem?.sections || []}
                prompt={selectedHistoryItem?.prompt || ''}
            />
        </main>
    );
}

export default function Dashboard() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-brand-background flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
