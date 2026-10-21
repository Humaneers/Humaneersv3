import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
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
const TRUST_POINTS = ["No user minimums", "No offshore NOCs", "100% US-based engineering"];

/** jsdom has no matchMedia. Answers the two reduced-motion queries; nothing else matches. */
function stubMedia({ reduceMotion }: { reduceMotion: boolean }) {
  window.matchMedia = ((query: string) => ({
    matches: query.includes("no-preference")
      ? !reduceMotion
      : query.includes("prefers-reduced-motion")
        ? reduceMotion
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

function session() {
  return JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? "{}");
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
  { motion: "motion allowed", reduceMotion: false },
  { motion: "reduced motion", reduceMotion: true },
])("HomeClient, $motion", ({ reduceMotion }) => {
  beforeEach(() => stubMedia({ reduceMotion }));

  it("has one h1, no skipped heading level and no image", () => {
    const { container } = render(<HomeClient />);
    const levels = headingLevels(container);
    expect(levels.filter((level) => level === 1)).toHaveLength(1);
    expect(levels[0]).toBe(1);
    levels.forEach((level, i) => {
      if (i > 0) expect(level).toBeLessThanOrEqual(levels[i - 1] + 1);
    });
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toBe("Built with precision. Delivered with soul.");
    // Only the two accent words are set apart.
    expect(Array.from(h1.querySelectorAll("span")).map((s) => s.textContent)).toEqual([
      "precision",
      "soul",
    ]);
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

  it("navigates only through links; every button toggles in place or moves the arc", () => {
    const { container } = render(<HomeClient />);
    for (const link of Array.from(container.querySelectorAll("a"))) {
      expect(link.getAttribute("href")).toMatch(/^\//);
      expect(link.closest("button")).toBeNull();
    }
    const buttons = Array.from(container.querySelectorAll("button"));
    for (const button of buttons) {
      expect(button.getAttribute("type")).toBe("button");
      expect(button.closest("a")).toBeNull();
      // Each is an objection (FAQ trigger) or one of the arc's two controls.
      expect(button.hasAttribute("aria-expanded") || button.hasAttribute("aria-controls")).toBe(
        true
      );
    }
    expect(buttons.filter((b) => b.hasAttribute("aria-expanded"))).toHaveLength(4);
    const arc = screen.getByRole("region", { name: "Services" });
    const stage = within(arc).getByRole("list");
    const controls = [
      screen.getByRole("button", { name: "Previous service" }),
      screen.getByRole("button", { name: "Next service" }),
    ];
    for (const control of controls) expect(control.getAttribute("aria-controls")).toBe(stage.id);
    expect(buttons).toHaveLength(6);
  });

  it("shows the four service lines in the arc and as cards under one h2", () => {
    render(<HomeClient />);
    const arc = screen.getByRole("region", { name: "Services" });
    expect(
      within(arc)
        .getAllByRole("link")
        .map((a) => a.getAttribute("href"))
    ).toEqual(SOLUTIONS.map(({ href }) => href));
    for (const [index, link] of within(arc).getAllByRole("link").entries()) {
      expect(link.textContent).toContain(SOLUTIONS[index].label);
    }

    expect(screen.getAllByRole("heading", { name: "Everything You Need to Grow" })).toHaveLength(1);
    for (const { label } of SOLUTIONS) {
      expect(screen.getByRole("heading", { level: 3, name: label })).toBeTruthy();
    }
    const explore = screen.getAllByRole("link", { name: /^Explore / });
    expect(explore.map((a) => [a.textContent, a.getAttribute("href")])).toEqual(
      SOLUTIONS.map(({ label, href }) => [`Explore ${label}`, href])
    );
  });

  it("reads the manifesto once, whole, and keeps the trust points word for word", () => {
    const { container } = render(<HomeClient />);
    const manifesto = "Enterprise strategy for businesses and families.";
    const statement = screen.getByText(manifesto, { selector: ".sr-only" }).closest("p");
    expect(statement?.querySelector('[aria-hidden="true"]')?.textContent).toBe(manifesto);
    expect(statement?.querySelectorAll(".word-reveal__word")).toHaveLength(6);

    const trust = screen.getByRole("heading", { name: "Security & Trust You Can Rely On" })
      .parentElement as HTMLElement;
    expect(
      within(trust)
        .getAllByRole("listitem")
        .map((li) => li.textContent)
    ).toEqual(TRUST_POINTS);
    expect(container.textContent).not.toContain("We take security seriously.");
  });

  it("records which CTA a waitlist click came from", async () => {
    const user = userEvent.setup();
    render(<HomeClient />);
    const [hero, closing] = screen.getAllByRole("link", { name: WAITLIST.label });
    await user.click(hero);
    expect(session().entrySource).toBe("Homepage Hero CTA");
    await user.click(closing);
    expect(session().entrySource).toBe("Homepage Bottom CTA");
  });

  it("records which service a visitor opened", async () => {
    const user = userEvent.setup();
    render(<HomeClient />);
    await user.click(screen.getByRole("link", { name: "Explore Family Protection" }));
    expect(session().lastViewedService).toBe("Family Protection");
  });
});
