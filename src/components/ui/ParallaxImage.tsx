"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ParallaxImageProps {
  /** Image source */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Parallax intensity (0-1, default 0.2) */
  intensity?: number;
  /** Image width */
  width?: number;
  /** Image height */
  height?: number;
  /** Fill container instead of using width/height */
  fill?: boolean;
  /** Additional className for the container */
  className?: string;
  /** Additional className for the image */
  imageClassName?: string;
  /** Object fit */
  objectFit?: "cover" | "contain" | "fill" | "none";
  /** Priority loading */
  priority?: boolean;
  /** Direction of parallax movement */
  direction?: "up" | "down";
  /** Scale on scroll */
  scale?: boolean;
}

/**
 * ParallaxImage - Image with scroll-linked parallax effect
 * The image moves at a different speed than the scroll
 */
export function ParallaxImage({
  src,
  alt,
  intensity = 0.2,
  width,
  height,
  fill = false,
  className,
  imageClassName,
  objectFit = "cover",
  priority = false,
  direction = "up",
  scale = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate parallax offset based on direction
  const yRange = direction === "up" ? [100, -100] : [-100, 100];
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    yRange.map((v) => v * intensity)
  );

  // Add spring for smoother movement
  const y = useSpring(rawY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Optional scale effect
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const scaleValue = useSpring(rawScale, {
    stiffness: 100,
    damping: 30,
  });

  // Disable effects for reduced motion
  const motionY = prefersReducedMotion ? 0 : y;
  const motionScale = prefersReducedMotion || !scale ? 1 : scaleValue;

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={fill ? { position: "relative" } : undefined}
    >
      <motion.div
        style={{
          y: motionY,
          scale: motionScale,
        }}
        className="will-change-transform"
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className={cn(
              imageClassName,
              objectFit === "cover" && "object-cover",
              objectFit === "contain" && "object-contain"
            )}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className={cn(
              imageClassName,
              objectFit === "cover" && "object-cover",
              objectFit === "contain" && "object-contain"
            )}
          />
        )}
      </motion.div>
    </div>
  );
}

/**
 * ParallaxContainer - Generic container with parallax effect
 * Use for any content, not just images
 */
interface ParallaxContainerProps {
  children: React.ReactNode;
  intensity?: number;
  direction?: "up" | "down";
  className?: string;
}

export function ParallaxContainer({
  children,
  intensity = 0.1,
  direction = "up",
  className,
}: ParallaxContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yRange = direction === "up" ? [50, -50] : [-50, 50];
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    yRange.map((v) => v * intensity)
  );

  const y = useSpring(rawY, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: prefersReducedMotion ? 0 : y }}>
        {children}
      </motion.div>
    </div>
  );
}

/**
 * ScrollScale - Element that scales based on scroll position
 * Good for hero images that scale down as you scroll
 */
interface ScrollScaleProps {
  children: React.ReactNode;
  className?: string;
  /** Start scale (at top) */
  from?: number;
  /** End scale (at bottom of viewport) */
  to?: number;
}

export function ScrollScale({
  children,
  className,
  from = 1,
  to = 0.95,
}: ScrollScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rawScale = useTransform(scrollYProgress, [0, 1], [from, to]);
  const scale = useSpring(rawScale, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ scale: prefersReducedMotion ? 1 : scale }}
        className="will-change-transform origin-top"
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * ScrollOpacity - Element that fades based on scroll position
 * Good for hero content that fades out as you scroll
 */
interface ScrollOpacityProps {
  children: React.ReactNode;
  className?: string;
  /** Start opacity */
  from?: number;
  /** End opacity */
  to?: number;
  /** Scroll range (0-1) where fade occurs */
  range?: [number, number];
}

export function ScrollOpacity({
  children,
  className,
  from = 1,
  to = 0,
  range = [0, 0.5],
}: ScrollOpacityProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, range, [from, to]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity: prefersReducedMotion ? 1 : opacity }}>
        {children}
      </motion.div>
    </div>
  );
}
