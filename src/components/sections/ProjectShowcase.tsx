"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { RevealOnScroll } from "@/components/ui/AnimatedSection";
import { ArrowUpRight } from "lucide-react";

export function ProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  // Only show 4 projects for the single-page view
  const displayProjects = projects.slice(0, 4);

  return (
    <div
      ref={containerRef}
      className="h-full flex flex-col py-[clamp(2rem,5vh,4rem)]"
    >
      <div className="container-wide flex-1 flex flex-col">
        {/* Section Header - Compact */}
        <div className="mb-[clamp(1.5rem,3vh,2rem)]">
          <RevealOnScroll>
            <p className="text-label mb-2">Selected Work</p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)] tracking-[-0.04em] leading-[0.95]">
              Projects
            </h2>
          </RevealOnScroll>
        </div>

        {/* Project Grid - Responsive */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 auto-rows-fr">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group flex flex-col h-full p-4 border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-elevated)] transition-all duration-300"
              >
                {/* Top row: Number, Name, Year */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] text-[var(--color-text-muted)] font-medium shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm sm:text-base font-[family-name:var(--font-syne)] font-semibold text-[var(--color-text-primary)] group-hover:opacity-70 transition-opacity truncate">
                      {project.name}
                    </h3>
                  </div>
                  <span className="text-[10px] text-[var(--color-text-muted)] shrink-0">
                    {project.year}
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1 line-clamp-2">
                  {project.tagline}
                </p>

                {/* Bottom row: Tech + Arrow */}
                <div className="flex items-end justify-between gap-2 mt-3 pt-3 border-t border-[var(--color-border)]">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] text-[var(--color-text-muted)] px-1.5 py-0.5 bg-[var(--color-bg-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 2 && (
                      <span className="text-[10px] text-[var(--color-text-muted)]">
                        +{project.techStack.length - 2}
                      </span>
                    )}
                  </div>
                  <ArrowUpRight
                    className="size-3.5 text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
                    strokeWidth={1.5}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        {projects.length > 4 && (
          <RevealOnScroll delay={0.4}>
            <div className="mt-3 lg:mt-4 pt-3 border-t border-[var(--color-border)]">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                View all projects
                <ArrowUpRight
                  className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </div>
  );
}

// Keep exports for backward compatibility
export { ProjectShowcase as ProjectCards, ProjectShowcase as ProjectList };
