import { routePaths } from "../routes";

export interface NavItem {
  title: string;
  description?: string;
  to?: string;
  href?: string;
  external?: boolean;
  disabled?: boolean;
  mobileLabel?: string;
}

export interface NavSection {
  id: string;
  label: string;
  featured?: NavItem;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  {
    id: "who-we-help",
    label: "Who We Help",
    featured: {
      title: "Find Your Path",
      description: "Tailored technology strategies for every stage of growth.",
      to: routePaths.services,
    },
    items: [
      {
        title: "For Startups & Founders",
        mobileLabel: "Startups & Founders",
        description: "Brand, marketing, and fractional leadership to scale fast.",
        to: routePaths.growth,
      },
      {
        title: "For SMBs",
        mobileLabel: "SMBs",
        description: "Enterprise-grade managed IT and infrastructure.",
        to: routePaths.managedIt,
      },
      {
        title: "For Households",
        mobileLabel: "Households",
        description: "Cybersecurity and tech support for high-net-worth families.",
        to: routePaths.familyProtection,
      },
      {
        title: "For Nonprofits",
        mobileLabel: "Nonprofits",
        description: "Discounted pricing and specialized support for 501(c)(3)s.",
        to: routePaths.nonProfits,
      },
      {
        title: "For Solo Entrepreneurs",
        mobileLabel: "Solo Entrepreneurs",
        description: "Professional tooling for the company of one.",
        to: routePaths.personal,
      },
      {
        title: "For Senior Citizens",
        mobileLabel: "Senior Care",
        description: "Dignified, secure technology support and fraud protection.",
        to: routePaths.seniorCare,
      },
      {
        title: "Regulated Industries",
        mobileLabel: "Regulated Industries",
        description: "Compliance-first solutions for healthcare and finance.",
        to: routePaths.industries,
      },
    ],
  },
  {
    id: "platform",
    label: "Platform",
    items: [
      {
        title: "Infrastructure & Networking",
        mobileLabel: "Infrastructure",
        description: "Cloud-native mesh networks and server management.",
        to: routePaths.managedIt,
      },
      {
        title: "Cybersecurity Center",
        description: "SOC 2 compliant endpoint protection and monitoring.",
        to: routePaths.familyProtection,
      },
      {
        title: "Strategic Consulting",
        description: "vCIO and vCMO services for roadmap planning.",
        to: routePaths.fractionalLeadership,
      },
      {
        title: "Reputation & Crisis",
        description: "Digital cleanup and PR crisis management.",
        to: routePaths.crisisManagement,
      },
      {
        title: "Compliance Engine",
        description: "Automated compliance tracking and reporting.",
        to: routePaths.about,
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    featured: {
      title: "Knowledge Base Hub",
      description: "Explore guides, security explainers, and operational docs.",
      to: routePaths.resources,
    },
    items: [
      {
        title: "Transparency & Colophon",
        description: "Our operating framework, open source credits, and ethics.",
        to: routePaths.colophon,
      },
      {
        title: "Ethics Charter",
        description: "Our code of conduct, anti-corruption policy, and reporting.",
        to: routePaths.ethics,
      },
      {
        title: "Pricing",
        description: "Transparent pricing for all service tiers.",
        to: routePaths.pricing,
      },
      {
        title: "Service Status",
        description: "Real-time system performance and uptime.",
        href: "https://status.humaneers.dev/",
        external: true,
      },
      {
        title: "Support Portal",
        description: "Access your tickets and knowledge base.",
        href: "https://support.humaneers.dev/",
        external: true,
      },
      {
        title: "Blog (Coming Soon)",
        description: "Insights on security and business growth.",
        disabled: true,
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    featured: {
      title: "Our Story",
      description: "Building the IT consultancy we wished existed.",
      to: routePaths.about,
    },
    items: [
      {
        title: "About Us",
        description: "Meet the team behind Humaneers.",
        to: routePaths.about,
      },
      {
        title: "Contact",
        description: "Get in touch with our support or sales team.",
        to: routePaths.contact,
      },
      {
        title: "Careers (Coming Soon)",
        description: "Join our mission (Positions opening soon).",
        disabled: true,
      },
    ],
  },
];

export const ctaLinks = {
  support: { label: "Get Support", to: routePaths.support },
  sales: { label: "Let's Get Started", to: routePaths.talkToSales },
};

export const footerSections = [
  {
    title: "Services",
    items: [
      { label: "View All Services", to: routePaths.services },
      { label: "Managed IT", to: routePaths.managedIt },
      { label: "Brand Growth", to: routePaths.growth },
      { label: "Family Protection", to: routePaths.familyProtection },
      { label: "Fractional Leadership", to: routePaths.fractionalLeadership },
      { label: "Nonprofits", to: routePaths.nonProfits },
      { label: "Senior Care", to: routePaths.seniorCare },
      { label: "Crisis Management", to: routePaths.crisisManagement },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Us", to: routePaths.about },
      { label: "Pricing", to: routePaths.pricing },
      { label: "Resources", to: routePaths.resources },
      { label: "Client Care", to: routePaths.clientCare },
      { label: "Contact", to: routePaths.contact },
    ],
  },
];

export interface FooterMetaLink {
  label: string;
  to?: string; // Internal route
  href?: string; // External URL
  external?: boolean; // Open in new tab
}

export const footerMetaLinks: FooterMetaLink[] = [
  { label: "Privacy Policy", to: routePaths.privacy },
  { label: "Terms of Service", to: routePaths.terms },
  { label: "Ethics Charter", to: routePaths.ethics },
  { label: "Colophon & Transparency", to: routePaths.colophon },
  {
    label: "System Status",
    href: "https://status.humaneers.dev/",
    external: true,
  },
];
