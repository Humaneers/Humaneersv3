import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { tiersForSegment } from "@/data/pricing";
import { getSessionContext } from "@/lib/session";

import { PricingClient } from "./PricingClient";

const replace = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
  usePathname: () => "/pricing",
}));

beforeEach(() => {
  replace.mockClear();
  sessionStorage.clear();
});
afterEach(cleanup);

const selectedTab = () =>
  screen.getAllByRole("tab").find((tab) => tab.getAttribute("aria-selected") === "true");

const planNames = () =>
  Array.from(document.querySelectorAll('[role="tabpanel"][data-state="active"] h3')).map(
    (h3) => h3.textContent
  );

describe("PricingClient", () => {
  it("renders the segment the server read from ?mode=", () => {
    render(<PricingClient segment="household" />);
    expect(selectedTab()?.textContent).toBe("Personal");
    expect(planNames()).toEqual(tiersForSegment("household").map((tier) => tier.name));
  });

  it("switches at once on a tab change and writes ?mode= with router.replace, without scrolling", async () => {
    const user = userEvent.setup();
    render(<PricingClient segment="business" />);
    await user.click(screen.getByRole("tab", { name: "Nonprofit" }));

    expect(selectedTab()?.textContent).toBe("Nonprofit");
    expect(planNames()).toEqual(tiersForSegment("nonprofit").map((tier) => tier.name));
    expect(replace).toHaveBeenCalledWith("/pricing?mode=nonprofit", { scroll: false });
    expect(getSessionContext().segment).toBe("nonprofit");
    // Nonprofit has one plan, so the flat-rate explanation replaces the matrix.
    expect(screen.getByRole("heading", { name: "Simple, Flat-Rate Pricing" })).toBeTruthy();
    expect(screen.queryByRole("table")).toBeNull();
  });

  it("follows a new segment from the server while mounted", () => {
    const { rerender } = render(<PricingClient segment="incubation" />);
    expect(selectedTab()?.textContent).toBe("Incubation");
    rerender(<PricingClient segment="business" />);
    expect(selectedTab()?.textContent).toBe("Business");
    expect(screen.getByRole("table", { name: "Compare Plans" })).toBeTruthy();
  });

  it("has one h1 and never skips a heading level", () => {
    const { container } = render(<PricingClient segment="business" />);
    const levels = Array.from(container.querySelectorAll("h1, h2, h3, h4, h5, h6")).map((h) =>
      Number(h.tagName[1])
    );
    expect(levels.filter((level) => level === 1)).toHaveLength(1);
    expect(levels[0]).toBe(1);
    levels.slice(1).forEach((level, index) => expect(level).toBeLessThanOrEqual(levels[index] + 1));
  });

  it("makes every tier CTA a link, not a button", () => {
    render(<PricingClient segment="household" />);
    for (const tier of tiersForSegment("household")) {
      const cta = screen.getByRole("link", { name: `Join the waitlist for ${tier.name}` });
      expect(cta.getAttribute("href")).toBe("/talk-to-sales");
    }
  });
});
