"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { RevealOnScroll } from "@/components/ui/AnimatedSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Native",
    ],
  },
  {
    name: "Backend",
    skills: [
      "Node.js",
      "NestJS",
      "tRPC",
      "REST APIs",
      "GraphQL",
      "WebSockets",
    ],
  },
  {
    name: "Data",
    skills: [
      "PostgreSQL",
      "Prisma",
      "Drizzle ORM",
      "Redis",
      "Supabase",
    ],
  },
  {
    name: "DevOps",
    skills: [
      "Git",
      "Docker",
      "Vercel",
      "AWS",
      "CI/CD",
    ],
  },
  {
    name: "AI & ML",
    skills: [
      "OpenAI API",
      "Anthropic API",
      "Python",
      "PyTorch",
      "DINOv2",
    ],
  },
  {
    name: "Design",
    skills: [
      "Figma",
      "GSAP",
      "Three.js",
      "UI/UX",
      "Design Systems",
    ],
  },
];

export function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="section-padding"
    >
      <div className="container-wide">
        {/* Section Header */}
        <div className="mb-16 lg:mb-20">
          <RevealOnScroll>
            <span className="text-label mb-4 block">Capabilities</span>
          </RevealOnScroll>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">
            <RevealOnScroll delay={0.1}>
              <h2 className="text-display font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)] tracking-[-0.03em]">
                Tools & Technologies
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-body-lg text-[var(--color-text-secondary)] leading-relaxed lg:pt-4">
                I believe in choosing the right tool for the job. Here's my
                current stack—though I'm always exploring new technologies.
              </p>
            </RevealOnScroll>
          </div>
        </div>

        {/* Skills Grid - Clean, minimal */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-12 lg:gap-y-14">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: prefersReducedMotion ? 0 : categoryIndex * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="space-y-4"
            >
              <h3 className="text-sm font-medium text-[var(--color-text-primary)]">
                {category.name}
              </h3>

              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional note */}
        <RevealOnScroll delay={0.4}>
          <div className="mt-20 pt-8 border-t border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-muted)] max-w-xl">
              Beyond technical skills, I value clear communication, thoughtful
              documentation, and collaborative problem-solving.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
