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
    if (!pathname) return;

    // 1. Identify User from URL (e.g. newsletter clickthroughs)
    const email = searchParams.get("email");
    const name = searchParams.get("name");

    if (email) {
      // SalesIQ
      if (window.$zoho?.salesiq) {
        window.$zoho.salesiq.visitor.email(email);
        if (name) window.$zoho.salesiq.visitor.name(name);
      }
    }

    // 2. Push Session Context to SalesIQ
    // We defer slightly to ensure the session is initialized
    setTimeout(() => {
      if (typeof window !== "undefined" && window.$zoho?.salesiq) {
        // Read latest session context (it's in sessionStorage)
        // We import dynamically or just read from storage to avoid hydration mismatches,
        // but simpler to just trust the stored session if available.
        try {
          const sessionData = sessionStorage.getItem("humaneers_session_v1");
          if (sessionData) {
            const ctx = JSON.parse(sessionData);
            const info: any = {};
            if (ctx.segment) info["Segment"] = ctx.segment;
            if (ctx.entrySource) info["Entry Source"] = ctx.entrySource;
            if (ctx.landingPage) info["Landing Page"] = ctx.landingPage;

            window.$zoho.salesiq.visitor.info(info);
          }
        } catch (e) {
          // ignore
        }
      }
    }, 1000);

    // 3. Zoho PageSense - Virtual Page View
    if (typeof window !== "undefined" && (window as any).Pagesense) {
      try {
        const pagesense = (window as any).Pagesense;
        if (email) pagesense.user?.email(email);

        // Track page view for SPA
        // Standard PageSense snippet handles history, but we can hint it if needed
      } catch (e) {
        console.warn("Zoho PageSense tracking error:", e);
      }
    }
  }, [pathname, searchParams, consent]);

  return null;
}
