"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initSession, trackPageView } from "../lib/session";
import { useConsent } from "./providers/ConsentProvider";

function SessionTrackerContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { consent } = useConsent();

  useEffect(() => {
    // Only track if user has consented
    if (consent === true) {
      initSession();
    }
  }, [consent]);

  useEffect(() => {
    // Track page views on route change only with consent
    if (consent === true && pathname) {
      trackPageView(pathname);
    }
  }, [pathname, searchParams, consent]);

  return null;
}

export function SessionTracker() {
  return (
    <Suspense fallback={null}>
      <SessionTrackerContent />
    </Suspense>
  );
}
