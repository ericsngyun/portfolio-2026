"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useFullPageScroll } from "./FullPageScroll";

const navItems = [
  { label: "Work", sectionIndex: 1 },
  { label: "About", sectionIndex: 2 },
  { label: "Skills", sectionIndex: 3 },
  { label: "Contact", sectionIndex: 4 },
];

export function HeroNav() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollToSection } = useFullPageScroll();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="absolute top-0 left-0 right-0 z-20 px-[clamp(1rem,4vw,4rem)] py-6 sm:py-8"
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <motion.div variants={itemVariants}>
          <span className="text-sm font-[family-name:var(--font-syne)] font-semibold tracking-tight text-[var(--color-text-primary)]">
            Eric Yun
          </span>
        </motion.div>

        {/* Navigation Links */}
        <motion.ul
          variants={containerVariants}
          className="hidden sm:flex items-center gap-8"
        >
          {navItems.map((item) => (
            <motion.li key={item.label} variants={itemVariants}>
              <button
                onClick={() => scrollToSection(item.sectionIndex)}
                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-300"
              >
                {item.label}
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.nav>
  );
}
