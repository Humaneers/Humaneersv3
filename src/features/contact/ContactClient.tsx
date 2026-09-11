"use client";

import { Briefcase, LifeBuoy, Mail, MapPin, Phone } from "lucide-react";

import { ActionCards } from "@/components/sections/ActionCards";
import { ContactSection } from "@/components/sections/ContactSection";
import { PageHeader } from "@/components/sections/PageHeader";

import { routePaths } from "../../routes";

export function ContactClient() {
  return (
    <>
      <PageHeader
        scheme="dark"
        align="center"
        heading="Let's Build Something That Lasts."
        description="Whether you need a full IT overhaul or a fractional leader, we're ready to listen."
      />

      <ActionCards
        heading="How can we help?"
        description="Select your inquiry type below and we'll match you with the right team. You'll be guided to a specialized form where we can understand your needs and schedule time to talk."
        cards={[
          {
            icon: Briefcase,
            heading: "Sales & Strategy",
            text: "Schedule a consultation about our services.",
            action: {
              label: "Talk to sales",
              href: `${routePaths.talkToSales}?source=Contact%20Page%20Redirect`,
            },
          },
          {
            icon: LifeBuoy,
            heading: "Technical Support",
            text: "For existing clients or new clients in crisis.",
            action: {
              label: "Get support",
              href: `${routePaths.support}?source=Contact%20Page%20Redirect`,
            },
          },
        ]}
      />

      <ContactSection
        scheme="cream"
        heading="Get in Touch"
        description="Proactive strategy builds resilient enterprises. Let's start building yours."
        items={[
          {
            icon: Mail,
            heading: "Email",
            text: "For general inquiries, partnerships, press, or careers, email us directly.",
            link: { label: "hello@humaneers.dev", href: "mailto:hello@humaneers.dev" },
          },
          {
            icon: Phone,
            heading: "Phone",
            link: { label: "(928) 440-1505", href: "tel:+19284401505" },
          },
          {
            icon: MapPin,
            heading: "Headquarters",
            text: "60 East Rio Salado Parkway, Suite 900, Tempe, AZ 85281",
          },
        ]}
      />
    </>
  );
}
