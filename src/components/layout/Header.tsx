"use client";

import { useState, useEffect, forwardRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { BookOpen } from "lucide-react";
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

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderNavItem = (item: NavItem, className?: string) => {
    if (item.disabled) {
      return null; // Don't render disabled items
    }

    const content = (
      <>
        <div className="text-sm font-medium leading-none text-brand-oxford">{item.title}</div>
        {item.description ? (
          <p className="line-clamp-2 text-sm leading-snug text-brand-slate">{item.description}</p>
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-brand-oxford shadow-lg py-3" : "bg-brand-oxford/95 backdrop-blur-sm py-5"
        }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-brand-copper focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link
          className="flex items-center cursor-pointer shrink-0 mr-8 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-copper"
          href={routePaths.home}
        >
          <Image
            src="/WordMarkV-2.svg"
            alt="Humaneers"
            width={200}
            height={44}
            className="h-6 sm:h-7 md:h-8 w-auto"
            priority
          />
        </Link>

        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {whoWeHelpSection && (
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white focus-visible:ring-2 focus-visible:ring-brand-copper">
                    {whoWeHelpSection.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[800px] lg:grid-cols-3">
                      {whoWeHelpSection.featured && (
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              href={whoWeHelpSection.featured.to || "/"}
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-brand-copper/50 to-brand-oxford p-6 no-underline outline-none focus:shadow-md cursor-pointer"
                            >
                              <div className="mb-2 mt-4 text-lg font-medium text-white">
                                {whoWeHelpSection.featured.title}
                              </div>
                              <p className="text-sm leading-tight text-white/90">
                                {whoWeHelpSection.featured.description}
                              </p>
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
                  <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white focus-visible:ring-2 focus-visible:ring-brand-copper">
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
                  <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white focus-visible:ring-2 focus-visible:ring-brand-copper">
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
                  <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white focus-visible:ring-2 focus-visible:ring-brand-copper">
                    {companySection.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      {companySection.featured && (
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              href={companySection.featured.to || "/"}
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-brand-oxford to-brand-oxford-deep p-6 no-underline outline-none focus:shadow-md cursor-pointer border border-brand-copper/20"
                            >
                              <div className="mb-2 mt-4 text-lg font-medium text-white">
                                {companySection.featured.title}
                              </div>
                              <p className="text-sm leading-tight text-gray-400">
                                {companySection.featured.description}
                              </p>
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

        <div className="hidden md:flex items-center gap-3 shrink-0 ml-4">
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-white/10 font-medium hidden lg:inline-flex focus-visible:ring-2 focus-visible:ring-brand-copper"
            asChild
          >
            <Link href={ctaLinks.support.to}>{ctaLinks.support.label}</Link>
          </Button>
          <Button
            className="bg-brand-copper hover:bg-brand-copper-dark text-white font-medium rounded-md transition-all shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-white"
            asChild
          >
            <Link href={ctaLinks.sales.to}>{ctaLinks.sales.label}</Link>
          </Button>
        </div>

        <div className="md:hidden ml-auto">
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
            <div className="text-sm font-medium leading-none text-brand-oxford">{item.title}</div>
            {item.description && (
              <p className="line-clamp-2 text-sm leading-snug text-brand-slate">
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
            <div className="text-sm font-medium leading-none text-brand-oxford">{item.title}</div>
            {item.description && (
              <p className="line-clamp-2 text-sm leading-snug text-brand-slate">
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
