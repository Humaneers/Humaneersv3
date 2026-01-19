/**
 * Session Context Manager
 * 
 * Manages ephemeral user journey data in sessionStorage to provide context
 * to CRM/Support forms without persistent tracking.
 */

export interface SessionContext {
    segment?: 'business' | 'family' | 'nonprofit';
    landingPage?: string;
    referrer?: string;
    lastViewedService?: string;
    entrySource?: string;
    pageHistory?: string[]; // Last 10 pages visited
    interactions?: string[]; // Significant actions taken
}

const STORAGE_KEY = 'humaneers_session_v1';
const MAX_HISTORY = 10;
const MAX_INTERACTIONS = 10;

export function getSessionContext(): SessionContext {
    if (typeof window === 'undefined') return {};

    try {
        const data = sessionStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (e) {
        console.warn('Failed to read session context', e);
        return {};
    }
}

export function setSessionContext(data: Partial<SessionContext>) {
    if (typeof window === 'undefined') return;

    try {
        const current = getSessionContext();
        const updated = { ...current, ...data };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
        console.warn('Failed to write session context', e);
    }
}

export function initSession() {
    if (typeof window === 'undefined') return;

    const ctx = getSessionContext();
    if (!ctx.landingPage) {
        setSessionContext({
            landingPage: window.location.pathname,
            referrer: document.referrer || 'direct',
            entrySource: new URLSearchParams(window.location.search).get('source') || undefined,
            pageHistory: [window.location.pathname],
            interactions: []
        });
    }
}

export function trackPageView(path: string) {
    if (typeof window === 'undefined') return;

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
    if (typeof window === 'undefined') return;

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

    if (ctx.referrer && ctx.referrer !== 'direct') parts.push(`Ref: ${ctx.referrer}`);

    return parts.length > 0 ? `[Context: ${parts.join(" | ")}]` : "";
}
