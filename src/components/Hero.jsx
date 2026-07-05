import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "../assets/homepage-images/truck1.avif";
import mini1 from "../assets/homepage-images/truck1.avif";
import mini2 from "../assets/homepage-images/truck1.avif";

const WORDS = ["Precision.", "Speed.", "Reliability.", "Trust."];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentWord = WORDS[wordIndex];

    if (isPaused) {
      const t = setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 1800);
      return () => clearTimeout(t);
    }
    if (!isDeleting && displayText === currentWord) { setIsPaused(true); return; }
    if (isDeleting && displayText === "") { setIsDeleting(false); setWordIndex((p) => (p + 1) % WORDS.length); return; }

    const t = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1)
      );
    }, isDeleting ? 60 : 100);

    return () => clearTimeout(t);
  }, [displayText, isDeleting, isPaused, wordIndex]);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Freight truck on highway"
          className="w-full h-full object-cover"
        />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/20" />
      </div>

      {/* SUBTLE GRID OVERLAY */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-5xl w-full text-center text-white">

        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full mb-8"
        >
          <div className="bg-accent/80 p-1 rounded-full">
            <Star size={11} className="fill-white text-white" />
          </div>
          <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] text-white/90">
            Premium Freight · Korea → Ghana
          </span>
          {/* Live pulse */}
          <span className="relative flex h-2 w-2 ml-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
        </motion.div>

        {/* HEADLINE with inline image */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-black leading-[1.08] tracking-tighter mb-6 text-white"
        >
          Freight That Moves
          <br className="hidden sm:block" />
          <span className="inline-flex flex-wrap items-center justify-center gap-3 mt-2">
            the
            {/* Inline tilted image */}
            <span className="inline-flex items-center align-middle w-20 md:w-28 h-12 md:h-16 rounded-xl overflow-hidden border-2 border-white/20 rotate-[-3deg] shadow-2xl">
              <img src={mini2} className="w-full h-full object-cover scale-110" alt="truck" />
            </span>
            World
          </span>
          <br />
          <span className="text-accent relative">
            {displayText}
            <span className="inline-block w-[3px] h-[0.75em] bg-accent ml-1 align-middle animate-pulse" />
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-white/50 text-base md:text-lg font-medium max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Truck Doctors handles end-to-end truck shipping from South Korea
          to Ghana — port pickup, customs clearance, final delivery.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/quote"
            className="group w-full sm:w-auto bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-sm font-bold flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-2xl hover:shadow-accent/40 hover:-translate-y-px text-sm uppercase tracking-widest"
          >
            Get a Quote
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/track"
            className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 text-white px-8 py-4 rounded-sm font-bold transition-all duration-200 text-sm uppercase tracking-widest"
          >
            Track Shipment
          </Link>
        </motion.div>

        {/* Route indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex items-center justify-center gap-3 text-white/30"
        >
          <div className="flex items-center gap-1.5">
            <MapPin size={11} className="text-accent" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Busan, KR</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-px bg-accent/50 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 + i * 0.08 }}
              />
            ))}
            <motion.div
              className="w-2 h-2 rounded-full bg-accent"
              animate={{ x: [0, 40, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1.5 }}
            />
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-px bg-accent/50 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 + i * 0.08 }}
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={11} className="text-accent" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Tema, GH</span>
          </div>
        </motion.div>
      </div>

      {/* FLOATING WIDGET — Bottom Left: Client Stack */}
      <motion.div
        initial={{ opacity: 0, x: -40, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
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

      {/* FLOATING WIDGET — Bottom Right: Shipment Card */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="absolute bottom-12 right-8 hidden lg:flex flex-col gap-3 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20 w-60"
      >
        {/* Mini image */}
        <div className="w-full h-28 rounded-xl overflow-hidden">
          <img src={mini1} className="w-full h-full object-cover" alt="shipment" />
        </div>
        {/* Dispatch status */}
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
        {/* Transit time */}
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Clock size={12} className="text-accent" />
          <span className="text-[11px] font-bold text-muted">18–22 days · Korea → Ghana</span>
        </div>
      </motion.div>

      {/* MOBILE BOTTOM STATS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="lg:hidden relative z-10 mt-12 flex gap-3 w-full max-w-md"
      >
        <div className="flex-1 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-1">
          <span className="text-white font-black text-xl">10k+</span>
          <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Shipments</span>
        </div>
        <div className="flex-1 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-1">
          <span className="text-accent font-black text-xl">18–22</span>
          <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Days Transit</span>
        </div>
        <div className="flex-1 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-1">
          <span className="text-white font-black text-xl">500+</span>
          <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Clients</span>
        </div>
      </motion.div>

      {/* SCROLL HINT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/25 font-black">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent"
        />
      </motion.div>

    </section>
  );
}