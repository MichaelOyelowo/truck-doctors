import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Globe, ChevronRight, MapPin } from "lucide-react";
import { truckTypes, popularSearches, featuredRoutes } from "./navData";

export default function SearchOverlay({ isOpen, onClose }) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [query, setQuery] = useState(""); // Track what the user is typing
  const inputRef = useRef(null);

  // Rotating Placeholder Logic
  useEffect(() => {
    if (!isOpen || query.length > 0) return; // Stop rotating if user starts typing
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % truckTypes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isOpen, query]);

  // Reset query when closed
  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm flex flex-col items-center pt-16 px-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* 1. THE SEARCH INPUT ROW */}
            <div className="flex items-center border-b border-border">
              {/* Category Dropdown */}
              <div className="hidden sm:flex items-center border-r border-border px-5 py-4 gap-2 cursor-pointer hover:bg-surface transition-colors shrink-0">
                <Globe size={15} className="text-muted" />
                <span className="text-sm font-semibold text-[#171a20]">All Categories</span>
                <ChevronRight size={14} className="text-muted rotate-90" />
              </div>

              {/* Input Area */}
              <div className="flex-1 relative flex items-center px-5">
                <Search size={18} className="text-muted shrink-0 mr-3" />
                
                <div className="relative flex-1 h-14 flex items-center">
                  <input
                    ref={inputRef}
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="absolute inset-0 w-full bg-transparent text-lg font-medium text-[#171a20] outline-none z-10"
                    placeholder="" 
                  />
                  
                  {/* ROTATING GHOST TEXT - Only shows if query is empty */}
                  <AnimatePresence mode="wait">
                    {query === "" && (
                      <motion.span
                        key={placeholderIndex}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-0 text-lg text-black/20 font-medium pointer-events-none"
                      >
                        Search <span className="text-accent font-semibold">{truckTypes[placeholderIndex]}</span>...
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Action Search Button */}
              <button className="bg-accent hover:bg-accent-dark text-white px-7 py-4 font-bold text-sm transition-colors shrink-0 flex items-center gap-2 h-full cursor-pointer">
                <Search size={16} />
                <span className="hidden sm:inline">SEARCH</span>
              </button>
            </div>

            {/* 2. POPULAR SEARCHES */}
            <div className="px-6 py-5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-4">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((tag) => (
                  <button 
                    key={tag} 
                    onClick={() => setQuery(tag)} // Clicking a tag fills the search
                    className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-accent-light hover:text-accent border border-border hover:border-accent/30 rounded-full text-xs font-semibold text-[#171a20] transition-all cursor-pointer"
                  >
                    <Search size={10} className="text-muted" /> {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. FEATURED ROUTES */}
            <div className="border-t border-border px-6 py-5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-4">Featured Supply Chains</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {featuredRoutes.map((route, i) => (
                  <button key={i} className="flex items-center gap-4 p-4 hover:bg-surface rounded-xl transition-colors text-left group cursor-pointer border border-transparent hover:border-border">
                    <div className="w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-accent" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-[#171a20] truncate">{route.from} → {route.to}</span>
                      <span className="text-[11px] text-muted">{route.time} transit</span>
                    </div>
                    <ChevronRight size={14} className="text-muted ml-auto shrink-0 group-hover:text-accent transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>

            {/* 4. FOOTER */}
            <div className="border-t border-border px-6 py-4 flex items-center justify-between bg-surface/50">
              <button onClick={onClose} className="text-[11px] font-bold text-muted hover:text-primary transition-colors flex items-center gap-2 cursor-pointer uppercase tracking-widest">
                <X size={14} /> Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}