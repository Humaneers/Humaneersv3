"use client";

import { PageHeader } from "@/components/sections/PageHeader";
import { ProseSection } from "@/components/sections/ProseSection";
import { EmailActionButton } from "@/components/ui/email-action-button";

/**
 * The charter sat in a two-column grid whose four principles were styled as
 * border-accent side tabs. It is long-form content now.
 *
 * Two headings under "Whistleblowing Policy" were h4 directly under an h2,
 * which the checker reported as a skip on production. They are h3.
 * "Submit a Report" carried its note in 10px gray-400, which axe reported for
 * contrast; it is the section's own text color at the ramp's smallest size.
 */
const PRINCIPLES = [
  {
    heading: "Client-First",
    text: 'Our "No-BS" promise means we practice strict vendor neutrality. We recommend what works for you, not what pays us the highest commission.',
  },
  {
    heading: "Anti-Corruption",
    text: "Zero tolerance for kickbacks, bribery, or undisclosed referral fees. All procurement decisions are documented and available for client review.",
  },
  {
    heading: "Data Ethics",
    text: "We are custodians, not owners, of your data. We never sell client information.",
  },
  {
    heading: "Accountability",
    text: "If we break it, we fix it. If we recommend it and it fails, we own the remediation. We stand behind our engineering.",
  },
] as const;

const REPORTABLE = [
  "Financial fraud or accounting irregularities",
  "Bribery, corruption, or conflict of interest",
  "Harassment, discrimination, or workplace safety violations",
  "Security breaches or data privacy violations",
  "Unethical business practices",
] as const;

export function EthicsClient() {
  return (
    <>
      <PageHeader
        scheme="dark"
        align="center"
        heading="Ethics Charter"
        description="Our commitment to integrity, transparency, and doing the right thing, even when no one is watching."
      />

      <ProseSection heading="Core Principles">
        <h3>1. Mission Statement</h3>
        <p>
          We exist to bring enterprise-grade discipline and security to the small businesses that
          power our community. We believe that robust technology infrastructure is a right, not a
          luxury reserved for the global enterprise.
        </p>
        {PRINCIPLES.map((principle) => (
          <div key={principle.heading}>
            <h4>{principle.heading}</h4>
            <p>{principle.text}</p>
          </div>
        ))}
      </ProseSection>

      <ProseSection scheme="cream" heading="Whistleblowing Policy">
        <p>
          Humaneers fosters a culture of "Speaking Up." We encourage employees, contractors,
          suppliers, and clients to report any suspected wrongdoing without fear of retaliation.
        </p>
        <h3>Scope of Reportable Issues</h3>
        <ul>
          {REPORTABLE.map((issue) => (
            <li key={issue}>{issue}</li>
          ))}
        </ul>
        <h3>Non-Retaliation Guarantee</h3>
        <p>
          We strictly prohibit retaliation against anyone who raises a concern in good faith.
          Reports are handled with the utmost confidentiality by our independent Compliance Officer.
        </p>
      </ProseSection>

      <ProseSection heading="Submit a Report">
        <p>
          Use the secure link below to email our Compliance Officer directly. You may choose to use
          an anonymous email address if you prefer.
        </p>
        <EmailActionButton
          label="Submit Ethics Report"
          email="compliance@humaneers.dev"
          subject="CONFIDENTIAL: Ethics Report"
          className="bg-brand-copper-text hover:bg-brand-copper-text-dark"
        />
        <p className="mt-6 text-small">
          Reports are routed directly to the Chief Compliance Officer.
        </p>
      </ProseSection>
    </>
  );
}
