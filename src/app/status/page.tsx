import type { Metadata } from "next";
import { StatusClient } from "../../features/resources/StatusClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "System Status | Humaneers Infrastructure",
  description:
    "Live system monitoring is not published on this page yet. For an active problem, call Humaneers or open a support request.",
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
