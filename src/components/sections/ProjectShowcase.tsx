"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { projects } from "@/lib/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { RevealOnScroll } from "@/components/ui/AnimatedSection";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/utils";

export function ProjectShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="work"
      className="section-padding relative"
    >
      <div className="container-wide">
        {/* Section Header - Editorial, minimal */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div>
            <RevealOnScroll>
              <span className="text-label mb-4 block">Selected Work</span>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2 className="text-display font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)] tracking-[-0.03em]">
                Projects
              </h2>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.2}>
            <p className="text-body-lg text-[var(--color-text-secondary)] max-w-md leading-relaxed">
              A curated selection of projects spanning platforms, tools, and
              digital experiences.
            </p>
          </RevealOnScroll>
        </div>

        {/* Project Grid - 2 column on desktop */}
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.6,
                delay: prefersReducedMotion ? 0 : index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Keep exports for backward compatibility
export { ProjectShowcase as ProjectCards, ProjectShowcase as ProjectList };
