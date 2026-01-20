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
};

export default function PricingPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <PricingClient />
    </Suspense>
  );
}
