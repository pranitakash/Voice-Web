import { create } from 'zustand';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export type SectionType = 'hero' | 'bento' | 'navbar' | 'contact';

export type Section = {
  id: string;
  type: SectionType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any; // Flexible content structure
  styles: Record<string, string | number>;
};

export type UserProfile = {
  name: string;
  bio: string;
  avatar?: string;
  email: string;
  country: string;
  role: string;
  useCase: string;
};

export type GenerationHistory = {
  id: string;
  prompt: string;
  timestamp: number;
  sections: Section[];
};

interface WebsiteStore {
  user: any | null;
  userProfile: UserProfile | null;
  generationHistory: GenerationHistory[];
  sections: Section[];
  isListening: boolean;
  transcript: string;
  isGenerating: boolean;
  generationError: string | null;
  setUser: (user: any) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setGenerationHistory: (history: GenerationHistory[]) => void;
  addSection: (type: string) => void;
  removeSection: (id: string) => void;
  updateTheme: (theme: unknown) => void;
  setIsListening: (isListening: boolean) => void;
  setTranscript: (transcript: string) => void;
  generateLayout: (prompt: string) => void;
  generateFromPrompt: (prompt: string) => Promise<void>;
  clearSections: () => void;
}

export const useWebsiteStore = create<WebsiteStore>((set, get) => ({
  user: null,
  userProfile: null,
  generationHistory: [],
  sections: [],
  isListening: false,
  transcript: '',
  isGenerating: false,
  generationError: null,

  setUser: (user) => set({ user }),
  setUserProfile: (userProfile) => set({ userProfile }),
  setGenerationHistory: (generationHistory) => set({ generationHistory }),
  clearSections: () => set({ sections: [] }),

  addSection: (typeString) => {
    const type = typeString.toLowerCase() as SectionType;
    const id = Math.random().toString(36).substring(7);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let content: any = {};
    const styles: Record<string, string | number> = {};

    // Default connection logic "Brain"
    if (type === 'hero') {
      content = {
        title: "Voice Web",
        subtitle: "Build with your voice",
        cta: "Get Started"
      };
    } else if (type === 'bento') {
      content = {
        items: [
          { id: '1', title: 'Analytics', description: 'Real-time insights', colSpan: 2, rowSpan: 1 },
          { id: '2', title: 'Fast', description: 'Lightning speed', colSpan: 1, rowSpan: 1 },
          { id: '3', title: 'Secure', description: 'Bank-grade security', colSpan: 1, rowSpan: 2 },
        ]
      };
    } else if (type === 'navbar') {
      content = {
        title: 'Studio',
        links: ['Home', 'Features', 'Contact']
      };
    }

    const newSection: Section = { id, type, content, styles };

    set((state) => ({ sections: [...state.sections, newSection] }));
  },

  removeSection: (id) => {
    if (id === 'last') {
      set((state) => {
        const newSections = [...state.sections];
        newSections.pop();
        return { sections: newSections };
      });
    } else {
      set((state) => ({
        sections: state.sections.filter((s) => s.id !== id),
      }));
    }
  },

  updateTheme: (theme: unknown) => {
    console.log('Update theme', theme);
    // In a real app, we'd update a theme state here
  },

  setIsListening: (isListening) => set({ isListening }),
  setTranscript: (transcript) => set({ transcript }),

  // Natural language interpretation - simple keyword-based for now
  generateLayout: (prompt: string) => {
    console.log('[Store] generateLayout called with:', prompt);
    const lowerPrompt = prompt.toLowerCase();

    // Simple keyword detection (can be replaced with AI later)
    if (lowerPrompt.includes('hero') || lowerPrompt.includes('header') || lowerPrompt.includes('landing')) {
      const id = Math.random().toString(36).substring(7);
      const newSection: Section = {
        id,
        type: 'hero',
        content: {
          title: "Voice Web",
          subtitle: "Build with your voice",
          cta: "Get Started"
        },
        styles: {}
      };
      set((state) => ({ sections: [...state.sections, newSection] }));
      console.log('[Store] Added hero section');
    } else if (lowerPrompt.includes('bento') || lowerPrompt.includes('grid') || lowerPrompt.includes('features')) {
      const id = Math.random().toString(36).substring(7);
      const newSection: Section = {
        id,
        type: 'bento',
        content: {
          items: [
            { id: '1', title: 'Analytics', description: 'Real-time insights', colSpan: 2, rowSpan: 1 },
            { id: '2', title: 'Fast', description: 'Lightning speed', colSpan: 1, rowSpan: 1 },
            { id: '3', title: 'Secure', description: 'Bank-grade security', colSpan: 1, rowSpan: 2 },
          ]
        },
        styles: {}
      };
      set((state) => ({ sections: [...state.sections, newSection] }));
      console.log('[Store] Added bento section');
    } else if (lowerPrompt.includes('nav') || lowerPrompt.includes('menu')) {
      const id = Math.random().toString(36).substring(7);
      const newSection: Section = {
        id,
        type: 'navbar',
        content: {
          title: 'Studio',
          links: ['Home', 'Features', 'Contact']
        },
        styles: {}
      };
      set((state) => ({ sections: [...state.sections, newSection] }));
      console.log('[Store] Added navbar section');
    } else if (lowerPrompt.includes('remove') || lowerPrompt.includes('delete')) {
      set((state) => {
        const newSections = [...state.sections];
        newSections.pop();
        return { sections: newSections };
      });
      console.log('[Store] Removed last section');
    } else {
      console.log('[Store] No matching section type found in prompt');
    }
  },

  generateFromPrompt: async (prompt: string) => {
    console.log('[Store] ========================================');
    console.log('[Store] generateFromPrompt called');
    console.log('[Store] Prompt:', prompt);

    set({ isGenerating: true, generationError: null });
    console.log('[Store] State updated: isGenerating = true');

    try {
      const currentSections = get().sections;
      console.log('[Store] Sending POST request to /api/generate with currentSections...');
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, currentSections })
      });

      console.log('[Store] Response status:', response.status, response.statusText);

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("🚀 AI Rate Limit reached. Please wait 1-2 minutes before your next request.");
        }
        const errorText = await response.text();
        console.error('[Store] API returned error text:', errorText);
        let errorMessage = 'Failed to generate content';
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error || errorMessage;
          console.error('[Store] API error detail:', errorJson);
        } catch (e) {
          console.error('[Store] Could not parse error JSON');
        }
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      console.log('[Store] API response data:', responseData);

      const { sections: incomingSections } = responseData;
      console.log('[Store] Incoming sections count:', incomingSections?.length || 0);

      set((state) => {
        const updatedSections = [...state.sections];
        const newSectionsToHistory: Section[] = [];

        incomingSections.forEach((incoming: any) => {
          const index = updatedSections.findIndex(s => s.id === incoming.id);
          if (index !== -1) {
            // Update existing section
            updatedSections[index] = {
              ...updatedSections[index],
              ...incoming,
              styles: incoming.styles || updatedSections[index].styles
            };
            newSectionsToHistory.push(updatedSections[index]);
          } else {
            // Add new section
            const newSection = {
              ...incoming,
              id: incoming.id || Math.random().toString(36).substring(7),
              styles: incoming.styles || {}
            };
            updatedSections.push(newSection);
            newSectionsToHistory.push(newSection);
          }
        });

        const newHistoryItem: any = {
          prompt,
          timestamp: Date.now(),
          sections: newSectionsToHistory,
          userId: state.user?.uid || 'anonymous'
        };

        // Persist to Firestore if user is logged in
        if (state.user && db) {
          addDoc(collection(db, "history"), newHistoryItem).catch(err => {
            console.error("Failed to save history to Firestore:", err);
          });
        }

        return {
          sections: updatedSections,
          generationHistory: [{ id: 'temp-' + Date.now(), ...newHistoryItem }, ...state.generationHistory],
          isGenerating: false
        };
      });

      console.log('[Store] ✓ Successfully processed', incomingSections.length, 'sections');
      console.log('[Store] State updated: isGenerating = false');
    } catch (error) {
      console.error('[Store] ========================================');
      console.error('[Store] Generation error:', error);
      console.error('[Store] Error type:', typeof error);
      console.error('[Store] Error message:', error instanceof Error ? error.message : 'Unknown');
      console.error('[Store] Error stack:', error instanceof Error ? error.stack : 'No stack');

      set({
        isGenerating: false,
        generationError: error instanceof Error ? error.message : 'Unknown error'
      });

      console.log('[Store] State updated: isGenerating = false, generationError set');
    }
  }
}));
