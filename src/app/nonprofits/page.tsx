import type { Metadata } from "next";
import { NonProfitsClient } from "../../components/views/NonProfitsClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | IT for Nonprofits | 501(c)(3) Tech Support",
  description:
    "Mission-focused IT for nonprofits. Discounted pricing, grant-ready security policies, and donor data protection.",
  alternates: {
    canonical: "/nonprofits",
  },
};

export default function NonProfitsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <NonProfitsClient />
    </Suspense>
  );
}
