"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { navSections, ctaLinks, type NavItem } from "../../data/navigation";
import { cn } from "../ui/utils";
import { useState } from "react";
import Image from "next/image";
import { routePaths } from "../../routes";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const renderMobileItem = (item: NavItem) => {
    if (item.disabled) {
      return null; // Don't render disabled items
    }

    const label = item.mobileLabel || item.title;

    const href = item.to || item.href || "/";
    const isExternal = item.external || !!item.href;

    if (isExternal) {
      return (
        <a
          href={href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          className="text-left text-gray-600 hover:text-brand-copper transition-colors font-medium text-sm block py-1"
          onClick={handleLinkClick}
        >
          {label}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={cn(
          "text-left transition-colors font-medium text-sm block py-1",
          pathname === href ? "text-brand-copper" : "text-gray-600 hover:text-brand-copper"
        )}
        onClick={handleLinkClick}
      >
        {label}
      </Link>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:text-brand-copper hover:bg-white/10"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[400px] bg-brand-cream border-l-brand-copper/20 overflow-y-auto"
      >
        <SheetHeader className="text-left mb-6">
          <SheetTitle asChild>
            <Link href={routePaths.home} onClick={handleLinkClick} className="inline-block">
              <Image
                src="/WordMarkV-2.svg"
                alt="Humaneers"
                width={160}
                height={35}
                className="h-6 w-auto brightness-0"
              />
            </Link>
          </SheetTitle>
          <SheetDescription className="text-brand-slate text-xs mt-2">
            Enterprise strategy for businesses and families.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-8 pb-10">
          {navSections.map((section) => {
            const mobileItems = section.featured
              ? [section.featured, ...section.items]
              : section.items;

            // Filter out duplicate "Who We Help" item if it's the featured one
            const uniqueItems = mobileItems.filter(
              (item, index, self) => index === self.findIndex((t) => t.title === item.title)
            );

            return (
              <div key={section.id}>
                <h4 className="text-brand-copper font-bold uppercase text-xs tracking-wider mb-3">
                  {section.label}
                </h4>
                <div className="flex flex-col gap-1 pl-3 border-l-2 border-brand-copper/20">
                  {uniqueItems.map((item) => (
                    <div key={item.title}>{renderMobileItem(item)}</div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-brand-copper/10">
            <Button
              className="bg-brand-copper hover:bg-brand-copper-dark text-white w-full"
              asChild
              onClick={handleLinkClick}
            >
              <Link href={ctaLinks.sales.to}>{ctaLinks.sales.label}</Link>
            </Button>
            <Button
              variant="outline"
              className="border-brand-oxford text-brand-oxford hover:bg-brand-oxford/5 w-full"
              asChild
              onClick={handleLinkClick}
            >
              <Link href={ctaLinks.support.to}>{ctaLinks.support.label}</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
