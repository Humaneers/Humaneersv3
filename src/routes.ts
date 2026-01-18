export const routePaths = {
  home: "/",
  pricing: "/pricing",
  growth: "/growth",
  about: "/about",
  terms: "/terms",
  privacy: "/privacy",
  managedIt: "/managed-it",
  familyProtection: "/family-protection",
  fractionalLeadership: "/fractional-leadership",
  nonProfits: "/non-profits",
  contact: "/contact",
  industries: "/industries",
  services: "/services",
  talkToSales: "/talk-to-sales",
  personal: "/personal",
  colophon: "/colophon",
  ethics: "/ethics",
  resources: "/resources",
  status: "/status",
  support: "/support",
} as const;

export type RoutePath = (typeof routePaths)[keyof typeof routePaths];
