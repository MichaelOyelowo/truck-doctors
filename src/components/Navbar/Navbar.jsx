import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Truck, Search, User, Headset } from "lucide-react";
import { navLinks } from "./navData"; 
import SearchOverlay from "./SearchOverlay";
import MobileDrawer from "./MobileDrawer";
import logo from "../../assets/truck-do2.png";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-40 w-full transition-all duration-500 border-b 
        ${scrolled ? "bg-[#fdfdfd]/80 backdrop-blur-xl border-black/5 py-3 shadow-sm" 
    : "bg-[#f7f4f4] border-transparent py-2"}`}>
        
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img 
              src={logo} 
              alt="Truck Doctors Logo" 
               className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
            
          </Link>

          {/* DESKTOP LINKS */}
          <ul className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className={`px-5 py-2 text-[14px] font-bold rounded-md transition-all ${location.pathname === link.path ? "bg-black/5 text-primary" : "text-primary/70 hover:text-primary"}`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ACTIONS */}
          <div className="flex items-center gap-1">
            <button onClick={() => setSearchOpen(true)} className="p-2.5 text-primary hover:bg-black/5 rounded-md cursor-pointer"><Search size={19} /></button>
            <div className="hidden lg:flex items-center gap-1">
              <Link to="/support" className="p-2.5 text-primary hover:bg-black/5 rounded-md"><Headset size={19} /></Link>
              <Link to="/account" className="p-2.5 text-primary hover:bg-black/5 rounded-md"><User size={19} /></Link>
            </div>
            {/* HAMBURGER */}
            <button onClick={() => setMobileOpen(true)} className="xl:hidden flex flex-col gap-1.25 p-3 hover:bg-black/5 rounded-md cursor-pointer group">
              <span className="w-6 h-0.5 bg-primary transition-all group-hover:w-5"></span>
              <span className="w-6 h-0.5 bg-primary"></span>
              <span className="w-3 h-0.5 bg-primary transition-all group-hover:w-6"></span>
            </button>
          </div>
        </nav>
      </header>

      {/* MODALS */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} location={location} />
    </>
  );
}

export default Navbar;