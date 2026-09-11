import type { Metadata } from "next";
import { ResourcesClient } from "../../features/resources/ResourcesClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Resources | IT Glossary & Incident FAQ",
  description:
    "A short IT glossary, answers to common incident response questions, and links to system status and the Humaneers support portal.",
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
