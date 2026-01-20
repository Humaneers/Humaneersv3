import type { Metadata } from "next";
import { AboutClient } from "../../components/views/AboutClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | About Us | Enterprise Standards for Small Business",
  description:
    "Humaneers closes the gap between enterprise-grade technology and small business needs. Learn about our story, values, and 100% US-based team.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <AboutClient />
    </Suspense>
  );
}
