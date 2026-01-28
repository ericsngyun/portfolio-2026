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
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="skills"
      className="py-[clamp(6rem,15vh,12rem)]"
    >
      <div className="container-wide">
        {/* Section Header */}
        <div className="mb-[clamp(3rem,8vw,5rem)]">
          <RevealOnScroll>
            <span className="text-label mb-4 block">Capabilities</span>
          </RevealOnScroll>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-16">
            <RevealOnScroll delay={0.1}>
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)] tracking-[-0.03em]">
                Tools & Technologies
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-[var(--color-text-secondary)] leading-relaxed lg:pt-3">
                I believe in choosing the right tool for the job. Here's my
                current stack—though I'm always exploring new technologies that
                can improve outcomes.
              </p>
            </RevealOnScroll>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: prefersReducedMotion ? 0 : categoryIndex * 0.1,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              className="p-6 border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors duration-300"
            >
              <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-4 pb-3 border-b border-[var(--color-border)]">
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
      </div>
    </section>
  );
}
