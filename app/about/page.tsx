"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FadeUp from "@/components/FadeUp";

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

const thingsILove = [
  "Crafting micro-interactions and the tiny details that delight",
  "Exploring AI tools for design and research",
  "Reading fantasy (currently obsessed with Sarah J. Maas)",
  "Running (aiming to do a half marathon one day)",
  "Drawing",
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 md:px-10 pt-32 pb-24">
        {/* ── Section label ── */}
        <FadeUp className="mb-12">
          <span className="font-mono text-[10px] text-gold tracking-widest uppercase">
            About
          </span>
        </FadeUp>

        {/* ── Quote ── */}
        <FadeUp className="mb-16">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -top-8 md:-top-12 -left-2 md:-left-6 text-gold/70 select-none pointer-events-none"
              style={{
                fontFamily: "var(--font-lora)",
                fontSize: "120px",
                lineHeight: 1,
              }}
            >
              &ldquo;
            </span>
            <blockquote
              className="relative text-[22px] md:text-[28px] font-light italic text-charcoal/80 leading-[1.5]"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Realizing you are fortunate enough to be in a position that allows you to create, and in some cases get paid to do what you love, might tip the balance in favor of the work.
              <span
                aria-hidden="true"
                className="text-gold/70 inline-block align-middle ml-1"
                style={{
                  fontFamily: "var(--font-lora)",
                  fontSize: "60px",
                  lineHeight: 0,
                  verticalAlign: "-0.35em",
                }}
              >
                &rdquo;
              </span>
            </blockquote>
          </div>
          <p className="font-mono text-[11px] text-charcoal/40 tracking-widest uppercase mt-6">
            — Rick Rubin
          </p>
        </FadeUp>

        {/* ── Bio ── */}
        <FadeUp className="mb-20">
          <div className="flex flex-col md:flex-row items-start gap-10 md:gap-12">
            <div className="space-y-6 font-cormorant text-[20px] font-light leading-[1.55] text-charcoal/70 flex-1">
              <p>
                Hi, I&rsquo;m Celine and this quote perfectly encapsulates how I feel about being a designer.
              </p>
              <p>
                I think it&rsquo;s a privilege to design for a living, and my goal is to always make this belief evident through the quality of my work.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, rotate: 0, y: 8 }}
              whileInView={{ opacity: 1, rotate: 4, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="flex-shrink-0 w-[160px] md:w-[180px]"
            >
              <Image
                src="/sketch.png"
                alt="A sketch by Celine"
                width={1086}
                height={1448}
                className="w-full h-auto"
                priority
              />
            </motion.div>
          </div>
        </FadeUp>

        {/* ── Things I Love ── */}
        <FadeUp className="mb-20">
          <div className="flex items-center gap-6 mb-8">
            <span className="font-mono text-[10px] text-charcoal/40 tracking-widest uppercase">
              Things I Love
            </span>
            <div className="h-px flex-1 bg-charcoal/10" />
          </div>
          <ul className="space-y-4">
            {thingsILove.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-start gap-4 text-[17px] md:text-[18px] text-charcoal/80 leading-relaxed"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-gold mt-[6px] flex-shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2.8c.3 2.4.9 4.5 1.9 5.7 1 1.2 3 1.9 5.5 2.4-2.5.5-4.4 1.2-5.4 2.3-1 1.1-1.7 3.2-2 6.0-.4-2.7-1.1-4.7-2.1-5.8-1-1.1-3-1.9-5.5-2.5 2.5-.5 4.4-1.3 5.4-2.5C10.8 7.2 11.5 5.1 12 2.8Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </FadeUp>

        {/* ── Skills (kept as-is) ── */}
        <FadeUp>
          <div className="flex items-center gap-6 mb-8">
            <span className="font-mono text-[10px] text-charcoal/40 tracking-widest uppercase">
              Skills
            </span>
            <div className="h-px flex-1 bg-charcoal/10" />
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
