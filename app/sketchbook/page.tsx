"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUp from "@/components/FadeUp";

const drawings: string[] = [
  "/img1.jpeg",
  "/img2.jpeg",
  "/img3.jpeg",
  "/img4.jpeg",
  "/img5.jpeg",
  "/img6.jpeg",
  "/img7.jpeg",
  "/img8.jpeg",
  "/img9.jpeg",
  "/img10.jpeg",
  "/img11.jpeg",
  "/img12.jpeg",
];

export default function Sketchbook() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <FadeUp>
          <p className="font-mono text-[11px] text-gold tracking-[0.15em] uppercase mb-4">
            Sketchbook
          </p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-semibold text-charcoal mb-4">
            Sketchbook
          </h1>
          <p className="font-mono text-sm text-charcoal/50 leading-[1.9] max-w-xl mb-16">
            A collection of drawings and illustrations outside of product work.
          </p>
        </FadeUp>

        <div className="columns-2 md:columns-3 gap-5">
          {drawings.map((src, i) => (
            <FadeUp key={src} delay={i * 0.04}>
              <div
                className="mb-5 group cursor-zoom-in overflow-hidden rounded-xl"
                onClick={() => setSelectedImage(src)}
              >
                <img
                  src={src}
                  alt={`Sketchbook drawing ${i + 1}`}
                  className="w-full block rounded-xl transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              src={selectedImage}
              alt="Sketchbook drawing"
              className="max-w-full max-h-[85vh] object-contain rounded-[4px]"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
