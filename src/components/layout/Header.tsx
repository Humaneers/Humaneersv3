"use client";

import { useState, useEffect, useRef, forwardRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { BookOpen, Phone } from "lucide-react";
import { routePaths } from "../../routes";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { cn } from "../ui/utils";
import { navSections, ctaLinks, type NavItem } from "../../data/navigation";
import { MobileNav } from "./MobileNav";

/** Scroll distance, in px, before the header's blur and hairline border fade in. */
const SCROLL_THRESHOLD = 8;

export type HeaderSurface = "dark" | "light";

/**
 * Reads a computed background color and says whether it is light. Handles the
 * forms browsers return: rgb()/rgba(), color(srgb ...), and oklab()/oklch(),
 * which Chrome returns for a color-mix(). Returns null for a color that is
 * missing or mostly transparent, so the caller can look further up the tree.
 */
export function isLightColor(color: string): boolean | null {
  const match = /^(rgba?|color|oklab|oklch)\((.*)\)$/i.exec(color.trim());
  if (!match) return null;
  const fn = match[1].toLowerCase();
  const body = match[2].replace(/^srgb\s+/i, "");
  const [channels, alphaPart] = body.split("/");
  const parts = channels
    .split(/[\s,]+/)
    .filter(Boolean)
    .map((part) => (part.endsWith("%") ? parseFloat(part) / 100 : parseFloat(part)));
  const alpha = alphaPart !== undefined ? parseFloat(alphaPart) : fn === "rgba" ? parts[3] : 1;
  if (parts.some(Number.isNaN) || parts.length < 3 || (alpha ?? 1) < 0.5) return null;

  if (fn === "oklab" || fn === "oklch") return parts[0] > 0.62;

  // rgb() channels are 0 to 255; color(srgb) channels are 0 to 1.
  const scale = fn === "color" ? 1 : 255;
  const [r, g, b] = parts.slice(0, 3).map((channel) => {
    const c = channel / scale;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4;
}

/**
 * The surface of the band under the middle of the header: the nearest
 * section, footer or [data-surface] there, or failing that the first opaque
 * background up the tree. A card or an image inside a band does not count,
 * so the header follows the band and does not flicker over its contents.
 */
function surfaceUnder(header: HTMLElement): HeaderSurface {
  if (typeof document.elementsFromPoint !== "function") return "dark";
  const { bottom } = header.getBoundingClientRect();
  const below = document
    .elementsFromPoint(window.innerWidth / 2, bottom / 2)
    .find((el) => !header.contains(el));
  if (!below) return "dark";

  const band = below.closest("section, footer, [data-surface]") ?? below;
  for (let node: Element | null = band; node; node = node.parentElement) {
    const light = isLightColor(getComputedStyle(node).backgroundColor);
    if (light !== null) return light ? "light" : "dark";
  }
  return "dark";
}

// The four menu triggers, by surface. Each keeps the copper focus ring; the
// global :focus-visible outline in globals.css applies on both surfaces.
const TRIGGER = {
  dark: "bg-transparent text-gray-300 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white focus-visible:ring-2 focus-visible:ring-brand-copper",
  light:
    "bg-transparent text-brand-oxford hover:text-brand-oxford hover:bg-brand-oxford/5 focus:bg-brand-oxford/5 focus:text-brand-oxford data-[active]:bg-brand-oxford/5 data-[state=open]:bg-brand-oxford/5 data-[state=open]:text-brand-oxford focus-visible:ring-2 focus-visible:ring-brand-copper",
} as const;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [surface, setSurface] = useState<HeaderSurface>("dark");
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // One measurement per frame at most. At the top of the page the header is
  // the oxford bar it has always been; once scrolled it takes the blur and
  // border, and flips to the light surface over a light band.
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const header = headerRef.current;
      const scrolled = window.scrollY > SCROLL_THRESHOLD;
      setIsScrolled(scrolled);
      setSurface(scrolled && header ? surfaceUnder(header) : "dark");
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const light = surface === "light";

  const renderNavItem = (item: NavItem, className?: string) => {
    if (item.disabled) {
      return null; // Don't render disabled items
    }

    const content = (
      <>
        <div className="text-sm font-medium leading-none text-brand-oxford nav-item-title">
          {item.title}
        </div>
        {item.description ? (
          <p className="line-clamp-2 text-sm leading-snug text-brand-slate nav-item-description">
            {item.description}
          </p>
        ) : null}
      </>
    );

    if (item.disabled) {
      return (
        <div
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none text-brand-oxford/60 cursor-not-allowed",
            className
          )}
          aria-disabled="true"
        >
          {content}
        </div>
      );
    }

    const href = item.to || item.href || "/";
    const isExternal = item.external || !!item.href;

    if (isExternal) {
      return (
        <a
          href={href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer text-brand-oxford hover:bg-gray-100",
            className
          )}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer text-brand-oxford hover:bg-gray-100",
          pathname === href && "bg-accent text-accent-foreground",
          className
        )}
      >
        {content}
      </Link>
    );
  };

  const resourcesSection = navSections.find((section) => section.id === "resources");
  const whoWeHelpSection = navSections.find((section) => section.id === "who-we-help");
  const platformSection = navSections.find((section) => section.id === "platform");
  const companySection = navSections.find((section) => section.id === "company");

  return (
    // Surface colors, blur and border live in globals.css (.site-header), keyed
    // on these two attributes, so the fade between states is one transition.
    <header
      ref={headerRef}
      data-scrolled={isScrolled ? "true" : "false"}
      data-surface={surface}
      className={cn("site-header fixed top-0 left-0 right-0 z-50", isScrolled ? "py-3" : "py-5")}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-brand-copper-text focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link
          className="flex items-center cursor-pointer shrink-0 mr-4 lg:mr-8 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-copper"
          href={routePaths.home}
        >
          <Image
            src="/WordMarkV-2.svg"
            alt="Humaneers"
            width={200}
            height={44}
            className="site-header__logo h-6 sm:h-7 md:h-8 w-auto"
            priority
          />
        </Link>

        {/* The desktop nav and CTAs need a viewport of about 910px, so below
            lg (1024px) the header uses the menu instead. Shown from md, they
            overflowed the row by 76px and cut off "Let's Get Started". */}
        <div className="hidden lg:flex flex-1 justify-center">
          <NavigationMenu className="navigation-menu-override">
            <NavigationMenuList>
              {whoWeHelpSection && (
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={TRIGGER[surface]}>
                    {whoWeHelpSection.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[800px] lg:grid-cols-3">
                      {whoWeHelpSection.featured && (
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              href={whoWeHelpSection.featured.to || "/"}
                              className="relative flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-brand-copper to-brand-oxford/80 p-6 no-underline outline-none focus:shadow-md cursor-pointer overflow-hidden"
                            >
                              {/* Strong dark overlay for maximum text contrast */}
                              <div className="absolute inset-0 bg-black/20 rounded-md"></div>
                              <div className="relative z-10">
                                <div className="mb-2 mt-4 text-lg font-bold text-brand-cream featured-nav-text">
                                  {whoWeHelpSection.featured.title}
                                </div>
                                <p className="text-sm leading-tight text-brand-cream featured-nav-text font-medium">
                                  {whoWeHelpSection.featured.description}
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      )}
                      <div className="col-span-2 grid grid-cols-2 gap-3">
                        {whoWeHelpSection.items.map((item) => (
                          <ListItem key={item.title} item={item} pathname={pathname} />
                        ))}
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}

              {platformSection && (
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={TRIGGER[surface]}>
                    {platformSection.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {platformSection.items.map((item) => (
                        <ListItem key={item.title} item={item} pathname={pathname} />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}

              {resourcesSection && (
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={TRIGGER[surface]}>
                    {resourcesSection.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {resourcesSection.featured && (
                        <li className="col-span-2">
                          <NavigationMenuLink asChild>
                            <Link
                              href={resourcesSection.featured.to || "/"}
                              className="flex w-full select-none flex-col justify-end rounded-md bg-brand-copper/10 p-4 no-underline outline-none focus:shadow-md cursor-pointer border border-brand-copper/20 hover:bg-brand-copper/20 transition-colors"
                            >
                              <div className="text-base font-bold text-brand-oxford flex items-center gap-2">
                                <BookOpen size={16} /> {resourcesSection.featured.title}
                              </div>
                              <p className="text-xs text-brand-slate mt-1">
                                {resourcesSection.featured.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      )}
                      {resourcesSection.items.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>{renderNavItem(item)}</NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}

              {companySection && (
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={TRIGGER[surface]}>
                    {companySection.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      {companySection.featured && (
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              href={companySection.featured.to || "/"}
                              className="relative flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-brand-oxford to-brand-oxford-deep p-6 no-underline outline-none focus:shadow-md cursor-pointer border border-brand-copper/20 overflow-hidden"
                            >
                              {/* Strong dark overlay for maximum text contrast */}
                              <div className="absolute inset-0 bg-black/50 rounded-md"></div>
                              <div className="relative z-10">
                                <div className="mb-2 mt-4 text-lg font-bold text-brand-cream featured-nav-text drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] shadow-black">
                                  {companySection.featured.title}
                                </div>
                                <p className="text-sm leading-tight text-brand-cream featured-nav-text drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] shadow-black font-medium">
                                  {companySection.featured.description}
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      )}
                      {companySection.items.map((item) => (
                        <ListItem key={item.title} item={item} pathname={pathname} />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden lg:flex items-center gap-3 shrink-0 ml-4">
          <Button
            variant="ghost"
            className={cn(
              "font-medium hidden lg:inline-flex focus-visible:ring-2 focus-visible:ring-brand-copper",
              light
                ? "text-brand-oxford hover:text-brand-oxford hover:bg-brand-oxford/5"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            )}
            asChild
          >
            <Link href={ctaLinks.support.to}>{ctaLinks.support.label}</Link>
          </Button>
          {/* A white ring disappears on the light surface, so it turns oxford there. */}
          <Button
            className={cn(
              "bg-brand-copper-text hover:bg-brand-copper-text-dark text-white font-medium rounded-md transition-all shadow-md hover:shadow-lg focus-visible:ring-2",
              light ? "focus-visible:ring-brand-oxford" : "focus-visible:ring-white"
            )}
            asChild
          >
            <Link href={ctaLinks.sales.to}>{ctaLinks.sales.label}</Link>
          </Button>
        </div>

        {/* Below lg the emergency line sits in the header, so a caller on a phone
            or tablet reaches it on every page without scrolling. The number
            fits beside the logo and menu from 359px; narrower, its text goes
            to screen readers only and the icon stays. The logo's mr-4 below
            lg makes that room. */}
        <div className="lg:hidden ml-auto flex items-center gap-1">
          <a
            href="tel:+19284401505"
            aria-label="Call (928) 440-1505"
            className={cn(
              "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-1.5 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper",
              light
                ? "text-brand-oxford hover:bg-brand-oxford/5 hover:text-brand-copper-text-dark"
                : "text-white hover:bg-white/10 hover:text-brand-copper-light"
            )}
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="max-[359px]:sr-only">(928) 440-1505</span>
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

const ListItem = forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & { item: NavItem; pathname: string }
>(({ className, item, pathname }, ref) => {
  if (item.disabled) {
    return null; // Don't render disabled items
  }

  const href = item.to || item.href || "/";
  const isExternal = item.external || !!item.href;

  return (
    <li>
      <NavigationMenuLink asChild>
        {isExternal ? (
          <a
            ref={ref}
            href={href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer text-brand-oxford hover:bg-gray-100",
              className
            )}
          >
            <div className="text-sm font-medium leading-none text-brand-oxford nav-item-title">
              {item.title}
            </div>
            {item.description && (
              <p className="line-clamp-2 text-sm leading-snug text-brand-slate nav-item-description">
                {item.description}
              </p>
            )}
          </a>
        ) : (
          <Link
            href={href}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer text-brand-oxford hover:bg-gray-100",
              pathname === href && "bg-accent text-accent-foreground",
              className
            )}
          >
            <div className="text-sm font-medium leading-none text-brand-oxford nav-item-title">
              {item.title}
            </div>
            {item.description && (
              <p className="line-clamp-2 text-sm leading-snug text-brand-slate nav-item-description">
                {item.description}
              </p>
            )}
          </Link>
        )}
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
