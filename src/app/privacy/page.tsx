import type { Metadata } from "next";
import { PrivacyClient } from "../../components/views/PrivacyClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Privacy Policy",
  description:
    "Our commitment to protecting your personal data. We are custodians, not owners, of your data. Read our privacy policy.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Humaneers | Privacy Policy",
    description:
      "Our commitment to protecting your personal data. We are custodians, not owners, of your data.",
    url: "https://humaneers.dev/privacy",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Humaneers Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Humaneers | Privacy Policy",
    description: "Our commitment to protecting your personal data.",
    images: ["/og-image.jpg"],
  },
};

export default function PrivacyPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <PrivacyClient />
    </Suspense>
  );
}
