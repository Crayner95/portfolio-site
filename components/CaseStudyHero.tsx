"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface DeviceMockup {
  src: string;
  alt: string;
  type: "desktop" | "mobile";
}

interface CaseStudyHeroProps {
  title: string;
  tagline: string;
  bgColor?: string;
  /** Up to 2 device mockups — ideally one desktop + one mobile */
  mockups?: DeviceMockup[];
}

export default function CaseStudyHero({
  title,
  tagline,
  bgColor = "#F9EDE8",
  mockups = [],
}: CaseStudyHeroProps) {
  const hasImages = mockups.length > 0 && mockups.some((m) => m.src);

  return (
    <section
      className={`relative flex flex-col overflow-hidden ${hasImages ? "h-screen min-h-[600px] max-h-[1200px]" : "h-screen min-h-[600px] justify-center"}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* ── Text content ── */}
      <div className="relative z-10 flex flex-col items-center text-center pt-24 md:pt-28 px-6">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="font-mono text-[10px] text-charcoal/40 tracking-widest uppercase mb-5"
        >
          Case Study
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="font-cormorant text-[40px] md:text-[64px] font-semibold text-charcoal leading-[1.05] mb-4"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease }}
          className="font-mono text-xs md:text-sm text-charcoal/50 max-w-md leading-relaxed"
        >
          {tagline}
        </motion.p>
      </div>

      {/* ── Device mockups ── */}
      {hasImages && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
          className="relative z-10 flex items-end justify-center px-6 md:px-12 mt-6 md:mt-8"
          style={{ height: "60vh" }}
        >
          <DeviceMockups mockups={mockups} />
        </motion.div>
      )}

      {/* ── Subtle scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2, ease }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-6 bg-charcoal/20"
        />
      </motion.div>
    </section>
  );
}

/* ── Real device mockups ────────────────────────────────────────────────────── */
function DeviceMockups({ mockups }: { mockups: DeviceMockup[] }) {
  const desktop = mockups.find((m) => m.type === "desktop");
  const mobile = mockups.find((m) => m.type === "mobile");

  return (
    <div className="relative w-[50vw] h-full min-h-[280px] mx-auto">
      {/* Desktop frame */}
      {desktop && (
        <div className="absolute bottom-0 left-0 right-0 md:right-16 h-[85%] md:h-[95%]">
          <div className="relative w-full h-full rounded-t-lg overflow-hidden shadow-2xl bg-white border border-black/5">
            {/* Browser chrome bar */}
            <div className="h-8 bg-gray-100 border-b border-black/5 flex items-center px-3 gap-1.5 flex-shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
            </div>
            <div className="relative w-full" style={{ height: "calc(100% - 32px)" }}>
              <Image
                src={desktop.src}
                alt={desktop.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile frame — overlaps desktop on the right */}
      {mobile && (
        <div className="absolute bottom-0 right-0 md:right-0 w-[35%] md:w-[28%] h-[75%] md:h-[85%] z-10">
          <div className="relative w-full h-full rounded-[20px] overflow-hidden shadow-2xl bg-white border-[3px] border-black/10">
            {/* Phone notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-5 bg-black/10 rounded-b-xl z-10" />
            <div className="relative w-full h-full">
              <Image
                src={mobile.src}
                alt={mobile.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 35vw, 250px"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Single device fallback */}
      {!desktop && !mobile && mockups[0] && (
        <div className="relative w-full h-[85%] rounded-t-lg overflow-hidden shadow-2xl bg-white border border-black/5">
          <Image
            src={mockups[0].src}
            alt={mockups[0].alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 900px"
            priority
          />
        </div>
      )}
    </div>
  );
}

/* ── Placeholder mockups (no real images yet) ───────────────────────────────── */
function DeviceMockupPlaceholders() {
  return (
    <div className="relative w-full max-w-4xl h-full min-h-[280px]">
      {/* Desktop placeholder */}
      <div className="absolute bottom-0 left-0 right-16 md:right-24 h-[70%] md:h-[80%]">
        <div className="relative w-full h-full rounded-t-lg overflow-hidden shadow-2xl bg-white border border-black/5">
          {/* Browser chrome */}
          <div className="h-8 bg-gray-100 border-b border-black/5 flex items-center px-3 gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
          </div>
          {/* Content area */}
          <div className="flex flex-col items-center justify-center h-[calc(100%-32px)] bg-gold/[0.04]">
            <div className="w-10 h-10 border border-dashed border-gold/40 rounded-full flex items-center justify-center mb-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 14 14"
                fill="none"
                className="text-gold/50"
              >
                <rect x="1" y="1" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1" />
                <path d="M1 9l3-3 3 3 3-4 3 4" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                <circle cx="4.5" cy="4.5" r="1" fill="currentColor" />
              </svg>
            </div>
            <p className="font-mono text-[9px] text-gold/50 tracking-wider uppercase">
              Desktop screenshot
            </p>
          </div>
        </div>
      </div>

      {/* Mobile placeholder */}
      <div className="absolute bottom-0 right-0 w-[30%] md:w-[22%] h-[55%] md:h-[68%] z-10">
        <div className="relative w-full h-full rounded-[20px] overflow-hidden shadow-2xl bg-white border-[3px] border-black/10">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-5 bg-black/10 rounded-b-xl z-10" />
          {/* Content area */}
          <div className="flex flex-col items-center justify-center h-full bg-gold/[0.04]">
            <div className="w-8 h-8 border border-dashed border-gold/40 rounded-full flex items-center justify-center mb-2">
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                fill="none"
                className="text-gold/50"
              >
                <rect x="1" y="1" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1" />
                <path d="M1 9l3-3 3 3 3-4 3 4" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                <circle cx="4.5" cy="4.5" r="1" fill="currentColor" />
              </svg>
            </div>
            <p className="font-mono text-[8px] text-gold/50 tracking-wider uppercase text-center px-2">
              Mobile
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
