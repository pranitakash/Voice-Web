"use client";

import { motion } from "framer-motion";

interface NavbarProps {
    content?: {
        title: string;
        links: string[];
    };
}

export function Navbar({ content }: NavbarProps) {
    const title = content?.title || 'Studio';
    const links = content?.links || ['Home', 'Features', 'Contact'];

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full p-4 border border-brand-border rounded-2xl bg-brand-card/40 backdrop-blur-xl"
        >
            <div className="flex items-center justify-between">
                {/* Logo/Title */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-accent to-brand-accent/60 flex items-center justify-center">
                        <span className="text-brand-accent-foreground font-bold text-sm">{title.charAt(0)}</span>
                    </div>
                    <span className="text-brand-foreground font-bold text-lg">{title}</span>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-6">
                    {links.map((link, index) => {
                        // Handle potential objects or non-string values from AI
                        const label = typeof link === 'object' ? (link as any).label : String(link);
                        const id = label.toLowerCase().replace(/\s+/g, '-');

                        return (
                            <motion.a
                                key={index}
                                href={`#${id}`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-brand-foreground/60 hover:text-brand-foreground transition-colors text-sm font-medium"
                            >
                                {label}
                            </motion.a>
                        );
                    })}
                </div>

                {/* CTA Button */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="px-4 py-2 rounded-lg bg-brand-foreground text-brand-background text-sm font-semibold hover:opacity-90 transition-colors"
                >
                    Get Started
                </motion.button>
            </div>
        </motion.nav>
    );
}
