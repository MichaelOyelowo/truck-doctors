import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";

const video1 = "https://res.cloudinary.com/dffuf2gwh/video/upload/f_auto,q_auto/v1784096569/Truck_Cinematic_Videography_MP4_fkmi09.mp4";
const video2 = "https://res.cloudinary.com/dffuf2gwh/video/upload/f_auto,q_auto/v1784102335/kia_truck_epf3lx.mp4";
const video3 = "https://res.cloudinary.com/dffuf2gwh/video/upload/f_auto,q_auto/v1784106532/1784103997454_ynnkxi.mp4";

export default function ActionShowcase() {
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const [playingState, setPlayingState] = useState([true, true, true]);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Video 2 — sits top-left, slides in from the LEFT
  const rawVideo2X = useTransform(scrollYProgress, [0.1, 0.35], ["-110%", "0%"]);
  // Video 3 — sits bottom-right, slides in from the RIGHT, staggered after video 2
  const rawVideo3X = useTransform(scrollYProgress, [0.35, 0.6], ["110%", "0%"]);

  const video2X = prefersReducedMotion ? "0%" : rawVideo2X;
  const video3X = prefersReducedMotion ? "0%" : rawVideo3X;

  const toggleVideo = (index) => {
    const el = videoRefs.current[index];
    if (!el) return;
    const nextPlaying = el.paused;
    nextPlaying ? el.play() : el.pause();
    setPlayingState((prev) => {
      const next = [...prev];
      next[index] = nextPlaying;
      return next;
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-[#f8f9fa] pt-12 pb-24"
      aria-label="Fleet in motion showcase"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-6">
        
        {/* Main Floating Card Container (Tesla style) */}
        <div className="bg-white w-full max-w-6xl rounded-[2.5rem] p-6 lg:p-10 shadow-[0_15px_50px_-20px_rgba(0,0,0,0.08)] border border-gray-100/80 flex flex-col gap-6 lg:gap-8">
          
          {/* SECTION HEADER */}
          <div className="w-full">
            <div className="flex items-center gap-3 mb-3">
              {/* Added a consistent design divider line before "On The Road" */}
              <div className="h-[2px] w-6 bg-accent rounded-full"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">
                On The Road
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h2 className="text-primary text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-none">
                Built for the
                <br />
                <span className="text-accent">Long Haul.</span>
              </h2>
              <p className="text-muted text-sm leading-relaxed max-w-sm">
                Engineered to minimize downtime and maximize your operational reach.
              </p>
            </div>
          </div>

          {/* VIDEO CONTEXT BOX */}
          <div className="relative w-full h-[40vh] md:h-[45vh] rounded-3xl overflow-hidden bg-[#171a20] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)]">

            {/* Background video */}
            <video
              ref={(el) => (videoRefs.current[0] = el)}
              src={video1}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <track kind="captions" />
            </video>
            <button
              type="button"
              onClick={() => toggleVideo(0)}
              aria-pressed={playingState[0]}
              aria-label={playingState[0] ? "Pause background video" : "Play background video"}
              className="absolute bottom-4 right-4 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-[#171a20] shadow-md hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {playingState[0] ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </button>

            {/* Video 2 — TOP-LEFT quadrant, slides in from the LEFT */}
            <motion.div
              style={{ x: video2X }}
              className="absolute left-0 top-0 w-full sm:w-1/2 h-1/2 z-10 p-4 lg:p-6"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)]">
                <video
                  ref={(el) => (videoRefs.current[1] = el)}
                  src={video2}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                >
                  <track kind="captions" />
                </video>
                <button
                  type="button"
                  onClick={() => toggleVideo(1)}
                  aria-pressed={playingState[1]}
                  aria-label={playingState[1] ? "Pause top left video" : "Play top left video"}
                  className="absolute bottom-3 right-3 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-[#171a20] shadow-md hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {playingState[1] ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                </button>
              </div>
            </motion.div>

            {/* Video 3 — BOTTOM-RIGHT quadrant, slides in from the RIGHT */}
            <motion.div
              style={{ x: video3X }}
              className="absolute right-0 bottom-0 w-full sm:w-1/2 h-1/2 z-10 p-4 lg:p-6"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)]">
                <video
                  ref={(el) => (videoRefs.current[2] = el)}
                  src={video3}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                >
                  <track kind="captions" />
                </video>
                <button
                  type="button"
                  onClick={() => toggleVideo(2)}
                  aria-pressed={playingState[2]}
                  aria-label={playingState[2] ? "Pause bottom right video" : "Play bottom right video"}
                  className="absolute bottom-3 right-3 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-[#171a20] shadow-md hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {playingState[2] ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                </button>
              </div>
            </motion.div>

          </div>

          {/* DUAL CTA BUTTONS CONTAINER (Tesla styled) */}
          <div className="bg-[#f8f9fa] p-4 rounded-3xl grid grid-cols-2 gap-4 w-full">
            <button className="bg-[#171a20] text-white font-semibold py-4 px-4 rounded-2xl text-sm transition-all duration-200 hover:bg-black active:scale-[0.98] shadow-sm">
              Request a Quote
            </button>
            <button className="bg-white text-gray-900 font-semibold py-4 px-4 rounded-2xl text-sm border border-gray-200 transition-all duration-200 hover:bg-gray-50 active:scale-[0.98] shadow-sm">
              Schedule Test Run
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}