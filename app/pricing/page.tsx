
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
        color: "bg-blue-500/10 text-blue-400",
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
        color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
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
        color: "bg-blue-500/10 text-blue-400",
        cta: "Contact Sales",
        popular: false
    }
];

export default function PricingPage() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const router = useRouter();

    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-blue-500/30">
            <Navbar onLogin={() => setIsAuthModalOpen(true)} />

            <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
                    >
                        Simple, <span className="text-blue-400">power-focused</span> pricing.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/40 text-xl max-w-2xl mx-auto"
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
                            className={`relative p-8 rounded-3xl bg-white/5 border backdrop-blur-xl group hover:scale-[1.02] transition-all ${plan.popular ? 'border-blue-500/50 shadow-2xl shadow-blue-500/10' : 'border-white/10'}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                                    Most Popular
                                </div>
                            )}

                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${plan.color} border`}>
                                <plan.icon className="w-6 h-6" />
                            </div>

                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                {plan.price !== "Custom" && <span className="text-white/40 text-sm">/mo</span>}
                            </div>
                            <p className="text-white/60 text-sm mb-8">{plan.description}</p>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-3 text-white/50 group-hover:text-white/70 transition-colors">
                                        <Check className="w-5 h-5 text-blue-400 shrink-0" />
                                        <span className="text-sm font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => plan.price === "Custom" ? null : router.push('/studio')}
                                className={`w-full py-4 px-6 rounded-2xl font-bold transition-all ${plan.popular ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'}`}
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
