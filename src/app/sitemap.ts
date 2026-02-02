import { MetadataRoute } from "next";
import { routePaths } from "../routes";

const BASE_URL = "https://humaneers.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.values(routePaths).map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: routeParameters(route).frequency,
    priority: routeParameters(route).priority,
  }));

  return [...routes];
}

function routeParameters(route: string): {
  frequency: "weekly" | "monthly" | "yearly" | "daily";
  priority: number;
} {
  // High Priority / Frequent Updates
  if (route === "/") return { frequency: "weekly", priority: 1.0 };
  if (route === "/managed-it") return { frequency: "monthly", priority: 0.9 };
  if (route === "/resources") return { frequency: "weekly", priority: 0.8 };

  // Core Services
  if (
    [
      "/growth",
      "/family-protection",
      "/fractional-leadership",
      "/senior-care",
      "/estate",
      "/crisis-management",
      "/services",
      "/pricing",
    ].includes(route)
  ) {
    return { frequency: "monthly", priority: 0.8 };
  }

  // Industries & Verticals
  if (["/nonprofits", "/industries", "/personal", "/venture-portfolio"].includes(route)) {
    return { frequency: "monthly", priority: 0.7 };
  }

  // Company Info
  if (["/about", "/contact"].includes(route)) {
    return { frequency: "monthly", priority: 0.6 };
  }

  // Legal & Status
  if (["/status", "/support", "/client-care"].includes(route)) {
    return { frequency: "daily", priority: 0.5 };
  }

  // Default / Low Priority
  return { frequency: "yearly", priority: 0.3 };
}
