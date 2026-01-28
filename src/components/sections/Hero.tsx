"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { VelocityMarquee } from "@/components/effects/VelocityMarquee";
import { AnimatedLines } from "@/components/ui/SplitText";
import { RevealOnScroll } from "@/components/ui/AnimatedSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 80]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.98]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh flex flex-col justify-end pb-[clamp(3rem,8vh,6rem)] overflow-hidden"
    >
      {/* Giant velocity marquee - main visual anchor */}
      <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden">
        {mounted && (
          <VelocityMarquee
            text="DESIGN & ENGINEERING"
            baseSpeed={25}
            maxSpeedMultiplier={8}
            maxSkew={10}
            direction="left"
            strokeWidth={1.5}
            className="w-full"
          />
        )}
      </div>

      {/* Gradient fade at bottom for depth */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40vh] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, var(--color-bg) 0%, var(--color-bg) 20%, transparent 100%)",
        }}
      />

      {/* Main content */}
      <motion.div
        style={{
          opacity: prefersReducedMotion ? 1 : opacity,
          y: prefersReducedMotion ? 0 : y,
          scale: prefersReducedMotion ? 1 : scale,
        }}
        className="container-wide relative z-10"
      >
        {/* Eyebrow label */}
        <RevealOnScroll delay={0}>
          <p className="text-label mb-6">Portfolio 2026</p>
        </RevealOnScroll>

        {/* Name - Large editorial treatment */}
        <AnimatedLines
          lines={["Eric Yun"]}
          type="slideUp"
          as="h1"
          className="mb-8"
          lineClassName="text-[clamp(3.5rem,12vw,10rem)] font-[family-name:var(--font-syne)] font-extrabold tracking-[-0.05em] leading-[0.85] text-[var(--color-text-primary)]"
          staggerDelay={0.1}
          delay={0.15}
        />

        {/* Intro text with refined typography */}
        <RevealOnScroll delay={0.35}>
          <p className="text-[clamp(1.125rem,2vw,1.375rem)] text-[var(--color-text-secondary)] leading-[1.6] max-w-lg tracking-[-0.01em]">
            I build things for the internet.
          </p>
        </RevealOnScroll>

        {/* Minimal info line with better spacing */}
        <RevealOnScroll delay={0.5}>
          <div className="flex items-center gap-4 mt-12 pt-6 border-t border-[var(--color-border)]">
            <span className="text-sm text-[var(--color-text-muted)] tracking-[-0.01em]">
              Los Angeles
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]" />
            <span className="text-sm text-[var(--color-text-muted)] tracking-[-0.01em]">
              Available for projects
            </span>
          </div>
        </RevealOnScroll>
      </motion.div>

      {/* Scroll indicator */}
      {!prefersReducedMotion && mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1] as const,
            }}
            className="w-px h-16 bg-gradient-to-b from-[var(--color-text-muted)] via-[var(--color-text-muted)]/50 to-transparent"
          />
        </motion.div>
      )}
    </section>
  );
}
