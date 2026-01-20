import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Personal IT Services | Humaneers",
  description: "Comprehensive IT support and technology management for individuals and families.",
};

export default function PersonalPage() {
  // Redirect /personal to /personal-it
  redirect("/personal-it");
}
