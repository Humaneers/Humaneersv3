import type { Metadata } from "next";
import { TalkToSalesClient } from "../../features/contact/TalkToSalesClient";

export const metadata: Metadata = {
  title: "Join the Waitlist | Humaneers",
  description:
    "Humaneers is at capacity, so new engagements are joining a waitlist. Tell us what you need and a partner will come back to you when we can take it on properly.",
  alternates: {
    canonical: "/talk-to-sales",
  },
};

export default function TalkToSalesPage() {
  return <TalkToSalesClient />;
}
