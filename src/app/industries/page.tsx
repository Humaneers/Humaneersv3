import type { Metadata } from "next";
import { IndustriesClient } from "../../components/views/IndustriesClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Specialized IT for Regulated Industries",
  description:
    "Compliance-first IT services for Healthcare (HIPAA), Finance (FINRA), and Legal sectors. We handle the audits so you can handle the business.",
  alternates: {
    canonical: "/industries",
  },
};

export default function IndustriesPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <IndustriesClient />
    </Suspense>
  );
}
