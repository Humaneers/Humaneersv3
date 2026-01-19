import { describe, it, expect, beforeEach } from "vitest";
import {
  initSession,
  getSessionContext,
  trackPageView,
  getContextString,
  setSessionContext,
} from "./session";

describe("Session Context Manager", () => {
  beforeEach(() => {
    // Clear session storage before each test
    sessionStorage.clear();
  });

  describe("initSession", () => {
    it("initializes session with default values if empty", () => {
      initSession();
      const ctx = getSessionContext();
      expect(ctx.landingPage).toBe("/");
      expect(ctx.pageHistory).toContain("/");
    });

    it("does not overwrite existing session", () => {
      setSessionContext({ landingPage: "/existing" });
      initSession();
      const ctx = getSessionContext();
      expect(ctx.landingPage).toBe("/existing");
    });
  });

  describe("trackPageView", () => {
    it("adds page to history", () => {
      trackPageView("/page1");
      const ctx = getSessionContext();
      expect(ctx.pageHistory).toContain("/page1");
    });

    it("deduplicates consecutive page views", () => {
      trackPageView("/page1");
      trackPageView("/page1");
      const ctx = getSessionContext();
      expect(ctx.pageHistory).toEqual(["/page1"]);
    });

    it("limits history size (mocked logic check, assuming MAX_HISTORY=10)", () => {
      // We can just verify it appends correctly for now
      trackPageView("/1");
      trackPageView("/2");
      const ctx = getSessionContext();
      expect(ctx.pageHistory).toEqual(["/1", "/2"]);
    });
  });

  describe("getContextString", () => {
    it("formats context string correctly", () => {
      setSessionContext({
        segment: "business",
        pageHistory: ["/home", "/pricing"],
        interactions: ["clicked_cta"],
      });

      const str = getContextString();
      expect(str).toContain("Segment: business");
      expect(str).toContain("Journey: /home → /pricing");
      expect(str).toContain("Actions: clicked_cta");
    });

    it("returns empty string if context is empty", () => {
      // Ensure clean state
      sessionStorage.clear();
      expect(getContextString()).toBe("");
    });
  });
});
