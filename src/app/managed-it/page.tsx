import type { Metadata } from "next";
import { ManagedITClient } from "../../components/views/ManagedITClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";
import { StructuredData, schemas } from "../../components/StructuredData";

export const metadata: Metadata = {
  title: "Humaneers | Managed IT Services | US-Based Support",
  description:
    "Enterprise-grade managed IT for small businesses. 100% US-based helpdesk, hybrid cloud infrastructure, and SOC 2 security compliance.",
  alternates: {
    canonical: "/managed-it",
  },
  openGraph: {
    title: "Humaneers | Managed IT Services | US-Based Support",
    description:
      "Enterprise-grade managed IT for small businesses. 100% US-based helpdesk, hybrid cloud infrastructure, and SOC 2 security compliance.",
    url: "https://humaneers.dev/managed-it",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Managed IT Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Humaneers | Managed IT Services | US-Based Support",
    description: "Enterprise-grade managed IT for small businesses.",
    images: ["/og-image.jpg"],
  },
};

export default function ManagedITPage() {
  return (
    <>
      <StructuredData
        data={[
          schemas.service(
            "IT Support",
            "Enterprise-grade managed IT for small businesses. 100% US-based helpdesk and SOC 2 security."
          ),
          schemas.breadcrumb([
            { name: "Home", url: "https://humaneers.dev" },
            { name: "Services", url: "https://humaneers.dev/services" },
            { name: "Managed IT", url: "https://humaneers.dev/managed-it" },
          ]),
        ]}
      />
      <Suspense fallback={<PageLoader />}>
        <ManagedITClient />
      </Suspense>
    </>
  );
}
