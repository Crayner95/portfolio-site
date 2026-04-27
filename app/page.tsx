"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import FadeUp from "@/components/FadeUp";

const rotatingLines = [
  "I am a product designer.",
  "I used to be a fullstack developer.",
  "I have been crafting designs for B2B & B2C since 2023.",
  "I am currently a designer at a cybersecurity company.",
];

const projects = [
  {
    title: "Knock AI",
    description:
      "Turning a dead-end into a launchpad - boosting 84% link activation.",
    tags: ["UI Design", "Interaction Design", "B2B SaaS"],
    href: "/work/knock-ai",
    bgColor: "#F9EDE8",
    coverImage: "/dashboard.png",
  },
  {
    title: "Airbnb Concept",
    description: "How a personal frustration became a full UX audit and redesign concept.",
    tags: ["UX Research", "Prototyping"],
    href: "/work/airbnb-concept",
    bgColor: "#EDF0EC",
    coverImage: "/Airbnb_1.png",
  },
];

export default function Home() {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % rotatingLines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center px-6 md:px-10"
        style={{ backgroundColor: "#F3F1FA" }}
      >
        <div className="text-center max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[18px] text-charcoal/40 mb-4"
          >
            Welcome! I&apos;m Celine.
          </motion.p>

          <div className="min-h-[100px] relative">
            <AnimatePresence mode="wait">
              <motion.p
                key={lineIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-cormorant text-[28px] md:text-[32px] font-semibold text-charcoal leading-snug"
              >
                {rotatingLines[lineIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
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
                <span className="inline-block font-mono text-[11px] text-charcoal/30 mt-3 group-hover:text-gold transition-colors duration-300">
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
