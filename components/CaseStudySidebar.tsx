"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SidebarSection {
  id: string;
  label: string;
  number: string;
}

const defaultSections: SidebarSection[] = [
  { id: "product", label: "The Product", number: "01" },
  { id: "challenge", label: "The Challenge", number: "02" },
  { id: "decisions", label: "End State Iteration", number: "03" },
  { id: "solution", label: "Outcome & Impact", number: "04" },
  { id: "other-work", label: "Other Work", number: "05" },
  { id: "reflection", label: "Reflection", number: "06" },
];

export default function CaseStudySidebar({
  visible = true,
  sections,
  accentColor = "#B8935A",
}: {
  visible?: boolean;
  sections?: SidebarSection[];
  accentColor?: string;
}) {
  const sidebarSections = sections || defaultSections;
  const [activeSection, setActiveSection] = useState(sidebarSections[0]?.id || "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sidebarSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Project pages scroll inside a fixed overlay, not the window.
    // Find the scrollable overlay container.
    const overlay = Array.from(document.querySelectorAll("div[style]")).find((div) => {
      const s = window.getComputedStyle(div);
      return s.position === "fixed" && (s.overflowY === "auto" || s.overflowY === "scroll") && s.zIndex === "40";
    });

    const offset = 100;

    if (overlay) {
      const top = el.getBoundingClientRect().top + overlay.scrollTop - offset;
      overlay.scrollTo({ top, behavior: "smooth" });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed top-1/2 -translate-y-1/2 left-8 xl:left-12 hidden lg:block transition-opacity duration-300 ease-in-out z-30"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div>
        <p className="font-mono text-[12px] text-charcoal/40 tracking-widest uppercase mb-6">
          Contents
        </p>
        <ul className="space-y-1">
          {sidebarSections.map(({ id, label, number }) => {
            const isActive = activeSection === id;
            return (
              <li key={id}>
                <button
                  onClick={() => handleClick(id)}
                  className={`group flex items-center gap-3 w-full text-left py-1.5 transition-all duration-300 ${
                    isActive ? "text-charcoal" : "text-charcoal/35 hover:text-charcoal/70"
                  }`}
                >
                  {/* Active indicator bar */}
                  <motion.span
                    animate={{
                      width: isActive ? 20 : 8,
                      backgroundColor: isActive ? accentColor : "#1C1C1C",
                      opacity: isActive ? 1 : 0.2,
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="h-px flex-shrink-0"
                    style={{ display: "inline-block" }}
                  />
                  <span className="font-mono text-[12px] tracking-wider">
                    <span className="mr-1.5" style={{ color: isActive ? accentColor : "rgba(28,28,28,0.3)" }}>
                      {number}
                    </span>
                    {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
