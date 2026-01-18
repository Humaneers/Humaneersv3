import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://humaneers.dev";
const DEFAULT_TITLE = "Humaneers | Enterprise Strategy, Small Business Soul";
const DEFAULT_DESCRIPTION =
  "Enterprise-grade IT, security, and brand growth for small businesses. SOC 2 compliant, 100% US-based managed IT services, family protection, and fractional leadership.";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SeoProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  noIndex?: boolean;
  children: ReactNode;
}

export function Seo({ title, description, canonicalPath, noIndex, children }: SeoProps) {
  const resolvedTitle = title || DEFAULT_TITLE;
  const resolvedDescription = description || DEFAULT_DESCRIPTION;
  const resolvedUrl = canonicalPath ? new URL(canonicalPath, SITE_URL).toString() : SITE_URL;

  return (
    <>
      <Helmet>
        <title>{resolvedTitle}</title>
        <meta name="description" content={resolvedDescription} />
        <link rel="canonical" href={resolvedUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={resolvedUrl} />
        <meta property="og:title" content={resolvedTitle} />
        <meta property="og:description" content={resolvedDescription} />
        <meta property="og:image" content={DEFAULT_IMAGE} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={resolvedUrl} />
        <meta property="twitter:title" content={resolvedTitle} />
        <meta property="twitter:description" content={resolvedDescription} />
        <meta property="twitter:image" content={DEFAULT_IMAGE} />

        {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}
      </Helmet>
      {children}
    </>
  );
}
