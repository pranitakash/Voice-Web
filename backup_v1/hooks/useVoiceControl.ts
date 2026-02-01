/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useCallback } from 'react';
import { useWebsiteStore } from '../store/useWebsiteStore';

declare global {
    interface Window {
        webkitSpeechRecognition: any;
    }
}

export const useVoiceControl = () => {
    const { addSection, updateTheme, removeSection, setTranscript, setIsListening, generateFromPrompt } = useWebsiteStore();
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
            restartAttemptsRef.current = 0;
            return;
        }

        // "Change background to [Color]"
        const themeMatch = lowerCommand.match(/(?:change|set)\s+background(?:\s+to)?\s+(\w+)/i);
        if (themeMatch) {
            console.log('[VoiceParser] ✓ Theme change detected:', themeMatch[1]);
            updateTheme(themeMatch[1]);
            setTranscript(`Background: ${themeMatch[1]}`);
            restartAttemptsRef.current = 0;
            return;
        }

        // "Remove last"
        if (lowerCommand.includes('remove last') || lowerCommand.includes('delete last')) {
            console.log('[VoiceParser] ✓ Remove last section');
            removeSection('last');
            setTranscript('Removed last section');
            restartAttemptsRef.current = 0;
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
            restartAttemptsRef.current = 0;
            return;
        }

        // If no match, show what was heard
        console.log('[VoiceParser] ✗ No match found for command');
        setTranscript(`Heard: "${command}"`);
        restartAttemptsRef.current = 0;
    }, [addSection, updateTheme, removeSection, setTranscript, generateFromPrompt]);

    // Initialize speech recognition once
    useEffect(() => {
        if (typeof window !== 'undefined' && window.webkitSpeechRecognition) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';
            recognition.maxAlternatives = 1;

            recognition.onstart = () => {
                console.log('[Voice] Recognition Started');
                setIsListening(true);
                restartAttemptsRef.current = 0;
            };

            recognition.onend = () => {
                console.log('[Voice] Recognition Ended');
                setIsListening(false);

                // Auto-restart if we haven't exceeded max attempts
                if (restartAttemptsRef.current < MAX_RESTART_ATTEMPTS) {
                    console.log('[Voice] Auto-restarting... (attempt', restartAttemptsRef.current + 1, ')');
                    setTimeout(() => {
                        if (recognitionRef.current) {
                            try {
                                recognitionRef.current.start();
                                restartAttemptsRef.current++;
                            } catch (e) {
                                console.warn('[Voice] Restart failed:', e);
                            }
                        }
                    }, 1000);
                } else {
                    console.warn('[Voice] Max restart attempts reached. Please manually restart.');
                    setTranscript('Voice stopped. Click to restart.');
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
                    console.warn('[Voice] Microphone access denied.');
                    setTranscript('Mic Denied - Please allow microphone access');
                    setIsListening(false);
                    restartAttemptsRef.current = MAX_RESTART_ATTEMPTS; // Don't auto-restart
                } else if (event.error === 'no-speech') {
                    console.warn('[Voice] No speech detected. Will auto-restart...');
                    setTranscript('No speech detected...');
                    // Let onend handle the restart
                } else if (event.error === 'audio-capture') {
                    console.error('[Voice] No microphone found or audio capture failed.');
                    setTranscript('No microphone detected');
                    setIsListening(false);
                    restartAttemptsRef.current = MAX_RESTART_ATTEMPTS;
                } else if (event.error === 'network') {
                    console.error('[Voice] Network error occurred.');
                    setTranscript('Network error');
                    // Allow restart for network errors
                } else {
                    console.error('[Voice] Unknown error:', event.error);
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
            console.warn('[Voice] Speech recognition not supported in this browser.');
            setTranscript('Voice not supported - Use Chrome/Edge');
        }
    }, [processCommand, setTranscript, setIsListening]);

    const startListening = useCallback(() => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
                restartAttemptsRef.current = 0;
                console.log('[Voice] Manual Start');
            } catch (e: any) {
                if (e.message?.includes('already started')) {
                    console.log('[Voice] Already listening');
                } else {
                    console.error('[Voice] Error starting recognition:', e);
                }
            }
        } else {
            console.warn('[Voice] Speech recognition not initialized.');
        }
    }, []);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            restartAttemptsRef.current = MAX_RESTART_ATTEMPTS; // Prevent auto-restart
            console.log('[Voice] Manual Stop');
        }
    }, []);

    return { startListening, stopListening };
};
