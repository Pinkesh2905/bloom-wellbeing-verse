
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const links = [
    { name: "Home", path: "/" },
    { name: "Community Forums", path: "/forums" },
    { name: "Mood Tracker", path: "/tracker" },
    { name: "Journal", path: "/journal" },
    { name: "Resources", path: "/resources" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <nav className="bg-white shadow-sm border-b border-wellness-lavender/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold gradient-heading">Bloom</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 
                ${location.pathname === link.path 
                  ? "text-primary bg-wellness-lavender/30" 
                  : "text-foreground/70 hover:text-primary hover:bg-wellness-lavender/20"}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex md:items-center">
            <Button className="button-primary">Sign In</Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-wellness-lavender/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? "text-primary bg-wellness-lavender/30"
                    : "text-foreground/70 hover:text-primary hover:bg-wellness-lavender/20"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <Button className="w-full button-primary">Sign In</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
