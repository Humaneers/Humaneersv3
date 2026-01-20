import type { Metadata } from "next";
import { GrowthClient } from "../../components/views/GrowthClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Brand Growth Strategy | Fractional CMO",
  description:
    "Brand strategy and marketing leadership for fast-growing teams. Visual identity, SEO, web engineering, and go-to-market execution.",
  alternates: {
    canonical: "/growth",
  },
};

export default function GrowthPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <GrowthClient />
    </Suspense>
  );
}
