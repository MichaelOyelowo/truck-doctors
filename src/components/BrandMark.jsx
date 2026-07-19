import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import bydLogo from "../assets/homepage-images/byd_logo.webp";
import hyundaiLogo from "../assets/homepage-images/hyundai_logo.png";
import daewooLogo from "../assets/homepage-images/daewoo_logo.png";
import manLogo from "../assets/homepage-images/man_logo.png";
import rhinoLogo from "../assets/homepage-images/rhino_logo.png";
import kiaLogo from "../assets/homepage-images/kia_logo.png";

const BRANDS = [
  { name: "Kia", logo: kiaLogo },
  { name: "Hyundai", logo: hyundaiLogo },
  { name: "BYD", logo: bydLogo },
  { name: "Daewoo", logo: daewooLogo },
  { name: "MAN", logo: manLogo },
  { name: "Rhino", logo: rhinoLogo },
];

const ROTATE_EVERY_MS = 3500;

function BrandMark({ name, logo }) {
  // Falls back to a plain wordmark if a logo import is ever missing —
  // safe to leave in even after every brand has a real file.
  if (!logo) {
    return (
      <span className="text-base font-bold uppercase tracking-wide text-muted">
        {name}
      </span>
    );
  }

  return (
    <img
      src={logo}
      alt={name}
      className="h-7 w-auto mx-auto opacity-70 sm:h-8"
    />
  );
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
    <section className="w-full bg-white py-6" aria-label="Brands we carry">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.3em] text-muted">
          We Proudly Carry Top Brands
        </p>

        {/* Top/bottom lines bracket just the logo row, matching the sketch */}
        <div className="border-t border-b border-border py-5">
          <div className="grid grid-cols-3 items-center gap-x-6 gap-y-6 lg:flex lg:flex-nowrap lg:justify-between lg:gap-x-12 lg:gap-y-0">
            {ordered.map((brand) => (
              <motion.div
                key={brand.name}
                layout
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="flex items-center justify-center"
              >
                <BrandMark name={brand.name} logo={brand.logo} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}