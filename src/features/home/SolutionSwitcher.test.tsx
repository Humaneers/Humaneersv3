// Its own file: motion reads prefers-reduced-motion once per module, so the
// setting has to be in place before anything from motion first renders.
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Solutions } from "./SolutionSwitcher";

beforeAll(() => {
  // jsdom has no matchMedia: md and up, with reduced motion on.
  window.matchMedia = ((query: string) => ({
    matches: query.includes("prefers-reduced-motion") || query.includes("min-width: 48rem"),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
});

afterEach(cleanup);

describe("the wheel with reduced motion", () => {
  it("jumps the chosen solution to the right of the circle instead of turning", async () => {
    const user = userEvent.setup();
    render(<Solutions />);
    const leadership = screen.getByRole("button", { name: "Fractional Leadership" });
    const item = leadership.parentElement as HTMLElement;
    // At rest, Fractional Leadership is at the top of the circle.
    expect(parseFloat(item.style.left)).toBeCloseTo(50);
    expect(parseFloat(item.style.top)).toBeCloseTo(10);

    await user.click(leadership);

    // The spring takes about 1.5 s to settle this close; with reduced motion
    // the position is final within a frame or two.
    await waitFor(
      () => {
        expect(parseFloat(item.style.left)).toBeCloseTo(90);
        expect(parseFloat(item.style.top)).toBeCloseTo(50);
      },
      { timeout: 300 }
    );
    const panel = document.getElementById("solution-panel") as HTMLElement;
    expect(
      await within(panel).findByRole(
        "heading",
        { level: 3, name: "Fractional Leadership" },
        { timeout: 300 }
      )
    ).toBeTruthy();
  });
});
