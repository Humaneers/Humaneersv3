import { VenturePortfolioClient } from "@/features/services/VenturePortfolioClient";

export const metadata = {
  title: "Venture Portfolio Management | Humaneers",
  description:
    "Digital asset sovereignty, compliance automation, and incubation infrastructure for serial entrepreneurs and venture studios.",
  openGraph: {
    title: "Venture Portfolio Management | Humaneers",
    description: "Infrastructure for holding companies and serial entrepreneurs.",
  },
};

export default function VenturePortfolioPage() {
  return <VenturePortfolioClient />;
}
