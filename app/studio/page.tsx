
"use client";

import { useWebsiteStore } from "@/store/useWebsiteStore";
import { motion } from "framer-motion";
import { VoiceParser } from "@/components/VoiceParser";
import { HeroSection } from "@/components/sections/HeroSection";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { Navbar } from "@/components/sections/Navbar";
import { ContactSection } from "@/components/sections/ContactSection";
import CommandCenter from "@/components/CommandCenter";
import { StudioNavbar } from "@/components/studio/StudioNavbar";

export default function Home() {
  const sections = useWebsiteStore((state) => state.sections);
  const isListening = useWebsiteStore((state) => state.isListening);
  const transcript = useWebsiteStore((state) => state.transcript);
  const isGenerating = useWebsiteStore((state) => state.isGenerating);

  console.log('[Page] Sections count:', sections.length);
  console.log('[Page] isGenerating:', isGenerating);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#050505] flex flex-col pt-24 pb-40">
      {/* Global Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(#222 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.8
        }}
      />

      <StudioNavbar />
      <VoiceParser />

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center">
        {/* Preview Canvas Container - Rigid Height Fix */}
        <div className="relative w-full h-[calc(100vh-220px)] bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col ring-1 ring-white/5">

          {/* Browser Header Decoration */}
          <div className="h-12 border-b border-white/5 bg-white/[0.03] flex items-center px-6 gap-3 shrink-0 backdrop-blur-md">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex-1 flex justify-center mr-12">
              <div className="bg-white/5 rounded-full px-4 py-1 text-[11px] text-white/20 font-mono w-64 text-center border border-white/5 flex items-center justify-center gap-2">
                preview.voiceweb.studio
              </div>
            </div>
          </div>

          {/* Scrollable Canvas Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar relative">
            <div className="relative z-10 w-full min-h-full p-4 md:p-12 flex flex-col gap-12">
              {sections.length === 0 && !isGenerating ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <h1 className="text-5xl font-bold text-white/80 mb-4 tracking-tight">Voice Web</h1>
                    <p className="text-lg text-white/40 mb-2">Say &quot;Add Hero&quot; to start building</p>
                    <p className="text-sm text-white/20">Or describe your website</p>
                  </motion.div>
                </div>
              ) : (
                <>
                  {sections.map((section) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full relative group/section"
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

                  {/* Loading Indicator inside Canvas */}
                  {isGenerating && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full p-12 border border-dashed border-indigo-500/30 rounded-3xl bg-indigo-500/5 backdrop-blur-xl"
                    >
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-indigo-400 font-medium">Gemini is designing your sections...</p>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Listening Indicator (Floating) */}
        <div className="absolute -top-12 right-2 flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${isListening ? 'bg-indigo-500 animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-gray-700'}`} />
          {isListening && (
            <span className="text-white/40 text-[10px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/10 shadow-2xl">
              {transcript || "Listening..."}
            </span>
          )}
        </div>
      </div>

      <CommandCenter />
    </main>
  );
}
