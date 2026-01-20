"use client";

import { useConsent } from "./providers/ConsentProvider";
import { Button } from "./ui/button";
import Link from "next/link";

export function CookieConsentBanner() {
  const { consent, acceptConsent, declineConsent } = useConsent();

  // Don't show if user already decided
  if (consent !== null) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-oxford/95 backdrop-blur border-t border-brand-copper/30 p-4 shadow-2xl">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-sm text-gray-300">
          <p className="mb-2">
            <strong className="text-white">We value your privacy.</strong> We use cookies and
            similar technologies to improve your experience, analyze site traffic, and provide
            support chat.
          </p>
          <p className="text-xs">
            Essential cookies are always active. Analytics and marketing cookies require your
            consent.{" "}
            <Link href="/privacy-policy" className="text-brand-copper hover:underline">
              Learn more
            </Link>
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <Button
            onClick={declineConsent}
            variant="outline"
            className="border-gray-500 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Decline
          </Button>
          <Button
            onClick={acceptConsent}
            className="bg-brand-copper hover:bg-brand-copper-dark text-white"
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}
