import type { Metadata } from "next";
import { ManagedITClient } from "../../components/views/ManagedITClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Managed IT Services | US-Based Support",
  description:
    "Enterprise-grade managed IT for small businesses. 100% US-based helpdesk, hybrid cloud infrastructure, and SOC 2 security compliance.",
  alternates: {
    canonical: "/managed-it",
  },
};

export default function ManagedITPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ManagedITClient />
    </Suspense>
  );
}
