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
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-[clamp(6rem,15vh,12rem)] bg-[var(--color-bg-elevated)]"
    >
      <div className="container-wide">
        {/* Section Header */}
        <div className="mb-[clamp(3rem,8vw,5rem)]">
          <RevealOnScroll>
            <span className="text-label mb-4 block">About</span>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)] max-w-3xl tracking-[-0.03em] leading-tight">
              Building products that matter, with code that lasts
            </h2>
          </RevealOnScroll>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column - Bio & Approach */}
          <div className="lg:col-span-5 space-y-12">
            {/* Brief intro */}
            <RevealOnScroll delay={0.2}>
              <div className="prose prose-lg">
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  Based in Los Angeles, I specialize in building performant web
                  applications with a focus on clean architecture and
                  exceptional user experience. I care deeply about the details
                  that make software feel polished and professional.
                </p>
              </div>
            </RevealOnScroll>

            {/* Values */}
            <div>
              <RevealOnScroll delay={0.3}>
                <h3 className="text-label mb-6">Approach</h3>
              </RevealOnScroll>

              <div className="space-y-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: prefersReducedMotion ? 0 : 0.4 + index * 0.1,
                      ease: [0.25, 0.1, 0.25, 1] as const,
                    }}
                  >
                    <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-1">
                      {value.title}
                    </h4>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Experience Timeline */}
          <div className="lg:col-span-7">
            <RevealOnScroll>
              <h3 className="text-label mb-8">Experience</h3>
            </RevealOnScroll>

            <StaggeredSection staggerDelay={0.1}>
              <div className="space-y-0">
                {experiences.map((exp, index) => (
                  <AnimatedItem key={index}>
                    <div className="group grid sm:grid-cols-[160px_1fr] gap-4 sm:gap-8 py-6 border-b border-[var(--color-border)] last:border-b-0">
                      <span className="text-sm text-[var(--color-text-muted)]">
                        {exp.period}
                      </span>
                      <div>
                        <h4 className="text-base font-medium text-[var(--color-text-primary)] group-hover:opacity-60 transition-opacity">
                          {exp.title}
                        </h4>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedItem>
                ))}
              </div>
            </StaggeredSection>

            {/* Stats */}
            <RevealOnScroll delay={0.5}>
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-[var(--color-border)]">
                <div>
                  <p className="text-3xl font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)]">
                    5+
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    Years Experience
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)]">
                    20+
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    Projects Completed
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)]">
                    10+
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    Happy Clients
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
