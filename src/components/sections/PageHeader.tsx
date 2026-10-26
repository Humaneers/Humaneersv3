// Relume header44 (align left) and header62 (align center); the optional image column is header1's.
import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { CtaLinks, type CtaLinkList } from "./CtaLinks";
import { sectionBandClass, type SectionScheme } from "./scheme";

/**
 * A statically imported image carries its own dimensions; a path or URL has to
 * state them. `alt` is required and should describe what the image shows.
 */
export type PageHeaderImage =
  | { src: StaticImageData; alt: string }
  | { src: string; alt: string; width: number; height: number };

export type PageHeaderProps = {
  heading: ReactNode;
  description: string;
  ctas?: CtaLinkList;
  scheme?: SectionScheme;
  /**
   * "display" sets the heading at display scale on the oxford ground, pulled up
   * under the fixed site header, and brings the description and CTAs in with a
   * short rise. Omit it for the standard header.
   */
  variant?: "display";
} & (
  | { align?: "left"; image?: PageHeaderImage }
  // header62 has no image column, so a centered header takes no image.
  | { align: "center"; image?: never }
);

/** The page's single h1. Render one per page, at the top. */
export function PageHeader({
  heading,
  description,
  ctas,
  align = "left",
  image,
  scheme,
  variant,
}: PageHeaderProps) {
  const centered = align === "center";
  const display = variant === "display";

  const text = display ? (
    <div className={cn(centered ? "mx-auto max-w-4xl text-center" : "max-w-4xl")}>
      <h1 className="type-page-display font-normal text-balance wrap-break-word">{heading}</h1>
      {/* page-head__lede (globals.css): the description and CTAs rise in once on load. */}
      <div className="page-head__lede">
        <p
          className={cn(
            "mt-6 max-w-2xl text-large text-scheme-text/80 md:mt-8",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
        {ctas && (
          <CtaLinks ctas={ctas} className={cn("mt-8 md:mt-10", centered && "justify-center")} />
        )}
      </div>
    </div>
  ) : (
    <div className={cn(centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl")}>
      <h1 className="mb-5 text-h1 font-bold md:mb-6">{heading}</h1>
      <p className="text-medium">{description}</p>
      {ctas && (
        <CtaLinks ctas={ctas} className={cn("mt-6 md:mt-8", centered && "justify-center")} />
      )}
    </div>
  );

  return (
    <section
      className={
        display
          ? // Pulled up under the fixed header (main's pt-20), as the homepage
            // hero is, so the header starts over the oxford ground.
            cn(
              sectionBandClass(scheme ?? "dark"),
              "-mt-20 pt-36 pb-20 md:pt-44 md:pb-28 lg:pt-48 lg:pb-32"
            )
          : sectionBandClass(scheme)
      }
    >
      {image ? (
        <div className="section-container grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          {text}
          <Image
            {...image}
            preload
            sizes="(min-width: 64rem) 50vw, 100vw"
            className="h-auto w-full rounded-image object-cover"
          />
        </div>
      ) : (
        <div className="section-container">{text}</div>
      )}
    </section>
  );
}
