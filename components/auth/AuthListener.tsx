"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useWebsiteStore, UserProfile, GenerationHistory } from "@/store/useWebsiteStore";
import { doc, getDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";

export const AuthListener = () => {
    const setUser = useWebsiteStore((state) => state.setUser);
    const setUserProfile = useWebsiteStore((state) => state.setUserProfile);
    const setGenerationHistory = useWebsiteStore((state) => state.setGenerationHistory);

    useEffect(() => {
        if (!auth) return;

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);

            if (user && db) {
                // Fetch profile from Firestore if it exists
                try {
                    const docRef = doc(db, "users", user.uid);
                    // Use a timeout or catch the specific "offline" error
                    const docSnap = await getDoc(docRef).catch((err) => {
                        if (err.code === 'unavailable' || err.message.includes('offline')) {
                            console.error("🔥 Firestore is unreachable.");
                            throw err;
                        }
                        throw err;
                    });

                    if (docSnap && docSnap.exists()) {
                        setUserProfile(docSnap.data() as UserProfile);
                    } else {
                        // If no profile yet, set a minimal one from auth
                        const minimalProfile: UserProfile = {
                            name: user.displayName || "Studio Creator",
                            email: user.email || "",
                            bio: "",
                            avatar: user.photoURL || "",
                            country: "",
                            role: "",
                            useCase: ""
                        };
                        setUserProfile(minimalProfile);
                    }

                    // Fetch Generation History
                    const historyRef = collection(db, "history");
                    const q = query(historyRef, where("userId", "==", user.uid), orderBy("timestamp", "desc"));
                    const historySnap = await getDocs(q);

                    const history: GenerationHistory[] = [];
                    historySnap.forEach((doc) => {
                        history.push({ id: doc.id, ...doc.data() } as GenerationHistory);
                    });
                    setGenerationHistory(history);

                } catch (error: any) {
                    console.error("Error in AuthListener Firestore fetch:", error.message);
                }
            } else {
                setUserProfile(null);
                setGenerationHistory([]);
            }
        });

        return () => unsubscribe();
    }, [setUser, setUserProfile, setGenerationHistory]);

    return null;
};
