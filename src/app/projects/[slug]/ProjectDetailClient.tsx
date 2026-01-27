"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { TechBadge } from "@/components/ui/TechBadge";
import { SplitText, AnimatedLines } from "@/components/ui/SplitText";
import { MagneticButton, MagneticLink } from "@/components/ui/MagneticButton";
import { RevealOnScroll, StaggeredSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface ProjectDetailClientProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

// Project color gradients
const projectGradients: Record<string, string> = {
  "genki-tcg": "from-violet-500/20 to-purple-500/10",
  "cardflux": "from-blue-500/20 to-cyan-500/10",
  "refora": "from-emerald-500/20 to-teal-500/10",
  "prax": "from-orange-500/20 to-amber-500/10",
  "riftrecord": "from-rose-500/20 to-pink-500/10",
};

export function ProjectDetailClient({
  project,
  prevProject,
  nextProject,
}: ProjectDetailClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Parallax effect for hero
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroScrollProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 1.1]);

  return (
    <article>
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative min-h-[70vh] lg:min-h-[80vh] flex items-end overflow-hidden"
      >
        {/* Background gradient */}
        <motion.div
          style={{
            y: prefersReducedMotion ? 0 : heroY,
            scale: prefersReducedMotion ? 1 : heroScale,
          }}
          className="absolute inset-0"
        >
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br",
              projectGradients[project.slug] || "from-slate-500/20 to-slate-600/10"
            )}
          />
          {/* Large letter background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[30rem] font-[family-name:var(--font-display)] text-[var(--color-accent-100)] opacity-30 select-none">
              {project.name.charAt(0)}
            </span>
          </div>
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: prefersReducedMotion ? 1 : heroOpacity }}
          className="container-wide relative z-10 pb-16 lg:pb-24"
        >
          {/* Back link */}
          <RevealOnScroll>
            <MagneticLink
              href="/#projects"
              distance={6}
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-12"
            >
              <ArrowLeft className="size-4" />
              Back to Projects
            </MagneticLink>
          </RevealOnScroll>

          {/* Title */}
          <AnimatedLines
            lines={[project.name]}
            type="slideUp"
            as="h1"
            lineClassName="text-display font-[family-name:var(--font-display)] text-[var(--color-text-primary)]"
            delay={0.2}
          />

          {/* Tagline */}
          <RevealOnScroll delay={0.4}>
            <p className="text-h2 text-[var(--color-text-secondary)] mt-4 max-w-2xl">
              {project.tagline}
            </p>
          </RevealOnScroll>

          {/* Meta row */}
          <RevealOnScroll delay={0.5}>
            <div className="flex flex-wrap items-center gap-6 mt-8">
              <span className="text-sm text-[var(--color-text-muted)]">
                {project.role}
              </span>
              <span className="w-px h-4 bg-[var(--color-border)]" />
              <span className="text-sm text-[var(--color-text-muted)]">
                {project.year}
              </span>
              {project.timeline && (
                <>
                  <span className="w-px h-4 bg-[var(--color-border)]" />
                  <span className="text-sm text-[var(--color-text-muted)]">
                    {project.timeline}
                  </span>
                </>
              )}
            </div>
          </RevealOnScroll>

          {/* CTA */}
          {project.links.live && (
            <RevealOnScroll delay={0.6}>
              <MagneticButton
                as="a"
                href={project.links.live}
                target="_blank"
                distance={10}
                className={cn(
                  "group inline-flex items-center gap-3 mt-8",
                  "px-6 py-3",
                  "bg-[var(--color-text-primary)] text-[var(--color-bg)]",
                  "hover:bg-[var(--color-accent-700)]",
                  "transition-colors duration-300"
                )}
              >
                <span className="text-sm font-medium">View Live Project</span>
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>
            </RevealOnScroll>
          )}
        </motion.div>
      </div>

      {/* Main Content */}
      <section ref={contentRef} className="bg-[var(--color-bg)]">
        <div className="container-wide py-20 lg:py-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Sticky Sidebar - Metadata */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-28 space-y-8">
                {/* Tech Stack */}
                <div>
                  <h3 className="text-label text-[var(--color-text-muted)] mb-4">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-[var(--color-text-secondary)] bg-[var(--color-bg-muted)] rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Role */}
                <div>
                  <h3 className="text-label text-[var(--color-text-muted)] mb-2">
                    Role
                  </h3>
                  <p className="text-sm text-[var(--color-text-primary)]">
                    {project.role}
                  </p>
                </div>

                {/* Timeline */}
                {project.timeline && (
                  <div>
                    <h3 className="text-label text-[var(--color-text-muted)] mb-2">
                      Timeline
                    </h3>
                    <p className="text-sm text-[var(--color-text-primary)]">
                      {project.timeline}
                    </p>
                  </div>
                )}

                {/* Year */}
                <div>
                  <h3 className="text-label text-[var(--color-text-muted)] mb-2">
                    Year
                  </h3>
                  <p className="text-sm text-[var(--color-text-primary)]">
                    {project.year}
                  </p>
                </div>

                {/* Links */}
                {(project.links.live || project.links.github) && (
                  <div>
                    <h3 className="text-label text-[var(--color-text-muted)] mb-3">
                      Links
                    </h3>
                    <div className="space-y-2">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-[var(--color-text-primary)] hover:text-[var(--color-accent-600)] transition-colors"
                        >
                          Live Site
                          <ArrowUpRight className="size-3" />
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-[var(--color-text-primary)] hover:text-[var(--color-accent-600)] transition-colors"
                        >
                          GitHub
                          <ArrowUpRight className="size-3" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-20">
              {/* Challenge */}
              {project.challenge && (
                <ContentSection title="The Challenge" delay={0}>
                  <p className="text-body-lg text-[var(--color-text-secondary)] leading-relaxed">
                    {project.challenge}
                  </p>
                </ContentSection>
              )}

              {/* Solution */}
              {project.solution && (
                <ContentSection title="The Solution" delay={0.1}>
                  <p className="text-body-lg text-[var(--color-text-secondary)] leading-relaxed">
                    {project.solution}
                  </p>
                </ContentSection>
              )}

              {/* Key Features */}
              <ContentSection title="Key Features" delay={0.2}>
                <StaggeredSection staggerDelay={0.1}>
                  <div className="grid sm:grid-cols-2 gap-8">
                    {project.features.map((feature, index) => (
                      <AnimatedItem key={index}>
                        <div className="space-y-2">
                          <h4 className="text-body font-medium text-[var(--color-text-primary)]">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </AnimatedItem>
                    ))}
                  </div>
                </StaggeredSection>
              </ContentSection>

              {/* Outcome */}
              {project.outcome && (
                <ContentSection title="The Outcome" delay={0.3}>
                  <p className="text-body-lg text-[var(--color-text-secondary)] leading-relaxed">
                    {project.outcome}
                  </p>
                </ContentSection>
              )}

              {/* Engineering Highlights */}
              <ContentSection title="Engineering Highlights" delay={0.4}>
                <StaggeredSection staggerDelay={0.08}>
                  <ul className="space-y-4">
                    {project.highlights.map((highlight, index) => (
                      <AnimatedItem key={index}>
                        <li className="flex gap-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-accent-400)]" />
                          {highlight}
                        </li>
                      </AnimatedItem>
                    ))}
                  </ul>
                </StaggeredSection>
              </ContentSection>
            </div>
          </div>
        </div>
      </section>

      {/* Project Navigation */}
      <ProjectNavigation prevProject={prevProject} nextProject={nextProject} />
    </article>
  );
}

interface ContentSectionProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

function ContentSection({ title, children, delay = 0 }: ContentSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <h2 className="text-h2 font-[family-name:var(--font-display)] text-[var(--color-text-primary)] mb-6">
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

interface ProjectNavigationProps {
  prevProject: Project | null;
  nextProject: Project | null;
}

function ProjectNavigation({ prevProject, nextProject }: ProjectNavigationProps) {
  return (
    <nav className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container-wide">
        <div className="grid sm:grid-cols-2">
          {/* Previous */}
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-4 py-12 pr-8 border-r border-[var(--color-border)] hover:bg-[var(--color-bg-muted)] transition-colors"
            >
              <ArrowLeft className="size-5 text-[var(--color-text-muted)] transition-transform duration-300 group-hover:-translate-x-2" />
              <div>
                <span className="block text-xs text-[var(--color-text-muted)] mb-1">
                  Previous Project
                </span>
                <span className="text-lg font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-600)] transition-colors">
                  {prevProject.name}
                </span>
              </div>
            </Link>
          ) : (
            <div className="border-r border-[var(--color-border)]" />
          )}

          {/* Next */}
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center justify-end gap-4 py-12 pl-8 hover:bg-[var(--color-bg-muted)] transition-colors"
            >
              <div className="text-right">
                <span className="block text-xs text-[var(--color-text-muted)] mb-1">
                  Next Project
                </span>
                <span className="text-lg font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-600)] transition-colors">
                  {nextProject.name}
                </span>
              </div>
              <ArrowRight className="size-5 text-[var(--color-text-muted)] transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </nav>
  );
}
