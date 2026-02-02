
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
    <main className="relative h-screen w-full overflow-hidden bg-brand-background flex flex-col pt-24 pb-40">
      {/* Global Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none z-0 bg-dot-grid opacity-[0.3] dark:opacity-80 transition-opacity"
      />

      <StudioNavbar />
      <VoiceParser />

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center">
        {/* Preview Canvas Container - Rigid Height Fix */}
        <div className="relative w-full h-[calc(100vh-220px)] bg-brand-card border border-brand-border rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col ring-1 ring-brand-border/50">

          {/* Browser Header Decoration */}
          <div className="h-12 border-b border-brand-border bg-brand-foreground/[0.03] flex items-center px-6 gap-3 shrink-0 backdrop-blur-md">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex-1 flex justify-center mr-12">
              <div className="bg-brand-background/20 rounded-full px-4 py-1 text-[11px] text-brand-foreground/30 font-mono w-64 text-center border border-brand-border flex items-center justify-center gap-2">
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
                    <h1 className="text-5xl font-bold text-brand-foreground/80 mb-4 tracking-tight">Voice Web</h1>
                    <p className="text-lg text-brand-foreground/40 mb-2">Say &quot;Add Hero&quot; to start building</p>
                    <p className="text-sm text-brand-foreground/20">Or describe your website</p>
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
                        <div className="p-8 border border-dashed border-brand-border rounded-xl text-center text-brand-foreground/30">
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
                      className="w-full p-12 border border-dashed border-brand-accent/30 rounded-3xl bg-brand-accent/5 backdrop-blur-xl"
                    >
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
                        <p className="text-brand-accent font-medium">Gemini is designing your sections...</p>
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
          <div className={`w-2.5 h-2.5 rounded-full ${isListening ? 'bg-brand-accent animate-pulse shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]' : 'bg-brand-foreground/20'}`} />
          {isListening && (
            <span className="text-brand-foreground/40 text-[10px] font-mono tracking-widest uppercase bg-brand-card/60 backdrop-blur-xl px-3 py-1.5 rounded-full border border-brand-border shadow-2xl">
              {transcript || "Listening..."}
            </span>
          )}
        </div>
      </div>

      <CommandCenter />
    </main>
  );
}
