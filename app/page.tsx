
"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/marketing/Hero";
import { Process } from "@/components/marketing/Process";
import { LivePreview } from "@/components/marketing/LivePreview";
import { Features } from "@/components/marketing/Features";
import { Footer } from "@/components/marketing/Footer";
import { Navbar } from "@/components/marketing/Navbar";
import { AuthModal } from "@/components/auth/AuthModal";
import { auth } from "@/lib/firebase";
import { useWebsiteStore } from "@/store/useWebsiteStore";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const user = useWebsiteStore((state) => state.user);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handleEnterStudio = () => {
    if (user || !auth) {
      // If no auth is configured, we bypass for local dev
      setIsTransitioning(true);
      setTimeout(() => {
        router.push("/studio");
      }, 800);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#030303] selection:bg-blue-500/30 selection:text-blue-200">
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] bg-black pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <Navbar onLogin={() => setIsAuthModalOpen(true)} />
        <Hero onEnter={handleEnterStudio} />
        <Process />
        <LivePreview />
        <Features />
        <Footer onEnter={handleEnterStudio} />
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </main>
  );
}
