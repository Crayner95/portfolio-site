"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ImagePlaceholder from "@/components/ImagePlaceholder";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href: string;
  index: number;
  bgColor?: string;
  coverImage?: string; // path relative to /public, e.g. "/images/knock-ai-cover.png"
}

export default function ProjectCard({
  title,
  description,
  tags,
  href,
  index,
  bgColor = "#F9EDE8",
  coverImage,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={href} className="group block h-full">
        <motion.div
          whileHover={{ y: -4, boxShadow: "0px 1px 7px 0px rgba(12, 12, 13, 0.10)" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col h-[320px] md:h-[460px] rounded-2xl overflow-hidden p-6 md:p-10 after:absolute after:inset-0 after:rounded-2xl after:bg-black/0 after:transition-colors after:duration-300 group-hover:after:bg-black/[0.04] after:pointer-events-none after:z-10"
          style={{
            backgroundColor: bgColor,
            boxShadow: "0 4px 24px rgba(28,28,28,0.06)",
          }}
        >
          {/* ── Top row: title + tags ── */}
          <div className="relative z-10 flex items-start justify-between gap-4 mb-4 md:mb-5">
            <p className="font-mono text-xs md:text-sm text-charcoal/50 leading-relaxed">
              {title}
            </p>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 flex-shrink-0">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 font-mono text-[9px] md:text-[10px] text-white tracking-[0.06em] px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: index === 0 ? "#C4632A" : "#3D7A5F" }}
                  >
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" className="flex-shrink-0">
                      <path d="M1 3.5V1.5C1 1.22 1.22 1 1.5 1H3.5L8.5 6L6 8.5L1 3.5Z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
                      <circle cx="3" cy="3" r="0.7" fill="white" />
                    </svg>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── Text content ── */}
          <div className="relative z-10 max-w-full">
            <h3 className="font-cormorant text-xl md:text-2xl font-semibold text-charcoal mb-4 md:mb-6 leading-snug">
              {description}
            </h3>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs md:text-sm text-charcoal/70 group-hover:text-charcoal tracking-wide transition-colors duration-300">
              View Case Study
              <motion.span
                className="inline-block group-hover:translate-x-1 transition-transform duration-300"
              >
                →
              </motion.span>
            </span>
          </div>

          {/* ── White frame: absolutely positioned, bottom-right ── */}
          {coverImage ? (
            <div
              style={{
                position: "absolute",
                top: "45%",
                left: "20%",
                right: "-40px",   /* bleed past card right edge */
                bottom: "-40px",  /* bleed past card bottom edge */
                background: "#ffffff",
                borderRadius: "8px 0 0 0",
                overflow: "hidden",
                padding: "16px 0px 0px 16px",
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <Image
                  src={coverImage}
                  alt={`${title} screenshot`}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "top left",
                    borderRadius: 0,
                  }}
                  sizes="(max-width: 768px) 100vw, 55vw"
                  priority={index === 0}
                />
              </div>
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                top: "45%",
                left: "20%",
                right: "-40px",
                bottom: "-40px",
                background: "#ffffff",
                borderRadius: "8px 0 0 0",
                overflow: "hidden",
                padding: "16px 0px 0px 16px",
              }}
            >
              <ImagePlaceholder
                label="Product screenshot"
                aspectRatio=""
                className="w-full h-full"
              />
            </div>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
}
