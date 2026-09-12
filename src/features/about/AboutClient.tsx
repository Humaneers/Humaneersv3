"use client";

import Link from "next/link";
import { Calendar, Heart, Server, Shield, Target, Users } from "lucide-react";

import { CTASection } from "@/components/sections/CTASection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProseSection } from "@/components/sections/ProseSection";
import { routePaths } from "../../routes";

/**
 * The four blocks below sat in Radix tabs until this cut. Radix renders an
 * inactive tab's panel only once it is selected, so three quarters of the page
 * was absent from the server HTML and from any client without JavaScript.
 * They are sequential sections now, each with its own h2, all in the markup.
 */
const VALUES = [
  {
    icon: Target,
    heading: "Vendor Neutrality",
    text: "We sell solutions, not licenses. If open source software is better for your budget than a proprietary subscription, that is what we recommend. We have no preferred partners that pay us kickbacks.",
  },
  {
    icon: Shield,
    heading: "Security as a Right",
    text: "Privacy and digital safety should not be luxury goods. We apply the same zero trust architecture to a solo founder's laptop as we do to a fifty person corporate network.",
  },
  {
    icon: Heart,
    heading: "Radical Transparency",
    text: "You own your data. You own your code. You own your strategy. We document everything we do so you never feel tied to our services by obscurity.",
  },
] as const;

const CUSTOMERS = [
  { name: "High-Growth Startups", detail: "Seed to Series B" },
  { name: "Family Offices & Estates", detail: "High Net Worth Individuals" },
  { name: "Families & Individuals", detail: "Home networks & digital safety" },
  { name: "Nonprofit Organizations", detail: "501(c)(3) Certified" },
  { name: "Regulated Industries", detail: "Healthcare, Finance, Legal" },
] as const;

const INITIATIVES = [
  {
    icon: Server,
    heading: "Hardware Lifecycle Management",
    text: "E-waste is the tech industry's silent crisis. We reject the industry standard of three year refresh cycles.",
    points: [
      ["Repair First", "We prioritize component repair over device replacement."],
      [
        "Secondary Market",
        "Retired functional equipment is wiped and donated to nonprofits or resold.",
      ],
      [
        "Certified Recycling",
        "End-of-life hardware is processed exclusively by R2v3 certified recyclers.",
      ],
    ],
  },
  {
    icon: Users,
    heading: "Remote-First Operations",
    text: "Our most effective sustainability metric is the commute that doesn't happen.",
    points: [
      ["Remote Team", "Our team works remotely by default."],
      [
        "Minimal Real Estate",
        "We maintain a small HQ footprint in Tempe Arizona, reducing energy consumption for heating and cooling.",
      ],
      [
        "Digital Delivery",
        "We prioritize remote support sessions over truck rolls whenever physical intervention isn't strictly necessary.",
      ],
    ],
  },
  {
    icon: Shield,
    heading: "Ethical Supply Chain",
    text: "We vote with our procurement dollars.",
    points: [
      [
        "Vendor Screening",
        "We evaluate partners on their labor practices and environmental transparency, not just price.",
      ],
      [
        "Local Preference",
        "We prioritize US based and local Arizona vendors for operational supplies.",
      ],
      [
        "Open Source Support",
        "We contribute financially to the open source projects that power our infrastructure.",
      ],
    ],
  },
] as const;

export function AboutClient() {
  return (
    <>
      <PageHeader
        scheme="dark"
        heading="Crafting Digital Resilience."
        description="Enterprise strategy for businesses and families. Built with precision. Delivered with soul."
      />

      <ProseSection heading="Stealth Heritage, Public Standard." eyebrow="Our story">
        <p>
          Humaneers began in stealth mode, serving a select roster of clients by referral only.
          These individuals and organizations required enterprise-grade solutions without the burden
          of enterprise bureaucracy. We built our reputation one bespoke engagement at a time,
          delivering the same caliber of strategy, security, and infrastructure typically reserved
          for global enterprise companies to businesses, families, and nonprofits who had been too
          often underserved.
        </p>
        <p>
          Word travels fast when you solve problems that others cannot. Our clients, many of whom
          came to us after exhausting traditional options, began to ask a consistent question: Why
          aren't you available to everyone?
        </p>
        <p>
          The answer, for many years, was capacity. We believed that maintaining boutique quality
          required staying small. But as our team matured and our internal processes crystallized,
          we realized we had built something scalable without ever sacrificing soul. Our clients
          encouraged our public transition, not because they wanted to share us, but because they
          believed others deserved access to what we had proven we could deliver.
        </p>
        <p>
          <strong>
            So here we are. No longer invitation only, but still uncompromisingly focused on
            precision, transparency, and results.
          </strong>
        </p>
        <p>
          We bring the same rigor, the same vendor neutrality, and the same refusal to cut corners
          that our earliest clients relied on. The only difference is that now, you do not need a
          referral to work with us. You just need a problem worth solving.
        </p>
      </ProseSection>

      <FeatureGrid scheme="cream" heading="Our Values" items={VALUES} />

      <ProseSection heading="Who We Serve">
        <dl>
          {CUSTOMERS.map((customer) => (
            <div key={customer.name}>
              <dt>{customer.name}</dt>
              <dd>{customer.detail}</dd>
            </div>
          ))}
        </dl>
      </ProseSection>

      <ProseSection scheme="cream" heading="Our Impact Commitments">
        <p>
          We believe that small actions, consistently applied, compound into significant change. We
          are not a "green" company by marketing definition, but we are an operationally conscious
          one. We acknowledge our footprint and actively manage it.
        </p>
        <p>
          <strong>"State intent, not perfection."</strong> Our guiding principle for sustainability.
          We prioritize realistic, measurable improvements over performative pledges.
        </p>
        {INITIATIVES.map((initiative) => {
          const Icon = initiative.icon;
          return (
            <div key={initiative.heading}>
              <h3>
                <Icon aria-hidden="true" className="mr-3 inline-block size-6 align-text-bottom" />
                {initiative.heading}
              </h3>
              <p>{initiative.text}</p>
              <ul>
                {initiative.points.map(([term, detail]) => (
                  <li key={term}>
                    <strong>{term}:</strong> {detail}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        <h3>
          <Calendar aria-hidden="true" className="mr-3 inline-block size-6 align-text-bottom" />
          Annual Accountability Review
        </h3>
        <p>
          Transparency requires maintenance. We commit to an annual internal audit of these
          initiatives.
        </p>
        <p>
          Each Q4, we will update this section and our{" "}
          <Link href={routePaths.colophon}>Colophon</Link> with our progress, failures, and adjusted
          goals for the coming year. We believe that acknowledging where we fall short is as
          important as celebrating where we succeed. Our{" "}
          <Link href={routePaths.ethics}>Ethics Charter</Link> sets out the commitments we hold
          ourselves to.
        </p>
      </ProseSection>

      <CTASection
        scheme="dark"
        heading="Ready to Secure Your Growth?"
        text="Whether you are protecting a fifty person team or your own family estate, we bring the same precision and soul to every engagement."
        ctas={[
          { label: "Book a Strategy Session", href: routePaths.talkToSales },
          { label: "View Transparent Pricing", href: routePaths.pricing },
        ]}
      />
    </>
  );
}
