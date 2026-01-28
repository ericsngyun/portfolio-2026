"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  RevealOnScroll,
  StaggeredSection,
  AnimatedItem,
} from "@/components/ui/AnimatedSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const experiences = [
  {
    period: "2023 — Present",
    title: "Full-Stack Engineer",
    description: "Building tournament platforms, AI tools, and SaaS products",
  },
  {
    period: "2021 — 2023",
    title: "Frontend Developer",
    description: "Creating responsive interfaces and design systems",
  },
  {
    period: "2019 — 2021",
    title: "Web Developer",
    description: "Developing marketing sites and e-commerce solutions",
  },
];

const values = [
  {
    title: "Craft Over Speed",
    description:
      "Quality code and thoughtful design compound over time. I prioritize maintainability and user experience.",
  },
  {
    title: "Full-Stack Thinking",
    description:
      "Understanding the entire system—from database to UI—leads to better architecture.",
  },
  {
    title: "Continuous Learning",
    description:
      "Technology evolves rapidly. I stay curious and embrace new tools that improve outcomes.",
  },
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <div
      ref={containerRef}
      className="h-full flex flex-col bg-[var(--color-bg-elevated)] py-[clamp(3rem,6vh,5rem)]"
    >
      <div className="container-wide flex-1 flex flex-col">
        {/* Section Header */}
        <div className="mb-[clamp(2rem,4vh,3rem)]">
          <RevealOnScroll>
            <span className="text-label mb-2 block">About</span>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)] max-w-2xl tracking-[-0.03em] leading-tight">
              Building products that matter, with code that lasts
            </h2>
          </RevealOnScroll>
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 grid lg:grid-cols-12 gap-6 lg:gap-12">
          {/* Left Column - Brief & Approach */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Brief intro */}
            <RevealOnScroll delay={0.2}>
              <div className="p-5 border border-[var(--color-border)] bg-[var(--color-bg)]">
                <div className="flex items-center gap-4 mb-4">
                  {/* Initial */}
                  <span className="text-4xl font-[family-name:var(--font-syne)] font-extrabold text-[var(--color-border-strong)]">
                    E
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      Eric Yun
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Full-Stack Engineer
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Based in Los Angeles, I specialize in building performant web
                  applications with a focus on clean architecture and
                  exceptional user experience.
                </p>
              </div>
            </RevealOnScroll>

            {/* Values - Compact */}
            <div className="flex-1">
              <RevealOnScroll delay={0.3}>
                <h3 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-4">
                  Approach
                </h3>
              </RevealOnScroll>

              <div className="space-y-3">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: prefersReducedMotion ? 0 : 0.4 + index * 0.1,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="flex gap-3"
                  >
                    <span className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-1">
                        {value.title}
                      </h4>
                      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Experience Timeline */}
          <div className="lg:col-span-7">
            <RevealOnScroll>
              <h3 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-4">
                Experience
              </h3>
            </RevealOnScroll>

            <StaggeredSection staggerDelay={0.1}>
              <div className="space-y-0">
                {experiences.map((exp, index) => (
                  <AnimatedItem key={index}>
                    <div className="group grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 py-4 border-b border-[var(--color-border)] last:border-b-0">
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {exp.period}
                      </span>
                      <div>
                        <h4 className="text-sm font-medium text-[var(--color-text-primary)] group-hover:opacity-60 transition-opacity">
                          {exp.title}
                        </h4>
                        <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedItem>
                ))}
              </div>
            </StaggeredSection>

            {/* Stats/Metrics - Compact */}
            <RevealOnScroll delay={0.5}>
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[var(--color-border)]">
                <div>
                  <p className="text-2xl font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)]">
                    5+
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Years Experience
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)]">
                    20+
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Projects Completed
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)]">
                    10+
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Happy Clients
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
