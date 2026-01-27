"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  letterContainer,
  letterFadeUp,
  letterSlideUp,
  stagger,
  durations,
  easings,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

type AnimationType = "fadeUp" | "slideUp" | "fade" | "none";

interface SplitTextProps {
  children: string;
  /** Animation type for each letter */
  type?: AnimationType;
  /** Delay before animation starts */
  delay?: number;
  /** Stagger delay between letters */
  staggerDelay?: number;
  /** Only animate once when in view */
  once?: boolean;
  /** Viewport margin for triggering animation */
  margin?: string;
  /** Additional className */
  className?: string;
  /** Wrapper element tag */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  /** Split by word instead of letter */
  splitBy?: "letter" | "word";
  /** Custom letter/word className */
  itemClassName?: string;
}

/**
 * SplitText - Animates text letter by letter or word by word
 * Used for hero headlines and section titles
 */
export function SplitText({
  children,
  type = "fadeUp",
  delay = 0,
  staggerDelay = stagger.fast,
  once = true,
  margin = "-100px",
  className,
  as: Component = "div",
  splitBy = "letter",
  itemClassName,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as `${number}px` });
  const prefersReducedMotion = useReducedMotion();

  // Split text into items (letters or words)
  const items = useMemo(() => {
    if (splitBy === "word") {
      return children.split(" ").map((word, i, arr) => ({
        text: word,
        isSpace: false,
        key: `word-${i}`,
        // Add space after each word except the last
        suffix: i < arr.length - 1 ? " " : "",
      }));
    }

    return children.split("").map((char, i) => ({
      text: char,
      isSpace: char === " ",
      key: `char-${i}`,
      suffix: "",
    }));
  }, [children, splitBy]);

  // Get animation variants based on type
  const getItemVariants = () => {
    if (prefersReducedMotion || type === "none") {
      return {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      };
    }

    switch (type) {
      case "slideUp":
        return letterSlideUp;
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: durations.normal,
              ease: easings.smooth,
            },
          },
        };
      case "fadeUp":
      default:
        return letterFadeUp;
    }
  };

  const containerVariants = prefersReducedMotion
    ? {
        hidden: {},
        visible: {},
      }
    : {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      };

  const itemVariants = getItemVariants();

  // For slideUp, we need overflow hidden on the wrapper
  const needsOverflowHidden = type === "slideUp" && !prefersReducedMotion;

  return (
    <motion.div
      ref={ref}
      className={cn("inline", className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      aria-label={children}
    >
      <Component className="inline">
        {items.map((item) => (
          <span
            key={item.key}
            className={cn(
              "inline-block",
              needsOverflowHidden && "overflow-hidden",
              item.isSpace && "w-[0.25em]"
            )}
          >
            <motion.span
              className={cn("inline-block", itemClassName)}
              variants={itemVariants}
              aria-hidden="true"
            >
              {item.text}
            </motion.span>
            {item.suffix && (
              <span className="inline" aria-hidden="true">
                {item.suffix}
              </span>
            )}
          </span>
        ))}
      </Component>
    </motion.div>
  );
}

/**
 * AnimatedLines - Animates text line by line
 * Useful for multi-line headings
 */
interface AnimatedLinesProps {
  lines: string[];
  type?: AnimationType;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  margin?: string;
  className?: string;
  lineClassName?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div";
}

export function AnimatedLines({
  lines,
  type = "fadeUp",
  delay = 0,
  staggerDelay = 0.1,
  once = true,
  margin = "-100px",
  className,
  lineClassName,
  as: Component = "div",
}: AnimatedLinesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as `${number}px` });
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      };

  const lineVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : type === "slideUp"
    ? letterSlideUp
    : letterFadeUp;

  const needsOverflowHidden = type === "slideUp" && !prefersReducedMotion;

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <Component>
        {lines.map((line, index) => (
          <span
            key={index}
            className={cn("block", needsOverflowHidden && "overflow-hidden")}
          >
            <motion.span
              className={cn("block", lineClassName)}
              variants={lineVariants}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Component>
    </motion.div>
  );
}
