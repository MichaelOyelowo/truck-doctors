import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Play, ShieldCheck, Globe, Zap } from "lucide-react";
import heroTruck from "../assets/homepage-images/truck1.avif"; // Use a high-res side-view or 3/4 view truck

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full bg-[#fdfdfd] overflow-hidden flex items-center">
      
      {/* 1. THE DATA GRID BACKGROUND (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '50px 50px' }}>
      </div>

      <div className="container mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* LEFT: TEXT CONTENT */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="h-1px w-8 bg-accent"></span>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">Next-Gen Logistics</span>
          </div>
          
          <h1 className="text-primary leading-[0.95] mb-8">
            The Science of <br />
            <span className="text-accent italic">Global Transit.</span>
          </h1>
          
          <p className="max-w-lg text-lg text-[#171a20]/70 font-medium leading-relaxed mb-10">
            Specialized heavy-duty inventory and surgical shipping corridors from Korea to Ghana. We don't just move freight; we engineer the journey.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-white px-10 py-5 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-accent transition-all shadow-2xl shadow-primary/20 active:scale-95 flex items-center gap-3">
              Explore Inventory <ChevronRight size={16} />
            </button>
            <button className="border border-black/10 px-10 py-5 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-black/5 transition-all flex items-center gap-3">
              <Play size={14} fill="currentColor" /> Watch Mission
            </button>
          </div>

          {/* TRUST STATS */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-black/5 pt-10">
            <div>
              <p className="text-2xl font-black text-primary">500+</p>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Successful Transits</p>
            </div>
            <div>
              <p className="text-2xl font-black text-primary">22d</p>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Avg. Busan → Tema</p>
            </div>
            <div>
              <p className="text-2xl font-black text-primary">100%</p>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Secure Delivery</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: THE INTERACTIVE TRUCK HUB */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10"
          >
            <img 
              src={heroTruck} 
              alt="Premium Freight Truck" 
              className="w-full h-auto drop-shadow-[0_50px_50px_rgba(0,0,0,0.1)]"
            />
          </motion.div>

          {/* FLOATING DATA CARDS (The Creative Spark) */}
          <FloatingCard 
            icon={<Globe className="text-accent" size={18} />}
            label="Current Route"
            value="KR-BUS ➔ GH-TEM"
            position="top-0 -right-4"
            delay={0.5}
          />
          <FloatingCard 
            icon={<Zap className="text-yellow-500" size={18} />}
            label="System Health"
            value="Optimal"
            position="bottom-10 -left-10"
            delay={0.8}
          />
          <FloatingCard 
            icon={<ShieldCheck className="text-green-500" size={18} />}
            label="Cargo Status"
            value="Insured & Tracked"
            position="top-1/2 -right-12"
            delay={1.1}
          />
        </div>
      </div>

      {/* BACKGROUND ACCENT GRADIENT */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-125 h-125 bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>
    </section>
  );
}

function FloatingCard({ icon, label, value, position, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay, 
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 0.5,
        duration: 3
      }}
      className={`absolute ${position} hidden md:flex items-center gap-4 bg-white/80 backdrop-blur-md border border-black/5 p-4 rounded-xl shadow-xl z-20`}
    >
      <div className="bg-slate-50 p-2 rounded-lg">{icon}</div>
      <div>
        <p className="text-[9px] font-black uppercase text-muted tracking-widest leading-none mb-1">{label}</p>
        <p className="text-xs font-bold text-primary">{value}</p>
      </div>
    </motion.div>
  );
}