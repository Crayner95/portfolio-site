"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import FadeUp from "@/components/FadeUp";

const highlights: Record<string, { caption: string; color: string }> = {
  "Celine Rayner": { caption: "That's me :) - nice to meet you.", color: "#1C1C1C" },
  "curiosity": { caption: "I question the brief, but then also question my own answer 👀", color: "#6D5ACF" },
  "versatility": { caption: "From fullstack developer to high-fidelity designer 👩🏼‍💻", color: "#CF5A8F" },
  "dynamic environments": { caption: "I enjoy environments where I can work cross-functionally with teams, and wear many hats ✨", color: "#3A8F7A" },
};

const projects = [
  {
    title: "Knock AI",
    description:
      "Dead end → 84% activity boost",
    tags: ["B2B SaaS", "UX Research", "UI"],
    href: "/work/knock-ai",
    bgColor: "#F9EDE8",
    coverImage: "/dashboard.png",
  },
  {
    title: "Airbnb Concept",
    description: "Personal frustration 🤝 UX audit",
    tags: ["AI", "Synthetic Research"],
    href: "/work/airbnb-concept",
    bgColor: "#EDF0EC",
    coverImage: "/Airbnb_1.png",
  },
];

function HeroText({ hovered, setHovered }: { hovered: string | null; setHovered: (v: string | null) => void }) {
  const dimmed = hovered !== null;

  const Plain = ({ children }: { children: string }) => (
    <span
      className="transition-opacity duration-300"
      style={{ opacity: dimmed ? 0.15 : 1 }}
    >
      {children}
    </span>
  );

  const Highlight = ({ word, italic = false }: { word: string; italic?: boolean }) => {
    const isActive = hovered === word;
    const { color } = highlights[word];

    return (
      <span
        className={`cursor-pointer transition-all duration-300 ${italic ? "italic" : ""}`}
        style={{
          ...(italic ? { fontFamily: "var(--font-lora)" } : {}),
          opacity: dimmed && !isActive ? 0.15 : 1,
          color: color,
        }}
        onMouseEnter={() => setHovered(word)}
        onMouseLeave={() => setHovered(null)}
      >
        {word}
      </span>
    );
  };

  return (
    <div className="relative">
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="text-[36px] md:text-[52px] lg:text-[60px] font-semibold text-charcoal leading-[1.2] md:leading-[1.15] tracking-tight"
        style={{ fontFamily: "var(--font-lora)" }}
      >
        <Highlight word="Celine Rayner" /><sup className="text-[#C4960C] text-[28px] md:text-[36px] ml-[-2px]" style={{ verticalAlign: "super", lineHeight: 0 }} aria-hidden="true">&#x273B;</sup>
        <Plain>{" is a developer turned designer with the "}</Plain>
        <Highlight word="curiosity" italic />
        <Plain>{" and "}</Plain>
        <Highlight word="versatility" italic />
        <Plain>{" to dive into "}</Plain>
        <Highlight word="dynamic environments" italic />
        <Plain>.</Plain>
      </motion.h1>

      {/* Fixed caption — bottom right */}
      <div className="h-6 mt-6 flex justify-end">
        {hovered && (
          <motion.p
            key={hovered}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-[16px]"
            style={{ color: highlights[hovered].color }}
          >
            {highlights[hovered].caption}
          </motion.p>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center px-6 md:px-10"
        style={{ backgroundColor: "#F3F1FA" }}
      >
        <div className="max-w-4xl">
          <HeroText hovered={hovered} setHovered={setHovered} />
        </div>
      </section>
      {/* Work / Projects Section */}
      <section id="work" className="px-6 md:px-10 max-w-6xl pb-20 mx-auto pt-[92px]">
        <div className="flex justify-center mb-12">
          <span className="font-mono text-[11px] text-charcoal/40 tracking-[0.15em] uppercase px-4 py-2 rounded-full border border-charcoal/10">
            Case Studies
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </section>

      {/* Before Design Section */}
      <section className="px-6 md:px-10 max-w-6xl pb-24 mx-auto">
        <div className="flex justify-center mb-10">
          <span className="font-mono text-[11px] text-charcoal/40 tracking-[0.15em] uppercase px-4 py-2 rounded-full border border-charcoal/10">
            Before Design
          </span>
        </div>
        <FadeUp>
          <a
            href="https://devpost.com/software/globby"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="rounded-xl border border-charcoal/[0.06] bg-white shadow-[0_1px_6px_rgba(0,0,0,0.04)] px-5 md:px-8 py-6 md:py-8 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-shadow duration-300">
              <span className="text-3xl flex-shrink-0">🏆</span>
              <div>
                <p className="font-mono text-[13px] font-bold text-charcoal mb-1 group-hover:text-gold transition-colors duration-300">
                  Google Hackathon Winner — DayTrip
                </p>
                <p className="font-mono text-sm text-charcoal/40 leading-[1.8]">
                  Won Best Mobile App as part of a dev team during my fullstack development days, before transitioning into design. The experience shaped how I approach product thinking — understanding technical constraints, shipping under pressure, and collaborating across disciplines.
                </p>
                <span className="inline-block font-mono text-[11px] text-charcoal/60 mt-3 group-hover:text-gold transition-colors duration-300">
                  View on Devpost &#x2197;
                </span>
              </div>
            </div>
          </a>
        </FadeUp>
      </section>
    </div>
  );
}
