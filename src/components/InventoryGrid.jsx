import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar, Fuel, Gauge, Settings2, Weight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { FILTERS_BY_TYPE, INVENTORY, VEHICLE_TYPES } from "./inventoryData";

function VehicleCard({ vehicle, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const specs = vehicle.type === "Cars"
    ? [
        { icon: Fuel, label: "Fuel", value: vehicle.fuel },
        { icon: Gauge, label: "Mileage", value: vehicle.mileage },
        { icon: Settings2, label: "Gear", value: vehicle.transmission },
      ]
    : [
        { icon: Zap, label: "Power", value: vehicle.power },
        { icon: Weight, label: "Load", value: vehicle.load },
        { icon: Fuel, label: "Fuel", value: vehicle.fuel },
      ];

  return (
    <motion.li ref={ref} layout initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }} className="group overflow-hidden rounded-xl border border-border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/8 sm:rounded-2xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface sm:aspect-[4/3]">
        <img src={vehicle.image} alt={`${vehicle.year} ${vehicle.name}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute bottom-3 right-3 hidden h-8 w-8 items-center justify-center rounded-full bg-white shadow-md group-hover:flex"><ArrowUpRight size={14} className="text-primary" /></div>
      </div>
      <div className="p-3 sm:p-4">
        <div className="mb-3">
          <h3 className="text-[13px] font-semibold leading-snug tracking-tight text-primary sm:text-sm">{vehicle.name}</h3>
          <div className="mt-1 flex items-center gap-1 text-muted"><Calendar size={10} aria-hidden="true" /><span className="text-[10px] sm:text-[11px]">{vehicle.year}</span><span className="text-[10px]">·</span><span className="text-[10px] sm:text-[11px]">{vehicle.mileage}</span></div>
        </div>
        <div className="mb-3 grid grid-cols-3 gap-1.5 sm:mb-4 sm:gap-2">
          {specs.map((spec) => {
            const Icon = spec.icon;
            return <div key={spec.label} className="min-w-0 rounded-lg bg-surface px-1.5 py-1.5 sm:px-2.5"><Icon size={10} aria-hidden="true" className="text-accent" /><p className="mt-1 truncate text-[7px] font-semibold uppercase tracking-wider text-muted sm:text-[8px]">{spec.label}</p><p className="truncate text-[9px] font-semibold text-primary sm:text-[11px]">{spec.value}</p></div>;
          })}
        </div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-base font-semibold tracking-tight text-primary sm:text-lg">{vehicle.price}</p>
          {vehicle.type === "Cars" &&
          <span className="hidden text-[10px] font-medium text-muted sm:inline">{vehicle.seats}</span>}
        </div>
        <button type="button" className="group/btn flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-white py-2.5 text-[10px] font-semibold uppercase tracking-wider text-accent transition-all duration-200 hover:bg-accent-light active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:rounded-xl sm:text-[11px] sm:tracking-widest">
          View details
          <ArrowUpRight size={12} aria-hidden="true" className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
        </button>
      </div>
    </motion.li>
  );
}

export default function InventoryGrid() {
  const [vehicleType, setVehicleType] = useState("Trucks");
  const [activeFilter, setActiveFilter] = useState("All Trucks");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const filters = FILTERS_BY_TYPE[vehicleType];
  const filtered = useMemo(() => INVENTORY.filter((vehicle) => {
    if (vehicle.type !== vehicleType) return false;
    if (activeFilter === "All Trucks" || activeFilter === "All Cars") return true;
    if (activeFilter === "New Trucks" || activeFilter === "New Cars") return vehicle.condition === "New";
    if (activeFilter === "Used Trucks" || activeFilter === "Used Cars") return vehicle.condition === "Used";
    return vehicle.category === activeFilter;
  }), [activeFilter, vehicleType]);

  const chooseVehicleType = (type) => {
    setVehicleType(type);
    setActiveFilter(type === "Trucks" ? "All Trucks" : "All Cars");
  };

  return (
    <section id="inventory" className="w-full scroll-mt-24 bg-white px-6 py-16" aria-labelledby="inventory-heading">
      <div className="mx-auto max-w-7xl">
        <div ref={headerRef} className="mb-8 lg:mb-10">

          {/* Heading + copy — left-aligned, same weight/spacing rhythm as
              TheJourney's left column (font-semibold, text-5xl, tracking-tighter,
              leading-none, text-sm/leading-relaxed/max-w-sm paragraph). */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="mb-8 lg:mb-10"
          >
            <h2 id="inventory-heading" className="text-4xl font-semibold tracking-tighter leading-none text-primary lg:text-5xl">
              Every Vehicle,<br />
              <span className="bg-gradient-to-r from-accent via-[#6D5DFC] to-[#00C2FF] bg-clip-text text-transparent">
                Inspected in Busan.
              </span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              From heavy-duty trucks to daily-drive cars, each unit is sourced and physically inspected in South Korea before making the journey to Ghana.
            </p>
          </motion.div>

          {/* Eyebrow label (left) + Trucks/Cars toggle (right) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-5 flex items-center justify-between gap-4"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Available</span>

            <div className="flex gap-2" role="tablist" aria-label="Choose vehicle type">
              {VEHICLE_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  role="tab"
                  aria-selected={vehicleType === type}
                  onClick={() => chooseVehicleType(type)}
                  className={`rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-wider transition-colors ${vehicleType === type ? "bg-primary text-white" : "bg-surface text-muted hover:text-primary"}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Category filter pills */}
          <motion.div initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.25 }}>
            <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label={`${vehicleType} inventory filters`} style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {filters.map((filter) => <button key={filter} type="button" role="tab" aria-selected={activeFilter === filter} onClick={() => setActiveFilter(filter)} className={`shrink-0 rounded-full px-3.5 py-2 text-[10px] font-semibold uppercase tracking-wider transition-all sm:px-5 sm:text-[11px] ${activeFilter === filter ? "bg-accent text-white" : "border border-border bg-white text-muted hover:border-accent hover:text-accent"}`}>{filter}</button>)}
            </div>
          </motion.div>
        </div>
        <p className="sr-only" aria-live="polite">Showing {filtered.length} {filtered.length === 1 ? "vehicle" : "vehicles"}</p>
        <motion.ul layout className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:gap-5 lg:grid-cols-3"><AnimatePresence mode="popLayout">{filtered.map((vehicle, index) => <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />)}</AnimatePresence></motion.ul>
        {filtered.length === 0 && <div className="py-20 text-center"><p className="font-semibold text-primary">Nothing listed here yet.</p><button type="button" onClick={() => setActiveFilter(vehicleType === "Trucks" ? "All Trucks" : "All Cars")} className="mt-3 text-sm font-semibold text-accent underline underline-offset-4">View all {vehicleType.toLowerCase()}</button></div>}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4 }} className="mt-10"><Link to="/buy" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline decoration-primary/70 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">View all {vehicleType.toLowerCase()} <ArrowRight size={14} aria-hidden="true" /></Link></motion.div>
      </div>
    </section>
  );
}