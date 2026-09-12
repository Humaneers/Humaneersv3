// Relume header44 (align left) and header62 (align center); the optional image column is header1's.
import Image, { type StaticImageData } from "next/image";

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
  heading: string;
  description: string;
  ctas?: CtaLinkList;
  scheme?: SectionScheme;
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
}: PageHeaderProps) {
  const centered = align === "center";

  const text = (
    <div className={cn(centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl")}>
      <h1 className="mb-5 text-h1 font-bold md:mb-6">{heading}</h1>
      <p className="text-medium">{description}</p>
      {ctas && (
        <CtaLinks ctas={ctas} className={cn("mt-6 md:mt-8", centered && "justify-center")} />
      )}
    </div>
  );

  return (
    <section className={sectionBandClass(scheme)}>
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
