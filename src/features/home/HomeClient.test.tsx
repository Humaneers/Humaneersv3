import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { HomeClient } from "./HomeClient";

const SOLUTIONS = [
  { label: "Managed IT", href: "/managed-it" },
  { label: "Brand Growth", href: "/growth" },
  { label: "Family Protection", href: "/family-protection" },
  { label: "Fractional Leadership", href: "/fractional-leadership" },
];
const WAITLIST = { label: "Join the waitlist", href: "/talk-to-sales" };
const SESSION_KEY = "humaneers_session_v1";

/** jsdom has no matchMedia. Answers the md query and the reduced-motion query. */
function stubMedia({ mdUp, reduceMotion = false }: { mdUp: boolean; reduceMotion?: boolean }) {
  window.matchMedia = ((query: string) => ({
    matches: query.includes("prefers-reduced-motion")
      ? reduceMotion
      : query.includes("min-width: 48rem")
        ? mdUp
        : false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}

function headingLevels(root: HTMLElement) {
  return Array.from(root.querySelectorAll("h1, h2, h3, h4, h5, h6")).map((h) =>
    Number(h.tagName[1])
  );
}

// jsdom logs "not implemented: navigation" when a link's default action runs.
const stopNavigation = (event: Event) => event.preventDefault();

beforeEach(() => {
  sessionStorage.clear();
  document.addEventListener("click", stopNavigation);
});

afterEach(() => {
  cleanup();
  document.removeEventListener("click", stopNavigation);
});

describe.each([
  { width: "below md", mdUp: false },
  { width: "md and up", mdUp: true },
])("HomeClient $width", ({ mdUp }) => {
  beforeEach(() => stubMedia({ mdUp }));

  it("has one h1, no skipped heading level and no image", () => {
    const { container } = render(<HomeClient />);
    const levels = headingLevels(container);
    expect(levels.filter((level) => level === 1)).toHaveLength(1);
    expect(levels[0]).toBe(1);
    levels.forEach((level, i) => {
      if (i > 0) expect(level).toBeLessThanOrEqual(levels[i - 1] + 1);
    });
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Built with precision. Delivered with soul."
    );
    // D3: no stock photography, and nothing else stands in for it.
    expect(container.querySelector("img")).toBeNull();
    expect(container.innerHTML).not.toMatch(/images\.unsplash\.com/);
    // En dash and em dash, written as escapes so this file holds neither character.
    expect(container.textContent).not.toMatch(/[\u2013\u2014]/);
  });

  it("sends both primary CTAs to the waitlist, with capacity stated beside the first", () => {
    render(<HomeClient />);
    const ctas = screen.getAllByRole("link", { name: WAITLIST.label });
    expect(ctas).toHaveLength(2);
    for (const cta of ctas) {
      expect(cta.tagName).toBe("A");
      expect(cta.getAttribute("href")).toBe(WAITLIST.href);
    }
    const hero = ctas[0].closest("section") as HTMLElement;
    expect(within(hero).getByRole("heading", { level: 1 })).toBeTruthy();
    expect(within(hero).getByText(/We are at capacity right now/)).toBeTruthy();
    const closing = ctas[1].closest("section") as HTMLElement;
    expect(within(closing).getByText(/joining a waitlist while we are at capacity/)).toBeTruthy();
  });

  it("navigates only through links; every button toggles in place", () => {
    const { container } = render(<HomeClient />);
    for (const link of Array.from(container.querySelectorAll("a"))) {
      expect(link.getAttribute("href")).toMatch(/^\//);
      expect(link.closest("button")).toBeNull();
    }
    const buttons = Array.from(container.querySelectorAll("button"));
    for (const button of buttons) {
      expect(button.getAttribute("type")).toBe("button");
      expect(button.closest("a")).toBeNull();
      // Each is an objection (FAQ trigger) or, from md up, a wheel selector.
      expect(button.hasAttribute("aria-expanded") || button.hasAttribute("aria-pressed")).toBe(
        true
      );
    }
    expect(buttons.filter((b) => b.hasAttribute("aria-expanded"))).toHaveLength(4);
    expect(buttons.filter((b) => b.hasAttribute("aria-pressed"))).toHaveLength(mdUp ? 4 : 0);
  });

  it("renders the solutions block once, under one h2", () => {
    render(<HomeClient />);
    expect(screen.getAllByRole("heading", { name: "Everything You Need to Grow" })).toHaveLength(1);
    const explore = screen.getAllByRole("link", { name: /^Explore / });
    if (mdUp) {
      // The wheel: four selectors and one link, for the active solution.
      expect(screen.getAllByRole("button", { pressed: true })).toHaveLength(1);
      expect(explore.map((a) => a.getAttribute("href"))).toEqual([SOLUTIONS[0].href]);
    } else {
      // The grid: the same four solutions, each with its label and link.
      for (const { label } of SOLUTIONS) {
        expect(screen.getByRole("heading", { level: 3, name: label })).toBeTruthy();
      }
      expect(explore.map((a) => [a.textContent, a.getAttribute("href")])).toEqual(
        SOLUTIONS.map(({ label, href }) => [`Explore ${label}`, href])
      );
    }
  });

  it("records which CTA a waitlist click came from", async () => {
    const user = userEvent.setup();
    render(<HomeClient />);
    const [hero, closing] = screen.getAllByRole("link", { name: WAITLIST.label });
    await user.click(hero);
    expect(JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? "{}").entrySource).toBe(
      "Homepage Hero CTA"
    );
    await user.click(closing);
    expect(JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? "{}").entrySource).toBe(
      "Homepage Bottom CTA"
    );
  });
});

describe("the wheel, from md up", () => {
  beforeEach(() => stubMedia({ mdUp: true }));

  it("brings the chosen solution to the right of the circle and shows its panel", async () => {
    const user = userEvent.setup();
    render(<HomeClient />);
    const growth = screen.getByRole("button", { name: "Brand Growth" });
    expect(growth.getAttribute("aria-pressed")).toBe("false");

    await user.click(growth);

    expect(growth.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("button", { name: "Managed IT" }).getAttribute("aria-pressed")).toBe(
      "false"
    );
    const panel = document.getElementById("solution-panel") as HTMLElement;
    expect(
      await within(panel).findByRole("heading", { level: 3, name: "Brand Growth" })
    ).toBeTruthy();
    expect(within(panel).getByRole("link", { name: "Explore Brand Growth" })).toBeTruthy();
    // Each solution travels the circle itself; nothing rotates. The active one
    // comes to rest at the right: 50% + 40% across, halfway down.
    const item = growth.parentElement as HTMLElement;
    await waitFor(
      () => {
        expect(parseFloat(item.style.left)).toBeCloseTo(90);
        expect(parseFloat(item.style.top)).toBeCloseTo(50);
      },
      { timeout: 4000 }
    );
    expect(item.style.transform).not.toMatch(/rotate/);
  });
});
