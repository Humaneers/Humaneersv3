import type { Metadata } from "next";
import { AboutClient } from "../../components/views/AboutClient";
import { StructuredData, schemas } from "../../components/StructuredData";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | About Us | Enterprise Standards for Small Business",
  description:
    "Humaneers closes the gap between enterprise-grade technology and small business needs. Learn about our story, values, and 100% US-based team.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Humaneers | About Us | Enterprise Standards for Small Business",
    description:
      "Humaneers closes the gap between enterprise-grade technology and small business needs. Learn about our story, values, and 100% US-based team.",
    url: "https://humaneers.dev/about",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About Humaneers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Humaneers | About Us | Enterprise Standards for Small Business",
    description:
      "Humaneers closes the gap between enterprise-grade technology and small business needs.",
    images: ["/og-image.jpg"],
  },
};

export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={schemas.breadcrumb([
          { name: "Home", url: "https://humaneers.dev" },
          { name: "About Us", url: "https://humaneers.dev/about" },
        ])}
      />
      <Suspense fallback={<PageLoader />}>
        <AboutClient />
      </Suspense>
    </>
  );
}
