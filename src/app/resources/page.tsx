import type { Metadata } from "next";
import { ResourcesClient } from "../../features/resources/ResourcesClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Resources | Client Links, IT Glossary & Incident FAQ",
  description:
    "Links to system status and the Humaneers support portal, a short IT glossary, and answers to common incident response questions.",
  alternates: {
    canonical: "/resources",
  },
};

export default function ResourcesPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ResourcesClient />
    </Suspense>
  );
}
