import type { Metadata } from "next";
import { PrivacyClient } from "../../components/views/PrivacyClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Privacy Policy",
  description:
    "Our commitment to protecting your personal data. We are custodians, not owners, of your data. Read our privacy policy.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <PrivacyClient />
    </Suspense>
  );
}
