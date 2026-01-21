import type { Metadata } from "next";
import { FamilyProtectionClient } from "../../components/views/FamilyProtectionClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";
import { StructuredData, schemas } from "../../components/StructuredData";

export const metadata: Metadata = {
  title: "Humaneers | Family Office Cyber Security | High Net Worth Protection",
  description:
    "Enterprise cybersecurity for your family. Protect your home network, devices, and identity with SOC 2 compliant tools.",
  alternates: {
    canonical: "/family-protection",
  },
  openGraph: {
    title: "Humaneers | Family Office Cyber Security | High Net Worth Protection",
    description:
      "Enterprise cybersecurity for your family. Protect your home network, devices, and identity with SOC 2 compliant tools.",
    url: "https://humaneers.dev/family-protection",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Family Office Cyber Security",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Humaneers | Family Office Cyber Security | High Net Worth Protection",
    description: "Enterprise cybersecurity for your family.",
    images: ["/og-image.jpg"],
  },
};

export default function FamilyProtectionPage() {
  return (
    <>
      <StructuredData
        data={[
          schemas.service(
            "Cybersecurity",
            "Enterprise cybersecurity for your family. Protect your home network and identity."
          ),
          schemas.breadcrumb([
            { name: "Home", url: "https://humaneers.dev" },
            { name: "Services", url: "https://humaneers.dev/services" },
            { name: "Family Protection", url: "https://humaneers.dev/family-protection" },
          ]),
        ]}
      />
      <Suspense fallback={<PageLoader />}>
        <FamilyProtectionClient />
      </Suspense>
    </>
  );
}
