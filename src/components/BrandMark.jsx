import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Swap these for real logo files once you've downloaded them from each
// brand's official media/press kit — same import pattern as your vehicle
// photos. SVG is strongly preferred over PNG here.
//
//   import kiaLogo from "../assets/brand-logos/kia.svg";
//   import hyundaiLogo from "../assets/brand-logos/hyundai.svg";
//   import bydLogo from "../assets/brand-logos/byd.svg";
//
// Then replace the BRANDS array below with:
//   const BRANDS = [
//     { name: "Kia", logo: kiaLogo },
//     { name: "Hyundai", logo: hyundaiLogo },
//     { name: "BYD", logo: bydLogo },
//   ];

const BRANDS = [
  { name: "Kia", logo: null },
  { name: "Hyundai", logo: null },
  { name: "BYD", logo: null },
  { name: "MAN", logo: null },
  { name: "Daewoo", logo: null },
];

const ROTATE_EVERY_MS = 3500;

function BrandMark({ name, logo }) {
  // Falls back to a plain wordmark until real logo files are dropped in —
  // remove this whole fallback block once every brand has a real `logo`.
  if (!logo) {
    return (
      <span className="text-base font-bold uppercase tracking-wide text-muted">
        {name}
      </span>
    );
  }

  return <img src={logo} alt={name} className="h-8 w-auto opacity-70" />;
}

export default function BrandStrip() {
  const prefersReducedMotion = useReducedMotion();
  const [offset, setOffset] = useState(0);
  const count = BRANDS.length;

  // Every ROTATE_EVERY_MS, advance the rotation offset by 1. Each brand's
  // display slot is (originalIndex + offset) mod count — a plain modular
  // shift, not a random shuffle — so the reordering follows a fixed,
  // repeatable rule rather than looking arbitrary.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      setOffset((prev) => (prev + 1) % count);
    }, ROTATE_EVERY_MS);
    return () => clearInterval(id);
  }, [count, prefersReducedMotion]);

  const ordered = BRANDS.map((brand, i) => ({
    ...brand,
    slot: (i + offset) % count,
  })).sort((a, b) => a.slot - b.slot);

  return (
    <section className="w-full bg-white py-10" aria-label="Brands we carry">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.3em] text-muted">
          We Proudly Carry Top Brands
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {ordered.map((brand) => (
            <motion.div
              key={brand.name}
              layout
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <BrandMark name={brand.name} logo={brand.logo} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}