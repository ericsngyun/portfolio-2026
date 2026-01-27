"use client";

import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const socialLinks = [
  { href: "https://github.com/ericyun", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/in/ericyun", label: "LinkedIn", icon: Linkedin },
  { href: "mailto:contact@ericyun.dev", label: "Email", icon: Mail },
];

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer id="contact" className="relative">
      {/* Main Footer Content */}
      <div className="section-padding">
        <div className="container-wide">
          {/* Large CTA */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <MagneticButton
                as="a"
                href="mailto:contact@ericyun.dev"
                distance={15}
                className="group inline-block"
              >
                <span className="text-[clamp(2rem,8vw,6rem)] font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)] leading-[1] tracking-[-0.03em] hover:opacity-50 transition-opacity duration-300">
                  Let's talk
                  <ArrowUpRight className="inline-block ml-4 size-[0.6em] transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2" />
                </span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-[var(--color-border)]">
            {/* Left - Name & Copyright */}
            <div className="space-y-1">
              <p className="text-sm text-[var(--color-text-muted)]">
                © {new Date().getFullYear()}
              </p>
              <p className="text-lg font-[family-name:var(--font-syne)] font-semibold text-[var(--color-text-primary)]">
                Eric Yun
              </p>
            </div>

            {/* Center - Navigation */}
            <nav className="flex gap-8">
              {navLinks.map((link) => (
                <MagneticButton
                  key={link.href}
                  as="a"
                  href={link.href}
                  distance={4}
                  className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                >
                  {link.label}
                </MagneticButton>
              ))}
            </nav>

            {/* Right - Social Links */}
            <div className="flex gap-6">
              {socialLinks.map((link) => (
                <MagneticButton
                  key={link.label}
                  as="a"
                  href={link.href}
                  target="_blank"
                  distance={4}
                  aria-label={link.label}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                >
                  <link.icon className="size-5" />
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
