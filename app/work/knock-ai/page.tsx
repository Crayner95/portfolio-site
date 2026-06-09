"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import CaseStudyHero from "@/components/CaseStudyHero";
import CaseStudySidebar from "@/components/CaseStudySidebar";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import FadeUp from "@/components/FadeUp";
import { TrendingUp } from "lucide-react";

// ── Decorative Doodle SVGs ────────────────────────────────────────────────────
const doodleColor = "#E0E5FF";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DoodleSparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`hidden lg:block pointer-events-none absolute ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z"
        stroke={doodleColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function DoodleSparkleCluster({ className = "", animate = false }: { className?: string; animate?: boolean }) {
  return (
    <motion.div
      className={`hidden lg:block pointer-events-none absolute ${className}`}
      {...(animate
        ? {
            animate: { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] },
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }
        : {})}
    >
      <svg width="48" height="40" viewBox="0 0 48 40" fill="none">
        {/* Large sparkle */}
        <path
          d="M20 4 L21.5 10 L27 12 L21.5 14 L20 20 L18.5 14 L13 12 L18.5 10 Z"
          stroke={doodleColor}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Small sparkle */}
        <path
          d="M36 14 L37 17 L40 18 L37 19 L36 22 L35 19 L32 18 L35 17 Z"
          stroke={doodleColor}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Tiny dot */}
        <circle cx="42" cy="10" r="1.5" fill={doodleColor} opacity="0.6" />
        {/* Tiny dot */}
        <circle cx="10" cy="28" r="1" fill={doodleColor} opacity="0.4" />
      </svg>
    </motion.div>
  );
}

function DoodleSquiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`hidden lg:block pointer-events-none absolute ${className}`}
      width="120"
      height="12"
      viewBox="0 0 120 12"
      fill="none"
    >
      <path
        d="M2 6 C10 2, 18 10, 26 6 C34 2, 42 10, 50 6 C58 2, 66 10, 74 6 C82 2, 90 10, 98 6 C106 2, 114 10, 118 6"
        stroke={doodleColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function DoodleWavyDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`hidden lg:flex justify-center pointer-events-none ${className}`}>
      <svg width="200" height="16" viewBox="0 0 200 16" fill="none">
        <path
          d="M4 8 C20 2, 36 14, 52 8 C68 2, 84 14, 100 8 C116 2, 132 14, 148 8 C164 2, 180 14, 196 8"
          stroke={doodleColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

function DoodleArrowLoop({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`hidden lg:block pointer-events-none absolute ${className}`}
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
    >
      <path
        d="M22 6 C34 6, 38 18, 30 26 C24 32, 14 30, 12 22 C10 14, 18 10, 24 14"
        stroke={doodleColor}
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrow tip */}
      <path
        d="M22 11 L25 14 L21 16"
        stroke={doodleColor}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function DoodleConfettiDots({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`hidden lg:block pointer-events-none absolute ${className}`}
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
    >
      <circle cx="8" cy="12" r="2" fill={doodleColor} opacity="0.5" />
      <circle cx="28" cy="6" r="1.5" fill={doodleColor} opacity="0.7" />
      <circle cx="48" cy="16" r="2.5" fill={doodleColor} opacity="0.4" />
      <circle cx="18" cy="38" r="1.5" fill={doodleColor} opacity="0.6" />
      <circle cx="40" cy="44" r="2" fill={doodleColor} opacity="0.3" />
      <circle cx="52" cy="32" r="1.5" fill={doodleColor} opacity="0.5" />
      <circle cx="4" cy="50" r="2" fill={doodleColor} opacity="0.35" />
    </svg>
  );
}

function DoodleCrossHatch({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`hidden lg:block pointer-events-none absolute ${className}`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M4 4 L16 16" stroke={doodleColor} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M16 4 L4 16" stroke={doodleColor} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

// ── Section Wrapper ───────────────────────────────────────────────────────────
function Section({
  id,
  children,
  className = "",
  sectionRef,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  sectionRef?: React.Ref<HTMLElement>;
}) {
  return (
    <section ref={sectionRef} id={id} className={`scroll-mt-28 mb-24 ${className}`}>
      {children}
    </section>
  );
}

// ── Section Label ─────────────────────────────────────────────────────────────
function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="font-mono text-[12px] text-gold tracking-widest">{number}</span>
      <div className="h-px w-8 bg-gold/30" />
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
              {/* Magnifier lens */}
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

// ── Swipe Hook ──────────────────────────────────────────────────────────────
function useSwipe(onLeft: () => void, onRight: () => void) {
  const touchStart = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { if (diff > 0) { onLeft(); } else { onRight(); } }
  };
  return { onTouchStart, onTouchEnd };
}

// ── Stacked Carousel Card ───────────────────────────────────────────────────
function StackedCarouselCard({
  title,
  description,
  images,
}: {
  title: string;
  description: string;
  images: string[];
}) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swipe = useSwipe(
    () => setCurrentIndex((i) => (i + 1) % images.length),
    () => setCurrentIndex((i) => (i - 1 + images.length) % images.length)
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
      if (e.key === "ArrowRight") setCurrentIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrentIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, images.length]);

  return (
    <>
      <div className="group cursor-pointer" onClick={() => { setCurrentIndex(0); setOpen(true); }}>
        {/* Stacked card effect */}
        <div className="relative mb-4" style={{ paddingBottom: "8px" }}>
          {/* Bottom layer */}
          <div
            className="absolute rounded-[8px] bg-charcoal/[0.04] border border-charcoal/[0.06]"
            style={{ top: 8, left: 8, right: -4, bottom: 0 }}
          />
          {/* Middle layer */}
          <div
            className="absolute rounded-[8px] bg-charcoal/[0.06] border border-charcoal/[0.06]"
            style={{ top: 4, left: 4, right: -2, bottom: 4 }}
          />
          {/* Top layer — the visible image */}
          <div className="relative rounded-[8px] overflow-hidden bg-[#F8F7F4] aspect-[4/3] shadow-[0_2px_8px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-shadow duration-300">
            {images[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={images[0]}
                alt={`${title} — thumbnail`}
                className="w-full h-full object-cover"
              />
            ) : (
              <ImagePlaceholder label={title} aspectRatio="aspect-[4/3]" className="w-full h-full" />
            )}
          </div>
          {/* Badge showing count */}
          <div className="absolute top-2 right-0 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 shadow-sm border border-charcoal/[0.06]">
            <span className="font-mono text-[10px] text-charcoal/60">{images.length} screens</span>
          </div>
        </div>
        <h4 className="font-mono text-[13px] font-bold text-charcoal mb-1 group-hover:text-gold transition-colors duration-300">{title}</h4>
        <p className="font-mono text-sm text-charcoal/60 leading-relaxed">{description}</p>
      </div>

      {/* Carousel lightbox */}
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
                  src={images[currentIndex]}
                  alt={`${title} — screen ${currentIndex + 1}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="w-full rounded-[4px] object-contain max-h-[80vh]"
                />
              </AnimatePresence>

              {/* Navigation arrows — desktop only */}
              <button
                onClick={() => setCurrentIndex((i) => (i - 1 + images.length) % images.length)}
                className="hidden md:flex absolute left-[-48px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white transition-colors duration-200 z-10"
              >
                &larr;
              </button>
              <button
                onClick={() => setCurrentIndex((i) => (i + 1) % images.length)}
                className="hidden md:flex absolute right-[-48px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white transition-colors duration-200 z-10"
              >
                &rarr;
              </button>
            </motion.div>

            {/* Dots + counter */}
            <div className="flex items-center gap-3 mt-6">
              {images.map((_, i) => (
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
              {currentIndex + 1} / {images.length} &middot; Arrow keys to navigate &middot; Click outside to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function KnockAI() {
  const introHeadingRef = useRef<HTMLHeadingElement>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const el = introHeadingRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Heading is in view — hide sidebar
          setSidebarVisible(false);
        } else {
          // Heading is out of view — only show sidebar if it scrolled
          // off the TOP (i.e. user scrolled down past it).
          // boundingClientRect.top < 0 means the element is above the viewport.
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
    <div className="min-h-screen bg-white">
      {/* ── Full-viewport Hero ── */}
      <CaseStudyHero
        title="Knock AI"
        tagline="AI-powered lead intelligence for B2B sales teams."
        bgColor="#F9EDE8"
        mockups={[]}
      />

      {/* ── Project metadata bar ── */}
      <div className="border-t border-b border-charcoal/[0.06] py-10 md:py-12">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <FadeUp>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-6 md:gap-2">
              {[
                { label: "Platform", value: "Web App" },
                { label: "My Role", value: "UI/UX Designer" },
                { label: "Collaborated with", value: "PM — Stav" },
                { label: "Impact", value: "31% in performance", isImpact: true },
              ].map(({ label, value, isImpact }: { label: string; value: string; isImpact?: boolean }) => (
                <div key={label} className="min-w-0">
                  <p className="font-mono text-[10px] text-charcoal/60 tracking-[0.15em] uppercase mb-3 whitespace-nowrap">
                    {label}
                  </p>
                  <p className="text-[14px] text-charcoal/80 leading-snug inline-flex items-center gap-1.5 whitespace-nowrap">
                    {isImpact && (
                      <TrendingUp size={14} className="text-green-600 flex-shrink-0" />
                    )}
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Left Sidebar — fixed to left edge */}
      <CaseStudySidebar visible={sidebarVisible} />

      {/* Body — centered content */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <div>
            {/* ── 01 The Product ────────────────────────────── */}
            <Section id="product">
              <FadeUp>
                <div className="relative">
                  <DoodleSparkleCluster className="-right-16 -top-2" animate />
                  <SectionLabel number="01" label="The Product" />
                </div>
                <h2 ref={introHeadingRef} className="text-4xl md:text-5xl font-semibold text-charcoal mb-6" style={{ fontFamily: "var(--font-lora)" }}>
                  Overview
                </h2>
                <p className="font-mono text-sm text-charcoal/60 leading-[1.9]">
                  Knock AI is a B2B sales engagement platform that enriches leads with intent signals and routes high-value buyers to the right rep in real time - cutting through the noise so sales teams only spend time on prospects who are ready to talk.
                </p>
                <p className="font-mono text-sm text-charcoal/60 leading-[1.9] mt-5">
                  I joined as the <span className="font-bold text-gold">sole product designer</span>, building the platform from scratch over the course of a year - no design team, no design system, and only two early customers to learn from. Every decision was grounded in competitive analysis, direct customer feedback, and weekly ship cycles.
                </p>
              </FadeUp>
              <FadeUp delay={0.1} className="mt-10">
                <LightboxImage
                  src="/images/dashboard.jpg"
                  alt="Knock AI dashboard overview"
                  className="w-full rounded-[4px] shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
                />
              </FadeUp>

              {/* ── Two Personas ── */}
              <FadeUp delay={0.15} className="mt-14">
                <h3 className="font-cormorant text-2xl font-semibold text-charcoal mb-4">
                  Who we&apos;re designing for
                </h3>
                <p className="font-mono text-sm text-charcoal/60 leading-[1.9] mb-8">
                  Our users fell into <span className="font-bold text-gold">two distinct groups</span> — and they needed very different things from the same product:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  <div className="rounded-[8px] bg-[#F8F7F4] px-6 py-6 relative overflow-hidden">
                    <span className="absolute top-4 right-4 text-2xl">&#x1F3AF;</span>
                    <p className="font-mono text-[13px] font-bold text-charcoal mb-2">Experienced SDRs</p>
                    <p className="font-mono text-sm text-charcoal/60 leading-[1.8]">
                      Know exactly which routing rule to use. Just want to create the link and go. Extra steps slow them down.
                    </p>
                  </div>
                  <div className="rounded-[8px] bg-[#F8F7F4] px-6 py-6 relative overflow-hidden">
                    <span className="absolute top-4 right-4 text-2xl">&#x1F331;</span>
                    <p className="font-mono text-[13px] font-bold text-charcoal mb-2">Junior SDRs</p>
                    <p className="font-mono text-sm text-charcoal/60 leading-[1.8]">
                      Unsure which routing rule fits. Don&apos;t fully understand what happens after creating a link. Need guidance without feeling lost.
                    </p>
                  </div>
                </div>
              </FadeUp>
            </Section>

            <DoodleWavyDivider className="-mt-8 mb-16" />

            {/* ── 02 The Challenge ─────────────────────────────── */}
            <Section id="challenge">
              <FadeUp>
                <div className="relative">
                  <DoodleSquiggle className="-right-14 top-1" />
                  <SectionLabel number="02" label="The Challenge" />
                </div>
                <h2 className="text-4xl md:text-5xl font-semibold text-charcoal mb-6" style={{ fontFamily: "var(--font-lora)" }}>
                  The Challenge
                </h2>
                <p className="font-mono text-sm text-charcoal/60 leading-[1.9]">
                  <span className="font-bold text-gold">Meeting links are the main entry point</span> for leads, routing conversations to reps — but backend data showed <span className="font-bold text-gold">many weren&apos;t being used at all</span>. Customers reported low conversions and responded by creating more links instead of improving existing ones. The result was a high volume of <span className="font-bold text-gold">generic, underperforming links</span> instead of a few optimized ones.
                </p>
              </FadeUp>

              <FadeUp delay={0.05} className="mt-6">
                <div className="mb-6 max-w-[70%]">
                  <p className="font-mono text-[11px] text-charcoal/60 tracking-[0.1em] uppercase mb-3">
                    The original post-creation screen
                  </p>
                  <LightboxImage
                    src="/Old_view.png"
                    alt="Original meeting link post-creation screen — dead-end with no next steps"
                    className="w-full rounded-[4px] shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
                  />
                </div>
              </FadeUp>

              {/* ── Methods Considered ── */}
              <FadeUp delay={0.1} className="mt-14">
                <h3 className="font-cormorant text-2xl font-semibold text-charcoal mb-4">
                  Finding the root cause
                </h3>
                <p className="font-mono text-sm text-charcoal/60 leading-[1.9] mb-8">
                  Before jumping to solutions, I needed to understand where the breakdown was actually happening. Customer <span className="font-bold text-gold">feedback pointed to the problem, but not the cause</span>. I evaluated several testing methods:
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    {
                      method: "Moderated usability testing",
                      emoji: "\u2705",
                      verdict: "Primary method",
                      description: "We had access to real reps, allowing us to observe the exact moment they stalled.",
                      bg: "#E5EFE7",
                      verdictColor: "#3D7A5F",
                    },
                    {
                      method: "Unmoderated remote testing",
                      emoji: "\ud83e\udd14",
                      verdict: "Considered",
                      description: "Tools like Maze would scale better, but generic panels don\u2019t include B2B sales reps.",
                      bg: "#EFEEEA",
                      verdictColor: "#6B6B66",
                    },
                    {
                      method: "Focus groups",
                      emoji: "\u274c",
                      verdict: "Ruled out",
                      description: "Group dynamics risk the loudest voice shaping the narrative.",
                      bg: "#F4E2DF",
                      verdictColor: "#A85D52",
                    },
                  ].map(({ method, emoji, verdict, description, bg, verdictColor }) => (
                    <div key={method} className="rounded-[8px] px-6 py-4" style={{ backgroundColor: bg }}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-mono text-[13px] font-bold text-charcoal">
                          <span className="mr-2" aria-hidden="true">{emoji}</span>{method}
                        </p>
                        <span className="font-mono text-[10px] tracking-[0.08em] uppercase" style={{ color: verdictColor }}>{verdict}</span>
                      </div>
                      <p className="font-mono text-sm text-charcoal/60 leading-[1.8]">{description}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>

              {/* ── How We Tested ── */}
              <FadeUp delay={0.15} className="mt-14">
                <h3 className="font-cormorant text-2xl font-semibold text-charcoal mb-4">
                  How we conducted the sessions
                </h3>
                <p className="font-mono text-sm text-charcoal/60 leading-[1.9] mb-6">
                  We ran <span className="font-bold text-gold">moderated usability sessions</span> with 6 SDRs - a mix of senior and junior reps from our two customers. Each session was <span className="font-bold text-gold">designed around core UX research principles</span>:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <div className="rounded-[8px] bg-[#F8F7F4] px-5 py-4">
                    <p className="font-mono text-[14px] font-bold text-charcoal mb-1">Think-aloud protocol</p>
                    <p className="font-mono text-[13px] text-charcoal/60 leading-[1.7]">
                      Participants narrated their thinking as they worked
                    </p>
                  </div>
                  <div className="rounded-[8px] bg-[#F8F7F4] px-5 py-4">
                    <p className="font-mono text-[14px] font-bold text-charcoal mb-1">Task-based scenarios</p>
                    <p className="font-mono text-[13px] text-charcoal/60 leading-[1.7]">
                      Tasks were framed as goals, not instructions
                    </p>
                  </div>
                  <div className="rounded-[8px] bg-[#F8F7F4] px-5 py-4">
                    <p className="font-mono text-[14px] font-bold text-charcoal mb-1">Neutral probing</p>
                    <p className="font-mono text-[13px] text-charcoal/60 leading-[1.7]">
                      No leading questions. &ldquo;What was going through your mind?&rdquo;
                    </p>
                  </div>
                  <div className="rounded-[8px] bg-[#F8F7F4] px-5 py-4">
                    <p className="font-mono text-[14px] font-bold text-charcoal mb-1">Mitigating observer effect</p>
                    <p className="font-mono text-[13px] text-charcoal/60 leading-[1.7]">
                      We framed each session as &ldquo;testing the product, not you&rdquo;
                    </p>
                  </div>
                </div>
              </FadeUp>

              {/* ── Discoveries ── */}
              <FadeUp delay={0.2} className="mt-14">
                <h3 className="font-cormorant text-2xl font-semibold text-charcoal mb-4">
                  What we discovered
                </h3>
                <div className="rounded-[8px] border border-charcoal/[0.06] bg-white shadow-[0_1px_6px_rgba(0,0,0,0.04)] px-6 py-5 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-gold text-sm mt-[3px] flex-shrink-0">&#x2716;</span>
                      <p className="font-mono text-sm text-charcoal/60 leading-[1.8]">
                        Junior SDRs often stalled after save. Since setup was instant and default routing was auto-assigned, many were unsure if they had missed a step.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-gold text-sm mt-[3px] flex-shrink-0">&#x2716;</span>
                      <p className="font-mono text-sm text-charcoal/60 leading-[1.8]">
                        Reps who activated links had no visibility into performance. Limited booking requests left them unsure whether their setup was working correctly.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="font-mono text-sm text-charcoal/60 leading-[1.9]">
                  The feature existed, but <span className="font-bold text-gold">it wasn&apos;t delivering value</span>. Iterating on the post-creation flow became the top priority.
                </p>
              </FadeUp>
            </Section>

            {/* ── 03 End State Iteration ──────────────────────── */}
            <Section id="decisions">
              <FadeUp>
                <div className="relative">
                  <DoodleArrowLoop className="-right-14 -top-2" />
                  <SectionLabel number="03" label="End State Iteration" />
                </div>
                <h2 className="text-4xl md:text-5xl font-semibold text-charcoal mb-6" style={{ fontFamily: "var(--font-lora)" }}>
                  End State Iteration
                </h2>
                <p className="font-mono text-sm text-charcoal/60 leading-[1.9] mb-10">
                  Three critical decision points shaped the redesigned post-creation experience:
                </p>
              </FadeUp>

              {/* Decision 1 — text left, image right */}
              <FadeUp delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-20">
                  <div>
                    <p className="font-mono text-[11px] text-gold tracking-[0.1em] uppercase mb-3">Decision 01</p>
                    <h3 className="font-cormorant text-2xl font-semibold text-charcoal mb-3">
                      Decision Matrix
                    </h3>
                    <p className="font-mono text-sm text-charcoal/60 leading-[1.9]">
                      I mapped post-creation features on a value vs. effort matrix to prioritize within our time constraints. Four high-value features made the redesign; the rest were deferred.
                    </p>
                  </div>
                  <div>
                    <LightboxImage
                      src="/matrix.png"
                      alt="Value vs effort matrix — prioritizing post-creation actions"
                      className="w-full rounded-[4px] shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
                    />
                  </div>
                </div>
              </FadeUp>

              {/* Decision 2 — text left, principles right */}
              <FadeUp delay={0.15}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mb-20">
                  <div className="md:order-2">
                    <p className="font-mono text-[11px] text-gold tracking-[0.1em] uppercase mb-3">Decision 02</p>
                    <h3 className="font-cormorant text-2xl font-semibold text-charcoal mb-3">
                      Design principles
                    </h3>
                    <p className="font-mono text-sm text-charcoal/60 leading-[1.9]">
                      Auditing post-creation flows in Calendly, HubSpot, Drift, and Intercom surfaced the same gaps over and over - dead-ends, buried routing, no path back to performance. Three principles emerged to guide the redesign.
                    </p>
                  </div>
                  <div className="md:order-1 space-y-3">
                    {[
                      {
                        num: "01",
                        name: "Stay in context",
                        desc: "After a user creates something, keep them on the same page - the work continues here.",
                      },
                      {
                        num: "02",
                        name: "Show, don't hide",
                        desc: "Surface the most valuable controls - routing, simulator, AI - instead of burying them in menus.",
                      },
                      {
                        num: "03",
                        name: "Close the loop",
                        desc: "The work doesn't end at “saved.” Give users a path back to performance data.",
                      },
                    ].map(({ num, name, desc }) => (
                      <div
                        key={num}
                        className="bg-white rounded-[8px] border border-charcoal/[0.06] px-5 py-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]"
                      >
                        <div className="flex items-baseline gap-3 mb-1.5">
                          <span className="font-mono text-[13px] text-gold tracking-[0.1em]">{num}</span>
                          <p className="font-mono text-[13px] font-bold text-charcoal">{name}</p>
                        </div>
                        <p className="font-mono text-[12px] text-charcoal/60 leading-[1.7] pl-8">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Decision 3 — text top, image below */}
              <FadeUp delay={0.2}>
                <div className="mb-6">
                  <p className="font-mono text-[11px] text-gold tracking-[0.1em] uppercase mb-3">Decision 03</p>
                  <h3 className="font-cormorant text-2xl font-semibold text-charcoal mb-3">
                    New design
                  </h3>
                  <p className="font-mono text-sm text-charcoal/60 leading-[1.9] mb-6">
                    The most prominent element in the old design provided zero value - the redesign rethinks the entire hierarchy. So <span className="font-bold text-gold">I put the design into Builder.io, iterated, and shipped it</span>.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <span className="text-gold text-sm mt-[3px] flex-shrink-0">&#x2713;</span>
                      <p className="font-mono text-sm text-charcoal leading-[1.8] font-bold">
                        Link + deployment guide center stage.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-gold text-sm mt-[3px] flex-shrink-0">&#x2713;</span>
                      <p className="font-mono text-sm text-charcoal leading-[1.8] font-bold">
                        Optimization flow given priority on the right.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-gold text-sm mt-[3px] flex-shrink-0">&#x2713;</span>
                      <p className="font-mono text-sm text-charcoal leading-[1.8] font-bold">
                        Routing rules made transparent.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-gold text-sm mt-[3px] flex-shrink-0">&#x2713;</span>
                      <p className="font-mono text-sm text-charcoal leading-[1.8] font-bold">
                        Analytics tip closes the loop.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-6 md:gap-8 items-start">
                    <div>
                      <p className="font-mono text-[10px] text-charcoal/60 tracking-[0.1em] uppercase mb-2">Before</p>
                      <LightboxImage
                        src="/Old_view.png"
                        alt="Original meeting link post-creation screen — dead-end with no next steps"
                        className="w-full rounded-[4px] shadow-[0_2px_16px_rgba(0,0,0,0.08)] opacity-90"
                      />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-gold tracking-[0.1em] uppercase mb-2">After</p>
                      <LightboxImage
                        src="/Meeting_link_final.png"
                        alt="Go live with your link — redesigned post-creation screen"
                        className="w-full rounded-[4px] shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
                      />
                    </div>
                  </div>

                  {/* ── Detail callouts ── */}
                  <div className="mt-12">
                    <div className="flex items-center gap-6 mb-6">
                      <span className="font-mono text-[10px] text-charcoal/60 tracking-widest uppercase">
                        Details
                      </span>
                      <div className="h-px flex-1 bg-charcoal/10" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { src: "/gif.png",       name: "Deployment guide", caption: "Embed script + gif anchor the left panel." },
                        { src: "/sim.png",       name: "Simulator surfaced", caption: "Knock's differentiator gets primary placement." },
                        { src: "/routing.png",   name: "Routing transparency", caption: "Assigned rule visible and editable inline." },
                        { src: "/analytics.png", name: "Analytics tip", caption: "Tells users where to see link performance." },
                      ].map(({ src, name, caption }) => (
                        <div key={name}>
                          <div className="relative rounded-[6px] overflow-hidden bg-[#F8F7F4] aspect-[4/3] border border-charcoal/[0.06]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt={name}
                              className="w-full h-full object-cover"
                              onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
                            />
                          </div>
                          <p className="font-mono text-[11px] font-bold text-charcoal mt-3">{name}</p>
                          <p className="font-mono text-[11px] text-charcoal/60 leading-[1.7] mt-1">{caption}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            </Section>

            {/* ── 04 The Outcome and Impact ─────────────────── */}
            <Section id="solution">
              <FadeUp>
                <div className="relative">
                  <DoodleConfettiDots className="-right-16 -top-4" />
                  <SectionLabel number="04" label="The Outcome" />
                </div>
                <h2 className="text-4xl md:text-5xl font-semibold text-charcoal mb-6" style={{ fontFamily: "var(--font-lora)" }}>
                  The Outcome and Impact
                </h2>
              </FadeUp>
              {/* ── Metrics ── */}
              <FadeUp delay={0.1} className="mt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { value: "57%", label: "Increase in link usage", detail: "vs. previous flow" },
                    { value: "3×", label: "More simulator runs", detail: "36% test new links" },
                    { value: "2.3×", label: "Analytics return rate", detail: "Users viewing link performance within a week" },
                  ].map(({ value, label, detail }) => (
                    <div
                      key={label}
                      className="relative bg-white rounded-[8px] border border-charcoal/[0.06] px-6 py-8 text-center overflow-hidden"
                      style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.03)" }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold/40" />
                      <p className="font-cormorant text-4xl font-semibold text-charcoal mb-2">{value}</p>
                      <p className="font-mono text-[11px] text-charcoal/70 tracking-[0.06em] uppercase mb-1">{label}</p>
                      <p className="font-mono text-[10px] text-charcoal/60">{detail}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </Section>

            {/* ── 06 Other Work ───────────────────────────────── */}
            <Section id="other-work">
              <FadeUp>
                <div className="relative">
                  <DoodleCrossHatch className="-right-10 top-1" />
                  <SectionLabel number="05" label="Other Work" />
                </div>
                <h2 className="text-4xl md:text-5xl font-semibold text-charcoal mb-6" style={{ fontFamily: "var(--font-lora)" }}>
                  More from Knock AI
                </h2>
              </FadeUp>

              <FadeUp delay={0.1} className="mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Form Routing",
                      description: "Most teams still rely on forms. We automate the flow, enrich submissions and qualify leads in real time so no opportunity slips through.",
                      images: [
                        "/Empty1.png",
                        "/Empty2.png",
                        "/select form.png",
                        "/LinkedIn outreach.png",
                        "/linkedIn connections.png",
                        "/final screen.png",
                        "/final screen - Live.png",
                      ],
                    },
                    {
                      title: "Settings",
                      description: "A workspace configuration page for managers to handle team setup, integrations, permissions, and billing.",
                      images: [
                        "/general.png",
                        "/search name.png",
                        "/can't find.png",
                        "/import.png",
                        "/people.png",
                        "/Hover.png",
                        "/connected.png",
                        "/leadrest.png",
                      ],
                    },
                  ].map(({ title, description, images }) => (
                    <StackedCarouselCard key={title} title={title} description={description} images={images} />
                  ))}
                </div>
              </FadeUp>
            </Section>

            {/* Back link */}
            <FadeUp>
              <div className="border-t border-gold/15 pt-10">
                <Link
                  href="/"
                  className="font-mono text-xs text-charcoal/60 hover:text-gold tracking-widest uppercase transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                  Back to Work
                </Link>
              </div>
            </FadeUp>
        </div>
      </div>
    </div>
  );
}
