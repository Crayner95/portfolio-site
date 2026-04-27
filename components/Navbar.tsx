"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/sketchbook", label: "Sketchbook" },
  { href: "/about", label: "About Me" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

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

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
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

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] z-[60]"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-charcoal transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-charcoal transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-charcoal transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => {
              const isActive =
                link.href === "/about"
                  ? pathname === "/about"
                  : link.href === "/contact"
                  ? pathname === "/contact"
                  : link.href === "/sketchbook"
                  ? pathname === "/sketchbook"
                  : false;

              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-cormorant text-3xl font-semibold transition-colors duration-300 ${
                      isActive ? "text-gold" : "text-charcoal hover:text-gold"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
