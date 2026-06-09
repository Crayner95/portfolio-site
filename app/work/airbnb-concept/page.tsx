"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import CaseStudySidebar from "@/components/CaseStudySidebar";
import FadeUp from "@/components/FadeUp";

const airbnbSections = [
  { id: "product", label: "The Product", number: "01" },
  { id: "audit", label: "The Audit", number: "02" },
  { id: "ideation", label: "Ideation", number: "03" },
  // { id: "lofi", label: "Low Fidelity", number: "04" },
  { id: "hifi", label: "High Fidelity", number: "04" },
  { id: "reflection", label: "Reflection", number: "05" },
];

// ── Section Wrapper ───────────────────────────────────────────────────────────
function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-28 mb-24 ${className}`}>
      {children}
    </section>
  );
}

// ── Section Label ─────────────────────────────────────────────────────────────
function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="font-mono text-[12px] text-[#FF385C] tracking-widest">{number}</span>
      <div className="h-px w-8 bg-[#FF385C]/30" />
      <span className="font-mono text-[12px] text-charcoal/60 tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}

// ── Lightbox Image ──────────────────────────────────────────────────────────
function LightboxImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.setProperty("--scroll-y", `-${scrollY}px`);
      document.body.classList.add("lightbox-open");
      const prevent = (e: TouchEvent) => { e.preventDefault(); };
      document.addEventListener("touchmove", prevent, { passive: false });
      return () => {
        document.removeEventListener("touchmove", prevent);
        const sy = document.body.style.getPropertyValue("--scroll-y");
        document.body.classList.remove("lightbox-open");
        document.body.style.removeProperty("--scroll-y");
        window.scrollTo(0, parseInt(sy || "0") * -1);
      };
    }
    return undefined;
  }, [open]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`${className} cursor-zoom-in`}
        onClick={() => setOpen(true)}
      />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 p-8"
            onClick={() => setOpen(false)}
          >
            <motion.div
              ref={containerRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-full max-h-[80vh] overflow-hidden rounded-[4px] cursor-crosshair"
              onClick={(e) => e.stopPropagation()}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img
                src={src}
                alt={alt}
                className="max-w-full max-h-[80vh] object-contain rounded-[4px]"
              />
              {isHovering && containerRef.current && (() => {
                const rect = containerRef.current!;
                const imgW = rect.offsetWidth;
                const imgH = rect.offsetHeight;
                const zoom = 2.5;
                const lensSize = 200;
                const lensX = (mousePos.x / 100) * imgW - lensSize / 2;
                const lensY = (mousePos.y / 100) * imgH - lensSize / 2;
                const bgX = -(mousePos.x / 100) * imgW * zoom + lensSize / 2;
                const bgY = -(mousePos.y / 100) * imgH * zoom + lensSize / 2;

                return (
                  <div
                    className="pointer-events-none absolute rounded-full border-2 border-white/30 shadow-[0_0_20px_rgba(0,0,0,0.3)] overflow-hidden"
                    style={{
                      width: lensSize,
                      height: lensSize,
                      left: lensX,
                      top: lensY,
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      className="absolute pointer-events-none"
                      style={{
                        width: imgW * zoom,
                        height: imgH * zoom,
                        left: bgX,
                        top: bgY,
                        maxWidth: "none",
                      }}
                    />
                  </div>
                );
              })()}
            </motion.div>
            <p className="font-mono text-[10px] text-white/40 mt-4 tracking-wider">
              Hover to magnify · Click outside to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Wireframe Carousel ──────────────────────────────────────────────────────
function useSwipe(onLeft: () => void, onRight: () => void) {
  const touchStart = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { if (diff > 0) { onLeft(); } else { onRight(); } }
  };
  return { onTouchStart, onTouchEnd };
}

const wireframes = ["/lowfid1.png", "/lowfid2.png", "/lowfid3.png", "/lowfid4.png"];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function WireframeCarousel() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swipe = useSwipe(
    () => setCurrentIndex((i) => (i + 1) % wireframes.length),
    () => setCurrentIndex((i) => (i - 1 + wireframes.length) % wireframes.length)
  );

  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.setProperty("--scroll-y", `-${scrollY}px`);
      document.body.classList.add("lightbox-open");
      const prevent = (e: TouchEvent) => { e.preventDefault(); };
      document.addEventListener("touchmove", prevent, { passive: false });
      return () => {
        document.removeEventListener("touchmove", prevent);
        const sy = document.body.style.getPropertyValue("--scroll-y");
        document.body.classList.remove("lightbox-open");
        document.body.style.removeProperty("--scroll-y");
        window.scrollTo(0, parseInt(sy || "0") * -1);
      };
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setCurrentIndex((i) => (i + 1) % wireframes.length);
      if (e.key === "ArrowLeft") setCurrentIndex((i) => (i - 1 + wireframes.length) % wireframes.length);
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      <FadeUp delay={0.1} className="mt-10">
        {/* ── Hero wireframe with side arrows ── */}
        <div
          className="relative group"
          onTouchStart={swipe.onTouchStart}
          onTouchEnd={swipe.onTouchEnd}
        >
          <div
            className="cursor-zoom-in rounded-[8px] overflow-hidden bg-[#F8F7F4] shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
            onClick={() => setOpen(true)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={wireframes[currentIndex]}
                alt={`Low fidelity wireframe ${currentIndex + 1}`}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="w-full block"
              />
            </AnimatePresence>
          </div>

          {/* Prev arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((i) => (i - 1 + wireframes.length) % wireframes.length);
            }}
            aria-label="Previous wireframe"
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] items-center justify-center text-charcoal/70 hover:text-charcoal transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            &larr;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((i) => (i + 1) % wireframes.length);
            }}
            aria-label="Next wireframe"
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] items-center justify-center text-charcoal/70 hover:text-charcoal transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            &rarr;
          </button>
        </div>

        {/* ── Thumbnail strip ── */}
        <div className="grid grid-cols-4 gap-3 mt-5">
          {wireframes.map((src, i) => (
            <button
              key={src}
              onClick={() => setCurrentIndex(i)}
              aria-label={`View wireframe ${i + 1}`}
              className={`rounded-[6px] overflow-hidden transition-all duration-300 ${
                i === currentIndex
                  ? "ring-2 ring-charcoal/70 opacity-100"
                  : "ring-1 ring-charcoal/10 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={src}
                alt={`Wireframe ${i + 1} thumbnail`}
                className="w-full block"
              />
            </button>
          ))}
        </div>
      </FadeUp>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 p-8"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={swipe.onTouchStart}
              onTouchEnd={swipe.onTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={wireframes[currentIndex]}
                  alt={`Low fidelity wireframe ${currentIndex + 1}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="w-full rounded-[4px] object-contain max-h-[80vh]"
                />
              </AnimatePresence>

              <button
                onClick={() => setCurrentIndex((i) => (i - 1 + wireframes.length) % wireframes.length)}
                className="hidden md:flex absolute left-[-48px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white transition-colors duration-200 z-10"
              >
                &larr;
              </button>
              <button
                onClick={() => setCurrentIndex((i) => (i + 1) % wireframes.length)}
                className="hidden md:flex absolute right-[-48px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white transition-colors duration-200 z-10"
              >
                &rarr;
              </button>
            </motion.div>

            <div className="flex items-center gap-3 mt-6">
              {wireframes.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "bg-white scale-125" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <p className="font-mono text-[10px] text-white/40 mt-3 tracking-wider">
              {currentIndex + 1} / {wireframes.length} &middot; Arrow keys to navigate &middot; Click outside to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── High Fidelity Carousel ──────────────────────────────────────────────────
const highFidelity = [
  { src: "/main_view_1.png", caption: "Services live inside the Homes flow - no separate tab to discover them" },
  { src: "/main_view_2.png", caption: "Top services in the area, surfaced at the moment of choice" },
  { src: "/main_view_3.png", caption: "Transparent pricing inline - services check out alongside the stay" },
];

function HighFidelityCarousel() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swipe = useSwipe(
    () => setCurrentIndex((i) => (i + 1) % highFidelity.length),
    () => setCurrentIndex((i) => (i - 1 + highFidelity.length) % highFidelity.length)
  );

  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.setProperty("--scroll-y", `-${scrollY}px`);
      document.body.classList.add("lightbox-open");
      const prevent = (e: TouchEvent) => { e.preventDefault(); };
      document.addEventListener("touchmove", prevent, { passive: false });
      return () => {
        document.removeEventListener("touchmove", prevent);
        const sy = document.body.style.getPropertyValue("--scroll-y");
        document.body.classList.remove("lightbox-open");
        document.body.style.removeProperty("--scroll-y");
        window.scrollTo(0, parseInt(sy || "0") * -1);
      };
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setCurrentIndex((i) => (i + 1) % highFidelity.length);
      if (e.key === "ArrowLeft") setCurrentIndex((i) => (i - 1 + highFidelity.length) % highFidelity.length);
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      <FadeUp delay={0.1} className="mt-10">
        {/* ── Hero mockup with side arrows ── */}
        <div
          className="relative group"
          onTouchStart={swipe.onTouchStart}
          onTouchEnd={swipe.onTouchEnd}
        >
          <div
            className="relative cursor-zoom-in rounded-[8px] overflow-hidden bg-[#F8F7F4] shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
            onClick={() => setOpen(true)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={highFidelity[currentIndex].src}
                alt={`High fidelity mockup ${currentIndex + 1}`}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="w-full block"
              />
            </AnimatePresence>

            {/* ── Caption (top-left) ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="absolute top-3 left-3 md:top-4 md:left-4 max-w-[70%] pointer-events-none"
              >
                <span className="inline-block font-mono text-[10px] md:text-[11px] text-white tracking-[0.04em] bg-charcoal px-3 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.18)]">
                  {highFidelity[currentIndex].caption}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((i) => (i - 1 + highFidelity.length) % highFidelity.length);
            }}
            aria-label="Previous mockup"
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] items-center justify-center text-charcoal/70 hover:text-charcoal transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            &larr;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((i) => (i + 1) % highFidelity.length);
            }}
            aria-label="Next mockup"
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] items-center justify-center text-charcoal/70 hover:text-charcoal transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            &rarr;
          </button>
        </div>

        {/* ── Thumbnail strip ── */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          {highFidelity.map(({ src }, i) => (
            <button
              key={src}
              onClick={() => setCurrentIndex(i)}
              aria-label={`View mockup ${i + 1}`}
              className={`rounded-[6px] overflow-hidden transition-all duration-300 ${
                i === currentIndex
                  ? "ring-2 ring-charcoal/70 opacity-100"
                  : "ring-1 ring-charcoal/10 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={src}
                alt={`Mockup ${i + 1} thumbnail`}
                className="w-full block"
              />
            </button>
          ))}
        </div>
      </FadeUp>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 p-8"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={swipe.onTouchStart}
              onTouchEnd={swipe.onTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={highFidelity[currentIndex].src}
                  alt={`High fidelity mockup ${currentIndex + 1}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="w-full rounded-[4px] object-contain max-h-[80vh]"
                />
              </AnimatePresence>

              <button
                onClick={() => setCurrentIndex((i) => (i - 1 + highFidelity.length) % highFidelity.length)}
                className="hidden md:flex absolute left-[-48px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white transition-colors duration-200 z-10"
              >
                &larr;
              </button>
              <button
                onClick={() => setCurrentIndex((i) => (i + 1) % highFidelity.length)}
                className="hidden md:flex absolute right-[-48px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white transition-colors duration-200 z-10"
              >
                &rarr;
              </button>
            </motion.div>

            <div className="flex items-center gap-3 mt-6">
              {highFidelity.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "bg-white scale-125" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <p className="font-mono text-[10px] text-white/40 mt-3 tracking-wider">
              {currentIndex + 1} / {highFidelity.length} &middot; Arrow keys to navigate &middot; Click outside to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AirbnbConcept() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSidebarVisible(false);
        } else {
          const scrolledPast = entry.boundingClientRect.top < 0;
          setSidebarVisible(scrolledPast);
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* ── Hero ── */}
      <section
        className="h-dvh min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: "#FAFAFA" }}
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-[10px] text-charcoal/60 tracking-widest uppercase mb-5"
        >
          Concept Project
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-cormorant text-[40px] md:text-[64px] font-semibold text-charcoal leading-[1.05] mb-4"
        >
          <span className="text-[#FF385C]">Airbnb</span> Services
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs md:text-sm text-charcoal/60 max-w-lg leading-relaxed text-center px-6"
        >
          Auditing and reimagining how Airbnb&apos;s newest feature fits into the platform experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-6 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-6 bg-charcoal/20"
          />
        </motion.div>
      </section>

      {/* ── Project metadata bar ── */}
      <div className="border-t border-b border-charcoal/[0.06] py-10 md:py-12 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
              {[
                { label: "Type", value: "Concept Project" },
                { label: "Platform", value: "Desktop App" },
                { label: "My Role", value: "UX Audit & Redesign" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-mono text-[10px] text-charcoal/60 tracking-[0.15em] uppercase mb-3">
                    {label}
                  </p>
                  <p className="text-[15px] text-charcoal/80 leading-snug">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Left Sidebar */}
      <CaseStudySidebar
        visible={sidebarVisible}
        sections={airbnbSections}
        accentColor="#FF385C"
      />

      {/* ── Body ── */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <div>
          {/* ── 01 The Product ────────────────────────────── */}
          <Section id="product">
            <FadeUp>
              <SectionLabel number="01" label="The Product" />
              <h2 ref={headingRef} className="font-cormorant text-4xl md:text-5xl font-semibold text-charcoal mb-6">
                What caught my eye
              </h2>
              <p className="font-mono text-sm text-charcoal/60 leading-[1.9]">
                Airbnb released a new feature - <span className="font-bold text-[#FF385C]">Services</span>. A dedicated tab for booking local experiences like photography. As a long-time Airbnb user, something felt off. It seemed detached from the familiar Airbnb flow.
              </p>
              <p className="font-mono text-sm text-charcoal/60 leading-[1.9] mt-5">
                A few questions came to mind: Would established users readily discover this new tab? How does &ldquo;Services&rdquo; fit in with the existing user flow? As Airbnb adds more tabs, are these meant to be used together or function as standalone products?
              </p>
            </FadeUp>
            <FadeUp delay={0.1} className="mt-10">
              <LightboxImage
                src="/spotlight.png"
                alt="Airbnb's Services feature — the new tab that caught my eye"
                className="w-full rounded-[8px] shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
              />
            </FadeUp>
          </Section>

          {/* ── 02 The Audit ──────────────────────────────── */}
          <Section id="audit">
            <FadeUp>
              <SectionLabel number="02" label="The Audit" />
              <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-charcoal mb-6">
                Mapping the friction
              </h2>
              <p className="font-mono text-sm text-charcoal/60 leading-[1.9]">
                I mapped out the full user journey across four stages - <span className="font-bold text-[#FF385C]">discovery</span>, <span className="font-bold text-[#FF385C]">filtering</span>, <span className="font-bold text-[#FF385C]">evaluation</span>, and <span className="font-bold text-[#FF385C]">booking</span> - to see where the experience breaks down.
              </p>
            </FadeUp>

            {/* TL;DR summary */}
            <FadeUp delay={0.04} className="mt-8">
              <div className="border-l-2 border-[#FF385C] bg-[#FFF1F3] pl-5 pr-5 py-4 rounded-r-[6px]">
                <p className="font-mono text-[10px] text-[#FF385C] tracking-[0.15em] uppercase mb-2">TL;DR</p>
                <p className="font-mono text-sm text-charcoal/80 leading-[1.7]">
                  I observed users across 4 booking stages, clustered findings into 3 friction themes, and formed a hypothesis to guide the redesign.
                </p>
              </div>
            </FadeUp>

            {/* ── Phase label: METHOD ── */}
            <FadeUp className="mt-14 mb-6">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-charcoal/60 tracking-[0.15em] uppercase">Method</span>
                <div className="h-px flex-1 bg-charcoal/15" />
              </div>
            </FadeUp>

            {/* Research Approach */}
            <FadeUp delay={0.05} className="mb-14">
              <div className="rounded-[8px] bg-white shadow-[0_1px_6px_rgba(0,0,0,0.04)] border border-charcoal/[0.06] px-6 py-5">
                <p className="font-mono text-[11px] text-[#FF385C] tracking-[0.1em] uppercase mb-3">Research approach</p>
                <p className="font-mono text-sm text-charcoal/60 leading-[1.8] mb-4">
                  I conducted <span className="font-bold text-[#FF385C]">deep interviews with 2 friends (Eli and Belen)</span> who frequently use Airbnb - sitting alongside them through the Services flow and observed all points of friction.
                </p>
                <p className="font-mono text-sm text-charcoal/60 leading-[1.8]">
                  To go broader, I ran <span className="font-bold text-[#FF385C]">AI-powered synthetic research at scale</span> across different traveler personas - stress-testing edge cases and behavioral patterns a small sample couldn&apos;t surface alone.
                </p>
              </div>
            </FadeUp>

            {/* ── Phase label: JOURNEY FRICTION ── */}
            <FadeUp className="mt-14 mb-6">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-charcoal/60 tracking-[0.15em] uppercase">Journey friction</span>
                <div className="h-px flex-1 bg-charcoal/15" />
              </div>
            </FadeUp>

            {/* Discovery */}
            <FadeUp delay={0.1}>
              <div className="border-l-2 border-[#FF385C]/30 pl-6 mb-10 grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6 items-center">
                <div>
                  <p className="font-mono text-[11px] text-[#FF385C] tracking-[0.1em] uppercase mb-2">Discovery</p>
                  <p className="font-mono text-sm text-charcoal/60 leading-[1.8]">
                    How do users find out Services exists? Is the tab visible enough? What happens if they never tap it?
                  </p>
                </div>
                <LightboxImage
                  src="/main.png"
                  alt="Airbnb home — where users would discover Services"
                  className="w-full rounded-[6px] shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                />
              </div>
            </FadeUp>

            {/* Filtering */}
            <FadeUp delay={0.15}>
              <div className="border-l-2 border-[#FF385C]/30 pl-6 mb-10 grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6 items-center">
                <div>
                  <p className="font-mono text-[11px] text-[#FF385C] tracking-[0.1em] uppercase mb-2">Filtering</p>
                  <p className="font-mono text-sm text-charcoal/60 leading-[1.8]">
                    Once inside, can users narrow down what they need? Are the categories clear? Does the filtering feel native to Airbnb?
                  </p>
                </div>
                <LightboxImage
                  src="/services.png"
                  alt="Inside the Services tab — filtering categories"
                  className="w-full rounded-[6px] shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                />
              </div>
            </FadeUp>

            {/* Evaluation */}
            <FadeUp delay={0.2}>
              <div className="border-l-2 border-[#FF385C]/30 pl-6 mb-10 grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6 items-center">
                <div>
                  <p className="font-mono text-[11px] text-[#FF385C] tracking-[0.1em] uppercase mb-2">Evaluation</p>
                  <p className="font-mono text-sm text-charcoal/60 leading-[1.8]">
                    How do users compare and evaluate services? Is there enough information to make a confident booking decision?
                  </p>
                </div>
                <LightboxImage
                  src="/eval.png"
                  alt="Service detail — evaluation step"
                  className="w-full rounded-[6px] shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                />
              </div>
            </FadeUp>

            {/* Booking */}
            <FadeUp delay={0.25}>
              <div className="border-l-2 border-[#FF385C]/30 pl-6 grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6 items-center">
                <div>
                  <p className="font-mono text-[11px] text-[#FF385C] tracking-[0.1em] uppercase mb-2">Booking</p>
                  <p className="font-mono text-sm text-charcoal/60 leading-[1.8]">
                    Does the booking flow feel familiar? Does it connect back to an existing stay, or is it completely isolated?
                  </p>
                </div>
                <LightboxImage
                  src="/book.png"
                  alt="Booking flow — confirming a service"
                  className="w-full rounded-[6px] shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                />
              </div>
            </FadeUp>

            {/* ── Phase label: PATTERNS ── */}
            <FadeUp className="mt-14 mb-6">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-charcoal/60 tracking-[0.15em] uppercase">Patterns</span>
                <div className="h-px flex-1 bg-charcoal/15" />
              </div>
            </FadeUp>

            {/* Clustering */}
            <FadeUp delay={0.3}>
              <p className="font-mono text-sm text-charcoal/60 leading-[1.9] mb-6">
                I took notes on all possible areas in which users struggled to understand something or expressed weariness to continue, and <span className="font-bold text-[#FF385C]">clustered them into themes</span>.
              </p>
              <LightboxImage
                src="/research.png"
                alt="Research notes clustered into themes"
                className="w-full rounded-[8px] shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
              />
            </FadeUp>

            {/* Outlying Themes */}
            <FadeUp delay={0.35} className="mt-14">
              <p className="font-mono text-sm text-charcoal/60 leading-[1.9] mb-10">
                From the research and usability testing, several recurring friction themes emerged across the booking journey. I used these insights to <span className="font-bold text-[#FF385C]">identify the key areas of tension</span> and focused on addressing them.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
                {[
                  {
                    icon: "&#x1F50D;",
                    color: "#FF385C",
                    title: "Concept Clarity Gaps",
                    subtitle: "What's happening?",
                    description: "Users struggle to understand what Services are (vs. Experiences) and when each search control should be used.",
                    quote: "\"Is a cooking class under Experiences or Services?\"",
                  },
                  {
                    icon: "&#x1F4CA;",
                    color: "#7B61FF",
                    title: "Information-Hierarchy Hiccups",
                    subtitle: "Where is it?",
                    description: "Critical decision data is hidden below folds or requires hover actions that don't exist, forcing extra scrolling and slowing evaluation.",
                    quote: "\"I can't see where the chef classes are listed\"",
                  },
                  {
                    icon: "&#x1F4B0;",
                    color: "#00A699",
                    title: "Transparency Issues",
                    subtitle: "How much is it?",
                    description: "No timely feedback on how inputs affect price or feasibility, undermining confidence early on.",
                    quote: "\"My cart suddenly jumped to an insane number, I didn't even know where it came from.\"",
                  },
                ].map(({ icon, color, title, subtitle, description, quote }) => (
                  <div
                    key={title}
                    className="rounded-[12px] bg-white shadow-[0_1px_6px_rgba(0,0,0,0.04)] border border-charcoal/[0.06] px-6 py-6 flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                        style={{ backgroundColor: `${color}15` }}
                        dangerouslySetInnerHTML={{ __html: icon }}
                      />
                      <div>
                        <p className="font-mono text-[13px] font-bold text-charcoal leading-tight">{title}</p>
                        <p className="font-mono text-[11px] text-charcoal/60">{subtitle}</p>
                      </div>
                    </div>
                    <p className="font-mono text-sm text-charcoal leading-[1.8] mb-4 flex-1">
                      {description}
                    </p>
                    <p className="font-mono text-[13px] text-charcoal/60 italic leading-[1.7]">
                      {quote}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* ── Phase label: HYPOTHESIS ── */}
            <FadeUp className="mt-14 mb-6">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-charcoal/60 tracking-[0.15em] uppercase">Hypothesis</span>
                <div className="h-px flex-1 bg-charcoal/15" />
              </div>
            </FadeUp>

            {/* Hypothesis */}
            <FadeUp delay={0.4}>
              <h3 className="font-cormorant text-3xl md:text-4xl font-semibold text-charcoal mb-4">
                Drawing up a hypothesis
              </h3>
              <p className="font-mono text-sm text-charcoal/60 leading-[1.9] mb-8">
                Based on all this I was able to conclude a general hypothesis to where the pain points were rooted in.
              </p>

              <div className="rounded-[12px] bg-white shadow-[0_1px_6px_rgba(0,0,0,0.04)] border border-charcoal/[0.06] px-8 py-8 relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-[#FF385C]/10 flex items-center justify-center text-lg">&#x1F9E0;</span>
                  <div>
                    <p className="font-mono text-[13px] font-bold text-charcoal">Hypothesis</p>
                    <p className="font-mono text-[11px] text-charcoal/60">Overview</p>
                  </div>
                </div>
                <span className="absolute top-6 right-8 font-cormorant text-6xl text-charcoal/[0.06] leading-none">&rdquo;</span>
                <p className="font-mono text-sm text-charcoal/60 leading-[1.9]">
                  If we clarify what &ldquo;Services&rdquo; are, expose key package info above the fold, and show real-time pricing, then first-time users will reach the booking step with fewer back-tracks, because <span className="font-bold text-[#FF385C]">current confusion, hidden details, and surprise costs cause drop-offs</span>.
                </p>
              </div>
            </FadeUp>
          </Section>

          {/* ── 03 Ideation ──────────────────────────────── */}
          <Section id="ideation">
            <FadeUp>
              <SectionLabel number="03" label="Ideation" />
              <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-charcoal mb-6">
                Exploring directions
              </h2>
              <p className="font-mono text-sm text-charcoal/60 leading-[1.9]">
                Keeping the hypothesis in mind I moved to FigJam and started <span className="font-bold text-[#FF385C]">ideating over the main clustered pain points</span> I had discovered during my research.
              </p>
            </FadeUp>
            <FadeUp delay={0.1} className="mt-10">
              <LightboxImage
                src="/ideation.png"
                alt="FigJam ideation board — exploring solutions for clustered pain points"
                className="w-full rounded-[8px] shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
              />
            </FadeUp>

            <FadeUp delay={0.15} className="mt-14">
              <p className="font-mono text-sm text-charcoal/60 leading-[1.9] mb-6">
                After discovering 3 main concepts from FigJam I went back to ChatGPT to root out the best out of the three, <span className="font-bold text-[#FF385C]">prioritizing them based on impact, urgency and alignment</span> of our goals.
              </p>
              <LightboxImage
                src="/table.png"
                alt="Concept prioritization table — impact, urgency and alignment"
                className="w-full rounded-[8px] shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
              />
            </FadeUp>

            <FadeUp delay={0.2} className="mt-14">
              <p className="font-mono text-sm text-charcoal/60 leading-[1.9] mb-6">
                After taking into consideration all potential concepts to test, I ultimately focused on the <span className="font-bold text-[#FF385C]">&ldquo;Bundle it up&rdquo;</span> option. It came out on top because it solves discoverability <span className="italic">at the moment of decision</span> - and grows existing booking revenue rather than competing with it.
              </p>
              <LightboxImage
                src="/figjam.png"
                alt="Bundle it up concept — FigJam exploration"
                className="w-full rounded-[8px] shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
              />
            </FadeUp>
          </Section>

          {/* ── 04 Low Fidelity (hidden — restore by uncommenting) ──────── */}
          {/*
          <Section id="lofi">
            <FadeUp>
              <SectionLabel number="04" label="Low Fidelity" />
              <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-charcoal mb-6">
                Wireframes
              </h2>
              <p className="font-mono text-sm text-charcoal/60 leading-[1.9]">
                Before committing to visuals, I worked through the structure and flow at low fidelity — testing layout ideas and interaction patterns.
              </p>
            </FadeUp>
            <WireframeCarousel />
          </Section>
          */}

          {/* ── 05 High Fidelity ─────────────────────────── */}
          <Section id="hifi">
            <FadeUp>
              <SectionLabel number="04" label="High Fidelity" />
              <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-charcoal mb-6">
                Bundle it up
              </h2>
              <p className="font-mono text-sm text-charcoal/60 leading-[1.9] mb-10">
                This redesign ties Services back into the accommodation flow that already drives Airbnb. When a user books a stay, the top-rated services in that area surface inline - letting them add it and check out alongside their booking, rather than discovering Services in isolation.
              </p>
            </FadeUp>
            <HighFidelityCarousel />

            {/* Deployed concept link */}
            <FadeUp delay={0.1} className="mt-10">
              <a
                href="https://myrtle-quote-35679019.figma.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-mono text-sm text-[#FF385C] hover:text-[#E0314F] transition-colors duration-300 group"
              >
                <span className="border border-[#FF385C]/30 group-hover:border-[#FF385C] rounded-full px-5 py-2.5 transition-colors duration-300">
                  View deployed concept &#x2197;
                </span>
              </a>
              <p className="font-mono text-[11px] text-charcoal/60 mt-3">
                Prototype developed with Figma Make
              </p>
            </FadeUp>
          </Section>

          {/* ── 06 Reflection ────────────────────────────── */}
          <Section id="reflection">
            <FadeUp>
              <SectionLabel number="05" label="Reflection" />
              <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-charcoal mb-6">
                Growth Opportunities
              </h2>
              <p className="font-mono text-sm text-charcoal/60 leading-[1.9]">
                What began as a personal frustration revealed something bigger. Airbnb&apos;s Services feature wasn&apos;t just a usability problem - it was a missed business opportunity. Bundling services into the stay flow rather than isolating them in a tab points toward a model where <span className="font-bold text-[#FF385C]">discoverability and revenue grow together</span>.
              </p>
              <div className="relative mt-5 pr-12 md:pr-16">
                <p className="font-mono text-sm text-charcoal/60 leading-[1.9]">
                  <span className="font-bold text-[#FF385C]">What I&apos;d still love to do:</span> the biggest gap I&apos;d close is validation. The friction research grounded my design choices, but the Bundle it up redesign itself is still untested. A small round of usability tests on the prototype would tell me whether the bundled flow actually reduces hesitation at booking - or surfaces friction I didn&apos;t predict.
                </p>
                <svg
                  className="absolute -top-1 right-0"
                  width="28"
                  height="40"
                  viewBox="0 0 28 40"
                  fill="none"
                  style={{ transform: "rotate(8deg)", filter: "drop-shadow(0 2px 4px rgba(255, 56, 92, 0.18))" }}
                  aria-hidden="true"
                >
                  <path
                    d="M4 2 H24 A2 2 0 0 1 26 4 V36 L14 28 L2 36 V4 A2 2 0 0 1 4 2 Z"
                    fill="#FF385C"
                    stroke="#FF385C"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              
            </FadeUp>
          </Section>

          {/* Back link */}
          <FadeUp>
            <div className="border-t border-charcoal/[0.06] pt-10">
              <Link
                href="/"
                className="font-mono text-xs text-charcoal/60 hover:text-[#FF385C] tracking-widest uppercase transition-colors duration-300 inline-flex items-center gap-2 group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-300">&larr;</span>
                Back to Work
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
