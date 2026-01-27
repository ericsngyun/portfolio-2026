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

  // Scroll-linked effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh flex flex-col justify-end pb-16 lg:pb-24 overflow-hidden"
    >
      {/* Giant velocity marquee - main visual anchor */}
      <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden">
        {mounted && (
          <VelocityMarquee
            text="DESIGN ENGINEER"
            baseSpeed={30}
            maxSpeedMultiplier={8}
            maxSkew={12}
            direction="left"
            className="w-full"
          />
        )}
      </div>

      {/* Main content */}
      <motion.div
        style={{
          opacity: prefersReducedMotion ? 1 : opacity,
          y: prefersReducedMotion ? 0 : y,
        }}
        className="container-wide relative z-10"
      >
        {/* Name - Large editorial treatment */}
        <div className="mb-8">
          <RevealOnScroll delay={0}>
            <span className="text-label mb-4 block">Portfolio 2025</span>
          </RevealOnScroll>

          <AnimatedLines
            lines={["Eric Yun"]}
            type="slideUp"
            as="h1"
            className="mb-6"
            lineClassName="text-display font-[family-name:var(--font-syne)] font-extrabold tracking-[-0.04em] leading-[0.85] text-[var(--color-text-primary)]"
            staggerDelay={0.1}
            delay={0.2}
          />
        </div>

        {/* Intro text */}
        <RevealOnScroll delay={0.4}>
          <p className="text-[clamp(1.125rem,2vw,1.5rem)] text-[var(--color-text-secondary)] leading-[1.5] max-w-xl">
            Crafting tournament platforms, AI-powered tools, and premium digital
            experiences with precision and care.
          </p>
        </RevealOnScroll>

        {/* Minimal info line */}
        <RevealOnScroll delay={0.6}>
          <div className="flex items-center gap-6 mt-16 pt-6 border-t border-[var(--color-border)]">
            <span className="text-sm text-[var(--color-text-muted)]">
              Los Angeles, CA
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
            <span className="text-sm text-[var(--color-text-muted)]">
              Available for projects
            </span>
          </div>
        </RevealOnScroll>
      </motion.div>

      {/* Scroll indicator - Minimal */}
      {!prefersReducedMotion && mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-px h-12 bg-gradient-to-b from-[var(--color-text-muted)] to-transparent"
          />
        </motion.div>
      )}
    </section>
  );
}
