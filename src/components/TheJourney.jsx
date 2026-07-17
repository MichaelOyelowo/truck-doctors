import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Pause, Play, ArrowRight } from "lucide-react";

const video1 = "https://res.cloudinary.com/dffuf2gwh/video/upload/f_auto,q_auto/v1784096569/Truck_Cinematic_Videography_MP4_fkmi09.mp4";
const video2 = "https://res.cloudinary.com/dffuf2gwh/video/upload/f_auto,q_auto/v1784102335/kia_truck_epf3lx.mp4";
const video3 = "https://res.cloudinary.com/dffuf2gwh/video/upload/f_auto,q_auto/v1784106532/1784103997454_ynnkxi.mp4";

export default function ActionShowcase() {
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const [playingState, setPlayingState] = useState([true, true, true]);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileAnimated, setMobileAnimated] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Detect screen size to cleanly separate mobile vs desktop experiences
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Trigger mobile video entrance animations once the user views the card
  useEffect(() => {
    if (!isMobile) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMobileAnimated(true);
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  // Desktop scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rawVideo2X = useTransform(scrollYProgress, [0.1, 0.35, 0.75, 0.9], ["-110%", "0%", "0%", "-110%"]);
  const rawVideo3X = useTransform(scrollYProgress, [0.35, 0.6, 0.8, 0.95], ["110%", "0%", "0%", "110%"]);

  const desktopVideo2X = prefersReducedMotion ? "0%" : rawVideo2X;
  const desktopVideo3X = prefersReducedMotion ? "0%" : rawVideo3X;

  const toggleVideo = (index) => {
    const el = videoRefs.current[index];
    if (!el) return;
    el.paused ? el.play() : el.pause();
    setPlayingState((prev) => {
      const next = [...prev];
      next[index] = !el.paused;
      return next;
    });
  };

  return (
    <section
      ref={containerRef}
      /* GAP REMOVED: Section is height-auto on mobile, meaning ZERO empty spaces. 
        Only stretches to 300vh on desktop where sticky scrolling works perfectly.
      */
      className="relative h-auto lg:h-[300vh] bg-white mt-4 lg:mt-0"
    >
      <div className="relative lg:sticky lg:top-0 h-auto lg:h-screen w-full flex items-center justify-center px-4 sm:px-6 py-6 lg:py-10">

        {/* ONE UNIFIED CARD */}
        <div className="relative w-full max-w-6xl rounded-[2rem] lg:rounded-[2.5rem] bg-surface border border-border overflow-hidden shadow-xl">
          
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 items-center p-5 sm:p-8 lg:p-0">

            {/* 1. TOP TITLE BLOCK (Mobile/Tablet) */}
            <div className="w-full lg:hidden mb-4 sm:mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-2 block">
                On The Road
              </span>
              <h2 className="text-primary text-2xl sm:text-4xl font-semibold tracking-tighter leading-none">
                Built for the <br/>
                <span className="text-accent italic font-serif lowercase tracking-normal">long haul.</span>
              </h2>
            </div>

            {/* DESKTOP LEFT COLUMN */}
            <div className="hidden lg:block p-8 lg:p-14">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-5 block">
                On The Road
              </span>
              <h2 className="text-primary text-5xl font-semibold tracking-tighter leading-none mb-6">
                Built for the <br /> <span className="text-accent italic font-serif lowercase tracking-normal">long haul.</span>
              </h2>
              <p className="text-muted text-sm leading-relaxed max-w-sm mb-8">
                At Truck Doctors, we treat vehicle sourcing like a science. Our certified specialists run comprehensive diagnostic and structural assessments on every unit.
              </p>
              <div className="flex flex-row gap-3">
                <button className="bg-primary text-white font-semibold text-sm px-8 py-4 rounded-xl cursor-pointer">Schedule a Call</button>
                <button className="bg-white text-primary font-semibold text-sm px-8 py-4 rounded-xl border border-border flex items-center gap-2 cursor-pointer">
                  Learn More <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* 2. VIDEO CONTAINER */}
            <div className="relative w-full h-[46vh] min-h-[320px] sm:h-[52vh] sm:min-h-[380px] lg:h-[70vh] p-1 lg:p-4">
              <div className="relative w-full h-full rounded-3xl lg:rounded-4xl overflow-hidden bg-[#171a20] shadow-2xl">
                <video ref={(el) => (videoRefs.current[0] = el)} src={video1} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
                
                {/* Video 2 (Left) - Uses desktop scroll or mobile automatic transition 
                */}
                <motion.div 
                  style={isMobile ? {} : { x: desktopVideo2X }}
                  animate={isMobile ? { x: mobileAnimated ? "0%" : "-110%" } : {}}
                  transition={{ type: "spring", damping: 20, stiffness: 80, delay: 0.2 }}
                  className="absolute left-0 top-0 w-1/2 h-1/2 z-10 p-2 lg:p-4"
                >
                  <div className="relative w-full h-full rounded-xl lg:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                    <video ref={(el) => (videoRefs.current[1] = el)} src={video2} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                  </div>
                </motion.div>

                {/* Video 3 (Right) - Uses desktop scroll or mobile automatic transition 
                */}
                <motion.div 
                  style={isMobile ? {} : { x: desktopVideo3X }}
                  animate={isMobile ? { x: mobileAnimated ? "0%" : "110%" } : {}}
                  transition={{ type: "spring", damping: 20, stiffness: 80, delay: 0.6 }}
                  className="absolute right-0 bottom-0 w-1/2 h-1/2 z-10 p-2 lg:p-4"
                >
                  <div className="relative w-full h-full rounded-xl lg:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                    <video ref={(el) => (videoRefs.current[2] = el)} src={video3} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                  </div>
                </motion.div>

                <button onClick={() => toggleVideo(0)} className="absolute bottom-3 right-3 lg:bottom-4 lg:right-4 z-20 flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/90 backdrop-blur-sm text-primary shadow-lg cursor-pointer">
                  {playingState[0] ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                </button>
              </div>
            </div>

            {/* 3. MOBILE BOTTOM BLOCK */}
            <div className="w-full lg:hidden mt-4 sm:mt-6 flex flex-col gap-4 sm:gap-6">
              <p className="text-muted text-xs sm:text-sm leading-relaxed">
                At Truck Doctors, we treat vehicle sourcing like a science. Our certified specialists run comprehensive assessments on every unit.
              </p>
              <div className="grid grid-cols-2 gap-3 w-full pb-2">
                <button className="bg-primary text-white font-semibold text-xs py-4 rounded-xl cursor-pointer shadow-lg">
                  Schedule Call
                </button>
                <button className="bg-white text-primary font-semibold text-xs py-4 rounded-xl border border-border flex items-center justify-center gap-1.5 cursor-pointer">
                  Learn More <ArrowRight size={12} />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
