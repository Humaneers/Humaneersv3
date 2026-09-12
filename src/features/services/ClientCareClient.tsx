import { Clock, Shield, Smartphone } from "lucide-react";

import { EmailActionButton } from "@/components/ui/email-action-button";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { sectionBandClass } from "@/components/sections/scheme";

const COVERAGE = [
  {
    icon: Clock,
    heading: "A senior engineer, directly",
    text: "You reach a senior engineer without a ticket queue or a tier one script in between.",
  },
  {
    icon: Smartphone,
    heading: "Text, call or email",
    text: "Your dedicated partner takes your text, call or email. The emergency line is open 24/7.",
  },
  {
    icon: Shield,
    heading: "Proactive security",
    text: "We monitor your systems and look for threats on your behalf, rather than waiting for you to report one.",
  },
] as const;

export function ClientCareClient() {
  return (
    <>
      <PageHeader
        align="center"
        scheme="dark"
        heading="Client Care"
        description="Concierge support for our private clients."
      />

      <FeatureGrid heading="What Client Care covers" items={COVERAGE} />

      <section className={sectionBandClass("cream")}>
        <div className="section-container">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="mb-5 text-h3 font-bold md:mb-6">Client portal access</h2>
            <p className="text-medium">
              Our portal is invite only. Contact your account manager for access.
            </p>
            <EmailActionButton
              label="Request portal access"
              email="support@humaneers.dev"
              subject="Portal Access Request"
              className="mt-6 bg-scheme-accent text-scheme-btn-text hover:bg-scheme-accent/90 md:mt-8"
            />
          </div>
        </div>
      </section>
    </>
  );
}
