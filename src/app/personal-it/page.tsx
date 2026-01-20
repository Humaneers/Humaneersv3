import type { Metadata } from "next";
import { PersonalClient } from "../../components/views/PersonalClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | IT for Solo Entrepreneurs | The Company of One",
  description:
    "Professional IT services for consultants, freelancers, and solo founders. Secure email, custom domains, and helpdesk support for the company of one.",
  alternates: {
    canonical: "/personal-it",
  },
};

export default function PersonalPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <PersonalClient />
    </Suspense>
  );
}
