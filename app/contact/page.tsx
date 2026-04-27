"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main content — vertically centered */}
      <div className="flex-1 flex items-center justify-center px-6 py-24 md:py-0">
        <div className="max-w-xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-mono text-[10px] text-gold tracking-widest uppercase block mb-6">
              Contact
            </span>

            <h1 className="font-cormorant text-5xl md:text-7xl font-light text-charcoal mb-4 leading-tight">
              Let&apos;s work
              <br />
              <em className="text-gold not-italic font-semibold">together.</em>
            </h1>

            <p className="font-mono text-xs text-charcoal/40 leading-[1.9] mb-14 max-w-sm">
              Whether you have a product that needs design direction, a feature
              that needs untangling, or an idea still taking shape — I&apos;d
              love to hear about it.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="https://www.linkedin.com/in/celinesr/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="group flex items-center gap-4 bg-charcoal text-white px-7 py-4 hover:bg-gold transition-colors duration-400 ease-out"
              >
                {/* LinkedIn icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white/60 group-hover:text-white transition-colors duration-300"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="font-mono text-xs tracking-widest uppercase">
                  LinkedIn
                </span>
                <span className="ml-auto text-white/30 group-hover:text-white transition-colors duration-300">
                  →
                </span>
              </motion.a>

              <motion.a
                href="mailto:hello@celinerayner.com"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="group flex items-center gap-4 border border-charcoal/20 hover:border-gold text-charcoal px-7 py-4 transition-all duration-400 ease-out"
              >
                {/* Email icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-gold"
                >
                  <rect
                    x="2"
                    y="4"
                    width="20"
                    height="16"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M2 8l10 7 10-7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-mono text-xs tracking-widest uppercase group-hover:text-gold transition-colors duration-300">
                  Email
                </span>
                <span className="ml-auto text-charcoal/20 group-hover:text-gold transition-colors duration-300 font-mono text-[10px]">
                  hello@celinerayner.com
                </span>
              </motion.a>
            </div>
          </motion.div>

          {/* Decorative element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-24 flex items-center gap-4"
          >
            <div className="h-px w-12 bg-gold/30" />
            <p className="font-mono text-[9px] text-charcoal/20 tracking-widest uppercase">
              Based wherever the work takes me
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
