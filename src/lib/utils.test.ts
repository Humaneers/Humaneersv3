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

  it("keeps a Relume type-ramp class beside a text color", () => {
    expect(cn("text-h1 text-scheme-text")).toBe("text-h1 text-scheme-text");
    expect(cn("text-medium", "text-brand-oxford")).toBe("text-medium text-brand-oxford");
  });

  it("merges a Relume type-ramp class with another font size", () => {
    expect(cn("text-sm", "text-medium")).toBe("text-medium");
  });

  it("leaves the existing size-and-color pattern unchanged", () => {
    expect(cn("text-sm text-brand-oxford")).toBe("text-sm text-brand-oxford");
  });
});
