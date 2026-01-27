"use client";

import { useRef, useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Project } from "@/lib/projects";

// Use useLayoutEffect on client for GSAP context
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * ProjectCard - Editorial Swiss-style layout
 * Image + typography floating on grid, no card background
 * Liquid clip-path reveal with parallax
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const [imageLoaded, setImageLoaded] = useState(false);

  // GSAP ScrollTrigger for liquid reveal and parallax
  useIsomorphicLayoutEffect(() => {
    if (
      prefersReducedMotion ||
      !cardRef.current ||
      !imageContainerRef.current ||
      !imageRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // Liquid clip-path reveal on scroll
      gsap.fromTo(
        imageContainerRef.current,
        {
          clipPath: "inset(100% 0 0 0)",
        },
        {
          clipPath: "inset(0% 0 0 0)",
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 0.6,
          },
        }
      );

      // Parallax effect - image moves slower than scroll
      gsap.fromTo(
        imageRef.current,
        {
          yPercent: -10,
        },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Content reveal
      gsap.fromTo(
        contentRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const reducedMotionStyles = prefersReducedMotion
    ? {}
    : {
      clipPath: "inset(100% 0 0 0)",
    };

  return (
    <Link
      ref={cardRef}
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative block",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text-primary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-bg)]"
      )}
    >
      {/* Image Container - 4:3 aspect ratio, sharp corners */}
      <div
        ref={imageContainerRef}
        className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-bg-muted)]"
        style={reducedMotionStyles}
      >
        {/* Parallax image wrapper */}
        <div
          ref={imageRef}
          className="absolute inset-[-10%] will-change-transform"
        >
          {project.thumbnail || project.heroImage ? (
            <Image
              src={project.thumbnail || project.heroImage || ""}
              alt={project.name}
              fill
              className={cn(
                "object-cover editorial-image",
                "transition-all duration-700 ease-out",
                "group-hover:scale-[1.02]",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            // Placeholder with project initial
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-muted)]">
              <span className="text-[10rem] font-[family-name:var(--font-syne)] font-extrabold text-[var(--color-border)] select-none">
                {project.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Subtle hover overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-[var(--color-text-primary)]/0",
            "transition-colors duration-500",
            "group-hover:bg-[var(--color-text-primary)]/5"
          )}
        />
      </div>

      {/* Content - Clean typography, no borders */}
      <div ref={contentRef} className="pt-6">
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <h3 className="text-h2 font-[family-name:var(--font-syne)] font-semibold text-[var(--color-text-primary)] group-hover:opacity-60 transition-opacity duration-300">
            {project.name}
          </h3>
          <span className="shrink-0 text-sm text-[var(--color-text-muted)]">
            {project.year}
          </span>
        </div>

        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 max-w-lg">
          {project.tagline}
        </p>

        {/* View indicator - appears on hover */}
        <motion.div
          className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors duration-300"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span>View Project</span>
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.div>
      </div>

      {/* Index number - subtle positioning */}
      <span className="absolute top-4 left-4 text-sm text-[var(--color-text-muted)] font-medium">
        {String(index + 1).padStart(2, "0")}
      </span>
    </Link>
  );
}

/**
 * Featured project card - larger hero treatment
 */
export function FeaturedProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion || !cardRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <Link
      ref={cardRef}
      href={`/projects/${project.slug}`}
      className="group relative block overflow-hidden"
    >
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-[var(--color-bg-muted)]">
        <div ref={imageRef} className="absolute inset-[-8%] will-change-transform">
          {project.heroImage ? (
            <Image
              src={project.heroImage}
              alt={project.name}
              fill
              className="object-cover editorial-image transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-muted)]">
              <span className="text-[15rem] font-[family-name:var(--font-syne)] font-extrabold text-[var(--color-border)]">
                {project.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 bg-gradient-to-t from-[var(--color-bg)]/90 via-transparent to-transparent">
          <span className="text-label mb-2">Featured</span>
          <h3 className="text-h1 font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)] mb-2">
            {project.name}
          </h3>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl">
            {project.tagline}
          </p>
        </div>

        {/* Arrow indicator */}
        <div className="absolute top-6 right-6 size-10 border border-[var(--color-border-strong)] flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--color-text-primary)] group-hover:border-transparent">
          <ArrowUpRight className="size-4 text-[var(--color-text-primary)] group-hover:text-[var(--color-bg)] transition-colors duration-300" />
        </div>
      </div>
    </Link>
  );
}
