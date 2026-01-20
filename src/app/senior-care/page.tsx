import type { Metadata } from "next";
import { SeniorCareClient } from "../../components/views/SeniorCareClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Senior Citizen Care Plans | Dignified Tech Support",
  description:
    "Respectful, patient technology support for seniors. Fraud protection, simplified iPad/computer setup, and 24/7 help for your loved ones.",
  alternates: {
    canonical: "/senior-care",
  },
};

export default function SeniorCarePage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <SeniorCareClient />
    </Suspense>
  );
}
