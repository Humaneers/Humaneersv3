import { ReactNode, useState, useEffect, forwardRef } from "react";
import { Menu, X, ShieldCheck, BookOpen } from "lucide-react";
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
            className="flex items-center cursor-pointer shrink-0 mr-8"
            onClick={() => onViewChange("home")}
          >
            <img src="/logo.svg" alt="Humaneers" className="h-6 invert" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Solutions - Persona Based */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white">
                    Solutions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[800px] lg:grid-cols-3">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#B87333]/50 to-[#1B263B] p-6 no-underline outline-none focus:shadow-md cursor-pointer"
                            onClick={(e) => { e.preventDefault(); onViewChange("services"); }}
                            href="#"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              Solutions by Industry
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Tailored technology strategies for every stage of growth.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <div className="col-span-2 grid grid-cols-2 gap-3">
                         <ListItem title="For Startups & Founders" onClick={() => onViewChange("growth")}>
                           Brand, marketing, and fractional leadership to scale fast.
                         </ListItem>
                         <ListItem title="For SMBs" onClick={() => onViewChange("managed-it")}>
                           Enterprise-grade managed IT and infrastructure.
                         </ListItem>
                         <ListItem title="For Households" onClick={() => onViewChange("family-protection")}>
                           Cybersecurity and tech support for high-net-worth families.
                         </ListItem>
                         <ListItem title="For Non-profits" onClick={() => onViewChange("non-profits")}>
                           Discounted pricing and specialized support for 501(c)(3)s.
                         </ListItem>
                         <ListItem title="For Solo Entrepreneurs" onClick={() => onViewChange("personal")}>
                           Professional tooling for the company of one.
                         </ListItem>
                         <ListItem title="Regulated Industries" onClick={() => onViewChange("industries")}>
                           Compliance-first solutions for healthcare and finance.
                         </ListItem>
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Platform - Technical Capabilities */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white">
                    Platform
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <ListItem title="Infrastructure & Networking" onClick={() => onViewChange("managed-it")}>
                        Cloud-native mesh networks and server management.
                      </ListItem>
                      <ListItem title="Cybersecurity Center" onClick={() => onViewChange("family-protection")}>
                        SOC 2 compliant endpoint protection and monitoring.
                      </ListItem>
                      <ListItem title="Strategic Consulting" onClick={() => onViewChange("fractional-leadership")}>
                        vCIO and vCMO services for roadmap planning.
                      </ListItem>
                      <ListItem title="Compliance Engine" onClick={() => onViewChange("about")}>
                        Automated compliance tracking and reporting.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Resources */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                       <li className="col-span-2">
                          <NavigationMenuLink asChild>
                             <a
                                className="flex w-full select-none flex-col justify-end rounded-md bg-[#B87333]/10 p-4 no-underline outline-none focus:shadow-md cursor-pointer border border-[#B87333]/20 hover:bg-[#B87333]/20 transition-colors"
                                onClick={(e) => { e.preventDefault(); onViewChange("resources"); }}
                                href="#"
                             >
                                <div className="text-base font-bold text-[#1B263B] flex items-center gap-2">
                                   <BookOpen size={16} /> Knowledge Base Hub
                                </div>
                                <p className="text-xs text-[#4E596F] mt-1">
                                   Explore guides, security explainers, and operational docs.
                                </p>
                             </a>
                          </NavigationMenuLink>
                       </li>
                       <ListItem title="Transparency & Colophon" onClick={() => onViewChange("colophon")}>
                        Our operating framework, open source credits, and ethics.
                      </ListItem>
                      <ListItem title="Ethics Charter" onClick={() => onViewChange("ethics")}>
                        Our code of conduct, anti-corruption policy, and reporting.
                      </ListItem>
                      <ListItem title="Pricing" onClick={() => onViewChange("pricing")}>
                        Transparent pricing for all service tiers.
                      </ListItem>
                      <li>
                        <a
                          href="https://status.humaneers.dev/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer text-[#1B263B] hover:bg-gray-100"
                        >
                          <div className="text-sm font-medium leading-none text-[#1B263B]">Service Status</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            Real-time system performance and uptime.
                          </p>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://support.humaneers.dev/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer text-[#1B263B] hover:bg-gray-100"
                        >
                          <div className="text-sm font-medium leading-none text-[#1B263B]">Support Portal</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            Access your tickets and knowledge base.
                          </p>
                        </a>
                      </li>
                      <ListItem title="Blog (Coming Soon)" href="#" className="opacity-60 cursor-not-allowed">
                        Insights on security and business growth.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Company */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white">
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-[#1B263B] to-[#0f1521] p-6 no-underline outline-none focus:shadow-md cursor-pointer border border-[#B87333]/20"
                            onClick={(e) => { e.preventDefault(); onViewChange("about"); }}
                            href="#"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              Our Story
                            </div>
                            <p className="text-sm leading-tight text-gray-400">
                              Building the IT consultancy we wished existed.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem title="About Us" onClick={() => onViewChange("about")}>
                        Meet the team behind Humaneers.
                      </ListItem>
                      <ListItem title="Contact" onClick={() => onViewChange("contact")}>
                        Get in touch with our support or sales team.
                      </ListItem>
                      <ListItem title="Careers" href="#" className="opacity-60 cursor-not-allowed">
                        Join our mission (Positions opening soon).
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                 <NavigationMenuItem>
                  <a
                    href="https://status.humaneers.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent text-gray-300 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer")}
                  >
                    Status
                  </a>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0 ml-4">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-white/10 font-medium hidden lg:inline-flex"
              onClick={() => onViewChange("support")}
            >
              Get Support
            </Button>
            <Button
              className="bg-[#B87333] hover:bg-[#a0632a] text-white font-medium rounded-md transition-all shadow-md hover:shadow-lg"
              onClick={() => onViewChange("talk-to-sales")}
            >
              Let's Get Started
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
                  <h4 className="text-[#B87333] font-bold uppercase text-xs tracking-wider mb-3">Solutions</h4>
                  <div className="flex flex-col gap-3 pl-2 border-l border-gray-700">
                    <MobileLink onClick={() => { onViewChange("growth"); setIsMobileMenuOpen(false); }}>Startups & Founders</MobileLink>
                    <MobileLink onClick={() => { onViewChange("managed-it"); setIsMobileMenuOpen(false); }}>SMBs</MobileLink>
                    <MobileLink onClick={() => { onViewChange("family-protection"); setIsMobileMenuOpen(false); }}>Households</MobileLink>
                    <MobileLink onClick={() => { onViewChange("non-profits"); setIsMobileMenuOpen(false); }}>Non-profits</MobileLink>
                    <MobileLink onClick={() => { onViewChange("personal"); setIsMobileMenuOpen(false); }}>Solo Entrepreneurs</MobileLink>
                  </div>
                </div>

                <div>
                  <h4 className="text-[#B87333] font-bold uppercase text-xs tracking-wider mb-3">Platform</h4>
                  <div className="flex flex-col gap-3 pl-2 border-l border-gray-700">
                    <MobileLink onClick={() => { onViewChange("managed-it"); setIsMobileMenuOpen(false); }}>Infrastructure</MobileLink>
                    <MobileLink onClick={() => { onViewChange("family-protection"); setIsMobileMenuOpen(false); }}>Cybersecurity Center</MobileLink>
                    <MobileLink onClick={() => { onViewChange("fractional-leadership"); setIsMobileMenuOpen(false); }}>Strategic Consulting</MobileLink>
                  </div>
                </div>

                <div>
                   <h4 className="text-[#B87333] font-bold uppercase text-xs tracking-wider mb-3">Resources</h4>
                   <div className="flex flex-col gap-3 pl-2 border-l border-gray-700">
                      <MobileLink onClick={() => { onViewChange("resources"); setIsMobileMenuOpen(false); }}>Knowledge Base</MobileLink>
                      <MobileLink onClick={() => { onViewChange("colophon"); setIsMobileMenuOpen(false); }}>Transparency & Colophon</MobileLink>
                      <MobileLink onClick={() => { onViewChange("pricing"); setIsMobileMenuOpen(false); }}>Pricing</MobileLink>
                   </div>
                </div>

                <div>
                   <h4 className="text-[#B87333] font-bold uppercase text-xs tracking-wider mb-3">Company</h4>
                   <div className="flex flex-col gap-3 pl-2 border-l border-gray-700">
                      <MobileLink onClick={() => { onViewChange("about"); setIsMobileMenuOpen(false); }}>About Us</MobileLink>
                      <MobileLink onClick={() => { onViewChange("contact"); setIsMobileMenuOpen(false); }}>Contact</MobileLink>
                   </div>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:text-white hover:bg-white/10 w-full"
                    onClick={() => { onViewChange("support"); setIsMobileMenuOpen(false); }}
                  >
                    Get Support
                  </Button>
                  <Button
                    className="bg-[#B87333] hover:bg-[#a0632a] text-white w-full"
                    onClick={() => { onViewChange("talk-to-sales"); setIsMobileMenuOpen(false); }}
                  >
                    Let's Get Started
                  </Button>
                </div>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <div className="flex items-center mb-4">
                <img src="/logo.svg" alt="Humaneers" className="h-6 invert" />
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
                  <button onClick={() => onViewChange("resources")} className="hover:text-[#B87333] transition-colors">
                    Resources
                  </button>
                </li>
                <li>
                  <button onClick={() => onViewChange("contact")} className="hover:text-[#B87333] transition-colors">Contact</button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Newsletter</h4>
              <p className="text-sm mb-4">Get the latest on IT security and strategy.</p>
              <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
                 <input type="email" placeholder="Email address" className="bg-[#4E596F]/20 text-white placeholder-gray-500 text-sm px-3 py-2 rounded border border-gray-700 focus:border-[#B87333] outline-none" />
                 <Button className="bg-[#B87333] hover:bg-[#a0632a] text-white text-xs py-2 h-auto w-full">Subscribe</Button>
              </form>
            </div>
          </div>

            <div className="pt-8 border-t border-gray-800 flex flex-col lg:flex-row justify-between items-center gap-6 text-xs">
              <div className="flex flex-col md:flex-row items-center gap-6 text-gray-500">
                 <p>&copy; {new Date().getFullYear()} Humaneers LLC. All rights reserved.</p>
                 <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#B87333]" />
                    <span>SOC 2 Type II Compliant</span>
                 </div>
              </div>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <button onClick={() => onViewChange("privacy")} className="hover:text-[#B87333] transition-colors">Privacy Policy</button>
              <button onClick={() => onViewChange("terms")} className="hover:text-[#B87333] transition-colors">Terms of Service</button>
              <button onClick={() => onViewChange("ethics")} className="hover:text-[#B87333] transition-colors">Ethics Charter</button>
              <button onClick={() => onViewChange("colophon")} className="hover:text-[#B87333] transition-colors">Colophon & Transparency</button>
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
