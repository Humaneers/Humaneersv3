import type { Metadata } from "next";
import { ResourcesClient } from "../../components/views/ResourcesClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | IT Resource Library | Security Guides",
  description:
    "Free operational playbooks, security checklists, and strategic guides for modern businesses and families.",
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
