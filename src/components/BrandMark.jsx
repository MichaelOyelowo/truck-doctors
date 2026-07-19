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
      <span className="text-lg font-bold uppercase tracking-wide text-muted">
        {name}
      </span>
    );
  }

  return (
    <img
      src={logo}
      alt={name}
      className="h-11 w-auto opacity-80 sm:h-14 [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.15))]"
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
    <section className="w-full bg-white py-3" aria-label="Brands we carry">
      <div className="mx-auto max-w-7xl px-6">
        {/* The label itself gets the "premium printed" treatment — a layered
            emboss shadow (soft white highlight above, soft dark shadow
            below) so the text has real depth instead of the logos. */}
        <p
          className="mb-3 text-center text-sm font-black uppercase tracking-[0.35em] text-primary [text-shadow:0_1px_0_rgba(255,255,255,0.9),0_2px_1px_rgba(0,0,0,0.1),0_4px_10px_rgba(37,99,235,0.15)]"
        >
          We Proudly Carry Top Brands
        </p>

        {/* Full table-style grid lines: the container is painted the border
            color, a 1px gap between cells lets that color show through as
            dividing lines, and each cell is painted white on top — this
            gives correct borders on every side of every cell regardless of
            row/column position, which plain divide-x/divide-y utilities
            can't do cleanly once there's more than one row. */}
        <div className="border border-border bg-border">
          <div className="grid grid-cols-3 gap-px lg:grid-cols-6">
            {ordered.map((brand) => (
              <motion.div
                key={brand.name}
                layout
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="flex items-center justify-center bg-white py-6"
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