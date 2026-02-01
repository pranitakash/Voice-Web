
"use client";

import { useWebsiteStore } from "@/store/useWebsiteStore";
import { motion } from "framer-motion";
import { VoiceParser } from "@/components/VoiceParser";
import { HeroSection } from "@/components/sections/HeroSection";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { Navbar } from "@/components/sections/Navbar";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  const sections = useWebsiteStore((state) => state.sections);
  const isListening = useWebsiteStore((state) => state.isListening);
  const transcript = useWebsiteStore((state) => state.transcript);
  const isGenerating = useWebsiteStore((state) => state.isGenerating);

  console.log('[Page] Sections count:', sections.length);
  console.log('[Page] Sections:', sections);
  console.log('[Page] isGenerating:', isGenerating);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden" style={{ background: '#050505' }}>
      <VoiceParser />

      {/* Dot Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#333333 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Listening Indicator (Top Right) */}
      <div className="fixed top-6 right-8 z-50 flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`} />
        {isListening && (
          <span className="text-white/40 text-sm font-mono tracking-wider">{transcript || "Listening..."}</span>
        )}
      </div>

      {/* Main Canvas Area */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center pt-24 pb-20 px-4 md:px-8 gap-8">

        {sections.length === 0 && !isGenerating ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h1 className="text-6xl font-bold text-white/80 mb-4 tracking-tight">Voice Web Studio</h1>
            <p className="text-lg text-white/40 mb-2">Say &quot;Add Hero&quot; to start building</p>
            <p className="text-sm text-white/20">Or describe your website: &quot;Make a landing page for a coffee shop&quot;</p>
          </div>
        ) : (
          <>
            {sections.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-7xl"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                style={section.styles as any || {}}
              >
                {section.type === 'hero' && <HeroSection content={section.content} />}
                {section.type === 'bento' && <BentoGrid content={section.content} />}
                {section.type === 'navbar' && <Navbar content={section.content} />}
                {section.type === 'contact' && <ContactSection content={section.content} />}
                {!['hero', 'bento', 'navbar', 'contact'].includes(section.type) && (
                  <div className="p-8 border border-dashed border-white/10 rounded-xl text-center text-white/30">
                    Unknown Section Type: {section.type}
                  </div>
                )}
              </motion.div>
            ))}

            {/* Loading Indicator */}
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-7xl p-8 border border-dashed border-purple-500/30 rounded-xl bg-purple-500/5 backdrop-blur-xl"
              >
                <div className="flex items-center justify-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  <p className="text-purple-400 font-medium">Gemini is designing your sections...</p>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
