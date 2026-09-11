"use client";

import { useEffect } from "react";

import { PageHeader } from "@/components/sections/PageHeader";

// Define window extension for analytics
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params?: {
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: any;
      }
    ) => void;
    $zoho?: any;
  }
}

function ConversionTracker() {
  useEffect(() => {
    // 1. Google Ads / Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "generate_lead", {
        event_category: "form",
        event_label: "success",
      });
    }

    // 2. Zoho PageSense / SalesIQ
    if (typeof window !== "undefined" && window.$zoho?.salesiq?.track) {
      window.$zoho.salesiq.track("Lead Generated");
    }
  }, []);
  return null;
}

export function ThankYouClient() {
  return (
    <>
      <PageHeader
        scheme="cream"
        align="center"
        heading="Request Received!"
        description="Thank you for reaching out. We've received your information and our team will review it shortly. Expect to hear from us within 1 business day."
        ctas={[{ label: "Return Home", href: "/" }]}
      />
      <ConversionTracker />
    </>
  );
}
