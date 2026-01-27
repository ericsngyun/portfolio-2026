"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView, Variants } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  fadeUp,
  fadeIn,
  fadeLeft,
  fadeRight,
  scaleUp,
  clipRevealUp,
  clipRevealLeft,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

type AnimationType =
  | "fadeUp"
  | "fadeIn"
  | "fadeLeft"
  | "fadeRight"
  | "scaleUp"
  | "clipUp"
  | "clipLeft"
  | "none";

interface AnimatedSectionProps {
  children: ReactNode;
  /** Animation type */
  animation?: AnimationType;
  /** Additional delay before animation */
  delay?: number;
  /** Duration override */
  duration?: number;
  /** Trigger animation only once */
  once?: boolean;
  /** Viewport margin for triggering */
  margin?: string;
  /** Additional className */
  className?: string;
  /** HTML element type */
  as?: "div" | "section" | "article" | "aside" | "header" | "footer";
}

const animationMap: Record<AnimationType, Variants> = {
  fadeUp,
  fadeIn,
  fadeLeft,
  fadeRight,
  scaleUp,
  clipUp: clipRevealUp,
  clipLeft: clipRevealLeft,
  none: {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
  },
};

/**
 * AnimatedSection - Wrapper that animates children when scrolled into view
 * Use for sections, cards, and content blocks
 */
export function AnimatedSection({
  children,
  animation = "fadeUp",
  delay = 0,
  duration,
  once = true,
  margin = "-100px",
  className,
  as: Component = "div",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as `${number}px` });
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion
    ? animationMap.none
    : animationMap[animation];

  // Apply delay and duration overrides
  const customVariants: Variants = {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: {
        ...(typeof variants.visible === "object" &&
        "transition" in variants.visible
          ? variants.visible.transition
          : {}),
        delay,
        ...(duration && { duration }),
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={customVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      // @ts-expect-error - motion.div doesn't accept 'as' prop but we render as div anyway
      as={Component}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggeredSection - Container that staggers children animations
 * Children should use AnimatedItem component
 */
interface StaggeredSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  margin?: string;
  as?: "div" | "ul" | "ol" | "section";
}

export function StaggeredSection({
  children,
  className,
  delay = 0,
  staggerDelay = 0.1,
  once = true,
  margin = "-100px",
  as: Component = "div",
}: StaggeredSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as `${number}px` });
  const prefersReducedMotion = useReducedMotion();

  const variants: Variants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedItem - Child component for StaggeredSection
 * Automatically inherits stagger timing from parent
 */
interface AnimatedItemProps {
  children: ReactNode;
  animation?: AnimationType;
  className?: string;
  as?: "div" | "li" | "span" | "article";
}

export function AnimatedItem({
  children,
  animation = "fadeUp",
  className,
}: AnimatedItemProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion
    ? animationMap.none
    : animationMap[animation];

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * RevealOnScroll - Simple reveal animation triggered by scroll
 * Lightweight alternative to AnimatedSection
 */
interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
}

export function RevealOnScroll({
  children,
  className,
  y = 30,
  delay = 0,
  duration = 0.6,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? false : { opacity: 0, y }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y }
      }
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
