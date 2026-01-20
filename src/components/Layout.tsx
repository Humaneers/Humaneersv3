import { Suspense, useState, useEffect, forwardRef, lazy } from "react";
import { PageLoader } from "./PageLoader";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, X, BookOpen } from "lucide-react";
import { routePaths } from "../routes";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { cn } from "./ui/utils";
import {
  navSections,
  ctaLinks,
  type NavItem,
} from "../data/navigation";

const Footer = lazy(() => import("./Footer").then((m) => ({ default: m.Footer })));

export function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderNavItem = (item: NavItem, className?: string) => {
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

    if (item.href) {
      return (
        <a
          href={item.href}
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
      <NavLink
        to={item.to ?? "/"}
        className={({ isActive }) =>
          cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer text-brand-oxford hover:bg-gray-100",
            isActive && "bg-accent text-accent-foreground",
            className
          )
        }
      >
        {content}
      </NavLink>
    );
  };

  const renderMobileItem = (item: NavItem) => {
    const label = item.mobileLabel ?? item.title;

    if (item.disabled) {
      return (
        <span
          className="text-left text-brand-slate/60 font-medium cursor-not-allowed"
          aria-disabled="true"
        >
          {label}
        </span>
      );
    }

    if (item.href) {
      return (
        <a
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          className="text-left text-gray-300 hover:text-brand-copper transition-colors font-medium"
          onClick={closeMobileMenu}
        >
          {label}
        </a>
      );
    }

    return (
      <NavLink
        to={item.to ?? "/"}
        className="text-left text-gray-300 hover:text-brand-copper transition-colors font-medium"
        onClick={closeMobileMenu}
      >
        {label}
      </NavLink>
    );
  };

  const resourcesSection = navSections.find((section) => section.id === "resources");
  const whoWeHelpSection = navSections.find((section) => section.id === "who-we-help");
  const platformSection = navSections.find((section) => section.id === "platform");
  const companySection = navSections.find((section) => section.id === "company");

  return (
    <div className="font-sans antialiased text-brand-slate bg-brand-cream min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[60] bg-brand-copper text-white px-4 py-2 rounded-md font-medium shadow-lg transition-transform"
      >
        Skip to content
      </a>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-brand-oxford shadow-lg py-3" : "bg-brand-oxford/95 backdrop-blur-sm py-5"
          }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link
            className="flex items-center cursor-pointer shrink-0 mr-8 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-copper"
            to={routePaths.home}
          >
            <img
              src="/WordMarkV-2.svg"
              alt="Humaneers"
              width={200}
              height={44}
              className="h-6 sm:h-7 md:h-8 w-auto max-w-[160px] sm:max-w-[200px]"
            />
          </Link>

          <div className="hidden md:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                {whoWeHelpSection ? (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white focus-visible:ring-2 focus-visible:ring-brand-copper">
                      {whoWeHelpSection.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[800px] lg:grid-cols-3">
                        {whoWeHelpSection.featured ? (
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <NavLink
                                to={whoWeHelpSection.featured.to ?? "/"}
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-brand-copper/50 to-brand-oxford p-6 no-underline outline-none focus:shadow-md cursor-pointer"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium text-white">
                                  {whoWeHelpSection.featured.title}
                                </div>
                                <p className="text-sm leading-tight text-white/90">
                                  {whoWeHelpSection.featured.description}
                                </p>
                              </NavLink>
                            </NavigationMenuLink>
                          </li>
                        ) : null}
                        <div className="col-span-2 grid grid-cols-2 gap-3">
                          {whoWeHelpSection.items.map((item) => (
                            <ListItem key={item.title} item={item} />
                          ))}
                        </div>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : null}

                {platformSection ? (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white focus-visible:ring-2 focus-visible:ring-brand-copper">
                      {platformSection.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        {platformSection.items.map((item) => (
                          <ListItem key={item.title} item={item} />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : null}

                {resourcesSection ? (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white focus-visible:ring-2 focus-visible:ring-brand-copper">
                      {resourcesSection.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        {resourcesSection.featured ? (
                          <li className="col-span-2">
                            <NavigationMenuLink asChild>
                              <NavLink
                                to={resourcesSection.featured.to ?? "/"}
                                className="flex w-full select-none flex-col justify-end rounded-md bg-brand-copper/10 p-4 no-underline outline-none focus:shadow-md cursor-pointer border border-brand-copper/20 hover:bg-brand-copper/20 transition-colors"
                              >
                                <div className="text-base font-bold text-brand-oxford flex items-center gap-2">
                                  <BookOpen size={16} /> {resourcesSection.featured.title}
                                </div>
                                <p className="text-xs text-brand-slate mt-1">
                                  {resourcesSection.featured.description}
                                </p>
                              </NavLink>
                            </NavigationMenuLink>
                          </li>
                        ) : null}
                        {resourcesSection.items.map((item) => (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>{renderNavItem(item)}</NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : null}

                {companySection ? (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white focus-visible:ring-2 focus-visible:ring-brand-copper">
                      {companySection.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        {companySection.featured ? (
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <NavLink
                                to={companySection.featured.to ?? "/"}
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-brand-oxford to-brand-oxford-deep p-6 no-underline outline-none focus:shadow-md cursor-pointer border border-brand-copper/20"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium text-white">
                                  {companySection.featured.title}
                                </div>
                                <p className="text-sm leading-tight text-gray-400">
                                  {companySection.featured.description}
                                </p>
                              </NavLink>
                            </NavigationMenuLink>
                          </li>
                        ) : null}
                        {companySection.items.map((item) => (
                          <ListItem key={item.title} item={item} />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : null}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0 ml-4">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-white/10 font-medium hidden lg:inline-flex focus-visible:ring-2 focus-visible:ring-brand-copper"
              asChild
            >
              <Link to={ctaLinks.support.to}>{ctaLinks.support.label}</Link>
            </Button>
            <Button
              className="bg-brand-copper hover:bg-brand-copper-dark text-white font-medium rounded-md transition-all shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-white"
              asChild
            >
              <Link to={ctaLinks.sales.to}>{ctaLinks.sales.label}</Link>
            </Button>
          </div>

          <button
            className="md:hidden text-white ml-auto rounded-md focus-visible:ring-2 focus-visible:ring-brand-copper outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-oxford border-t border-gray-700 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6 max-h-[80vh] overflow-y-auto">
                {navSections.map((section) => {
                  const mobileItems = section.featured
                    ? [section.featured, ...section.items]
                    : section.items;
                  return (
                    <div key={section.id}>
                      <h4 className="text-brand-copper font-bold uppercase text-xs tracking-wider mb-3">
                        {section.label}
                      </h4>
                      <div className="flex flex-col gap-3 pl-2 border-l border-gray-700">
                        {mobileItems.map((item) => (
                          <div key={item.title}>{renderMobileItem(item)}</div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div className="flex flex-col gap-3 mt-4">
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:text-white hover:bg-white/10 w-full"
                    asChild
                  >
                    <Link to={ctaLinks.support.to} onClick={closeMobileMenu}>
                      {ctaLinks.support.label}
                    </Link>
                  </Button>
                  <Button
                    className="bg-brand-copper hover:bg-brand-copper-dark text-white w-full"
                    asChild
                  >
                    <Link to={ctaLinks.sales.to} onClick={closeMobileMenu}>
                      {ctaLinks.sales.label}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content" className="flex-grow pt-20">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-64 bg-brand-oxford" />}>
        <Footer />
      </Suspense>
    </div>
  );
}

const ListItem = forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & { item: NavItem }
>(({ className, item }, ref) => {
  if (item.disabled) {
    return (
      <li>
        <NavigationMenuLink asChild>
          <div
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none text-brand-oxford/60 cursor-not-allowed",
              className
            )}
            aria-disabled="true"
          >
            <div className="text-sm font-medium leading-none">{item.title}</div>
            {item.description ? (
              <p className="line-clamp-2 text-sm leading-snug text-brand-slate">
                {item.description}
              </p>
            ) : null}
          </div>
        </NavigationMenuLink>
      </li>
    );
  }

  if (item.href) {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer text-brand-oxford hover:bg-gray-100",
              className
            )}
          >
            <div className="text-sm font-medium leading-none text-brand-oxford">{item.title}</div>
            {item.description ? (
              <p className="line-clamp-2 text-sm leading-snug text-brand-slate">
                {item.description}
              </p>
            ) : null}
          </a>
        </NavigationMenuLink>
      </li>
    );
  }

  return (
    <li>
      <NavigationMenuLink asChild>
        <NavLink
          ref={ref}
          to={item.to ?? "/"}
          className={({ isActive }) =>
            cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer text-brand-oxford hover:bg-gray-100",
              isActive && "bg-accent text-accent-foreground",
              className
            )
          }
        >
          <div className="text-sm font-medium leading-none text-brand-oxford">{item.title}</div>
          {item.description ? (
            <p className="line-clamp-2 text-sm leading-snug text-brand-slate">{item.description}</p>
          ) : null}
        </NavLink>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
