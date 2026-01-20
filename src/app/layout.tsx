import type { Metadata } from "next";
import { Suspense } from "react";
import "../styles/globals.css";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { PageLoader } from "../components/PageLoader";
import { TooltipProvider } from "../components/ui/tooltip";

export const metadata: Metadata = {
  title: "Humaneers | Enterprise Strategy. Built with Precision.",
  description:
    "Enterprise strategy for businesses and families. Built with precision, delivered with soul.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logomark_white.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
      { url: '/WordMarkV-2.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: light)' }
    ],
    apple: '/favicon.svg', // Fallback or generate a PNG if needed
    other: [
      {
        rel: 'manifest',
        url: '/manifest.json',
      },
    ],
  },
  manifest: "/manifest.json",

};

import { Analytics } from "../components/Analytics";
import { SessionTracker } from "../components/SessionTracker";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-brand-slate bg-brand-cream min-h-screen flex flex-col" suppressHydrationWarning>
        <TooltipProvider>
          <Header />
          <main id="main-content" className="flex-grow pt-20">
            <Suspense fallback={<PageLoader />}>{children}</Suspense>
          </main>
          <Suspense fallback={<div className="h-64 bg-brand-oxford" />}>
            <Footer />
          </Suspense>
        </TooltipProvider>
        <SessionTracker />
        <Analytics />
      </body>
    </html>
  );
}
