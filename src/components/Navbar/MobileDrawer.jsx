import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, X, ChevronRight, Globe, User, Headset } from "lucide-react";
import { navLinks, mobileTools } from "./navData";
import logo from "../../assets/truck-do2.png";

export default function MobileDrawer({ isOpen, onClose, location }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 z-60 bg-black/40 backdrop-blur-md xl:hidden" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-70 w-full max-w-xs bg-white flex flex-col xl:hidden"
          >
            <div className="p-6 flex items-center justify-between border-b border-black/5">
              <Link to="/" onClick={onClose} className="flex items-center">
                <img 
                  src={logo} 
                  alt="Truck Doctors Logo" 
                  className="h-9 w-auto object-contain" 
                />
              </Link>
              <button onClick={onClose} className="p-2 cursor-pointer"><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-3 gap-2 mb-8">
                {mobileTools.map((tool) => (
                  <Link key={tool.label} to={tool.path} onClick={onClose} className="flex flex-col items-center gap-2 p-4 bg-surface rounded-xl hover:bg-accent-light transition-colors">
                    <tool.icon size={20} className="text-primary" />
                    <span className="text-[10px] font-bold uppercase">{tool.label}</span>
                  </Link>
                ))}
              </div>

              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} onClick={onClose} className={`flex items-center justify-between p-4 rounded-xl font-medium ${location.pathname === link.path ? "bg-accent-light text-accent" : ""}`}>
                      {link.label} <ChevronRight size={16} />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-6 border-t border-black/5 space-y-6">
                <Link to="/account" onClick={onClose} className="flex items-center gap-4 text-sm font-bold"><User size={18} /> Account</Link>
                <Link to="/support" onClick={onClose} className="flex items-center gap-4 text-sm font-bold"><Headset size={18} /> Support</Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}