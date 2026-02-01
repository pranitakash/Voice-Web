"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactSectionProps {
    content?: {
        title?: string;
        description?: string;
    };
}

export function ContactSection({ content }: ContactSectionProps) {
    const title = content?.title || 'Get in Touch';
    const description = content?.description || 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.';

    return (
        <div className="w-full p-8 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-xl">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
                    <p className="text-white/60">{description}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">Message</label>
                            <textarea
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors resize-none"
                                placeholder="Your message..."
                            />
                        </div>
                        <button className="w-full px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition-colors">
                            Send Message
                        </button>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                    >
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                            <div className="p-2 rounded-lg bg-blue-500/20">
                                <Mail className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-medium mb-1">Email</h3>
                                <p className="text-white/60 text-sm">hello@example.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                            <div className="p-2 rounded-lg bg-blue-500/20">
                                <Phone className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-medium mb-1">Phone</h3>
                                <p className="text-white/60 text-sm">+1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                            <div className="p-2 rounded-lg bg-green-500/20">
                                <MapPin className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-medium mb-1">Location</h3>
                                <p className="text-white/60 text-sm">123 Main St, City, Country</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
