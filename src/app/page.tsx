import { Metadata } from "next";
import { Suspense } from "react";
import { PageLoader } from "../components/PageLoader";
import { HomeClient } from "../components/views/HomeClient";
import { StructuredData, schemas } from "../components/StructuredData";

export const metadata: Metadata = {
  title: "Humaneers | Enterprise Strategy. Built with Precision.",
  description:
    "Enterprise strategy for businesses and families. Built with precision, delivered with soul. Modern IT, security, and brand growth.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Humaneers | Enterprise Strategy. Built with Precision.",
    description: "Enterprise strategy for businesses and families. Built with precision, delivered with soul.",
    url: "https://humaneers.dev",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Humaneers - Enterprise Strategy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Humaneers | Enterprise Strategy. Built with Precision.",
    description: "Enterprise strategy for businesses and families. Built with precision, delivered with soul.",
    images: ["/og-image.jpg"],
  },
};

export default function HomePage() {
  return (
    <>
      <StructuredData data={schemas.localBusiness(false)} />
      <Suspense fallback={<PageLoader />}>
        <HomeClient />
      </Suspense>
    </>
  );
}
