import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Zap, Weight, Gauge, Users, Calendar, ShieldCheck } from "lucide-react";

import manFront from "../assets/homepage-images/man/man11.avif";
import kiaFront from "../assets/homepage-images/kia/kia1.avif";
import daewooFront from "../assets/homepage-images/daewoo/daewoo1.avif";
import rhinoFront from "../assets/homepage-images/rhino/rhino1.avif";

const CATEGORIES = ["All", "Heavy Duty", "Medium Duty", "Reefers", "Tractor Units", "Cars"];

const CONDITION_STYLES = {
  New: "bg-accent text-white",
  Used: "bg-primary text-white",
  Certified: "bg-green-500 text-white",
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
      { icon: Gauge, label: "Economy", value: "12 km/L" },
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
      { icon: Gauge, label: "Economy", value: "14 km/L" },
      { icon: Users, label: "Seats", value: "5" },
    ],
  },
];

function VehicleCard({ vehicle, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group relative bg-white border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-black/8 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <img
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.name}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Condition badge */}
        <span className={`absolute top-3 left-3 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${CONDITION_STYLES[vehicle.condition]}`}>
          {vehicle.condition}
        </span>

        {/* Price pinned to image bottom */}
        <div className="absolute bottom-3 left-3">
          <p className="text-white font-black text-xl tracking-tighter leading-none drop-shadow">
            {vehicle.price}
          </p>
          <p className="text-white/60 text-[9px] font-bold uppercase tracking-widest mt-0.5">
            FOB Busan
          </p>
        </div>

        {/* Arrow button — appears on hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
            <ArrowUpRight size={14} className="text-primary" />
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">

        {/* Name + year */}
        <div className="mb-3">
          <h3 className="text-primary font-black tracking-tight leading-snug text-base">
            {vehicle.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <Calendar size={10} className="text-muted" />
            <span className="text-[11px] text-muted font-medium">{vehicle.year}</span>
            {vehicle.mileage && (
              <>
                <span className="text-muted text-[10px]">·</span>
                <span className="text-[11px] text-muted font-medium">{vehicle.mileage}</span>
              </>
            )}
          </div>
        </div>

        {/* Specs row */}
        <div className="flex gap-2 mb-4">
          {vehicle.specs.map((spec) => (
            <div
              key={spec.label}
              className="flex items-center gap-1.5 bg-surface rounded-lg px-2.5 py-1.5 flex-1"
            >
              <spec.icon size={11} className="text-accent shrink-0" />
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-muted leading-none">
                  {spec.label}
                </p>
                <p className="text-[11px] font-black text-primary mt-0.5">
                  {spec.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="w-full flex items-center justify-center gap-1.5 border border-border hover:border-accent hover:text-accent text-primary font-bold text-[11px] uppercase tracking-widest py-2.5 rounded-xl transition-all duration-200 group/btn">
          View Details
          <ArrowUpRight size={12} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>
      </div>
    </motion.div>
  );
}

export default function InventoryGrid() {
  const [activeTab, setActiveTab] = useState("All");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  const filtered = useMemo(
    () =>
      INVENTORY.filter(
        (item) => activeTab === "All" || item.category === activeTab
      ),
    [activeTab]
  );

  return (
    <section className="w-full bg-white py-28 px-6" aria-labelledby="inventory-heading">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div ref={headerRef} className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-accent" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">
              Available Inventory
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <motion.h2
              id="inventory-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-primary tracking-tighter leading-none"
            >
              Korean Trucks,
              <br />
              <span className="text-accent">Ready for Ghana.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted text-sm leading-relaxed max-w-sm"
            >
              Every vehicle is physically inspected in Busan before it ships.
              What you see here is what arrives at Tema Port.
            </motion.p>
          </div>
        </div>

        {/* FILTER TABS */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex gap-2 overflow-x-auto pb-2 mb-10 no-scrollbar"
          role="group"
          aria-label="Filter by category"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              aria-pressed={activeTab === cat}
              className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-200 cursor-pointer
                ${activeTab === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface text-muted hover:text-primary border border-border"
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* GRID */}
        <p className="sr-only" aria-live="polite">
          Showing {filtered.length} {filtered.length === 1 ? "vehicle" : "vehicles"}
        </p>

        <motion.ul
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((vehicle, i) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
            ))}
          </AnimatePresence>
        </motion.ul>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-3"
          >
            <p className="text-primary font-black text-lg tracking-tight">
              Nothing listed here yet
            </p>
            <p className="text-muted text-sm">
              Check back soon or browse all inventory.
            </p>
            <button
              onClick={() => setActiveTab("All")}
              className="mt-4 px-6 py-2.5 bg-accent text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-accent-dark transition-colors"
            >
              View All
            </button>
          </motion.div>
        )}

        {/* TRUST STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { value: "500+", label: "Trucks Delivered" },
            { value: "120pt", label: "Inspection Checklist" },
            { value: "100%", label: "Ownership Verified" },
            { value: "18–22", label: "Days to Ghana" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center justify-center py-6 px-4 bg-surface rounded-2xl border border-border text-center"
            >
              <p className="text-3xl font-black text-primary tracking-tighter leading-none">
                {stat.value}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}