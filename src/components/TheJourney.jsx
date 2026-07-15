import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Pause, Play, ArrowRight } from "lucide-react";

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

  // Video 2 — slides in from the LEFT, holds, then slides back out to the LEFT before the section ends
  const rawVideo2X = useTransform(
    scrollYProgress,
    [0.1, 0.35, 0.75, 0.9],
    ["-110%", "0%", "0%", "-110%"]
  );
  // Video 3 — slides in from the RIGHT, holds, then slides back out to the RIGHT before the section ends
  const rawVideo3X = useTransform(
    scrollYProgress,
    [0.35, 0.6, 0.8, 0.95],
    ["110%", "0%", "0%", "110%"]
  );

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
      className="relative h-[300vh] bg-white mt-12 lg:mt-0"
      aria-label="Fleet in motion showcase"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-6 py-10">

        {/* ONE UNIFIED CARD — soft gray background holds both the text and the media */}
        <div className="relative w-full max-w-6xl rounded-[2.5rem] bg-surface border border-border overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)]">
          <div className="grid lg:grid-cols-2 gap-0 items-center">

            {/* LEFT — text: first on mobile (top), left column on desktop */}
            <div className="p-8 lg:p-14 order-1 lg:order-1">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent mb-5 block">
                On The Road
              </span>
              <h2 className="text-primary tracking-tighter leading-none mb-6">
                Built for the
                <br />
                <span className="text-accent">Long Haul.</span>
              </h2>
              <p className="text-muted text-sm leading-relaxed max-w-sm mb-8">
                We capture our routes as they happen. No staging just real-time grit. Head over to our social channels to watch our latest raw footage straight from the asphalt.
              </p>
              <div className="flex flex-row gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 bg-primary text-white font-bold text-xs sm:text-sm px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Schedule a Call
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 bg-white text-primary font-bold text-xs sm:text-sm px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                >
                  Learn More
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* RIGHT — media: below the text on mobile, right column on desktop */}
            <div className="relative w-full h-[45vh] lg:h-[70vh] order-2 lg:order-2 p-3 lg:p-4">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#171a20]">

                {/* Background video — the main video, stays visible the entire time */}
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

                {/* Video 2 — TOP-LEFT quadrant, slides in from the LEFT — clean edge, no thick mat */}
                <motion.div
                  style={{ x: video2X }}
                  className="absolute left-0 top-0 w-full sm:w-1/2 h-1/2 z-10 p-3 lg:p-4"
                >
                  <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
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

                {/* Video 3 — BOTTOM-RIGHT quadrant, slides in from the RIGHT — clean edge, no thick mat */}
                <motion.div
                  style={{ x: video3X }}
                  className="absolute right-0 bottom-0 w-full sm:w-1/2 h-1/2 z-10 p-3 lg:p-4"
                >
                  <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
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
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}