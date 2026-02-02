import { motion } from "framer-motion";
import { Mic, Zap, Brain, Cpu, Layout, Layers, MousePointer2, Globe, Share2, Shield } from "lucide-react";

const features = [
    {
        title: "Voice-First Interface",
        description: "Forget clicking and dragging. Build your layout as fast as you can speak it.",
        icon: Mic,
        image: "/features/speak.png",
        color: "text-brand-accent"
    },
    {
        icon: Zap,
        title: "Real-time Magic",
        description: "Watch your ideas morph into reality as you speak each word.",
        image: "/features/realtime.png", // Added image for consistency
        color: "text-brand-accent"
    },
    {
        icon: Brain,
        title: "Context Aware",
        description: "Our AI understands your brand voice and design preferences.",
        image: "/features/ai_brain.png", // Added image for consistency
        color: "text-brand-accent"
    },
    {
        title: "AI Layout Engine",
        description: "Powered by Gemini for high-fidelity, production-ready design decisions.",
        icon: Cpu,
        image: "/features/ai_brain.png",
        color: "text-blue-400" // Changed from indigo-400 to blue-400
    },
    {
        title: "Smart Components",
        description: "Adaptive blocks that understand context and content effortlessly.",
        icon: Globe,
        image: "/features/smart.png",
        color: "text-cyan-400"
    },
    {
        title: "One-Click Ship",
        description: "Export clean Next.js and Tailwind code ready for production.",
        icon: Share2,
        image: "/features/rocket.png",
        color: "text-pink-400"
    },
    {
        title: "Enterprise Grade",
        description: "Secure, performant, and built with modern architectural standards.",
        icon: Shield,
        image: "/features/enterprise.png",
        color: "text-slate-400"
    }
];

export const Features = () => {
    return (
        <section className="py-32 px-4 bg-brand-background">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-bold tracking-widest uppercase mb-6"
                    >
                        Capabilities
                    </motion.span>
                    <h2 className="text-5xl font-bold text-brand-foreground mb-6">Why Voice Web?</h2>
                    <p className="text-brand-foreground/40 text-xl max-w-2xl">Next-generation tools for next-generation creators.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.8 }}
                            whileHover={{ y: -8 }}
                            className="relative group rounded-[2.5rem] bg-brand-card border border-brand-border overflow-hidden flex flex-col p-2 shadow-2xl shadow-black/5 dark:shadow-none"
                        >
                            <div className="relative h-56 rounded-[2rem] overflow-hidden mb-6 bg-brand-foreground/5">
                                <motion.img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                                    whileHover={{ scale: 1.15 }}
                                    transition={{ duration: 1, ease: "circOut" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-5 left-5 p-2.5 rounded-xl bg-brand-background/60 backdrop-blur-xl border border-brand-border">
                                    <feature.icon className={`w-5 h-5 ${feature.color === 'text-brand-accent' ? 'text-brand-accent' : feature.color}`} />
                                </div>
                            </div>

                            <div className="px-8 pb-10 flex-1">
                                <h3 className="text-2xl font-bold text-brand-foreground mb-4 tracking-tight group-hover:text-brand-accent transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-brand-foreground/40 leading-relaxed group-hover:text-brand-foreground/60 transition-colors">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Background Glow */}
                            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-brand-accent/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
