"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { VelocityMarquee } from "@/components/effects/VelocityMarquee";
import { AnimatedLines } from "@/components/ui/SplitText";
import { RevealOnScroll } from "@/components/ui/AnimatedSection";
import { HeroNav } from "@/components/layout/HeroNav";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useFullPageScroll } from "@/components/layout/FullPageScroll";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const { scrollToSection } = useFullPageScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="relative h-full flex flex-col"
    >
      {/* Navigation */}
      <HeroNav />

      {/* Main Content Area - flex-1 takes remaining space, justify-end pushes content to bottom */}
      <div className="flex-1 flex flex-col justify-end relative overflow-hidden min-h-0">
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.8,
            delay: prefersReducedMotion ? 0 : 0.2,
            ease: [0.25, 0.1, 0.25, 1] as const,
          }}
          className="container-wide relative z-10"
        >
          {/* Eyebrow label */}
          <RevealOnScroll delay={0}>
            <p className="text-label mb-6">Portfolio 2025</p>
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
              Crafting tournament platforms, AI-powered tools, and premium
              digital experiences.
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
      </div>

      {/* Scroll indicator - Fixed at bottom */}
      {!prefersReducedMotion && mounted && (
        <div className="shrink-0 flex justify-center py-8">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            onClick={() => scrollToSection(1)}
            className="flex flex-col items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-300 cursor-pointer"
            aria-label="Scroll to next section"
          >
            <span className="text-xs font-medium tracking-wider uppercase">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: [0.45, 0, 0.55, 1] as const,
              }}
            >
              <ChevronDown className="size-5" strokeWidth={1.5} />
            </motion.div>
          </motion.button>
        </div>
      )}
    </div>
  );
}
