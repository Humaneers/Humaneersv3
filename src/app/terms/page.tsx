import type { Metadata } from "next";
import { TermsClient } from "../../components/views/TermsClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Terms of Service",
  description:
    "Legal agreement and service terms for Humaneers clients. SLAs, liability, and usage policies.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Humaneers | Terms of Service",
    description:
      "Legal agreement and service terms for Humaneers clients. SLAs, liability, and usage policies.",
    url: "https://humaneers.dev/terms",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Humaneers Terms of Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Humaneers | Terms of Service",
    description: "Legal agreement and service terms for Humaneers clients.",
    images: ["/og-image.jpg"],
  },
};

export default function TermsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <TermsClient />
    </Suspense>
  );
}
