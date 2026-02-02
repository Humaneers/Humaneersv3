import type { Metadata } from "next";
import { ThankYouClient } from "../../features/shared/ThankYouClient";

export const metadata: Metadata = {
  title: "Humaneers | Thank You",
  description: "Thank you for contacting Humaneers. We have received your request.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouPage() {
  return <ThankYouClient />;
}
