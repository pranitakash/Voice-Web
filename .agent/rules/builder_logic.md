---
trigger: always_on
---

# Project Rules: AI Voice Site Studio

## 1. Project Identity & Purpose
- **Brand Name:** Voice Web Studio (Remove all references to "Giga.ai").
- **Core Function:** This is a **Website Builder Workspace**, not a landing page or a chatbot.
- **The UI:** The main interface must be a blank "Infinite Canvas" with a dot-grid background where website sections appear in real-time.

## 2. Architecture & State
- **State Source:** All UI must be driven strictly by the `useWebsiteStore` Zustand store.
- **Dynamic Rendering:** `app/page.tsx` must map through the `sections` array in the store and render the corresponding components from `/components/builder`.

## 3. Voice & Interaction Logic
- **API:** Use `window.webkitSpeechRecognition` for Windows compatibility.
- **Action Mapping:** - "Add Hero" -> Triggers `addSection('hero')`.
    - "Add Bento" -> Triggers `addSection('bento')`.
    - "Delete" -> Removes the last section.
- **Command Bar:** The floating pill at the bottom must show the live transcription and have a glowing "active" state when the mic is on.

## 4. Visual Standards
- **Theme:** High-contrast Dark Mode (#050505 background).
- **Style:** Glassmorphism, Geist/Inter fonts, and Framer Motion for "pop-in" entry animations.