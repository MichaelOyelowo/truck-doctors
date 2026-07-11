import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Key, Activity, MoveUp, Fuel, Weight, Gauge, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import truckFront from "../assets/homepage-images/hero-truck1.avif";
import truckSide from "../assets/homepage-images/hero-truck2.avif";
import truckBack from "../assets/homepage-images/hero-truck3.avif";
import truckAngle from "../assets/homepage-images/hero-truck3.avif";

const views = [truckFront, truckSide, truckBack, truckAngle];

const TRUCKS = [
  {
    id: 1,
    name: "Hyundai Xcient",
    type: "Heavy Duty Semi-Truck",
    year: "2021",
    mileage: "84,000 km",
    engine: "12.3L Diesel",
    payload: "25 Tonnes",
    price: "$28,500",
    condition: "Excellent",
    description: "A powerhouse built for long-haul freight. Fully inspected in Busan, cleared through Tema Port, and ready to earn from day one in Ghana.",
  },
  {
    id: 2,
    name: "Kia Granbird",
    type: "Long Haul Freight Truck",
    year: "2022",
    mileage: "61,000 km",
    engine: "11.0L Turbo",
    payload: "20 Tonnes",
    price: "$32,000",
    condition: "Very Good",
    description: "Low mileage, high reliability. This Kia handles the Korea–Ghana corridor with zero compromises. Ships within 7 days of order confirmation.",
  },
  {
    id: 3,
    name: "Daewoo Novus",
    type: "Medium Duty Cargo Truck",
    year: "2020",
    mileage: "102,000 km",
    engine: "9.2L Diesel",
    payload: "15 Tonnes",
    price: "$19,800",
    condition: "Good",
    description: "The smart entry point into commercial trucking. Road-ready on arrival, budget-friendly, and backed by our full after-sale support team.",
  },
];

const SPECS = [
  { icon: Calendar, key: "year", label: "Year" },
  { icon: Gauge, key: "mileage", label: "Mileage" },
  { icon: Fuel, key: "engine", label: "Engine" },
  { icon: Weight, key: "payload", label: "Payload" },
];

function SteeringWheel({ rotation, isRunning }) {
  return (
    <motion.svg
      style={{ rotate: rotation }}
      viewBox="0 0 200 200"
      className="w-full h-full"
    >
      {/* Outer rim */}
      <circle
        cx="100" cy="100" r="88"
        fill="none"
        stroke={isRunning ? "#2563EB" : "#D1D5DB"}
        strokeWidth="14"
        style={{ transition: "stroke 0.5s" }}
      />
      {/* Inner rim */}
      <circle
        cx="100" cy="100" r="65"
        fill="none"
        stroke={isRunning ? "#2563EB" : "#E5E7EB"}
        strokeWidth="3"
        strokeDasharray="8 6"
        style={{ transition: "stroke 0.5s" }}
      />
      {/* 3 spokes */}
      <line x1="100" y1="78" x2="100" y2="14"
        stroke={isRunning ? "#2563EB" : "#9CA3AF"}
        strokeWidth="13" strokeLinecap="round"
        style={{ transition: "stroke 0.5s" }}
      />
      <line x1="81" y1="113" x2="22" y2="170"
        stroke={isRunning ? "#2563EB" : "#9CA3AF"}
        strokeWidth="13" strokeLinecap="round"
        style={{ transition: "stroke 0.5s" }}
      />
      <line x1="119" y1="113" x2="178" y2="170"
        stroke={isRunning ? "#2563EB" : "#9CA3AF"}
        strokeWidth="13" strokeLinecap="round"
        style={{ transition: "stroke 0.5s" }}
      />
      {/* Center hub */}
      <circle
        cx="100" cy="100" r="24"
        fill={isRunning ? "#2563EB" : "#F3F4F6"}
        style={{ transition: "fill 0.5s" }}
      />
      <circle cx="100" cy="100" r="10"
        fill={isRunning ? "#1D4ED8" : "#E5E7EB"}
        style={{ transition: "fill 0.5s" }}
      />
      {/* Horn dots */}
      <circle cx="84" cy="100" r="3.5"
        fill={isRunning ? "white" : "#9CA3AF"}
        style={{ transition: "fill 0.5s" }}
      />
      <circle cx="116" cy="100" r="3.5"
        fill={isRunning ? "white" : "#9CA3AF"}
        style={{ transition: "fill 0.5s" }}
      />
      {/* Glow ring when running */}
      {isRunning && (
        <circle
          cx="100" cy="100" r="88"
          fill="none"
          stroke="#2563EB"
          strokeWidth="2"
          opacity="0.25"
          filter="url(#glow)"
        />
      )}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </motion.svg>
  );
}

export default function InteractiveInventory() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeView, setActiveView] = useState(0);
  const [activeTruck, setActiveTruck] = useState(0);
  const rotation = useMotionValue(0);
  const dragY = useMotionValue(0);

  const truck = TRUCKS[activeTruck];

  // Spin loop
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        const next = rotation.get() + 2;
        rotation.set(next);
        const viewIndex = Math.floor((next % 360) / 90) % 4;
        setActiveView(viewIndex);
      }, 1000 / 60);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleSwipe = () => {
    if (dragY.get() < -50) {
      setIsRunning((prev) => !prev);
    }
    dragY.set(0);
  };

  return (
    <section className="relative w-full bg-surface py-28 px-6 overflow-hidden">

      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="max-w-7xl mx-auto">

        {/* SECTION HEADER */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-accent" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">
              Live Showroom
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="text-primary tracking-tighter leading-none">
              Examine the
              <br />
              <span className="text-accent">Specimen.</span>
            </h2>
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              Every truck is physically inspected in South Korea before shipping.
              Start the engine below to see the full 360° view.
            </p>
          </div>
        </div>

        {/* TRUCK SELECTOR TABS */}
        <div className="flex gap-2 flex-wrap mb-10">
          {TRUCKS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => { setActiveTruck(i); setActiveView(0); }}
              className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-200 cursor-pointer
                ${activeTruck === i
                  ? "bg-primary text-white"
                  : "bg-white text-muted hover:text-primary border border-border"
                }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* MAIN LAYOUT — matches your sketch */}
        <div className="grid lg:grid-cols-2 gap-10 items-start mb-16">

          {/* ===== LEFT — Truck Details ===== */}
          <AnimatePresence mode="wait">
            <motion.div
              key={truck.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6"
            >
              {/* Name + type */}
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-accent mb-2">
                  {truck.type}
                </p>
                <h3 className="text-primary font-black tracking-tight leading-none mb-3">
                  {truck.name}
                </h3>
                <p className="text-muted text-sm leading-relaxed max-w-md">
                  {truck.description}
                </p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-3">
                {SPECS.map((spec) => (
                  <div
                    key={spec.key}
                    className="flex items-center gap-3 bg-white border border-border rounded-xl px-4 py-3 shadow-sm"
                  >
                    <spec.icon size={14} className="text-accent shrink-0" />
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted leading-none">
                        {spec.label}
                      </p>
                      <p className="text-sm font-black text-primary mt-0.5">
                        {truck[spec.key]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price + CTA */}
              <div className="pt-5 border-t border-border flex flex-col gap-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
                      Starting from
                    </p>
                    <p className="text-4xl font-black text-primary tracking-tighter leading-none">
                      {truck.price}
                    </p>
                    <p className="text-[10px] font-bold text-muted mt-1 uppercase tracking-widest">
                      FOB Busan Port · Shipping included
                    </p>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                    ● Available Now
                  </span>
                </div>
                <Link
                  to={`/trucks/${truck.id}`}
                  className="group flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold text-sm uppercase tracking-widest py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-accent/25"
                >
                  View Full Details
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ===== RIGHT — Truck Image ===== */}
          <div className="flex flex-col gap-3">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-border shadow-sm">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${truck.id}-${activeView}`}
                  src={views[activeView]}
                  alt={truck.name}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Scan line when running */}
              {isRunning && (
                <motion.div
                  animate={{ y: ["0%", "100%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-accent/40 shadow-[0_0_12px_#2563EB] z-20 pointer-events-none"
                />
              )}

              {/* 360 badge */}
              <AnimatePresence>
                {isRunning && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-accent/20 px-3 py-1.5 rounded-full shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                      360° Active
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Condition badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-border px-3 py-1.5 rounded-full shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                  {truck.condition} Condition
                </span>
              </div>

              {/* View dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-300 ${
                      activeView === i
                        ? "w-6 h-1.5 bg-accent"
                        : "w-1.5 h-1.5 bg-black/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {views.map((view, i) => (
                <button
                  key={i}
                  onClick={() => setActiveView(i)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer
                    ${activeView === i ? "border-accent" : "border-border hover:border-primary/30"}`}
                >
                  <img src={view} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  {activeView === i && (
                    <div className="absolute inset-0 bg-accent/10" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== BOTTOM — Steering Wheel + Key (WHITE BACKGROUND) ===== */}
        <div className="w-full bg-white border border-border rounded-3xl p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 lg:gap-20">

            {/* Key ignition slot */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">
                {isRunning ? "Drag up to stop" : "Drag up to start"}
              </span>

              {/* Slot */}
              <div className="relative w-16 h-36 bg-surface border border-border rounded-full flex flex-col items-center justify-end pb-3 shadow-inner">
                
                {/* Track */}
                <div className="absolute top-6 bottom-16 left-1/2 -translate-x-1/2 w-px bg-border" />

                {/* Target zone */}
                <div className={`absolute top-3 w-10 h-10 rounded-full border-2 border-dashed flex items-center justify-center transition-all duration-300
                  ${isRunning ? "border-accent bg-accent/5" : "border-border"}`}
                >
                  <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isRunning ? "bg-accent" : "bg-border"}`} />
                </div>

                {/* MoveUp hint */}
                <div className="absolute top-14 text-muted/40">
                  <MoveUp size={14} className="animate-bounce" />
                </div>

                {/* Draggable key */}
                <motion.div
                  drag="y"
                  dragConstraints={{ top: -90, bottom: 0 }}
                  dragElastic={0.1}
                  style={{ y: dragY }}
                  onDragEnd={handleSwipe}
                  whileTap={{ scale: 0.92 }}
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md transition-all duration-300
                    ${isRunning
                      ? "bg-accent shadow-accent/30 shadow-lg"
                      : "bg-primary shadow-primary/20"
                    }`}
                >
                  <Key size={16} className="text-white" />
                </motion.div>
              </div>

              {/* Engine status */}
              <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors duration-300
                ${isRunning ? "text-accent" : "text-muted"}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isRunning ? "bg-accent animate-pulse" : "bg-border"}`} />
                {isRunning ? "Engine On" : "Engine Off"}
              </div>
            </div>

            {/* Steering Wheel — large and prominent */}
            <div className="relative">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64">
                <SteeringWheel rotation={rotation} isRunning={isRunning} />
              </div>

              {/* Glow ring when running */}
              <AnimatePresence>
                {isRunning && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-[-16px] rounded-full border border-accent/20 pointer-events-none"
                    style={{ boxShadow: "0 0 40px rgba(37,99,235,0.12)" }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* How it works */}
            <div className="flex flex-col gap-4 max-w-[180px]">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">
                How it works
              </p>
              {[
                { step: "01", text: "Drag the key upward to start" },
                { step: "02", text: "Wheel spins, images rotate 360°" },
                { step: "03", text: "Drag key up again to stop" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="text-[10px] font-black text-accent shrink-0 mt-0.5">{item.step}</span>
                  <span className="text-[11px] text-muted font-medium leading-snug">{item.text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}