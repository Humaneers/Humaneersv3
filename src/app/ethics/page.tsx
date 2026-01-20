import type { Metadata } from "next";
import { EthicsClient } from "../../components/views/EthicsClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Ethics Charter | Speak Up Policy",
  description:
    "Our code of ethics and whistleblower policy. Submit anonymous reports and view our core principles. Integrity, transparency, and accountability.",
  alternates: {
    canonical: "/ethics",
  },
};

export default function EthicsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <EthicsClient />
    </Suspense>
  );
}
