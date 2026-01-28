"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { RevealOnScroll } from "@/components/ui/AnimatedSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "NestJS", "tRPC", "REST APIs", "GraphQL"],
  },
  {
    name: "Data",
    skills: ["PostgreSQL", "Prisma", "Drizzle ORM", "Redis", "Supabase"],
  },
  {
    name: "DevOps",
    skills: ["Git", "Docker", "Vercel", "AWS", "CI/CD"],
  },
  {
    name: "AI & ML",
    skills: ["OpenAI API", "Anthropic API", "Python", "PyTorch"],
  },
  {
    name: "Design",
    skills: ["Figma", "GSAP", "Three.js", "UI/UX", "Design Systems"],
  },
];

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <div
      ref={containerRef}
      className="h-full flex flex-col py-[clamp(2rem,5vh,5rem)]"
    >
      <div className="container-wide flex-1 flex flex-col">
        {/* Section Header */}
        <div className="mb-[clamp(2rem,4vh,3rem)]">
          <RevealOnScroll>
            <span className="text-label mb-2 block">Capabilities</span>
          </RevealOnScroll>

          <div className="grid lg:grid-cols-2 gap-4 lg:gap-12">
            <RevealOnScroll delay={0.1}>
              <h2 className="text-[clamp(2rem,5vw,3rem)] font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)] tracking-[-0.03em]">
                Tools & Technologies
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed lg:pt-2">
                I believe in choosing the right tool for the job. Here's my
                current stack—though I'm always exploring new technologies.
              </p>
            </RevealOnScroll>
          </div>
        </div>

        {/* Skills Grid - 3x2 compact layout */}
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: prefersReducedMotion ? 0 : categoryIndex * 0.08,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              className="p-4 lg:p-5 border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors duration-300"
            >
              <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-3 pb-2 border-b border-[var(--color-border)]">
                {category.name}
              </h3>

              <ul className="space-y-1.5">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200 cursor-default"
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
          <div className="mt-4 lg:mt-6 pt-4 border-t border-[var(--color-border)]">
            <p className="text-xs text-[var(--color-text-muted)] max-w-xl">
              Beyond technical skills, I value clear communication, thoughtful
              documentation, and collaborative problem-solving.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
