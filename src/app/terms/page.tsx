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
};

export default function TermsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <TermsClient />
    </Suspense>
  );
}
