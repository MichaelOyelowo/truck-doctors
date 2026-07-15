import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Weight, ShieldCheck, Zap, Cog } from "lucide-react";

const CATEGORIES = ["All Trucks", "Heavy Duty", "Medium Duty", "Reefers", "Tractor Units"];

const TRUCK_LIST = [
  { id: 1, category: "Heavy Duty", name: "Hyundai Xcient 6x4", price: "$42,000", image: "/assets/homepage-images/man/man11.avif", hp: "520", load: "40T" },
  { id: 2, category: "Tractor Units", name: "MAN TGX 18.440", price: "$38,500", image: "/assets/homepage-images/man/man12.avif", hp: "440", load: "32T" },
  // Add more...
];

export default function InventoryGrid() {
  const [activeTab, setActiveTab] = useState("All Trucks");

  return (
    <section className="bg-white py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. CATEGORY PILLS (Inspired by Cars.com) */}
        <div className="flex flex-col items-center mb-20">
          <h2 className="text-[#171a20] text-4xl font-black tracking-tighter uppercase mb-10">
            Select your <span className="font-serif italic lowercase text-accent tracking-normal">payload.</span>
          </h2>
          
          <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar max-w-full">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer
                  ${activeTab === cat 
                    ? "bg-[#171a20] text-white shadow-xl shadow-black/20" 
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100 border border-slate-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2. THE GRID (Inspired by RAM/Tesla) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {TRUCK_LIST.filter(t => activeTab === "All Trucks" || t.category === activeTab).map((truck) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={truck.id}
                className="group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] bg-[#f4f4f4] rounded-[2rem] overflow-hidden mb-6 flex items-center justify-center p-8 transition-all group-hover:shadow-2xl group-hover:shadow-slate-200">
                  <img 
                    src={truck.image} 
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                    alt={truck.name} 
                  />
                  
                  {/* Hover Overlay Stats (Tesla Style) */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                     <div className="flex gap-4 w-full">
                        <div className="flex-1 bg-white/90 backdrop-blur-md p-3 rounded-xl flex items-center gap-2">
                           <Zap size={14} className="text-accent" />
                           <span className="text-[10px] font-bold uppercase">{truck.hp} HP</span>
                        </div>
                        <div className="flex-1 bg-white/90 backdrop-blur-md p-3 rounded-xl flex items-center gap-2">
                           <Weight size={14} className="text-accent" />
                           <span className="text-[10px] font-bold uppercase">{truck.load} Load</span>
                        </div>
                     </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="px-2">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-black tracking-tight text-[#171a20] uppercase">{truck.name}</h3>
                    <span className="text-accent font-serif italic text-lg">{truck.price}</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{truck.category}</p>
                  
                  <button className="w-full py-4 border border-black/5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#171a20] hover:text-white transition-all">
                    Technical Specifications <Cog size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 3. TRUST BANNER (Inspired by Tesla FSD Stats) */}
        <div className="mt-32 p-12 bg-[#171a20] rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[100px] rounded-full" />
            
            <div className="relative z-10 max-w-md">
                <div className="flex items-center gap-2 text-accent mb-4">
                    <ShieldCheck size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Surgical Assurance</span>
                </div>
                <h3 className="text-white text-3xl font-bold tracking-tighter leading-tight">
                    Every unit is physically vetted by our <span className="text-accent">Korean Inspection Team.</span>
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-8 relative z-10">
                <div className="text-center md:text-left">
                    <p className="text-white text-4xl font-black tracking-tighter">120+</p>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Checkpoints</p>
                </div>
                <div className="text-center md:text-left">
                    <p className="text-white text-4xl font-black tracking-tighter">100%</p>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Ownership Verified</p>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
}