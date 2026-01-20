"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface ConsentContextType {
    consent: boolean | null; // null = not yet decided
    acceptConsent: () => void;
    declineConsent: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export function ConsentProvider({ children }: { children: ReactNode }) {
    const [consent, setConsent] = useState<boolean | null>(null);

    useEffect(() => {
        // Check localStorage on mount
        const stored = localStorage.getItem("cookie_consent");
        if (stored === "true") {
            setConsent(true);
        } else if (stored === "false") {
            setConsent(false);
        }
        // If null, banner will show
    }, []);

    const acceptConsent = () => {
        setConsent(true);
        localStorage.setItem("cookie_consent", "true");
    };

    const declineConsent = () => {
        setConsent(false);
        localStorage.setItem("cookie_consent", "false");
    };

    return (
        <ConsentContext.Provider value={{ consent, acceptConsent, declineConsent }}>
            {children}
        </ConsentContext.Provider>
    );
}

export function useConsent() {
    const context = useContext(ConsentContext);
    if (context === undefined) {
        throw new Error("useConsent must be used within a ConsentProvider");
    }
    return context;
}
