"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/useSmoothScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MagneticLink } from "@/components/ui/MagneticButton";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const { direction, isAtTop } = useScrollDirection();
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isAtTop) {
      setIsVisible(true);
    } else if (direction === "down") {
      setIsVisible(false);
    } else if (direction === "up") {
      setIsVisible(true);
    }
  }, [direction, isAtTop]);

  const headerVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 },
  };

  return (
    <AnimatePresence>
      <motion.header
        initial="visible"
        animate={isVisible ? "visible" : "hidden"}
        variants={prefersReducedMotion ? undefined : headerVariants}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className={cn(
          "fixed left-0 right-0 top-0 z-[var(--z-fixed)]",
          "transition-all duration-300",
          isAtTop
            ? "bg-transparent"
            : "bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)]"
        )}
      >
        <nav className="container-wide flex h-20 items-center justify-between">
          {/* Logo - Clean, no decorations */}
          <MagneticLink href="/" distance={4} className="relative group">
            <span className="text-sm font-[family-name:var(--font-syne)] font-semibold tracking-tight text-[var(--color-text-primary)]">
              Eric Yun
            </span>
          </MagneticLink>

          {/* Navigation - Minimal */}
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <MagneticLink
                  href={link.href}
                  distance={3}
                  className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                >
                  {link.label}
                </MagneticLink>
              </li>
            ))}
          </ul>
        </nav>
      </motion.header>
    </AnimatePresence>
  );
}
