/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useCallback } from 'react';
import { useWebsiteStore } from '../store/useWebsiteStore';

declare global {
    interface Window {
        webkitSpeechRecognition: any;
    }
}

export const useVoiceControl = () => {
    const { addSection, updateTheme, removeSection, setTranscript, setIsListening, isListening, generateFromPrompt } = useWebsiteStore();
    const recognitionRef = useRef<any>(null);
    const restartAttemptsRef = useRef(0);
    const MAX_RESTART_ATTEMPTS = 3;

    const processCommand = useCallback((command: string) => {
        console.log('[VoiceParser] ========================================');
        console.log('[VoiceParser] Processing command:', command);
        console.log('[VoiceParser] Command length:', command.length, 'words:', command.split(' ').length);

        const lowerCommand = command.trim().toLowerCase();

        // "Add [Hero/Bento/Contact/Navbar]" - Simple commands
        const addMatch = lowerCommand.match(/(?:add|create)\s+(hero|bento|contact|navbar)/i);
        if (addMatch) {
            console.log('[VoiceParser] ✓ Match found: Add', addMatch[1]);
            addSection(addMatch[1]);
            setTranscript(`Added ${addMatch[1]}`);
            setIsListening(false);
            restartAttemptsRef.current = MAX_RESTART_ATTEMPTS;
            return;
        }

        // "Change background to [Color]"
        const themeMatch = lowerCommand.match(/(?:change|set)\s+background(?:\s+to)?\s+(\w+)/i);
        if (themeMatch) {
            console.log('[VoiceParser] ✓ Theme change detected:', themeMatch[1]);
            updateTheme(themeMatch[1]);
            setTranscript(`Background: ${themeMatch[1]}`);
            setIsListening(false);
            restartAttemptsRef.current = MAX_RESTART_ATTEMPTS;
            return;
        }

        // "Remove last"
        if (lowerCommand.includes('remove last') || lowerCommand.includes('delete last')) {
            console.log('[VoiceParser] ✓ Remove last section');
            removeSection('last');
            setTranscript('Removed last section');
            setIsListening(false);
            restartAttemptsRef.current = MAX_RESTART_ATTEMPTS;
            return;
        }

        // Descriptive prompts - trigger AI generation
        const descriptiveKeywords = ['make', 'create', 'build', 'design', 'landing page', 'website', 'for a', 'for my', 'about'];
        const hasDescriptiveKeyword = descriptiveKeywords.some(keyword => lowerCommand.includes(keyword));
        const wordCount = command.split(' ').length;
        const isDescriptive = hasDescriptiveKeyword && wordCount > 3;

        console.log('[VoiceParser] Descriptive check:');
        console.log('[VoiceParser]   - Has keyword:', hasDescriptiveKeyword);
        console.log('[VoiceParser]   - Word count:', wordCount, '> 3:', wordCount > 3);
        console.log('[VoiceParser]   - Is descriptive:', isDescriptive);

        if (isDescriptive) {
            console.log('[VoiceParser] ✓ Descriptive prompt detected!');
            console.log('[VoiceParser] Triggering AI generation with prompt:', command);
            setTranscript('Generating...');
            generateFromPrompt(command);

            // Auto-off after command
            setIsListening(false);
            restartAttemptsRef.current = MAX_RESTART_ATTEMPTS;
            return;
        }

        // If no match, show what was heard
        console.log('[VoiceParser] ✗ No match found for command');
        setTranscript(`Heard: "${command}"`);

        // Auto-off even on no match to ensure user is in control
        setIsListening(false);
        restartAttemptsRef.current = MAX_RESTART_ATTEMPTS;
    }, [addSection, updateTheme, removeSection, setTranscript, generateFromPrompt, setIsListening, MAX_RESTART_ATTEMPTS]);

    // Unified logic to start/stop based on store state
    useEffect(() => {
        if (!recognitionRef.current) return;

        if (isListening) {
            try {
                recognitionRef.current.start();
                console.log('[Voice] Sync: Recognition Started');
                restartAttemptsRef.current = 0;
            } catch (e: any) {
                if (!e.message?.includes('already started')) {
                    console.error('[Voice] Sync Error starting:', e);
                }
            }
        } else {
            try {
                recognitionRef.current.stop();
                console.log('[Voice] Sync: Recognition Stopped');
                restartAttemptsRef.current = MAX_RESTART_ATTEMPTS; // Prevent auto-restart
            } catch (e) {
                // Ignore if already stopped
            }
        }
    }, [isListening]);

    // Initialize speech recognition once
    useEffect(() => {
        if (typeof window !== 'undefined' && window.webkitSpeechRecognition) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';
            recognition.maxAlternatives = 1;

            recognition.onstart = () => {
                console.log('[Voice] Recognition Event: Started');
                // We don't set isListening here because it's the source of truth
            };

            recognition.onend = () => {
                console.log('[Voice] Recognition Event: Ended');

                // ONLY auto-restart if the store still thinks we should be listening
                // and we haven't hit our limit
                const currentIsListening = useWebsiteStore.getState().isListening;

                if (currentIsListening && restartAttemptsRef.current < MAX_RESTART_ATTEMPTS) {
                    console.log('[Voice] Auto-restarting... (attempt', restartAttemptsRef.current + 1, ')');
                    setTimeout(() => {
                        if (recognitionRef.current && useWebsiteStore.getState().isListening) {
                            try {
                                recognitionRef.current.start();
                                restartAttemptsRef.current++;
                            } catch (e) {
                                console.warn('[Voice] Restart failed:', e);
                            }
                        }
                    }, 500);
                }
            };

            recognition.onresult = (event: any) => {
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        const final = event.results[i][0].transcript;
                        console.log('[Voice] Final result:', final);
                        processCommand(final);
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                if (interimTranscript) {
                    setTranscript(interimTranscript);
                }
            };

            recognition.onerror = (event: any) => {
                console.error('[Voice] Error:', event.error);

                if (event.error === 'not-allowed') {
                    setTranscript('Mic Denied - Please allow microphone access');
                    setIsListening(false);
                    restartAttemptsRef.current = MAX_RESTART_ATTEMPTS;
                } else if (event.error === 'no-speech') {
                    // Silent handling for no-speech
                    console.log('[Voice] No speech detected - silencing...');
                    // onend will handle the restart IF isListening is true
                } else if (event.error === 'audio-capture') {
                    setTranscript('No microphone detected');
                    setIsListening(false);
                    restartAttemptsRef.current = MAX_RESTART_ATTEMPTS;
                } else if (event.error === 'network') {
                    setTranscript('Network error');
                } else {
                    setTranscript(`Error: ${event.error}`);
                }
            };

            recognitionRef.current = recognition;

            // Cleanup on unmount
            return () => {
                if (recognitionRef.current) {
                    recognitionRef.current.stop();
                }
            };
        } else {
            console.warn('[Voice] Speech recognition not supported');
            setTranscript('Voice not supported - Use Chrome/Edge');
        }
    }, [processCommand, setTranscript, setIsListening]);

    // start/stop listening functions now just toggle the store
    const startListening = useCallback(() => setIsListening(true), [setIsListening]);
    const stopListening = useCallback(() => setIsListening(false), [setIsListening]);

    return { startListening, stopListening };
};
