
"use client";

import { motion } from "framer-motion";
import { Check, Zap, Sparkles, Building2 } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { AuthModal } from "@/components/auth/AuthModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

const plans = [
    {
        name: "Starter",
        price: "$0",
        description: "Perfect for exploring the power of voice-driven design.",
        features: [
            "Up to 3 projects",
            "Standard voice commands",
            "Gemini 1.5 Flash access",
            "Community support",
            "Basic export options"
        ],
        icon: Sparkles,
        color: "bg-brand-accent/10 text-brand-accent",
        cta: "Start for free",
        popular: false
    },
    {
        name: "Pro",
        price: "$19",
        description: "For professionals who need speed and limitless creativity.",
        features: [
            "Unlimited projects",
            "Advanced AI reasoning",
            "Gemini 1.5 Pro access",
            "Priority rendering speeds",
            "Premium section templates",
            "Custom domain export"
        ],
        icon: Zap,
        color: "bg-brand-accent/20 text-brand-accent border-brand-accent/30",
        cta: "Go Pro",
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "Tailored solutions for large teams and agencies.",
        features: [
            "Dedicated AI model fine-tuning",
            "Team collaboration tools",
            "SSO & Advanced security",
            "24/7 Dedicated support",
            "Custom API integration",
            "Whitelabeling options"
        ],
        icon: Building2,
        color: "bg-brand-accent/10 text-brand-accent",
        cta: "Contact Sales",
        popular: false
    }
];

export default function PricingPage() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const router = useRouter();

    return (
        <main className="min-h-screen bg-brand-background text-brand-foreground selection:bg-brand-accent/30">
            <Navbar onLogin={() => setIsAuthModalOpen(true)} />

            <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-brand-foreground"
                    >
                        Simple, <span className="text-brand-accent">power-focused</span> pricing.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-brand-foreground/40 text-xl max-w-2xl mx-auto"
                    >
                        Choose the level of AI power that suits your workflow. Ship faster than ever before.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-8 rounded-3xl bg-brand-card border backdrop-blur-xl group hover:scale-[1.02] transition-all ${plan.popular ? 'border-brand-accent/50 shadow-2xl shadow-brand-accent/10' : 'border-brand-border'}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-accent text-brand-accent-foreground text-xs font-bold rounded-full">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${plan.color} border`}>
                                <plan.icon className="w-6 h-6" />
                            </div>

                            <h3 className="text-2xl font-bold mb-2 text-brand-foreground">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-4xl font-bold text-brand-foreground">{plan.price}</span>
                                {plan.price !== "Custom" && <span className="text-brand-foreground/40 text-sm">/mo</span>}
                            </div>
                            <p className="text-brand-foreground/60 text-sm mb-8">{plan.description}</p>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-3 text-brand-foreground/50 group-hover:text-brand-foreground/70 transition-colors">
                                        <Check className="w-5 h-5 text-brand-accent shrink-0" />
                                        <span className="text-sm font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => plan.price === "Custom" ? null : router.push('/studio')}
                                className={`w-full py-4 px-6 rounded-2xl font-bold transition-all ${plan.popular ? 'bg-brand-accent hover:opacity-90 text-brand-accent-foreground shadow-lg shadow-brand-accent/20' : 'bg-brand-foreground/10 hover:bg-brand-foreground/20 text-brand-foreground border border-brand-border'}`}
                            >
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Preview or similar can go here if needed */}
            </div>

            <Footer onEnter={() => router.push('/studio')} />
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </main>
    );
}
