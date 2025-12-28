import { ReactNode, useState, useEffect, forwardRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { View } from "../App";
import { motion, AnimatePresence } from "motion/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { cn } from "./ui/utils";

interface LayoutProps {
  children: ReactNode;
  currentView: View;
  onViewChange: (view: View) => void;
}

export function Layout({ children, currentView, onViewChange }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#1B263B] shadow-lg py-3"
            : "bg-[#1B263B]/95 backdrop-blur-sm py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer shrink-0 mr-8"
            onClick={() => onViewChange("home")}
          >
            <div className="w-8 h-8 bg-[#B87333] rounded-sm flex items-center justify-center text-white font-bold text-xl font-serif">
              H
            </div>
            <span className="text-white text-xl font-bold tracking-tight">
              Humaneers
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-4">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#B87333]/50 to-[#1B263B] p-6 no-underline outline-none focus:shadow-md cursor-pointer"
                            onClick={(e) => { e.preventDefault(); onViewChange("services"); }}
                            href="#"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              Humaneers Services
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Comprehensive IT, Security, and Growth solutions for modern businesses.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem title="Managed IT" onClick={() => onViewChange("managed-it")}>
                        Cloud-native infrastructure & 100% US-based support.
                      </ListItem>
                      <ListItem title="Brand & Marketing" onClick={() => onViewChange("growth")}>
                        Americanization strategy & market growth.
                      </ListItem>
                      <ListItem title="Family Protection" onClick={() => onViewChange("family-protection")}>
                        Enterprise-grade security for your home office.
                      </ListItem>
                      <ListItem title="Fractional Leadership" onClick={() => onViewChange("fractional-leadership")}>
                        vCIO & vCMO services for strategic direction.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white">
                    Who We Serve
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2">
                       <li className="row-span-3">
                          <NavigationMenuLink asChild>
                             <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-[#1B263B] to-[#0f1521] p-6 no-underline outline-none focus:shadow-md cursor-pointer border border-[#B87333]/20"
                                onClick={(e) => { e.preventDefault(); onViewChange("industries"); }}
                                href="#"
                             >
                                <div className="mb-2 mt-4 text-lg font-medium text-white">
                                   Industries
                                </div>
                                <p className="text-sm leading-tight text-gray-400 mb-4">
                                   Tailored IT solutions for your specific business needs.
                                </p>
                                <div className="text-[#B87333] text-sm font-semibold flex items-center">
                                   View All Industries
                                </div>
                             </a>
                          </NavigationMenuLink>
                       </li>
                      <ListItem title="Nonprofits" onClick={() => onViewChange("non-profits")}>
                        Significant discounts on all plans for 501(c)(3) orgs.
                      </ListItem>
                      <ListItem title="Retail & Main St." onClick={() => onViewChange("industries")}>
                        POS reliability for dry cleaners, cafes, and shops.
                      </ListItem>
                      <ListItem title="Hospitality" onClick={() => onViewChange("industries")}>
                        Secure Wi-Fi for AirBnBs and boutique hotels.
                      </ListItem>
                      <ListItem title="Healthcare" onClick={() => onViewChange("industries")}>
                        HIPAA compliance for clinics and therapists.
                      </ListItem>
                      <ListItem title="Field Services" onClick={() => onViewChange("industries")}>
                        Mobile solutions for landscapers and contractors.
                      </ListItem>
                      <ListItem title="Small Enterprise" onClick={() => onViewChange("industries")}>
                        Scalable compliance for teams of 20-100.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent text-gray-300 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer")}
                    onClick={() => onViewChange("pricing")}
                  >
                    Pricing
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent text-gray-300 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer")}
                    onClick={() => onViewChange("about")}
                  >
                    About Us
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA */}
          <div className="hidden md:block shrink-0 ml-4">
            <Button
              className="bg-[#B87333] hover:bg-[#a0632a] text-white font-medium rounded-md transition-all shadow-md hover:shadow-lg"
              onClick={() => onViewChange("contact")}
            >
              Book Strategy Session
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#1B263B] border-t border-gray-700 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6 max-h-[80vh] overflow-y-auto">
                <div>
                  <h4 className="text-[#B87333] font-bold uppercase text-xs tracking-wider mb-3">Services</h4>
                  <div className="flex flex-col gap-3 pl-2 border-l border-gray-700">
                    <MobileLink onClick={() => { onViewChange("managed-it"); setIsMobileMenuOpen(false); }}>Managed IT</MobileLink>
                    <MobileLink onClick={() => { onViewChange("growth"); setIsMobileMenuOpen(false); }}>Brand & Marketing</MobileLink>
                    <MobileLink onClick={() => { onViewChange("family-protection"); setIsMobileMenuOpen(false); }}>Family Protection</MobileLink>
                    <MobileLink onClick={() => { onViewChange("fractional-leadership"); setIsMobileMenuOpen(false); }}>Fractional Leadership</MobileLink>
                  </div>
                </div>

                <div>
                  <h4 className="text-[#B87333] font-bold uppercase text-xs tracking-wider mb-3">Who We Serve</h4>
                  <div className="flex flex-col gap-3 pl-2 border-l border-gray-700">
                    <MobileLink onClick={() => { onViewChange("non-profits"); setIsMobileMenuOpen(false); }}>Nonprofits</MobileLink>
                    <MobileLink onClick={() => { onViewChange("industries"); setIsMobileMenuOpen(false); }}>Retail & Hospitality</MobileLink>
                    <MobileLink onClick={() => { onViewChange("industries"); setIsMobileMenuOpen(false); }}>Healthcare & Field Ops</MobileLink>
                    <MobileLink onClick={() => { onViewChange("industries"); setIsMobileMenuOpen(false); }}>Small Enterprise</MobileLink>
                  </div>
                </div>

                <div>
                   <h4 className="text-[#B87333] font-bold uppercase text-xs tracking-wider mb-3">Company</h4>
                   <div className="flex flex-col gap-3 pl-2 border-l border-gray-700">
                      <MobileLink onClick={() => { onViewChange("pricing"); setIsMobileMenuOpen(false); }}>Pricing</MobileLink>
                      <MobileLink onClick={() => { onViewChange("about"); setIsMobileMenuOpen(false); }}>About Us</MobileLink>
                      <MobileLink onClick={() => { onViewChange("contact"); setIsMobileMenuOpen(false); }}>Contact</MobileLink>
                   </div>
                </div>

                <Button
                  className="bg-[#B87333] hover:bg-[#a0632a] text-white w-full mt-4"
                  onClick={() => { onViewChange("contact"); setIsMobileMenuOpen(false); }}
                >
                  Book Strategy Session
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Spacer for fixed header */}
      <main className="flex-grow pt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-[#1B263B] text-gray-400 py-12 border-t border-[#B87333]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#B87333] rounded-sm flex items-center justify-center text-white font-bold text-xl font-serif">
                  H
                </div>
                <span className="text-white text-xl font-bold tracking-tight">
                  Humaneers
                </span>
              </div>
              <p className="max-w-xs mb-6 text-sm">
                Enterprise Strategy. Small Business Soul. We bring high-end IT
                and brand growth to businesses across the United States.
              </p>
              <div className="inline-flex items-center gap-2 bg-[#4E596F]/30 px-3 py-1 rounded-full text-xs font-medium text-[#B87333]">
                <span className="w-2 h-2 rounded-full bg-[#B87333]"></span>
                Based in Tempe, AZ | Serving Clients Nationwide
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => onViewChange("services")} className="hover:text-[#B87333] transition-colors font-semibold text-[#B87333]">
                    View All Services
                  </button>
                </li>
                <li>
                  <button onClick={() => onViewChange("managed-it")} className="hover:text-[#B87333] transition-colors">
                    Managed IT
                  </button>
                </li>
                <li>
                  <button onClick={() => onViewChange("growth")} className="hover:text-[#B87333] transition-colors">
                    Brand & Marketing
                  </button>
                </li>
                <li>
                  <button onClick={() => onViewChange("family-protection")} className="hover:text-[#B87333] transition-colors">
                    Family Protection
                  </button>
                </li>
                <li>
                  <button onClick={() => onViewChange("fractional-leadership")} className="hover:text-[#B87333] transition-colors">
                    Fractional Leadership
                  </button>
                </li>
                <li>
                  <button onClick={() => onViewChange("non-profits")} className="hover:text-[#B87333] transition-colors">
                    Nonprofits
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => onViewChange("about")} className="hover:text-[#B87333] transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => onViewChange("pricing")} className="hover:text-[#B87333] transition-colors">
                    Pricing
                  </button>
                </li>
                <li>
                  <button onClick={() => onViewChange("contact")} className="hover:text-[#B87333] transition-colors">Contact</button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>&copy; {new Date().getFullYear()} Humaneers LLC. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <button onClick={() => onViewChange("privacy")} className="hover:text-[#B87333] transition-colors">Privacy Policy</button>
              <button onClick={() => onViewChange("terms")} className="hover:text-[#B87333] transition-colors">Terms of Service</button>
              <span className="text-[#B87333]">Supporting 501(c)(3) Organizations</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; onClick?: () => void }
>(({ className, title, children, onClick, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer text-[#1B263B] hover:bg-gray-100",
            className
          )}
          onClick={(e) => {
            e.preventDefault();
            if (onClick) onClick();
          }}
          href="#"
          {...props}
        >
          <div className="text-sm font-medium leading-none text-[#1B263B]">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

function MobileLink({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-left text-gray-300 hover:text-[#B87333] transition-colors font-medium">
      {children}
    </button>
  );
}
