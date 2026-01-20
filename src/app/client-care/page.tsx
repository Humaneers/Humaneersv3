import type { Metadata } from "next";
import { ClientCareClient } from "../../components/views/ClientCareClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Client Care",
  description:
    "Concierge support for our private clients. Direct access, zero wait times, and dedicated engineering resources.",
  alternates: {
    canonical: "/client-care",
  },
};

export default function ClientCarePage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ClientCareClient />
    </Suspense>
  );
}
