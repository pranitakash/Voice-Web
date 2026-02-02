
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogIn, Mail, Lock, UserPlus, ArrowRight } from "lucide-react";
import { auth, googleProvider, setPersistence, browserLocalPersistence } from "@/lib/firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    // Ensure persistent login
    useEffect(() => {
        if (auth) {
            setPersistence(auth, browserLocalPersistence).catch(console.error);
        }
    }, []);

    const handleGoogleSignIn = async () => {
        if (!auth) {
            setError("Firebase Auth is not configured.");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            await signInWithPopup(auth, googleProvider);
            router.push("/studio");
            onClose();
        } catch (error: any) {
            setError(error.message || "Failed to sign in with Google");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth) {
            setError("Firebase Auth is not configured.");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
                // In a real app, we'd add Firestore profile data here
                router.push("/dashboard?setup=true");
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                router.push("/studio");
            }
            onClose();
        } catch (error: any) {
            setError(error.message || "Authentication failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-brand-background/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-brand-card border border-brand-border rounded-3xl p-10 shadow-2xl overflow-hidden"
                    >
                        {/* Glow Effect */}
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-accent/20 blur-[80px] rounded-full pointer-events-none" />

                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 text-brand-foreground/40 hover:text-brand-foreground transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center space-y-3 mb-10">
                            <div className="w-12 h-12 bg-brand-accent rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-brand-accent/20">
                                {isSignUp ? <UserPlus className="w-6 h-6 text-brand-accent-foreground" /> : <LogIn className="w-6 h-6 text-brand-accent-foreground" />}
                            </div>
                            <h2 className="text-2xl font-bold text-brand-foreground">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
                            <p className="text-brand-foreground/40 text-sm">
                                {isSignUp ? "Join our elite community of creators." : "Sign in to access your Studio workspace."}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm animate-shake">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleEmailAuth} className="space-y-4 mb-8">
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-foreground/20 group-focus-within:text-brand-accent transition-colors" />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-brand-foreground/5 border border-brand-border rounded-2xl py-4 pl-12 pr-4 text-brand-foreground placeholder:text-brand-foreground/20 focus:outline-none focus:border-brand-accent/50 transition-all"
                                />
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-foreground/20 group-focus-within:text-brand-accent transition-colors" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-brand-foreground/5 border border-brand-border rounded-2xl py-4 pl-12 pr-4 text-brand-foreground placeholder:text-brand-foreground/20 focus:outline-none focus:border-brand-accent/50 transition-all"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-brand-accent text-brand-accent-foreground font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-brand-accent/20"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-brand-accent-foreground/20 border-t-brand-accent-foreground rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {isSignUp ? "Create Account" : "Sign In"}
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-brand-border/50" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-brand-card px-4 text-brand-foreground/20 tracking-widest">Or continue with</span>
                            </div>
                        </div>

                        <button
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="w-full py-4 bg-brand-foreground/5 border border-brand-border text-brand-foreground font-medium rounded-2xl flex items-center justify-center gap-3 hover:bg-brand-foreground/10 transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                            <svg className="w-5 h-5 shadow-sm" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Google
                        </button>

                        <p className="mt-8 text-center text-sm">
                            <span className="text-brand-foreground/40">
                                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                            </span>
                            <button
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="ml-2 text-brand-accent font-bold hover:opacity-80 transition-colors"
                            >
                                {isSignUp ? "Sign In" : "Sign Up"}
                            </button>
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
