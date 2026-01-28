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
          className="mb-16"
        >
          <p className="text-label mb-3">All Work</p>
          <h1 className="text-[clamp(2.5rem,8vw,4rem)] font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)] tracking-[-0.04em] leading-[0.95]">
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
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block p-6 border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-elevated)] transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-xs text-[var(--color-text-muted)] font-medium">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-lg font-[family-name:var(--font-syne)] font-semibold text-[var(--color-text-primary)] group-hover:opacity-70 transition-opacity">
                        {project.name}
                      </h2>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] ml-8">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 ml-8 sm:ml-0">
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {project.year}
                    </span>
                    <ArrowUpRight
                      className="size-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
