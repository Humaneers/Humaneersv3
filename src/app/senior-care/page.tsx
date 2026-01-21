import type { Metadata } from "next";
import { SeniorCareClient } from "../../components/views/SeniorCareClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";
import { StructuredData, schemas } from "../../components/StructuredData";

export const metadata: Metadata = {
  title: "Humaneers | Senior Citizen Care Plans | Dignified Tech Support",
  description:
    "Respectful, patient technology support for seniors. Fraud protection, simplified iPad/computer setup, and 24/7 help for your loved ones.",
  alternates: {
    canonical: "/senior-care",
  },
  openGraph: {
    title: "Humaneers | Senior Citizen Care Plans | Dignified Tech Support",
    description:
      "Respectful, patient technology support for seniors. Fraud protection, simplified iPad/computer setup, and 24/7 help for your loved ones.",
    url: "https://humaneers.dev/senior-care",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Senior Care IT Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Humaneers | Senior Citizen Care Plans | Dignified Tech Support",
    description: "Respectful, patient technology support for seniors.",
    images: ["/og-image.jpg"],
  },
};

export default function SeniorCarePage() {
  return (
    <>
      <StructuredData
        data={[
          schemas.service(
            "Tech Support for Seniors",
            "Respectful technology support, fraud protection, and device setup for seniors."
          ),
          schemas.breadcrumb([
            { name: "Home", url: "https://humaneers.dev" },
            { name: "Services", url: "https://humaneers.dev/services" },
            { name: "Senior Care", url: "https://humaneers.dev/senior-care" },
          ]),
        ]}
      />
      <Suspense fallback={<PageLoader />}>
        <SeniorCareClient />
      </Suspense>
    </>
  );
}
