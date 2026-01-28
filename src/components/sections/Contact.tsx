"use client";

import { Github, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealOnScroll } from "@/components/ui/AnimatedSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const socialLinks = [
  { href: "https://github.com/ericyun", label: "GitHub", icon: Github },
  { href: "mailto:yunseric@gmail.com", label: "Email", icon: Mail },
];

export function Contact() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="contact" className="py-[clamp(6rem,15vh,12rem)]">
      <div className="container-wide">
        {/* Large CTA */}
        <div className="mb-16">
          <RevealOnScroll>
            <p className="text-label mb-6">Get in touch</p>
          </RevealOnScroll>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              ease: [0.25, 0.1, 0.25, 1] as const,
            }}
          >
            <MagneticButton
              as="a"
              href="mailto:yunseric@gmail.com"
              distance={20}
              className="group inline-block"
            >
              <span className="text-[clamp(3rem,15vw,12rem)] font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)] leading-[0.9] tracking-[-0.04em] hover:opacity-40 transition-opacity duration-500">
                Let's talk
                <ArrowUpRight className="inline-block ml-[0.15em] size-[0.5em] transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:-translate-y-3" />
              </span>
            </MagneticButton>
          </motion.div>

          <RevealOnScroll delay={0.2}>
            <a
              href="mailto:yunseric@gmail.com"
              className="inline-block mt-8 text-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-300 tracking-[-0.01em]"
            >
              yunseric@gmail.com
            </a>
          </RevealOnScroll>
        </div>

        {/* Social Links */}
        <RevealOnScroll delay={0.3}>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  delay: prefersReducedMotion ? 0 : 0.4 + index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1] as const,
                }}
                className="group flex items-center gap-3 px-5 py-3 border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-elevated)] transition-all duration-300"
              >
                <link.icon
                  className="size-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors"
                  strokeWidth={1.5}
                />
                <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </div>
        </RevealOnScroll>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-[var(--color-border)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <p className="text-sm font-[family-name:var(--font-syne)] font-semibold text-[var(--color-text-primary)] tracking-[-0.02em]">
                Eric Yun
              </p>
              <span className="text-[var(--color-text-muted)]">·</span>
              <p className="text-sm text-[var(--color-text-muted)]">
                © {new Date().getFullYear()}
              </p>
            </div>

            <p className="text-sm text-[var(--color-text-muted)]">
              Los Angeles, CA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
