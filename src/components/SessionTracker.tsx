"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initSession, trackPageView } from "../lib/session";

function SessionTrackerContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Initialize session on mount (handles landing page, referrer, UTMs)
        initSession();
    }, []);

    useEffect(() => {
        // Track page views on route change
        if (pathname) {
            trackPageView(pathname);
        }
    }, [pathname, searchParams]);

    return null;
}

export function SessionTracker() {
    return (
        <Suspense fallback={null}>
            <SessionTrackerContent />
        </Suspense>
    );
}
