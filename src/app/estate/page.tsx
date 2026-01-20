import type { Metadata } from "next";
import { EstateClient } from "../../components/views/EstateClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Private Client & Estate IT | Digital Concierge",
  description:
    "Enterprise-grade technology management for high net worth individuals and smart homes. Wi-Fi, AV, security, and vendor management.",
  alternates: {
    canonical: "/estate",
  },
};

export default function EstatePage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <EstateClient />
    </Suspense>
  );
}
