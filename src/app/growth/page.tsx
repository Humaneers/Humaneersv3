import type { Metadata } from "next";
import { GrowthClient } from "../../components/views/GrowthClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";
import { StructuredData, schemas } from "../../components/StructuredData";

export const metadata: Metadata = {
  title: "Humaneers | Brand Growth Strategy | Fractional CMO",
  description:
    "Brand strategy and marketing leadership for fast-growing teams. Visual identity, SEO, web engineering, and go-to-market execution.",
  alternates: {
    canonical: "/growth",
  },
  openGraph: {
    title: "Humaneers | Brand Growth Strategy | Fractional CMO",
    description:
      "Brand strategy and marketing leadership for fast-growing teams. Visual identity, SEO, web engineering, and go-to-market execution.",
    url: "https://humaneers.dev/growth",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Humaneers Growth Strategy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Humaneers | Brand Growth Strategy | Fractional CMO",
    description: "Brand strategy and marketing leadership for fast-growing teams.",
    images: ["/og-image.jpg"],
  },
};

export default function GrowthPage() {
  return (
    <>
      <StructuredData
        data={[
          schemas.service(
            "Marketing Strategy",
            "Brand strategy and marketing leadership for fast-growing teams."
          ),
          schemas.breadcrumb([
            { name: "Home", url: "https://humaneers.dev" },
            { name: "Services", url: "https://humaneers.dev/services" },
            { name: "Brand Growth", url: "https://humaneers.dev/growth" },
          ]),
        ]}
      />
      <Suspense fallback={<PageLoader />}>
        <GrowthClient />
      </Suspense>
    </>
  );
}
