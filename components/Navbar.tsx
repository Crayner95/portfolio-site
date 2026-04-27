"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/sketchbook", label: "Sketchbook" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    const handleOverlayScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      setScrolled(target.scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // On project pages, content scrolls inside a fixed overlay from PageTransition.
    // Find it by checking computed styles since React inline styles may vary.
    let currentOverlay: Element | null = null;

    const findAndAttachOverlay = () => {
      // Check all direct children that could be the overlay
      const candidates = Array.from(document.querySelectorAll("div[style]"));
      for (const el of candidates) {
        const computed = window.getComputedStyle(el);
        if (
          computed.position === "fixed" &&
          (computed.overflowY === "auto" || computed.overflowY === "scroll") &&
          computed.zIndex === "40"
        ) {
          if (el !== currentOverlay) {
            if (currentOverlay) {
              currentOverlay.removeEventListener("scroll", handleOverlayScroll);
            }
            currentOverlay = el;
            el.addEventListener("scroll", handleOverlayScroll, { passive: true });
          }
          return true;
        }
      }
      return false;
    };

    // Try immediately, then retry a few times for page transitions
    findAndAttachOverlay();
    const retries = [100, 300, 600, 1200, 2500];
    const timers = retries.map((delay) =>
      setTimeout(() => {
        if (!currentOverlay) findAndAttachOverlay();
      }, delay)
    );

    // Also use a MutationObserver to catch dynamically added overlays
    const observer = new MutationObserver(() => {
      findAndAttachOverlay();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (currentOverlay) currentOverlay.removeEventListener("scroll", handleOverlayScroll);
      timers.forEach(clearTimeout);
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl backdrop-saturate-150 border-b border-black/5 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-cormorant text-xl font-semibold text-charcoal tracking-wide hover:text-gold transition-colors duration-300"
        >
          Celine Rayner
        </Link>

        {/* Nav Links */}
        <ul className="flex items-center gap-4 md:gap-8">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/about"
                ? pathname === "/about"
                : link.href === "/contact"
                ? pathname === "/contact"
                : link.href === "/sketchbook"
                ? pathname === "/sketchbook"
                : false;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-mono text-xs tracking-widest uppercase transition-colors duration-300 relative group ${
                    isActive ? "text-gold" : "text-charcoal/70 hover:text-charcoal"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}
