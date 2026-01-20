import { APP_VERSION } from "../version";
import { Suspense, useState, useEffect, forwardRef } from "react";
import { PageLoader } from "./PageLoader";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, X, BookOpen, Loader2 } from "lucide-react";
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
import { createErrorReportLink } from "../lib/utils";
import { submitNewsletter } from "../lib/zoho";
import { toast } from "sonner";
import {
  navSections,
  ctaLinks,
  footerSections,
  footerMetaLinks,
  type NavItem,
} from "../data/navigation";

export function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  // const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newsletterEmail.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsNewsletterSubmitting(true);

    try {
      await submitNewsletter({ email: newsletterEmail, source: "footer" });
      toast.success("Thanks for subscribing!");
      setNewsletterEmail("");
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Newsletter submission error:", error);
      }
      const errorMsg = error instanceof Error ? error.message : "Failed to subscribe.";
      const link = createErrorReportLink(error, "Newsletter Subscription (Footer)");
      toast.error(
        <div className="flex flex-col gap-2">
          <span>{errorMsg}</span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline font-bold hover:text-gray-200"
          >
            Report to Support
          </a>
        </div>
      );
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-brand-oxford shadow-lg py-3" : "bg-brand-oxford/95 backdrop-blur-sm py-5"
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

      <footer className="bg-brand-oxford text-gray-400 py-12 border-t border-brand-copper">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <div className="flex items-center mb-4">
                <img
                  src="/WordMarkV-2.svg"
                  alt="Humaneers"
                  className="h-6 sm:h-7 md:h-8 w-auto max-w-[160px] sm:max-w-[200px]"
                />
              </div>
              <p className="max-w-xs mb-6 text-sm">
                Enterprise strategy for businesses and families. Built with precision, delivered
                with soul.
              </p>
              <div className="inline-flex items-center gap-2 bg-brand-slate/30 px-3 py-1 rounded-full text-xs font-medium text-brand-copper">
                <span className="w-2 h-2 rounded-full bg-brand-copper"></span>
                Based in Tempe, AZ | Serving Clients Nationwide
              </div>
            </div>

            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2 text-sm">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        className={cn(
                          "hover:text-brand-copper transition-colors",
                          item.label === "View All Services" && "font-semibold text-brand-copper"
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="text-white font-semibold mb-4">Newsletter</h4>
              <p className="text-sm mb-4">Get the latest on IT security and strategy.</p>
              <form className="flex flex-col gap-2" onSubmit={handleNewsletterSubmit}>
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  disabled={isNewsletterSubmitting}
                  className="bg-brand-slate/20 text-white placeholder-gray-500 text-sm px-3 py-2 rounded border border-gray-700 focus:border-brand-copper outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <Button
                  type="submit"
                  disabled={isNewsletterSubmitting}
                  className="bg-brand-copper hover:bg-brand-copper-dark text-white text-xs py-2 h-auto w-full"
                >
                  {isNewsletterSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </form>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
            <p className="text-gray-400 font-medium">
              Built in Arizona & Texas by humans with ❤️ + ☕️.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1">
              <span>&copy; {new Date().getFullYear()} Humaneers Limited Company.</span>
              <span className="text-white/20">v{APP_VERSION}</span>
            </div>
            <p className="leading-tight opacity-60 max-w-lg">
              "Humaneers" is a trademark of Human IP LP and is used under license.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-3">
            {footerMetaLinks.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="hover:text-brand-copper transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.to!}
                  className="hover:text-brand-copper transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
            <span className="text-brand-copper font-medium px-3 py-1 bg-brand-copper/10 rounded-full">
              Supporting 501(c)(3) Organizations
            </span>
          </div>
        </div>
      </footer>
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
