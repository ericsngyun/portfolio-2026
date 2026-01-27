"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { SplitText } from "@/components/ui/SplitText";
import { RevealOnScroll, StaggeredSection, AnimatedItem } from "@/components/ui/AnimatedSection";
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
      "Understanding the entire system—from database to UI—leads to better architecture and fewer surprises.",
  },
  {
    title: "Continuous Learning",
    description:
      "Technology evolves rapidly. I stay curious and embrace new tools that genuinely improve outcomes.",
  },
];

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Parallax effect for the image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="section-padding bg-[var(--color-bg-elevated)]"
    >
      <div className="container-wide">
        {/* Section Header */}
        <div className="mb-20">
          <RevealOnScroll>
            <span className="text-label mb-4 block">About</span>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2 className="text-display font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)] max-w-3xl tracking-[-0.03em]">
              Building products that matter, with code that lasts
            </h2>
          </RevealOnScroll>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column - Image & Brief */}
          <div className="lg:col-span-5">
            {/* Image with parallax - editorial treatment */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-bg-muted)] mb-8">
              <motion.div
                style={{ y: prefersReducedMotion ? 0 : imageY }}
                className="absolute inset-0"
              >
                {/* Placeholder - editorial initial treatment */}
                <div className="w-full h-[120%] flex items-center justify-center bg-[var(--color-bg-muted)]">
                  <span className="text-[12rem] font-[family-name:var(--font-syne)] font-extrabold text-[var(--color-border)] select-none">
                    E
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Brief intro */}
            <RevealOnScroll delay={0.2}>
              <p className="text-body-lg text-[var(--color-text-secondary)] leading-relaxed">
                I'm Eric, a full-stack engineer based in Los Angeles. I specialize
                in building performant web applications with a focus on clean
                architecture and exceptional user experience.
              </p>
            </RevealOnScroll>
          </div>

          {/* Right Column - Experience & Values */}
          <div className="lg:col-span-7 space-y-16">
            {/* Experience Timeline */}
            <div>
              <RevealOnScroll>
                <h3 className="text-h3 font-[family-name:var(--font-syne)] font-semibold text-[var(--color-text-primary)] mb-8">
                  Experience
                </h3>
              </RevealOnScroll>

              <StaggeredSection staggerDelay={0.1}>
                <div className="space-y-0">
                  {experiences.map((exp, index) => (
                    <AnimatedItem key={index}>
                      <div className="group grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-8 py-5 border-b border-[var(--color-border)]">
                        <span className="text-sm text-[var(--color-text-muted)]">
                          {exp.period}
                        </span>
                        <div>
                          <h4 className="text-body font-medium text-[var(--color-text-primary)] group-hover:opacity-60 transition-opacity">
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
            </div>

            {/* Values */}
            <div>
              <RevealOnScroll>
                <h3 className="text-h3 font-[family-name:var(--font-syne)] font-semibold text-[var(--color-text-primary)] mb-8">
                  Approach
                </h3>
              </RevealOnScroll>

              <StaggeredSection staggerDelay={0.15} delay={0.2}>
                <div className="grid sm:grid-cols-2 gap-8">
                  {values.map((value, index) => (
                    <AnimatedItem key={index}>
                      <div className="space-y-3">
                        <h4 className="text-body font-medium text-[var(--color-text-primary)]">
                          {value.title}
                        </h4>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </AnimatedItem>
                  ))}
                </div>
              </StaggeredSection>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
