import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck, Zap, Weight, Gauge, Users, Calendar } from "lucide-react";

// Swap these for your real inventory photos — same import pattern as your
// other sections (Vite/Webpack resolves these to hashed asset URLs at build time).
import manFront from "../assets/homepage-images/man/man11.avif";
import kiaFront from "../assets/homepage-images/kia/kia1.avif";
import daewooFront from "../assets/homepage-images/daewoo/daewoo1.avif";
import rhinoFront from "../assets/homepage-images/rhino/rhino1.avif";

// ---- FEATURED (Tesla-style hero cards) ----------------------------------
// Keep this to 1–2 flagship units — the pattern is built for a short,
// deliberately curated lineup, not for browsing full inventory.
const FEATURED = [
  {
    id: "f1",
    tag: "Long-Haul Tractor Unit",
    name: "MAN TGX 18.440",
    price: "$78,500",
    condition: "New",
    image: rhinoFront,
    span: "lg:col-span-2",
  },
  {
    id: "f2",
    tag: "Heavy-Duty 6x4",
    name: "Hyundai Xcient",
    price: "$42,000",
    condition: "Used",
    image: manFront,
    span: "lg:col-span-1",
  },
];

// ---- FULL CATALOG (Cars.com-style filter + grid) -------------------------
const CATEGORIES = ["All Inventory", "Heavy Duty", "Medium Duty", "Reefers", "Tractor Units", "Cars"];

const CONDITION_STYLES = {
  New: "bg-accent text-white",
  Used: "bg-white text-[#171a20] border border-slate-200",
  Certified: "bg-emerald-500 text-white",
};

const INVENTORY = [
  {
    id: 1,
    category: "Heavy Duty",
    condition: "Used",
    name: "Hyundai Xcient 6x4",
    year: "2019",
    mileage: "142,000 km",
    price: "$42,000",
    image: manFront,
    specs: [
      { icon: Zap, label: "Power", value: "520 HP" },
      { icon: Weight, label: "Load", value: "40T" },
    ],
  },
  {
    id: 2,
    category: "Tractor Units",
    condition: "New",
    name: "MAN TGX 18.440",
    year: "2024",
    mileage: null,
    price: "$78,500",
    image: rhinoFront,
    specs: [
      { icon: Zap, label: "Power", value: "440 HP" },
      { icon: Weight, label: "Load", value: "32T" },
    ],
  },
  {
    id: 3,
    category: "Medium Duty",
    condition: "Certified",
    name: "Kia Bongo III",
    year: "2021",
    mileage: "58,000 km",
    price: "$24,900",
    image: kiaFront,
    specs: [
      { icon: Zap, label: "Power", value: "130 HP" },
      { icon: Weight, label: "Load", value: "3.5T" },
    ],
  },
  {
    id: 4,
    category: "Cars",
    condition: "Used",
    name: "Kia Sorento LX",
    year: "2018",
    mileage: "96,000 km",
    price: "$14,200",
    image: kiaFront,
    specs: [
      { icon: Gauge, label: "Mileage", value: "12 km/L" },
      { icon: Users, label: "Seats", value: "5" },
    ],
  },
  {
    id: 5,
    category: "Reefers",
    condition: "Used",
    name: "Daewoo Novus Reefer",
    year: "2020",
    mileage: "110,000 km",
    price: "$36,750",
    image: daewooFront,
    specs: [
      { icon: Zap, label: "Power", value: "380 HP" },
      { icon: Weight, label: "Load", value: "18T" },
    ],
  },
  {
    id: 6,
    category: "Cars",
    condition: "New",
    name: "Hyundai Tucson SE",
    year: "2025",
    mileage: null,
    price: "$29,000",
    image: manFront,
    specs: [
      { icon: Gauge, label: "Mileage", value: "14 km/L" },
      { icon: Users, label: "Seats", value: "5" },
    ],
  },
];

export default function InventoryGrid() {
  const [activeTab, setActiveTab] = useState("All Inventory");
  const prefersReducedMotion = useReducedMotion();

  const filtered = useMemo(
    () =>
      INVENTORY.filter(
        (item) => activeTab === "All Inventory" || item.category === activeTab
      ),
    [activeTab]
  );

  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [...FEATURED, ...INVENTORY].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Vehicle",
        name: item.name,
        itemCondition:
          item.condition === "New"
            ? "https://schema.org/NewCondition"
            : "https://schema.org/UsedCondition",
        offers: {
          "@type": "Offer",
          price: item.price.replace(/[^0-9.]/g, ""),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <section className="bg-white py-32 px-6" aria-labelledby="inventory-heading">
      {/* Structured data for search engines — invisible to visitors, read by crawlers */}
      <script type="application/ld+json">{JSON.stringify(listingSchema)}</script>

      <div className="max-w-7xl mx-auto">

        {/* ============ HEADER ============ */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent mb-4">
            The Fleet
          </span>
          <h2 id="inventory-heading" className="text-[#171a20] text-4xl md:text-5xl font-black tracking-tighter uppercase">
            Featured <span className="font-serif italic lowercase text-accent tracking-normal">right now.</span>
          </h2>
        </div>

        {/* ============ 1. FEATURED — Tesla-style hero cards ============ */}
        <div className="grid lg:grid-cols-3 gap-6 mb-28">
          {FEATURED.map((v) => (
            <div
              key={v.id}
              className={`${v.span} group flex flex-col rounded-[2rem] overflow-hidden bg-[#f4f4f4] border border-slate-100`}
            >
              {/* Photo */}
              <div className="relative aspect-4/3 overflow-hidden">
                <span
                  className={`absolute top-5 left-5 z-10 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${CONDITION_STYLES[v.condition]}`}
                >
                  {v.condition}
                </span>
                <span className="absolute top-5 right-5 z-10 text-white text-xs font-bold uppercase tracking-widest drop-shadow-md">
                  {v.tag}
                </span>
                <img
                  src={v.image}
                  alt={`${v.condition} ${v.name}, ${v.tag}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Info panel */}
              <div className="p-8 flex flex-col gap-5">
                <div>
                  <h3 className="text-[#171a20] text-2xl md:text-3xl font-black tracking-tight">
                    {v.name}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium mt-1">
                    Starting at <span className="font-bold text-[#171a20]">{v.price}</span>
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 bg-accent hover:bg-accent-dark text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
                    Reserve Unit
                  </button>
                  <button className="flex-1 bg-white border border-slate-200 hover:border-[#171a20] text-[#171a20] text-xs font-bold uppercase tracking-widest py-3.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ============ 2. FULL CATALOG — Cars.com-style filter + grid ============ */}
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-[#171a20] text-3xl md:text-4xl font-black tracking-tighter uppercase mb-8">
            Browse the <span className="font-serif italic lowercase text-accent tracking-normal">full catalog.</span>
          </h2>

          <div
            className="flex gap-2 overflow-x-auto pb-2 no-scrollbar max-w-full"
            role="group"
            aria-label="Filter inventory by category"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                aria-pressed={activeTab === cat}
                className={`px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
                  ${activeTab === cat
                    ? "bg-[#171a20] text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {filtered.length} {filtered.length === 1 ? "vehicle" : "vehicles"} in {activeTab}
        </p>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 list-none p-0 m-0">
          <AnimatePresence mode="popLayout">
            {filtered.map((vehicle) => (
              <motion.li
                layout={!prefersReducedMotion}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={vehicle.id}
                className="group"
              >
                <div className="relative aspect-square bg-slate-50 rounded-2xl overflow-hidden mb-3 border border-slate-100">
                  <span
                    className={`absolute top-2.5 left-2.5 z-10 px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-wider ${CONDITION_STYLES[vehicle.condition]}`}
                  >
                    {vehicle.condition}
                  </span>
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.year} ${vehicle.name}${vehicle.mileage ? `, ${vehicle.mileage}` : ", brand new"}`}
                    className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="px-1">
                  <h3 className="text-[#171a20] text-sm font-bold tracking-tight leading-snug">
                    {vehicle.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium mt-1">
                    <Calendar size={10} aria-hidden="true" />
                    <span>{vehicle.year}</span>
                    {vehicle.mileage && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{vehicle.mileage}</span>
                      </>
                    )}
                  </div>
                  <p className="text-accent font-bold text-sm mt-1.5">{vehicle.price}</p>
                  <button
                    className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#171a20] underline underline-offset-2 decoration-slate-300 hover:decoration-accent hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
                    aria-label={`View details for the ${vehicle.year} ${vehicle.name}`}
                  >
                    View details
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {filtered.length === 0 && (
          <p className="text-center text-slate-400 text-sm font-medium py-20">
            No vehicles currently listed in this category — check back soon or browse all inventory.
          </p>
        )}

        {/* ============ 3. TRUST BANNER ============ */}
        <div className="mt-28 p-12 bg-[#171a20] rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[100px] rounded-full" aria-hidden="true" />

          <div className="relative z-10 max-w-md">
            <div className="flex items-center gap-2 text-accent mb-4">
              <ShieldCheck size={20} aria-hidden="true" />
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