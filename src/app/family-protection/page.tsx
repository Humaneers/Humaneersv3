import type { Metadata } from "next";
import { FamilyProtectionClient } from "../../components/views/FamilyProtectionClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Family Office Cyber Security | High Net Worth Protection",
  description:
    "Enterprise cybersecurity for your family. Protect your home network, devices, and identity with SOC 2 compliant tools.",
  alternates: {
    canonical: "/family-protection",
  },
};

export default function FamilyProtectionPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <FamilyProtectionClient />
    </Suspense>
  );
}
