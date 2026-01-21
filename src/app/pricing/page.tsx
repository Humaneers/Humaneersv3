import type { Metadata } from "next";
import { PricingClient } from "../../components/views/PricingClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Transparent Managed IT Pricing | No Hidden Fees",
  description:
    "Clear pricing for managed IT, family protection, and fractional leadership. No per-device fees for households, no markup on nonprofit licensing.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Transparent Pricing | Humaneers",
    description:
      "Enterprise-grade managed IT starting at $90/user. Family protection from $45/month. No hidden fees, no per-device charges.",
    url: "https://humaneers.dev/pricing",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Humaneers Pricing - Transparent IT Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transparent Pricing | Humaneers",
    description:
      "Enterprise-grade managed IT starting at $90/user. Family protection from $45/month.",
    images: ["/og-image.jpg"],
  },
};

export default function PricingPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <PricingClient />
    </Suspense>
  );
}
