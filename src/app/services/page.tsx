import type { Metadata } from "next";
import { ServicesClient } from "../../components/views/ServicesClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Comprehensive IT Services | Nationwide Support",
  description:
    "Full-spectrum IT support: Managed IT, Brand Growth, Family Protection, and Crisis Management. 100% US-based engineering.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ServicesClient />
    </Suspense>
  );
}
