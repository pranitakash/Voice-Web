"use client";

import { useEffect } from "react";
import { useVoiceControl } from "@/hooks/useVoiceControl";

export function VoiceParser() {
    const { startListening } = useVoiceControl();

    useEffect(() => {
        // Auto-start listening on mount
        startListening();
        // startListening handles the "isListening" state and restarts if continuous
    }, [startListening]);

    return null; // Invisible component
}
