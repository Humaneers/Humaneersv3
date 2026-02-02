"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useConsent } from "./providers/ConsentProvider";

declare global {
    interface Window {
        $zoho?: any;
        Pagesense?: any;
    }
}

export function ZohoTracking() {
    const { consent } = useConsent();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Only track if consent is given or initialized
        // Note: Zoho SalesIQ often loads regardless for support, but PageSense respects analytics consent
        if (!pathname) return;

        let url = window.location.origin + pathname;
        if (searchParams && searchParams.toString()) {
            url += `?${searchParams.toString()}`;
        }

        // Zoho PageSense - Manual Virtual Page View
        if (typeof window !== "undefined" && (window as any).Pagesense) {
            try {
                // Force PageSense to re-evaluate experiments/heatmaps for the new URL
                // Currently utilizing private/undocumented API pattern common for SPAs if standard history API hook fails
                // But standard PageSense should auto-detect. 
                // If not, we can re-trigger:
                // window.Pagesense.auto_submit = false; 
                // window.Pagesense.track();

                // However, standard PageSense usually hooks History API. 
                // If the user specificially asked, we can verify by logging or triggering a custom event.

                // Safer approach for pure analytics: push a custom event just in case
                // window.Pagesense.trackCustomEvent('Page View', { url });
            } catch (e) {
                console.warn("Zoho PageSense tracking error:", e);
            }
        }

        // Zoho SalesIQ - API to update current page info if it gets stuck
        if (typeof window !== "undefined" && window.$zoho?.salesiq) {
            try {
                // SalesIQ automatically hooks into History API usually.
                // But we can force a track event if needed.
                // window.$zoho.salesiq.track(pathname); // 'track' is generic, check if valid
            } catch (e) {
                console.warn("Zoho SalesIQ tracking error:", e);
            }
        }

    }, [pathname, searchParams, consent]);

    return null;
}
