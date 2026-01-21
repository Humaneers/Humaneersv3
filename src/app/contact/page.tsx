import type { Metadata } from "next";
import { ContactClient } from "../../components/views/ContactClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Contact Us | Sales & Support",
  description:
    "Get in touch with Humaneers. Sales inquiries, technical support, and general questions. We're here to help build something that lasts.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Humaneers | Contact Us | Sales & Support",
    description:
      "Get in touch with Humaneers. Sales inquiries, technical support, and general questions. We're here to help build something that lasts.",
    url: "https://humaneers.dev/contact",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Humaneers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Humaneers | Contact Us | Sales & Support",
    description:
      "Get in touch with Humaneers. Sales inquiries, technical support, and general questions.",
    images: ["/og-image.jpg"],
  },
};

export default function ContactPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ContactClient />
    </Suspense>
  );
}
