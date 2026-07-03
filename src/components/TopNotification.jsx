import { useState, useEffect } from "react";
import { X, Globe, Radio, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const notifications = [
  { 
    id: 1, 
    text: "Korea ⇄ Ghana route now available - faster transit times", 
    icon: <Globe size={14}/>, 
    direction: "top" 
  },
  { 
    id: 2, 
    text: "Track your shipment in real time using your booking ID", 
    icon: <Radio size={14}/>, 
    direction: "left" 
  },
  { 
    id: 3, 
    text: "New vessel departure every Tuesday from Busan Port", 
    icon: <Globe size={14}/>, 
    direction: "bottom" 
  },
  { 
    id: 4, 
    // Adding the Truck Emoji here 🚚
    text: "500+ successful deliveries across West Africa 🚚", 
    icon: <Truck size={14}/>, 
    direction: "drive" // Custom "drive-in" animation
  },
];

function TopNotification() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % notifications.length);
    }, 4500); // 4.5 seconds gives more time to read
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  const current = notifications[index];

  // Variants updated with a "drive" effect for the truck message
  const variants = {
    top: { initial: { y: -20, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: 20, opacity: 0 } },
    left: { initial: { x: -50, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: 50, opacity: 0 } },
    bottom: { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: -20, opacity: 0 } },
    drive: { initial: { x: 100, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -100, opacity: 0 } },
  };

  return (
    <div className="w-full bg-primary border-b border-white/10 text-white text-xs sm:text-sm py-2 px-4 flex items-center justify-between relative overflow-hidden">
      
      {/* Left: System Status */}
      {/* <div className="hidden lg:flex items-center gap-2 px-3 border-r border-white/20 mr-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
        </span>
        <span className="font-bold tracking-tighter uppercase text-[10px] text-muted">Dispatch Live</span>
      </div> */}

      {/* Center: Animated Content */}
      <div className="flex-1 flex justify-center items-center relative h-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            variants={variants[current.direction]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6, ease: "circOut" }}
            className="absolute flex items-center gap-3 text-accent-light text-center"
          >
            <span className="text-accent">{current.icon}</span>
            <span className="font-medium tracking-wide">{current.text}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right: Close Button */}
      <button 
        onClick={() => setVisible(false)} 
        className="ml-4 p-1 hover:bg-white/10 rounded-full transition-colors hover:text-white cursor-pointer z-10 relative"
      >
        <X size={20}/>
      </button>

      {/* Progress Bar */}
      <motion.div 
        key={`progress-${index}`}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 4.5, ease: "linear" }}
        className="absolute bottom-0 left-0 h-px bg-accent"
      />
    </div>
  );
}

export default TopNotification;