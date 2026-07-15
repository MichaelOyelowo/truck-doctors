import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

import slide1 from "../assets/homepage-images/hero-truck11.avif";
import slide2 from "../assets/homepage-images/hero-truck2.avif";
import slide3 from "../assets/homepage-images/hero-truck3.avif";
import mini1 from "../assets/homepage-images/hero-truck11.avif";

const SLIDES = [
  {
    id: 1,
    image: slide1,
    word: "Precision.",
    headline: "Buy Quality Trucks,",
    sub: "We source and sell premium commercial trucks directly from South Korea — inspected, certified, and ready to work the moment they arrive in Ghana.",
  },
  {
    id: 2,
    image: slide2,
    word: "Speed.",
    headline: "We Ship Straight,",
    sub: "From our yard in South Korea to Tema Port in 18 to 22 days. We handle export documentation, customs clearance, and port delivery — you just receive your truck.",
  },
  {
    id: 3,
    image: slide3,
    word: "Trust.",
    headline: "Customer's First,",
    sub: "From helping you choose the right truck to clearing customs and final delivery, Truck Doctors is your trusted partner every step of the journey.",
  },
];

const DURATION = 5000;
const INTERVAL = 50;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const tick = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(tick);
          setCurrent((c) => (c + 1) % SLIDES.length);
          return 0;
        }
        return prev + (INTERVAL / DURATION) * 100;
      });
    }, INTERVAL);
    return () => clearInterval(tick);
  }, [current]);

  const slide = SLIDES[current];

  return (
    <section className="relative w-full flex flex-col items-center justify-center overflow-hidden px-6">

      {/* BACKGROUND — clean crossfade, NO scale/zoom */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <img
            src={slide.image}
            alt="Freight truck"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark gradient overlays for text readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-black/20" />
          <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* SUBTLE GRID OVERLAY */}
      <div
        className="absolute inset-0 z-1 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-5xl w-full text-center text-white">

        {/* HEADLINE */}
        <div className="mb-6 min-h-32 sm:min-h-40 lg:min-h-52 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={slide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-black leading-[1.08] tracking-tighter text-white"
            >
              {slide.headline}
              <br />
              <AnimatePresence mode="wait">
                <motion.span
                  key={`word-${slide.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-serif italic font-medium lowercase tracking-normal text-white block mt-2"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {slide.word}
                </motion.span>
              </AnimatePresence>
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* SUBHEADING */}
        <div className="min-h-14 flex items-center justify-center mb-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${slide.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-white/55 text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed"
            >
              {slide.sub}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTAs — Stacked side-by-side on mobile, scaled beautifully */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-row items-center justify-center gap-3 sm:gap-4 mb-12 w-full max-w-md mx-auto sm:max-w-none"
        >
          <Link
            to="/quote"
            className="group w-[calc(50%-6px)] sm:w-auto bg-accent hover:bg-accent-dark text-white px-3 py-3.5 sm:px-10 sm:py-4 rounded-sm font-bold flex items-center justify-center gap-1.5 sm:gap-3 transition-all duration-200 hover:shadow-2xl hover:shadow-accent/40 hover:-translate-y-px text-[11px] sm:text-sm uppercase tracking-wider sm:tracking-widest"
          >
            <span className="truncate">Learn More</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 shrink-0" />
          </Link>
          <Link
            to="/track"
            className="w-[calc(50%-6px)] sm:w-auto bg-white/10 backdrop-blur-md border border-white/25 hover:bg-white/20 hover:border-white/40 text-white px-3 py-3.5 sm:px-10 sm:py-4 rounded-sm font-bold flex items-center justify-center transition-all duration-200 text-[11px] sm:text-sm uppercase tracking-wider sm:tracking-widest truncate"
          >
            Inventory
          </Link>
        </motion.div>

        {/* ROUTE INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-3 text-white/30 mb-10"
        >
          <div className="flex items-center gap-1.5">
            <MapPin size={11} className="text-accent" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Busan, KR</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1.5 h-px bg-accent/40 rounded-full" />
            ))}
            <motion.div
              className="w-2 h-2 rounded-full bg-accent"
              animate={{ x: [0, 36, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            />
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1.5 h-px bg-accent/40 rounded-full" />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={11} className="text-accent" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Tema, GH</span>
          </div>
        </motion.div>

        {/* SLIDE PROGRESS INDICATORS */}
        <div className="flex items-center justify-center gap-3">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className="relative h-0.75 rounded-full overflow-hidden bg-white/20 transition-all duration-300 cursor-pointer"
              style={{ width: i === current ? "48px" : "20px" }}
            >
              {i === current && (
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent rounded-full"
                  style={{ width: `${progress}%` }}
                />
              )}
              {i !== current && (
                <div className="absolute inset-0 bg-white/30 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* FLOATING WIDGET — Bottom Left */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
        className="absolute bottom-12 left-8 hidden lg:flex items-center gap-4 bg-white/95 backdrop-blur-md p-3 pr-6 rounded-2xl shadow-2xl border border-white/20"
      >
        <div className="flex -space-x-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
              <img src={`https://i.pravatar.cc/150?u=truck${i}`} alt="client" />
            </div>
          ))}
          <div className="w-10 h-10 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-[9px] font-black">
            500+
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-black text-primary">Business Clients</span>
          <span className="text-[10px] text-muted font-medium">Across West Africa</span>
        </div>
      </motion.div>

      {/* FLOATING WIDGET — Bottom Right */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="absolute bottom-12 right-8 hidden lg:flex flex-col gap-3 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20 w-60"
      >
        <div className="w-full h-28 rounded-xl overflow-hidden">
          <img src={mini1} className="w-full h-full object-cover" alt="shipment" />
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-green-600">Dispatch Active</span>
        </div>
        <div>
          <h4 className="text-2xl font-black text-primary tracking-tighter leading-none">10,000+</h4>
          <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">Successful Shipments</p>
        </div>
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Clock size={12} className="text-accent" />
          <span className="text-[11px] font-bold text-muted">18–22 days · Korea → Ghana</span>
        </div>
      </motion.div>

      {/* MOBILE STATS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="lg:hidden relative z-10 mt-12 flex gap-3 w-full max-w-md"
      >
        {[
          { value: "10k+", label: "Shipments", color: "text-white" },
          { value: "18–22", label: "Days Transit", color: "text-accent" },
          { value: "500+", label: "Clients", color: "text-white" },
        ].map((stat) => (
          <div key={stat.label} className="flex-1 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-1">
            <span className={`${stat.color} font-black text-xl`}>{stat.value}</span>
            <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </motion.div>

    </section>
  );
}