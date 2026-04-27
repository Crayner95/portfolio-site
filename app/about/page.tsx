"use client";

import { motion } from "framer-motion";
import FadeUp from "@/components/FadeUp";
import Timeline from "@/components/Timeline";

const skills = [
  "UX Research",
  "UI Design",
  "Interaction Design",
  "Prototyping",
  "Design Systems",
  "Figma",
  "User Testing",
  "Wireframing",
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gold/10 bg-white pt-28 pb-14 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-mono text-[10px] text-gold tracking-widest uppercase block mb-4">
              About
            </span>
            <h1 className="font-cormorant text-5xl md:text-7xl font-semibold text-charcoal leading-tight">
              Celine Rayner
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20">
        {/* ── Part 1: Bio ───────────────────────────────────────── */}
        <FadeUp className="mb-24">
          <div className="max-w-3xl">
            <p className="font-cormorant text-3xl md:text-4xl lg:text-5xl font-light leading-[1.3] text-charcoal">
              Before joining the design world, I was a front-end developer, who liked bringing static designs to life, turning them into something everyone can enjoy. Now as a designer, I&apos;m on a mission to create designs that not only look good, but also feel good to use for all kinds of people. Let&apos;s make the digital world a better place :)
            </p>
            <div className="mt-6 ml-1">
              <p className="font-cormorant text-2xl md:text-3xl font-light leading-[1.4] text-charcoal/60 italic">
                She designs with intention — every detail carries a reason, and
                every flow earns the user&apos;s trust.
              </p>
            </div>
          </div>
        </FadeUp>

        <div className="border-t border-gold/15 pt-16 mb-24" />

        {/* ── Part 2: Timeline ──────────────────────────────────── */}
        <FadeUp className="mb-16">
          <div className="flex items-center gap-6 mb-14">
            <span className="font-mono text-[10px] text-charcoal/30 tracking-widest uppercase">
              Experience
            </span>
            <div className="h-px flex-1 bg-gold/15" />
          </div>
        </FadeUp>

        <div className="mb-24">
          <Timeline />
        </div>

        <div className="border-t border-gold/15 pt-16 mb-20" />

        {/* ── Part 3: Skills + Resume ───────────────────────────── */}
        <FadeUp>
          <div className="flex items-center gap-6 mb-12">
            <span className="font-mono text-[10px] text-charcoal/30 tracking-widest uppercase">
              Skills
            </span>
            <div className="h-px flex-1 bg-gold/15" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
            {skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="border border-gold/20 bg-white px-4 py-3 hover:border-gold/50 hover:bg-gold/5 transition-all duration-300 group">
                  <p className="font-mono text-xs text-charcoal/70 tracking-wide group-hover:text-charcoal transition-colors duration-300">
                    {skill}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Download Resume button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-4 border border-charcoal/20 hover:border-gold bg-transparent hover:bg-ivory px-8 py-5 transition-all duration-400 ease-out"
            >
              {/* Icon */}
              <div className="w-7 h-8 border border-gold/40 group-hover:border-gold rounded-sm flex items-center justify-center relative transition-colors duration-300">
                <svg
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  className="text-gold"
                >
                  <path
                    d="M2 1h6l3 3v9H2V1z"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <path
                    d="M7 1v3h3"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 7h4M4 9.5h2.5"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div>
                <p className="font-mono text-xs text-charcoal tracking-widest uppercase group-hover:text-gold transition-colors duration-300">
                  Download Résumé
                </p>
                <p className="font-mono text-[9px] text-charcoal/30 tracking-wider mt-0.5">
                  PDF · Updated 2024
                </p>
              </div>

              <motion.span
                animate={{ x: 0 }}
                whileHover={{ x: 3 }}
                className="ml-4 text-gold/50 group-hover:text-gold transition-colors duration-300"
              >
                ↓
              </motion.span>
            </a>
          </motion.div>
        </FadeUp>
      </div>
    </div>
  );
}
