"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { NoiseCurtain } from "@/components/effects/NoiseCurtain";
import { pageTransition } from "@/lib/animations";

interface TemplateProps {
  children: React.ReactNode;
}

/**
 * Template component for page transitions
 * Wraps all pages with enter/exit animations and noise curtain effect
 */
export default function Template({ children }: TemplateProps) {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  // Handle route changes with noise curtain
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayChildren(children);
      return;
    }

    // Trigger transition on route change
    setIsTransitioning(true);

    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, 400); // Half of the curtain animation

    return () => clearTimeout(timer);
  }, [pathname, children, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Noise curtain overlay */}
      <NoiseCurtain isActive={isTransitioning} duration={0.8} />

      {/* Page content with fade */}
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        {displayChildren}
      </motion.div>
    </>
  );
}
