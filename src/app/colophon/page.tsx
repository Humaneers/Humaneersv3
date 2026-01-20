import type { Metadata } from "next";
import { ColophonClient } from "../../components/views/ColophonClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Colophon & Transparency | How We Operate",
  description:
    "Radical transparency in our code, pricing, and values. View our tech stack, ethics charter, and digital constitution.",
  alternates: {
    canonical: "/colophon",
  },
};

export default function ColophonPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ColophonClient />
    </Suspense>
  );
}
