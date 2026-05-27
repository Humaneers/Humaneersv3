import { Metadata } from "next";
import { BookClient } from "./BookClient";

export const metadata: Metadata = {
  title: "Book a Consultation | Humaneers",
  description: "Schedule a time to speak with our team about your bespoke web development needs.",
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    title: "Book a Consultation | Humaneers",
    description: "Schedule a time to speak with our team about your bespoke web development needs.",
    url: "https://humaneers.dev/book",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Book Humaneers Consultation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Consultation | Humaneers",
    description: "Schedule a time to speak with our team.",
    images: ["/og-image.jpg"],
  },
};

export default function BookingPage() {
  return <BookClient />;
}
