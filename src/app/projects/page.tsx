"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <div ref={containerRef} className="min-h-screen py-32">
      <div className="container-wide">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-12"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <p className="text-label mb-3">All Work</p>
          <h1 className="text-[clamp(2rem,6vw,4rem)] font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)] tracking-[-0.04em] leading-[0.95]">
            Projects
          </h1>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block p-5 sm:p-6 border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-elevated)] transition-all duration-300"
              >
                {/* Top Row: Name, Role, Year */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3">
                  <h2 className="text-lg sm:text-xl font-[family-name:var(--font-syne)] font-semibold text-[var(--color-text-primary)] group-hover:opacity-70 transition-opacity">
                    {project.name}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                    <span>{project.role}</span>
                    <span>·</span>
                    <span>{project.year}</span>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Bottom Row: Tech Stack & Arrow */}
                <div className="flex items-end justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-[var(--color-text-muted)] px-2 py-1 bg-[var(--color-bg-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-xs text-[var(--color-text-muted)] px-2 py-1">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                  <ArrowUpRight
                    className="size-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
                    strokeWidth={1.5}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
