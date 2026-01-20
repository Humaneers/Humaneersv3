"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useEffect } from "react";

// Define window extension for analytics
declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, string>) => void;
    $zoho?: {
      salesiq?: {
        ready?: () => void;
        track?: (event: string) => void;
      };
    };
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
    <div className="min-h-screen bg-brand-cream flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6 border-t-4 border-brand-oxford">
          <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-brand-oxford">Request Received!</h1>
            <p className="text-gray-600">
              Thank you for reaching out. We've received your information and our team will review
              it shortly.
            </p>
          </div>
          <ConversionTracker />

          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-6">
              Expect to hear from us within 1 business day.
            </p>

            <Link href="/">
              <Button className="w-full bg-brand-copper hover:bg-brand-copper-dark text-white py-6">
                Return Home <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
