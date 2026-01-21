/**
 * Session Context Manager
 *
 * Manages ephemeral user journey data in sessionStorage to provide context
 * to CRM/Support forms without persistent tracking.
 */

export interface SessionContext {
  segment?: "business" | "family" | "nonprofit";
  landingPage?: string;
  referrer?: string;
  lastViewedService?: string;
  entrySource?: string;
  pageHistory?: string[]; // Last 10 pages visited
  interactions?: string[]; // Significant actions taken
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
}

const STORAGE_KEY = "humaneers_session_v1";
const MAX_HISTORY = 10;
const MAX_INTERACTIONS = 10;

export function getSessionContext(): SessionContext {
  if (typeof window === "undefined") return {};

  try {
    const data = sessionStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.warn("Failed to read session context", e);
    return {};
  }
}

export function setSessionContext(data: Partial<SessionContext>) {
  if (typeof window === "undefined") return;

  try {
    const current = getSessionContext();
    const updated = { ...current, ...data };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Failed to write session context", e);
  }
}

export function initSession() {
  if (typeof window === "undefined") return;

  const ctx = getSessionContext();
  if (!ctx.landingPage) {
    const params = new URLSearchParams(window.location.search);
    setSessionContext({
      landingPage: window.location.pathname,
      referrer: document.referrer || "direct",
      entrySource: params.get("source") || undefined,
      pageHistory: [window.location.pathname],
      interactions: [],
      utm: {
        source: params.get("utm_source") || undefined,
        medium: params.get("utm_medium") || undefined,
        campaign: params.get("utm_campaign") || undefined,
        term: params.get("utm_term") || undefined,
        content: params.get("utm_content") || undefined,
      },
    });
  }
}

export function trackPageView(path: string) {
  if (typeof window === "undefined") return;

  const ctx = getSessionContext();
  const history = ctx.pageHistory || [];

  // Avoid duplicate entries for concurrent updates or refreshes if desired,
  // but for journey tracking, seeing a refresh might be useful.
  // We'll dedupe consecutive identical paths to keep it clean.
  if (history[history.length - 1] === path) return;

  const newHistory = [...history, path].slice(-MAX_HISTORY);
  setSessionContext({ pageHistory: newHistory });
}

export function trackInteraction(action: string) {
  if (typeof window === "undefined") return;

  const ctx = getSessionContext();
  const interactions = ctx.interactions || [];
  const newInteractions = [...interactions, action].slice(-MAX_INTERACTIONS);

  setSessionContext({ interactions: newInteractions });
}

export function getContextString(): string {
  const ctx = getSessionContext();
  const parts = [];

  if (ctx.segment) parts.push(`Segment: ${ctx.segment}`);
  if (ctx.entrySource) parts.push(`Source: ${ctx.entrySource}`);

  // Format UTM parameters
  if (ctx.utm) {
    const utmParts = [];
    if (ctx.utm.source) utmParts.push(`source=${ctx.utm.source}`);
    if (ctx.utm.medium) utmParts.push(`medium=${ctx.utm.medium}`);
    if (ctx.utm.campaign) utmParts.push(`campaign=${ctx.utm.campaign}`);
    if (ctx.utm.term) utmParts.push(`term=${ctx.utm.term}`);
    if (ctx.utm.content) utmParts.push(`content=${ctx.utm.content}`);
    if (utmParts.length > 0) {
      parts.push(`UTM: ${utmParts.join(", ")}`);
    }
  }

  // Format Journey
  if (ctx.pageHistory && ctx.pageHistory.length > 0) {
    // Summarize path: / -> /pricing -> /contact
    const flow = ctx.pageHistory.join(" → ");
    parts.push(`Journey: ${flow}`);
  } else if (ctx.landingPage) {
    parts.push(`Landed: ${ctx.landingPage}`);
  }

  // Format Interactions
  if (ctx.interactions && ctx.interactions.length > 0) {
    parts.push(`Actions: ${ctx.interactions.join(", ")}`);
  }

  if (ctx.referrer && ctx.referrer !== "direct") parts.push(`Ref: ${ctx.referrer}`);

  return parts.length > 0 ? `[Context: ${parts.join(" | ")}]` : "";
}

export function getSessionId(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const SESSION_ID_KEY = "humaneers_session_id";
  try {
    let id = sessionStorage.getItem(SESSION_ID_KEY);
    if (!id) {
      // Generate a UUID if possible, otherwise fallback to random string
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).substring(2);
      sessionStorage.setItem(SESSION_ID_KEY, id);
    }
    return id;
  } catch (e) {
    console.warn("Failed to get session id", e);
    return undefined;
  }
}
