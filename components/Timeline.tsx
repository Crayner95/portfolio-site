"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface TimelineEntry {
  company: string;
  role: string;
  period: string;
  description: string;
}

const entries: TimelineEntry[] = [
  {
    company: "Knock AI",
    role: "UI/UX Designer — Freelance",
    period: "2024",
    description:
      "Sole designer on a fast-moving B2B SaaS product. Built the entire dashboard experience from scratch — segment builder, AI-enriched lead data, routing flows, and design system — shipping to production within days of each design decision.",
  },
  {
    company: "[ Company Name ]",
    role: "[ Role Title ]",
    period: "[ Date Range ]",
    description:
      "[ Add your experience here — 1 to 2 sentences about your role and impact. ]",
  },
  {
    company: "[ Company Name ]",
    role: "[ Role Title ]",
    period: "[ Date Range ]",
    description:
      "[ Add your experience here — 1 to 2 sentences about your role and impact. ]",
  },
  {
    company: "[ Company Name ]",
    role: "[ Role Title ]",
    period: "[ Date Range ]",
    description:
      "[ Add your experience here — 1 to 2 sentences about your role and impact. ]",
  },
];

function TimelineItem({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  const isPlaceholder = entry.company.startsWith("[");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative pl-10"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-1.5 flex items-center">
        <motion.div
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className={`w-2.5 h-2.5 rounded-full border-2 ${
            isPlaceholder
              ? "border-gold/30 bg-transparent"
              : "border-gold bg-gold"
          }`}
        />
      </div>

      <div className={`pb-10 ${isPlaceholder ? "opacity-40" : ""}`}>
        <span className="font-mono text-[10px] text-gold tracking-widest uppercase block mb-1">
          {entry.period}
        </span>
        <h3 className="font-cormorant text-2xl font-semibold text-charcoal mb-0.5">
          {entry.company}
        </h3>
        <p className="font-mono text-xs text-charcoal/50 mb-3 tracking-wide">
          {entry.role}
        </p>
        <p className="font-mono text-xs text-charcoal/60 leading-relaxed max-w-lg">
          {entry.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[4px] top-2 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />

      <div>
        {entries.map((entry, i) => (
          <TimelineItem key={i} entry={entry} index={i} />
        ))}
      </div>
    </div>
  );
}
