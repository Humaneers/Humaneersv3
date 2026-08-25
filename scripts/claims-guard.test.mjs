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

describe("the shipped tree", () => {
  it("publishes no unsupported claims", () => {
    expect(scanRepo().map((f) => `${f.path}:${f.line} [${f.rule.id}]`)).toEqual([]);
  });
});
