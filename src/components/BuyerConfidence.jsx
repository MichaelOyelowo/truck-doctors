import { motion } from "framer-motion";
import { Anchor, Activity, ShieldAlert, Ship } from "lucide-react";

const TICKER_ITEMS = [
  { icon: Ship, text: "BUSAN PORT // DEPARTED", variant: "accent" },
  { icon: Activity, text: "120-POINT ENGINE SCAN // PASSED", variant: "default" },
  { icon: Anchor, text: "TRANSIT ROUTE // S. KOREA ➔ GHANA", variant: "accent" },
  { icon: ShieldAlert, text: "CHASSIS INTEGRITY VETTED // 100%", variant: "default" },
];

// Duplicate the array to ensure seamless loop gaps are entirely covered
const DUPLICATED_ITEMS = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

export default function DiagnosticTicker() {
  return (
    <div className="w-full bg-zinc-950 border-y border-zinc-900 py-4 overflow-hidden relative flex items-center">
      {/* Premium Side Blurs for depth */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      {/* Infinite Motion Track */}
      <motion.div
        className="flex whitespace-nowrap gap-12 items-center pr-12"
        animate={{ x: [0, -1000] }}
        transition={{
          ease: "linear",
          duration: 25,
          repeat: Infinity,
        }}
      >
        {DUPLICATED_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 select-none">
              <Icon 
                size={14} 
                className={item.variant === "accent" ? "text-accent" : "text-emerald-400"} 
              />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase font-mono text-zinc-400">
                {item.text}
              </span>
              <span className="text-zinc-800 ml-4 font-mono text-xs">//</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}