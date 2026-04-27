"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";

function isProjectRoute(path: string) {
  return path.startsWith("/work/");
}

type TransitionType = "enter-project" | "leave-project" | "default";

const variants: Variants = {
  initial: (type: TransitionType) => {
    if (type === "enter-project") {
      return { y: "100%", opacity: 1 };
    }
    if (type === "leave-project") {
      return { opacity: 0 };
    }
    return { opacity: 0, y: 12 };
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: (type: TransitionType) => {
    if (type === "leave-project") {
      // Project page slides back down
      return { y: "100%", opacity: 1 };
    }
    if (type === "enter-project") {
      // Home page stays static underneath
      return { opacity: 1, y: 0 };
    }
    return { opacity: 0, y: -8 };
  },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);
  const transitionTypeRef = useRef<TransitionType>("default");

  // Compute transition type from prev → current
  const prev = prevPathRef.current;
  let transitionType: TransitionType = "default";
  if (pathname !== prev) {
    if (isProjectRoute(pathname) && !isProjectRoute(prev)) {
      transitionType = "enter-project";
    } else if (!isProjectRoute(pathname) && isProjectRoute(prev)) {
      transitionType = "leave-project";
    }
    transitionTypeRef.current = transitionType;
  } else {
    transitionType = transitionTypeRef.current;
  }

  // Update prev path ref after render commits
  useEffect(() => {
    prevPathRef.current = pathname;
  }, [pathname]);

  const mode = transitionType === "default" ? "wait" : "sync";
  const isProjectPage = isProjectRoute(pathname);

  return (
    <AnimatePresence mode={mode} custom={transitionType} initial={false}>
      <motion.div
        key={pathname}
        custom={transitionType}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: 2,
          ease:
            transitionType === "default"
              ? [0.22, 1, 0.36, 1]
              : [0.33, 1, 0.68, 1],
        }}
        style={
          isProjectPage
            ? {
                position: "fixed",
                inset: 0,
                zIndex: 40,
                backgroundColor: "white",
                overflowY: "auto",
              }
            : undefined
        }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
