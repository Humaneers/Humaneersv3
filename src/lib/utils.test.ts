import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
  it("combines class names correctly", () => {
    expect(cn("first", "second")).toBe("first second");
  });

  it("handles conditional classes", () => {
    const isTrue = true;
    const isFalse = false;
    expect(cn("always", isTrue && "included", isFalse && "excluded")).toBe("always included");
  });

  it("merges tailwind classes sensibly", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("handles objects", () => {
    expect(cn({ "bg-red-500": true, "text-white": false })).toBe("bg-red-500");
  });

  it("handles empty inputs", () => {
    expect(cn()).toBe("");
  });
});
