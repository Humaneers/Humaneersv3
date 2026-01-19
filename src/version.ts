export const APP_VERSION = "0.3.0";

export interface ChangeLogEntry {
    version: string;
    date: string;
    changes: string[];
}

export const CHANGELOG: ChangeLogEntry[] = [
    {
        version: "0.3.0",
        date: "2026-01-19",
        changes: [
            "Added Client Care Services page with simulated portal login",
            "Refactored main navigation to be audience-centric ('Who We Help')",
            "Implemented context-aware lead flow for Sales and Pricing",
            "Updated Homepage design and typography",
            "Refined marketing messaging for Families, Businesses, and Nonprofits",
        ],
    },
    {
        version: "0.2.0",
        date: "2026-01-18",
        changes: [
            "Initial launch readiness updates",
            "Brand audit and style standardization",
            "Pricing page implementation",
        ],
    },
];
