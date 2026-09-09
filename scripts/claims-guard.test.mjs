// @vitest-environment node
//
// claims-guard resolves paths from import.meta.url; under the suite's default
// jsdom environment that is an http:// URL and fileURLToPath rejects it.

import { describe, expect, it } from "vitest";

import { scanRepo, scanText } from "./claims-guard.mjs";

/**
 * Every fixture below is the verbatim shape of a claim that actually shipped to
 * humaneers.dev and survived a manual scrub. If a rule stops catching one of
 * these, the guard has regressed to the state that let the defect ship twice.
 */
const SHIPPED_DEFECTS = {
  "compliance scorecard, framework and score split across JSX elements": {
    file: "IndustriesClient.tsx",
    rule: "compliance-score",
    source: `
      <h3 className="text-xl font-bold mb-4">Compliance Scorecard</h3>
      <div className="space-y-4">
        {["HIPAA Security Rule", "NIST CSF Alignment", "SOC 2 Type II Controls", "GDPR Readiness"].map((item) => (
          <div key={item} className="flex items-center justify-between border-b pb-2">
            <span>{item}</span>
            <span className="text-green-400 font-mono text-sm">100%</span>
          </div>
        ))}
      </div>`,
  },
  "aggregateRating factory behind a boolean": {
    file: "StructuredData.tsx",
    rule: "fabricated-review-schema",
    source: `
      ...(includeRating && {
        aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "200" },
      }),`,
  },
  "Privacy Shield in the privacy policy": {
    file: "PrivacyClient.tsx",
    rule: "privacy-shield",
    source: `<li>Ensuring processors are Privacy Shield certified or have equivalent protections.</li>`,
  },
  "a quote attributed to a person who exists nowhere else": {
    file: "PricingClient.tsx",
    rule: "attributed-quote",
    source: `
      <blockquote className="text-xl italic">"We don't just manage servers."</blockquote>
      <p className="font-bold">Sarah Chen</p>`,
  },
  "self-certification in prose": {
    file: "forge-brand-identity.md",
    rule: "self-certification",
    source: `- SOC 2 Type II compliant storage`,
  },
  "a phantom tier named in the pricing FAQ ('Scale' was never a real tier)": {
    file: "PricingClient.tsx",
    rule: "phantom-tier",
    source: `"Absolutely. Growth and Scale tiers include priority support, while our Hourly Packs can be used for urgent crisis response if we have capacity."`,
  },
  "a business plan borrowing the nonprofit tier's name": {
    file: "ServicesClient.tsx",
    rule: "phantom-tier",
    source: `Our "Foundation" plan covers the essentials for most businesses. Let's chat about your needs.`,
  },
  "placeholder emergency number in an error path": {
    file: "GlobalErrorBoundary.tsx",
    rule: "placeholder-contact",
    source: `
              <a
                href="tel:+1-555-0123"
                className="flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Emergency Support
              </a>`,
  },
};

describe("claims-guard rules", () => {
  for (const [name, { file, rule, source }] of Object.entries(SHIPPED_DEFECTS)) {
    it(`catches ${name}`, () => {
      const ids = scanText(source, file).map((f) => f.rule.id);
      expect(ids).toContain(rule);
    });
  }
});

describe("claims-guard allowances", () => {
  it("honours an annotated line", () => {
    const source = `const x = 1; // claims-guard-allow: verified by Leo, 24 Aug 2026\n<blockquote>hi</blockquote>`;
    expect(scanText(source, "x.tsx")).toHaveLength(0);
  });

  it("ignores an allow with no reason given", () => {
    const source = `// claims-guard-allow:\n<blockquote>hi</blockquote>`;
    expect(scanText(source, "x.tsx").map((f) => f.rule.id)).toContain("attributed-quote");
  });

  it("honours a file-level allowance for one rule only", () => {
    const source = `// claims-guard-allow-file: privacy-shield historical record of the invalidated scheme\nPrivacy Shield\n<blockquote>hi</blockquote>`;
    expect(scanText(source, "x.tsx").map((f) => f.rule.id)).toEqual(["attributed-quote"]);
  });

  it("does not flag legitimate client-facing compliance work", () => {
    const source = [
      `title: "SOC 2 Compliance Checklist",`,
      `desc: "Handles audits (SOC 2, ISO) and disaster recovery.",`,
      `name: "SOC 2 / HIPAA Control Mapping",`,
    ].join("\n");
    expect(scanText(source, "Resources.tsx")).toHaveLength(0);
  });
});

describe("phantom-tier rule", () => {
  it("does not flag the fixed strings, which name only real tiers", () => {
    const source = [
      `"Absolutely. Growth and Enterprise tiers include priority support (under 1 hour response), while our Hourly Packs can be used for urgent crisis response if we have capacity."`,
      `Our "Core" plan covers the essentials for most businesses. Let's chat about your needs.`,
    ].join("\n");
    expect(scanText(source, "x.tsx").map((f) => f.rule.id)).not.toContain("phantom-tier");
  });

  it("does not flag ordinary prose that merely mentions the word tier or plan", () => {
    // "Keep" and "The" are sentence-initial capitals, not tier names — the
    // rule requires an "X and Y tiers/plans" list or a quoted "X" plan
    // before it treats a capitalized word as a tier reference at all.
    const source =
      "Keep tier objects on this shape so the reader keeps working. The tier's own naming stays stable. Ask about our plan today.";
    expect(scanText(source, "x.ts").map((f) => f.rule.id)).not.toContain("phantom-tier");
  });

  it("honours the same allow-line escape hatch as the other rules", () => {
    const source = `"Growth and Scale tiers include priority support." // claims-guard-allow: Leo, 25 Aug 2026`;
    expect(scanText(source, "x.tsx").map((f) => f.rule.id)).not.toContain("phantom-tier");
  });
});

describe("the shipped tree", () => {
  it("publishes no unsupported claims", () => {
    expect(scanRepo().map((f) => `${f.path}:${f.line} [${f.rule.id}]`)).toEqual([]);
  });
});

describe("placeholder-contact rule", () => {
  it("does not flag the canonical Humaneers number", () => {
    const source = `<a href="tel:+19284401505">(928) 440-1505</a>`;
    expect(scanText(source, "x.tsx").map((f) => f.rule.id)).not.toContain("placeholder-contact");
  });

  it("catches a 555 tel: link whatever the formatting", () => {
    for (const href of [
      "tel:+1-555-0123",
      "tel:(555) 123-4567",
      "tel:555.0142",
      "tel:+1 928 555 0110",
    ]) {
      const ids = scanText(`<a href="${href}">Emergency</a>`, "x.tsx").map((f) => f.rule.id);
      expect(ids, href).toContain("placeholder-contact");
    }
  });

  it("does not flag a plain formatted number outside a tel: link", () => {
    const source = `const sample = "(555) 123-4567";`;
    expect(scanText(source, "x.ts").map((f) => f.rule.id)).not.toContain("placeholder-contact");
  });

  it("does not flag ordinary numbers that merely contain 555", () => {
    const source = `const price = 555; const total = 15550; const hex = "#555555";`;
    expect(scanText(source, "x.ts").map((f) => f.rule.id)).not.toContain("placeholder-contact");
  });
});
