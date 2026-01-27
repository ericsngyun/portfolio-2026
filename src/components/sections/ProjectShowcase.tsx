"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { projects } from "@/lib/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { RevealOnScroll } from "@/components/ui/AnimatedSection";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function ProjectShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="work"
      className="py-[clamp(6rem,15vh,12rem)] relative"
    >
      <div className="container-wide">
        {/* Section Header - Large, confident */}
        <div className="mb-[clamp(3rem,8vw,6rem)]">
          <RevealOnScroll>
            <p className="text-label mb-4">Selected Work</p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)] tracking-[-0.04em] leading-[0.9]">
              Projects
            </h2>
          </RevealOnScroll>
        </div>

        {/* Project Grid - Asymmetric for visual interest */}
        <div className="grid md:grid-cols-2 gap-x-[clamp(1.5rem,4vw,3rem)] gap-y-[clamp(4rem,10vw,8rem)]">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{
                duration: 0.8,
                delay: prefersReducedMotion ? 0 : index * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              // Offset odd items for asymmetric layout
              className={index % 2 === 1 ? "md:mt-[clamp(3rem,8vw,6rem)]" : ""}
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
