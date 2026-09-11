import { describe, expect, it } from "vitest";

import { PRICING_TIERS, SLA_LABEL, tiersForSegment } from "@/data/pricing";

import {
  COMPARISON,
  DEFAULT_SEGMENT,
  DIGITAL_ASSETS,
  ENTERPRISE_CTA,
  FAQS,
  HERO,
  HOURLY_PACKS,
  NONPROFIT_FLAT_RATE,
  PLANS_INTRO,
  PLAN_NOTES,
  PLAN_TABS,
  SEGMENTS,
  TIER_COPY,
  segmentFromParam,
} from "./content";

describe("pricing page content", () => {
  it("has copy for exactly the tiers pricing.ts defines", () => {
    expect(Object.keys(TIER_COPY).sort()).toEqual(PRICING_TIERS.map((tier) => tier.name).sort());
  });

  it("offers one tab per pricing.ts segment, in its order, business first", () => {
    expect(SEGMENTS).toEqual(["business", "household", "nonprofit", "incubation"]);
    expect(DEFAULT_SEGMENT).toBe("business");
    expect(PLAN_TABS.map((tab) => tab.value)).toEqual(SEGMENTS);
  });

  it("takes every plan name, price and per-user price from pricing.ts", () => {
    for (const tab of PLAN_TABS) {
      const tiers = tiersForSegment(tab.value as (typeof SEGMENTS)[number]);
      expect(tab.plans.map((plan) => plan.name)).toEqual(tiers.map((tier) => tier.name));
      tab.plans.forEach((plan, index) => {
        const tier = tiers[index];
        expect(plan.price).toBe(`$${tier.basePrice}`);
        if (tier.perUserPrice !== undefined) {
          const perUser =
            typeof tier.perUserPrice === "number" ? `$${tier.perUserPrice}` : tier.perUserPrice;
          expect(plan.priceDetail).toContain(perUser);
        }
        expect(plan.cta.href).toBe("/talk-to-sales");
      });
    }
  });

  it("gives every comparison row a value for each tier in its segment, and no others", () => {
    for (const [segment, categories] of Object.entries(COMPARISON)) {
      const names = tiersForSegment(segment as (typeof SEGMENTS)[number])
        .map((tier) => tier.name)
        .sort();
      for (const category of categories!) {
        for (const feature of category.features) {
          expect(Object.keys(feature.values).sort(), `${segment}: ${feature.name}`).toEqual(names);
        }
      }
    }
  });

  it("reads the response-time row from pricing.ts", () => {
    const row = COMPARISON.business!.flatMap((c) => c.features).find(
      (f) => f.name === "Response Time"
    )!;
    for (const tier of tiersForSegment("business")) {
      expect(row.values[tier.name]).toBe(SLA_LABEL[tier.slaLevel]);
    }
  });

  it("opens the default segment for a missing, unknown or repeated ?mode=", () => {
    for (const segment of SEGMENTS) expect(segmentFromParam(segment)).toBe(segment);
    expect(segmentFromParam(undefined)).toBe("business");
    expect(segmentFromParam("family")).toBe("business");
    expect(segmentFromParam(["household", "nonprofit"])).toBe("business");
  });

  it("carries no en dash or em dash in visible copy", () => {
    const copy = JSON.stringify({
      HERO,
      PLANS_INTRO,
      PLAN_TABS,
      PLAN_NOTES,
      COMPARISON,
      NONPROFIT_FLAT_RATE,
      DIGITAL_ASSETS,
      HOURLY_PACKS,
      FAQS,
      ENTERPRISE_CTA,
    });
    // Written as escapes so this file holds neither character.
    expect(copy).not.toMatch(/[–—]/);
  });
});
