import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ArcCarousel, type ArcItem } from "./ArcCarousel";
import { Reveal } from "./Reveal";
import { WordReveal } from "./WordReveal";

const ITEMS: ArcItem[] = [
  { label: "First", line: "The first card.", href: "/one" },
  { label: "Second", line: "The second card.", href: "/two" },
  { label: "Third", line: "The third card.", href: "/three" },
];

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

/** Records whether the arc stopped a click from navigating, before the test's own guard runs. */
let lastClickPrevented: boolean | undefined;
const recordClick = (event: Event) => (lastClickPrevented = event.defaultPrevented);
// jsdom logs "not implemented: navigation" when a link's default action runs.
const stopNavigation = (event: Event) => event.preventDefault();

beforeEach(() => {
  lastClickPrevented = undefined;
  document.body.addEventListener("click", recordClick);
  document.addEventListener("click", stopNavigation);
});

afterEach(() => {
  cleanup();
  document.body.removeEventListener("click", recordClick);
  document.removeEventListener("click", stopNavigation);
});

function front() {
  const slot = document.querySelector('[data-arc-card][data-active="true"]');
  return slot?.querySelector(".arc__label")?.textContent;
}

/**
 * A horizontal mouse drag that starts on `on`. jsdom has no layout, so a card
 * is 0px wide and the arc steps by its 280px fallback; it has no
 * setPointerCapture either, which the arc calls only where it exists.
 */
function dragArc(on: HTMLElement, fromX: number, toX: number) {
  const pointer = { pointerId: 1, isPrimary: true, button: 0 };
  fireEvent.pointerDown(on, { ...pointer, clientX: fromX });
  fireEvent.pointerMove(on, { ...pointer, clientX: toX });
  fireEvent.pointerUp(on, { ...pointer, clientX: toX });
}

const nextTick = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("ArcCarousel with motion allowed", () => {
  beforeEach(() => stubMedia({ reduceMotion: false }));

  it("is a named carousel region of links, with the 3D stage on after hydration", () => {
    const { container } = render(<ArcCarousel items={ITEMS} label="Services" initial={1} />);
    const region = screen.getByRole("region", { name: "Services" });
    expect(region.getAttribute("aria-roledescription")).toBe("carousel");
    expect(container.querySelector(".arc")?.getAttribute("data-arc")).toBe("3d");
    expect(
      within(region)
        .getAllByRole("link")
        .map((a) => a.getAttribute("href"))
    ).toEqual(ITEMS.map((item) => item.href));
    expect(front()).toBe("Second");
    // Silent on load.
    expect(container.querySelector('[aria-live="polite"]')?.textContent).toBe("");
  });

  it("moves one card per button press, announces it and marks the ends", async () => {
    const user = userEvent.setup();
    const { container } = render(<ArcCarousel items={ITEMS} label="Services" initial={0} />);
    const previous = screen.getByRole("button", { name: "Previous service" });
    const next = screen.getByRole("button", { name: "Next service" });
    expect(previous.getAttribute("aria-disabled")).toBe("true");

    await user.click(next);
    expect(front()).toBe("Second");
    expect(container.querySelector('[aria-live="polite"]')?.textContent).toBe("Second");

    await user.click(next);
    expect(front()).toBe("Third");
    expect(next.getAttribute("aria-disabled")).toBe("true");
    await user.click(next);
    expect(front()).toBe("Third");

    await user.click(previous);
    expect(front()).toBe("Second");
  });

  it("works from the keyboard: Tab brings each card forward, Enter and Space press the controls", async () => {
    const user = userEvent.setup();
    render(<ArcCarousel items={ITEMS} label="Services" initial={1} />);
    await user.tab();
    expect(document.activeElement?.getAttribute("href")).toBe("/one");
    expect(front()).toBe("First");
    await user.tab();
    await user.tab();
    expect(document.activeElement?.getAttribute("href")).toBe("/three");
    expect(front()).toBe("Third");

    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Previous service" }));
    await user.keyboard("{Enter}");
    expect(front()).toBe("Second");
    await user.keyboard(" ");
    expect(front()).toBe("First");
  });

  it("brings a clicked side card forward instead of following it; the front card's link navigates", async () => {
    const user = userEvent.setup();
    render(<ArcCarousel items={ITEMS} label="Services" initial={1} />);
    await user.click(screen.getByRole("link", { name: /Third/ }));
    expect(lastClickPrevented).toBe(true);
    expect(front()).toBe("Third");

    await user.click(screen.getByRole("link", { name: /Third/ }));
    expect(lastClickPrevented).toBe(false);
  });

  // What jsdom cannot show: which element a real browser sends a drag's click
  // to under pointer capture (Chrome sends it to the list, so no card sees it),
  // and that the click comes in the same task as the pointerup. The Playwright
  // repro drags in Chrome and presses Enter for that half.
  it("never lets a drag swallow a keyboard click, even straight after the drag", () => {
    render(<ArcCarousel items={ITEMS} label="Services" initial={1} />);
    dragArc(screen.getByRole("link", { name: /Second/ }), 500, 100);
    expect(front()).toBe("Third");

    // detail 0 is a click the keyboard made (Enter on the focused link).
    fireEvent.click(screen.getByRole("link", { name: /Third/ }), { detail: 0 });
    expect(lastClickPrevented).toBe(false);
  });

  it("swallows only the click a drag makes itself, and drops the flag on the next tick", async () => {
    render(<ArcCarousel items={ITEMS} label="Services" initial={1} />);
    const second = screen.getByRole("link", { name: /Second/ });

    // Past the 6px drag threshold but short of half a card: the front card stays.
    dragArc(second, 500, 450);
    expect(front()).toBe("Second");
    // Where the drag's own click does reach the card, in the same task, it is swallowed.
    fireEvent.click(second, { detail: 1 });
    expect(lastClickPrevented).toBe(true);

    // A drag whose click never reaches a card leaves nothing behind for the next click.
    dragArc(second, 500, 450);
    await nextTick();
    fireEvent.click(second, { detail: 1 });
    expect(lastClickPrevented).toBe(false);

    // A new press clears it too, before any tick.
    dragArc(second, 500, 450);
    fireEvent.pointerDown(second, { pointerId: 1, isPrimary: true, button: 0, clientX: 500 });
    fireEvent.pointerUp(second, { pointerId: 1, isPrimary: true, button: 0, clientX: 500 });
    fireEvent.click(second, { detail: 1 });
    expect(lastClickPrevented).toBe(false);
    expect(document.querySelectorAll('[data-arc-card][data-active="true"]')).toHaveLength(1);
  });
});

describe("ArcCarousel with reduced motion", () => {
  beforeEach(() => stubMedia({ reduceMotion: true }));

  it("stays a flat row, and every link navigates", async () => {
    const user = userEvent.setup();
    const { container } = render(<ArcCarousel items={ITEMS} label="Services" initial={1} />);
    expect(container.querySelector(".arc")?.getAttribute("data-arc")).toBe("flat");
    await user.click(screen.getByRole("link", { name: /Third/ }));
    expect(lastClickPrevented).toBe(false);
  });
});

describe("WordReveal", () => {
  it("gives the sentence once, whole, to assistive technology and splits the visible words", () => {
    const text = "Plain words for a plain reader.";
    const { container } = render(<WordReveal text={text} />);
    const paragraph = container.querySelector("p.word-reveal") as HTMLElement;
    expect(paragraph.querySelector(".sr-only")?.textContent).toBe(text);
    const visible = paragraph.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(visible.textContent).toBe(text);
    const words = Array.from(visible.querySelectorAll<HTMLElement>(".word-reveal__word"));
    expect(words.map((w) => w.textContent)).toEqual(text.split(" "));
    expect(words[0].style.getPropertyValue("--p")).toBe("0.000");
    expect(words[words.length - 1].style.getPropertyValue("--p")).toBe("1.000");
    // Nothing is armed without a browser that can run the reveal.
    expect(paragraph.hasAttribute("data-word-reveal")).toBe(false);
  });
});

describe("Reveal", () => {
  beforeEach(() => stubMedia({ reduceMotion: false }));

  it("renders its content in place and never hides it without an observer", () => {
    render(
      <Reveal className="section-container">
        <p>Visible from the start.</p>
      </Reveal>
    );
    const content = screen.getByText("Visible from the start.");
    expect(content.parentElement?.className).toBe("section-container");
    expect(content.parentElement?.hasAttribute("data-reveal")).toBe(false);
  });
});
