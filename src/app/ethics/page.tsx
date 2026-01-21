import type { Metadata } from "next";
import { EthicsClient } from "../../components/views/EthicsClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Ethics Charter | Speak Up Policy",
  description:
    "Our code of ethics and whistleblower policy. Submit anonymous reports and view our core principles. Integrity, transparency, and accountability.",
  alternates: {
    canonical: "/ethics",
  },
  openGraph: {
    title: "Humaneers | Ethics Charter | Speak Up Policy",
    description:
      "Our code of ethics and whistleblower policy. Submit anonymous reports and view our core principles.",
    url: "https://humaneers.dev/ethics",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Humaneers Ethics Charter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Humaneers | Ethics Charter | Speak Up Policy",
    description: "Our code of ethics and whistleblower policy.",
    images: ["/og-image.jpg"],
  },
};

export default function EthicsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <EthicsClient />
    </Suspense>
  );
}
