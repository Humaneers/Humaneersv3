import type { Metadata } from "next";
import { FractionalLeadershipClient } from "../../components/views/FractionalLeadershipClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";
import { StructuredData, schemas } from "../../components/StructuredData";

export const metadata: Metadata = {
  title: "Humaneers | Fractional CIO & CMO | Executive Leadership",
  description:
    "Strategy without the salary cap. Get a fractional CIO, CISO, or CMO to lead your technology and growth teams.",
  alternates: {
    canonical: "/fractional-leadership",
  },
  openGraph: {
    title: "Humaneers | Fractional CIO & CMO | Executive Leadership",
    description:
      "Strategy without the salary cap. Get a fractional CIO, CISO, or CMO to lead your technology and growth teams.",
    url: "https://humaneers.dev/fractional-leadership",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fractional Executive Leadership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Humaneers | Fractional CIO & CMO | Executive Leadership",
    description: "Strategy without the salary cap. Fractional CIO, CISO, or CMO services.",
    images: ["/og-image.jpg"],
  },
};

export default function FractionalLeadershipPage() {
  return (
    <>
      <StructuredData
        data={[
          schemas.service(
            "Executive Consulting",
            "Strategy without the salary cap. Fractional CIO, CISO, and CMO services."
          ),
          schemas.breadcrumb([
            { name: "Home", url: "https://humaneers.dev" },
            { name: "Services", url: "https://humaneers.dev/services" },
            { name: "Fractional Leadership", url: "https://humaneers.dev/fractional-leadership" },
          ]),
        ]}
      />
      <Suspense fallback={<PageLoader />}>
        <FractionalLeadershipClient />
      </Suspense>
    </>
  );
}
