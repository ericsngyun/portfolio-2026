"use client";

import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface GlassTransitionProps {
  isActive?: boolean;
  duration?: number;
  onComplete?: () => void;
}

/**
 * Horizontal curtain wipe transition
 */
export function GlassTransition({
  isActive = false,
  duration = 0.7,
  onComplete,
}: GlassTransitionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isActive && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{
            duration,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{
            backgroundColor: "var(--color-bg)",
          }}
        >
          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
              filter: "contrast(110%) brightness(100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
