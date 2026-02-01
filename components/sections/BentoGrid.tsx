"use client";

import { motion } from "framer-motion";

interface BentoItem {
    id: string;
    title: string;
    description: string;
    colSpan?: number;
    rowSpan?: number;
}

interface BentoGridProps {
    content?: {
        items: BentoItem[];
    };
}

export function BentoGrid({ content }: BentoGridProps) {
    const items = content?.items || [
        { id: '1', title: 'Feature 1', description: 'Description', colSpan: 2, rowSpan: 1 },
        { id: '2', title: 'Feature 2', description: 'Description', colSpan: 1, rowSpan: 1 },
        { id: '3', title: 'Feature 3', description: 'Description', colSpan: 1, rowSpan: 2 },
    ];

    return (
        <div className="w-full p-8 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(150px,auto)]">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
                        style={{
                            gridColumn: `span ${item.colSpan || 1}`,
                            gridRow: `span ${item.rowSpan || 1}`,
                        }}
                    >
                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-white/60 text-sm">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
