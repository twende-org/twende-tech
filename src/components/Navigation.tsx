import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

interface NavItem {
  name: string;
  to: string;
}

const navItems: NavItem[] = [
  { name: "Home", to: "/#home" },
  { name: "Services", to: "/services" },
  { name: "Software Products", to: "/products" },
  { name: "Pricing", to: "/pricing" },
  { name: "Our Work", to: "/#portfolio" },
  { name: "About", to: "/#about" },
  { name: "Contact", to: "/#contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-card py-2" : "bg-transparent py-4 md:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Clickable to Home */}
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-xl font-black">
              <span className="gradient-text">Twende</span> Digital
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <HashLink
                key={item.name}
                smooth
                to={item.to}
                scroll={(el) => window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </HashLink>
            ))}
            <HashLink smooth to="/#contact">
              <Button variant="hero" size="sm">
                Get Started
              </Button>
            </HashLink>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 glass-card mt-2 rounded-lg">
              {navItems.map((item) => (
                <HashLink
                  key={item.name}
                  smooth
                  to={item.to}
                  scroll={(el) => window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </HashLink>
              ))}
              <div className="pt-2">
                <HashLink smooth to="/#contact" onClick={() => setIsOpen(false)}>
                  <Button variant="hero" size="sm" className="w-full">
                    Get Started
                  </Button>
                </HashLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
