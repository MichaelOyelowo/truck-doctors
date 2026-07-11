import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { Fuel, Weight, Gauge, Calendar, ArrowRight } from "lucide-react";
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
      className="w-full h-full pointer-events-none"
    >
      <defs>
        {/* Radial gradient for the hub — gives it a lit, pressable feel */}
        <radialGradient id="hubGradient" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor={isRunning ? "#3B82F6" : "#FFFFFF"} />
          <stop offset="60%" stopColor={isRunning ? "#1D4ED8" : "#F3F4F6"} />
          <stop offset="100%" stopColor={isRunning ? "#1E3A8A" : "#E5E7EB"} />
        </radialGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer rim */}
      <circle
        cx="100" cy="100" r="88"
        fill="none"
        stroke={isRunning ? "#1E293B" : "#D1D5DB"}
        strokeWidth="14"
        style={{ transition: "stroke 0.4s ease" }}
      />

      {/* Inner dash rim */}
      <circle
        cx="100" cy="100" r="65"
        fill="none"
        stroke={isRunning ? "#60A5FA" : "#E5E7EB"}
        strokeWidth="2.5"
        strokeDasharray="6 5"
        style={{ transition: "stroke 0.4s ease" }}
      />

      {/* 3 spokes — uniform color for clean rotation */}
      <line x1="100" y1="76" x2="100" y2="12"
        stroke={isRunning ? "#475569" : "#9CA3AF"}
        strokeWidth="13" strokeLinecap="round"
        style={{ transition: "stroke 0.4s ease" }}
      />
      <line x1="79" y1="112" x2="24" y2="144"
        stroke={isRunning ? "#475569" : "#9CA3AF"}
        strokeWidth="13" strokeLinecap="round"
        style={{ transition: "stroke 0.4s ease" }}
      />
      <line x1="121" y1="112" x2="176" y2="144"
        stroke={isRunning ? "#475569" : "#9CA3AF"}
        strokeWidth="13" strokeLinecap="round"
        style={{ transition: "stroke 0.4s ease" }}
      />

      {/* Center hub */}
      <circle
        cx="100" cy="100" r="24"
        fill="url(#hubGradient)"
        style={{ transition: "fill 0.4s ease" }}
      />
      <circle cx="100" cy="100" r="10"
        fill={isRunning ? "#1E3A8A" : "#E5E7EB"}
        style={{ transition: "fill 0.4s ease" }}
      />

      {/* Horn dots */}
      <circle cx="84" cy="100" r="3.5"
        fill={isRunning ? "#93C5FD" : "#9CA3AF"}
        style={{ transition: "fill 0.4s ease" }}
      />
      <circle cx="116" cy="100" r="3.5"
        fill={isRunning ? "#93C5FD" : "#9CA3AF"}
        style={{ transition: "fill 0.4s ease" }}
      />

      {/* Glow ring when running */}
      {isRunning && (
        <circle
          cx="100" cy="100" r="88"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="3"
          opacity="0.4"
          filter="url(#glow)"
        />
      )}
    </motion.svg>
  );
}

export default function InteractiveInventory() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeView, setActiveView] = useState(0);
  const [activeTruck, setActiveTruck] = useState(0);
  const rotation = useMotionValue(0);

  const wheelRef = useRef(null);
  const dragState = useRef({ dragging: false, moved: false, lastAngle: 0 });

  const truck = TRUCKS[activeTruck];

  // Idle spin only while "running" and not actively being dragged
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (dragState.current.dragging) return;
        const next = rotation.get() + 1.4;
        rotation.set(next);
        const viewIndex = Math.floor(((next % 360) + 360) % 360 / 90) % 4;
        setActiveView(viewIndex);
      }, 1000 / 60);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const angleFromCenter = (clientX, clientY) => {
    const rect = wheelRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
  };

  const handlePointerDown = (e) => {
    if (!wheelRef.current) return;
    dragState.current = {
      dragging: true,
      moved: false,
      lastAngle: angleFromCenter(e.clientX, e.clientY),
    };
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handlePointerMove = (e) => {
    if (!dragState.current.dragging) return;
    const angle = angleFromCenter(e.clientX, e.clientY);
    let delta = angle - dragState.current.lastAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    if (Math.abs(delta) > 0.5) dragState.current.moved = true;
    dragState.current.lastAngle = angle;

    const next = rotation.get() + delta;
    rotation.set(next);
    const viewIndex = Math.floor(((next % 360) + 360) % 360 / 90) % 4;
    setActiveView(viewIndex);
  };

  const handlePointerUp = () => {
    // A tap (no real drag movement) toggles the engine state
    if (!dragState.current.moved) {
      setIsRunning((prev) => !prev);
    }
    dragState.current.dragging = false;
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  };

  return (
    <section className="relative w-full bg-[#f4f4f4] py-24 px-6 overflow-hidden flex justify-center">

      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="w-full max-w-6xl bg-white border border-primary/15 rounded-[2rem] shadow-sm px-6 sm:px-10 lg:px-14 py-14">

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
              Spin the wheel below to see the full 360° view.
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
          </div>
        </div>

        {/* ===== BOTTOM — Steering Wheel only (WHITE BACKGROUND) ===== */}
        <div className="w-full bg-white border border-border rounded-3xl p-10 shadow-sm">
          <div className="flex flex-col items-center justify-center gap-4">

            {/* Steering Wheel — tap to start/stop, drag to look around */}
            <div
              ref={wheelRef}
              onPointerDown={handlePointerDown}
              className="relative w-56 h-56 sm:w-64 sm:h-64 cursor-grab active:cursor-grabbing touch-none select-none"
              style={{ touchAction: "none" }}
            >
              <SteeringWheel rotation={rotation} isRunning={isRunning} />

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

            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted text-center">
              {isRunning ? "Tap to stop · drag to look around" : "Tap to start · drag to look around"}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}