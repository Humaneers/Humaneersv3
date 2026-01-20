import type { Metadata } from "next";
import { StatusClient } from "../../components/views/StatusClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "System Status | Humaneers Infrastructure",
  description:
    "Real-time status of Humaneers systems and services. View uptime incidents and scheduled maintenance.",
  alternates: {
    canonical: "/status",
  },
};

export default function StatusPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <StatusClient />
    </Suspense>
  );
}
