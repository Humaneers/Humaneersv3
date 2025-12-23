import { ReactNode, useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { View } from "../App";
import { motion, AnimatePresence } from "motion/react";

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

  const navLinks: { label: string; view: View }[] = [
    { label: "Services", view: "home" },
    { label: "Pricing", view: "pricing" },
    { label: "Americanization", view: "growth" },
    { label: "About Us", view: "about" },
  ];

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
            className="flex items-center gap-2 cursor-pointer"
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
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => onViewChange(link.view)}
                className={`text-sm font-medium transition-colors hover:text-[#B87333] ${
                  currentView === link.view ? "text-[#B87333]" : "text-gray-300"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Button
              className="bg-[#B87333] hover:bg-[#a0632a] text-white font-medium rounded-md transition-all shadow-md hover:shadow-lg"
              onClick={() => window.open("https://calendly.com", "_blank")}
            >
              Book Your Strategy Session
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
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
              className="md:hidden bg-[#1B263B] border-t border-gray-700"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      onViewChange(link.view);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left text-lg font-medium ${
                      currentView === link.view
                        ? "text-[#B87333]"
                        : "text-gray-300"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  className="bg-[#B87333] hover:bg-[#a0632a] text-white w-full mt-2"
                  onClick={() => window.open("https://calendly.com", "_blank")}
                >
                  Book Your Strategy Session
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
                and brand growth to Tempe's local businesses.
              </p>
              <div className="inline-flex items-center gap-2 bg-[#4E596F]/30 px-3 py-1 rounded-full text-xs font-medium text-[#B87333]">
                <span className="w-2 h-2 rounded-full bg-[#B87333]"></span>
                Proudly Based in Tempe, AZ
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => onViewChange("home")} className="hover:text-[#B87333] transition-colors">
                    Managed IT
                  </button>
                </li>
                <li>
                  <button onClick={() => onViewChange("growth")} className="hover:text-[#B87333] transition-colors">
                    Brand & Marketing
                  </button>
                </li>
                <li>
                  <button onClick={() => onViewChange("home")} className="hover:text-[#B87333] transition-colors">
                    Family Protection
                  </button>
                </li>
                <li>
                  <button onClick={() => onViewChange("home")} className="hover:text-[#B87333] transition-colors">
                    Fractional Leadership
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
                  <button onClick={() => onViewChange("pricing")} className="hover:text-[#B87333] transition-colors">
                    Nonprofits
                  </button>
                </li>
                <li>
                  <button className="hover:text-[#B87333] transition-colors">Contact</button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>&copy; {new Date().getFullYear()} Humaneers LLC. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span className="text-[#B87333]">Supporting 501(c)(3) Organizations</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
