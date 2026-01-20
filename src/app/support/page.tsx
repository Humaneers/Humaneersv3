import type { Metadata } from "next";
import { SupportClient } from "../../components/views/SupportClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Support Center | Submit a Ticket",
  description:
    "Submit a support ticket to our US-based engineering team. Priority support for critical issues, system outages, and security concerns.",
  alternates: {
    canonical: "/support",
  },
};

export default function SupportPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <SupportClient />
    </Suspense>
  );
}
