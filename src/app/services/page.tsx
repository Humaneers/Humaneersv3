import type { Metadata } from "next";
import { ServicesClient } from "../../components/views/ServicesClient";
import { StructuredData, schemas } from "../../components/StructuredData";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Comprehensive IT Services | Nationwide Support",
  description:
    "Full-spectrum IT support: Managed IT, Brand Growth, Family Protection, and Crisis Management. 100% US-based engineering.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Humaneers | Comprehensive IT Services | Nationwide Support",
    description:
      "Full-spectrum IT support: Managed IT, Brand Growth, Family Protection, and Crisis Management. 100% US-based engineering.",
    url: "https://humaneers.dev/services",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Humaneers Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Humaneers | Comprehensive IT Services | Nationwide Support",
    description:
      "Full-spectrum IT support: Managed IT, Brand Growth, Family Protection, and Crisis Management.",
    images: ["/og-image.jpg"],
  },
};

export default function ServicesPage() {
  return (
    <>
      <StructuredData
        data={schemas.breadcrumb([
          { name: "Home", url: "https://humaneers.dev" },
          { name: "Services", url: "https://humaneers.dev/services" },
        ])}
      />
      <Suspense fallback={<PageLoader />}>
        <ServicesClient />
      </Suspense>
    </>
  );
}
