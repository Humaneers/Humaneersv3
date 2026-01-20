import type { Metadata } from "next";
import { TalkToSalesClient } from "../../components/views/TalkToSalesClient";

export const metadata: Metadata = {
  title: "Contact Sales | Humaneers | Schedule a Consultation",
  description:
    "Ready to secure your business or home? Schedule a consultation with our US-based team to discuss your IT and security needs.",
  alternates: {
    canonical: "/talk-to-sales",
  },
};

export default function TalkToSalesPage() {
  return <TalkToSalesClient />;
}
