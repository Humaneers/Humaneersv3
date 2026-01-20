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
};

export default function ContactPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ContactClient />
    </Suspense>
  );
}
