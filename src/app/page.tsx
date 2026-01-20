import { Metadata } from "next";
import { Suspense } from "react";
import { PageLoader } from "../components/PageLoader";
import { HomeClient } from "../components/views/HomeClient";

export const metadata: Metadata = {
  title: "Humaneers | Enterprise Strategy. Built with Precision.",
  description:
    "Enterprise strategy for businesses and families. Built with precision, delivered with soul. Modern IT, security, and brand growth.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <HomeClient />
    </Suspense>
  );
}
