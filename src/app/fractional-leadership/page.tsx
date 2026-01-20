import type { Metadata } from "next";
import { FractionalLeadershipClient } from "../../components/views/FractionalLeadershipClient";
import { Suspense } from "react";
import { PageLoader } from "../../components/PageLoader";

export const metadata: Metadata = {
  title: "Humaneers | Fractional CIO & CMO | Executive Leadership",
  description:
    "Strategy without the salary cap. Get a fractional CIO, CISO, or CMO to lead your technology and growth teams.",
  alternates: {
    canonical: "/fractional-leadership",
  },
};

export default function FractionalLeadershipPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <FractionalLeadershipClient />
    </Suspense>
  );
}
