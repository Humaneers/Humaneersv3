"use client";

/**
 * Datadog RUM Integration Component
 *
 * This component handles Datadog Real User Monitoring initialization with
 * consent awareness and user session tracking.
 *
 * Usage:
 * - Import and render in root layout (after ConsentProvider)
 * - Automatically initializes when user grants consent
 * - Integrates with Zoho SalesIQ for user context
 */

import { useEffect } from "react";
import { useConsent } from "./providers/ConsentProvider";
import { datadog } from "../lib/datadog";
import { getSessionId } from "../lib/session";

export function DatadogRUM() {
  const { consent } = useConsent();

  useEffect(() => {
    // Only initialize if user has consented to analytics
    if (consent === true) {
      // Initialize Datadog RUM
      datadog.init(true);

      // Set anonymous user context using session ID
      const sessionId = getSessionId();
      if (sessionId) {
        datadog.setUser(sessionId, {
          session_type: "anonymous",
          consent_given: true,
        });
      }

      // Integrate with Zoho SalesIQ if available
      if (typeof window !== "undefined" && window.$zoho?.salesiq?.visitor) {
        try {
          const visitorInfo = window.$zoho.salesiq.visitor.info();
          if (visitorInfo) {
            datadog.setUser(sessionId || "unknown", {
              zoho_visitor_id: visitorInfo.visitor_id || "unknown",
              session_type: "zoho_tracked",
              consent_given: true,
            });
          }
        } catch (error) {
          console.warn("[Datadog] Failed to integrate with Zoho SalesIQ:", error);
        }
      }

      // Track page visibility changes
      const handleVisibilityChange = () => {
        if (document.hidden) {
          datadog.trackAction("page_hidden");
        } else {
          datadog.trackAction("page_visible");
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      // Cleanup
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    } else if (consent === false) {
      // User explicitly declined consent
      datadog.init(false);
    }
    // If consent is null, we're still waiting for user decision
  }, [consent]);

  return null; // No UI rendered
}

/**
 * TypeScript augmentation for Zoho SalesIQ global
 */
declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, string>) => void;
    $zoho?: {
      salesiq?: {
        ready?: () => void;
        track?: (event: string) => void;
        visitor?: {
          info: () => {
            visitor_id?: string;
            name?: string;
            email?: string;
          } | null;
        };
      };
    };
  }
}
