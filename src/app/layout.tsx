import type { Metadata } from "next";
import { Suspense } from "react";
import "../styles/globals.css";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { PageLoader } from "../components/PageLoader";
import { TooltipProvider } from "../components/ui/tooltip";
import { ContactModalProvider } from "../components/providers/ContactModalProvider";
import { ContactModalWrapper } from "../components/ContactModalWrapper";

export const metadata: Metadata = {
  title: "Humaneers | Enterprise Strategy. Built with Precision.",
  description:
    "Enterprise strategy for businesses and families. Built with precision, delivered with soul. SOC 2 compliant managed IT, cybersecurity, and brand growth.",
  keywords: [
    "managed IT services",
    "SOC 2 compliance",
    "family cybersecurity",
    "fractional CTO",
    "fractional CMO",
    "enterprise security",
    "brand growth",
    "senior care technology",
  ],
  authors: [{ name: "Humaneers" }],
  creator: "Humaneers",
  publisher: "Humaneers",
  metadataBase: new URL("https://humaneers.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://humaneers.dev",
    siteName: "Humaneers",
    title: "Humaneers | Enterprise Strategy. Built with Precision.",
    description:
      "Enterprise strategy for businesses and families. Built with precision, delivered with soul.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Humaneers - Enterprise Strategy for Businesses and Families",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Humaneers | Enterprise Strategy. Built with Precision.",
    description:
      "Enterprise strategy for businesses and families. Built with precision, delivered with soul.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

import { Analytics } from "../components/Analytics";
import { SessionTracker } from "../components/SessionTracker";
import { ConsentProvider } from "../components/providers/ConsentProvider";
import { CookieConsentBanner } from "../components/CookieConsentBanner";
import { StructuredData, schemas } from "../components/StructuredData";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <StructuredData data={schemas.organization()} />
      </head>
      <body
        className="font-sans antialiased text-brand-slate bg-brand-cream min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        <ConsentProvider>
          <ContactModalProvider>
            <TooltipProvider>
              <Header />
              <main id="main-content" className="flex-grow pt-20">
                <Suspense fallback={<PageLoader />}>{children}</Suspense>
              </main>
              <Suspense fallback={<div className="h-64 bg-brand-oxford" />}>
                <Footer />
              </Suspense>
              <ContactModalWrapper />
            </TooltipProvider>
          </ContactModalProvider>
          <SessionTracker />
          <Analytics />
          <CookieConsentBanner />
        </ConsentProvider>
      </body>
    </html>
  );
}
