import type { Metadata } from "next";
import { CrisisManagementClient } from "../../components/views/CrisisManagementClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Crisis Management & Reputation Defense",
  description:
    "Professional digital scrubbing, SEO suppression, and rapid-response PR for individuals and brands under attack. Discreet and effective.",
  alternates: {
    canonical: "/crisis-management",
  },
};

export default function CrisisManagementPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <CrisisManagementClient />
    </Suspense>
  );
}
