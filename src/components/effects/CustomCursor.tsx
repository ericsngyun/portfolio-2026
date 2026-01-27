"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type CursorVariant = "default" | "hover" | "text" | "hidden";

interface CustomCursorProps {
  /** Whether to show the cursor */
  enabled?: boolean;
}

/**
 * CustomCursor - A custom cursor that follows the mouse
 * Provides different variants for different interactive states
 *
 * Usage:
 * 1. Add <CustomCursor /> to your layout
 * 2. Add data-cursor="hover" to elements for hover state
 * 3. Add data-cursor="text" for text selection state
 * 4. Add data-cursor="hidden" to hide the cursor
 */
export function CustomCursor({ enabled = true }: CustomCursorProps) {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Motion values for smooth cursor movement
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Spring config for smooth following
  const springConfig = { damping: 25, stiffness: 300 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!enabled || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Handle cursor variants based on data attributes
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");

      if (cursorAttr === "hover") {
        setVariant("hover");
      } else if (cursorAttr === "text") {
        setVariant("text");
      } else if (cursorAttr === "hidden") {
        setVariant("hidden");
      } else {
        setVariant("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [enabled, prefersReducedMotion, cursorX, cursorY, isVisible]);

  // Don't render on touch devices or when reduced motion is preferred
  if (!enabled || prefersReducedMotion) {
    return null;
  }

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: "var(--color-text-primary)",
      mixBlendMode: "difference" as const,
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: "var(--color-text-primary)",
      mixBlendMode: "difference" as const,
    },
    text: {
      width: 4,
      height: 32,
      backgroundColor: "var(--color-text-primary)",
      borderRadius: "2px",
      mixBlendMode: "difference" as const,
    },
    hidden: {
      width: 0,
      height: 0,
      opacity: 0,
    },
  };

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Custom cursor */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999]",
          "rounded-full",
          !isVisible && "opacity-0"
        )}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={variant}
        variants={variants}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
        }}
      />
    </>
  );
}

/**
 * Hook to control cursor variant programmatically
 */
export function useCursor() {
  const setCursor = (variant: CursorVariant) => {
    document.body.setAttribute("data-cursor", variant);
  };

  const resetCursor = () => {
    document.body.removeAttribute("data-cursor");
  };

  return { setCursor, resetCursor };
}
