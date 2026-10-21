import { routePaths } from "@/routes";

/**
 * The page's one primary CTA. Every body CTA says this and goes here: the
 * waitlist form on /talk-to-sales. We are at capacity, and the page says so
 * beside the CTA, in the words ContactModal's sales tab and /talk-to-sales
 * use, rather than after the click.
 *
 * A plain module, not part of the client file that reads it, so the server
 * component that renders the page can read the values too.
 */
export const WAITLIST = { label: "Join the waitlist", href: routePaths.talkToSales } as const;

/**
 * The four live service lines. Every sentence here is the homepage's existing
 * copy from the solution wheel this replaced, split rather than rewritten:
 * `line` is the short sentence the arc card carries and `text` is the rest,
 * which the service card carries. Nothing is added.
 */
export const SERVICE_LINES = [
  {
    label: "Managed IT",
    href: routePaths.managedIt,
    line: "Cloud-native infrastructure that just works.",
    text: "We handle the tech so you can handle the business.",
  },
  {
    label: "Brand Growth",
    href: routePaths.growth,
    line: "From SEO to full-scale marketing campaigns.",
    text: "Making your products billboard-ready with enterprise-grade strategy.",
  },
  {
    label: "Family Protection",
    href: routePaths.familyProtection,
    line: "Closing the home-office security gap.",
    text: "Enterprise-grade cybersecurity for your personal life and loved ones.",
  },
  {
    label: "Fractional Leadership",
    href: routePaths.fractionalLeadership,
    line: "Strategy without the salary cap.",
    text: "Your own CIO/CMO at an SMB price. Executive guidance when you need it most.",
  },
] as const;
