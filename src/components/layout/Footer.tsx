"use client";

import { Github, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealOnScroll } from "@/components/ui/AnimatedSection";

const socialLinks = [
  { href: "https://github.com/ericyun", label: "GitHub", icon: Github },
  { href: "mailto:yunseric@gmail.com", label: "Email", icon: Mail },
];

export function Footer() {
  return (
    <footer id="contact" className="relative">
      {/* Main Footer Content */}
      <div className="py-[clamp(6rem,15vh,12rem)]">
        <div className="container-wide">
          {/* Large CTA - The hero moment of the footer */}
          <div className="mb-24">
            <RevealOnScroll>
              <p className="text-label mb-6">Get in touch</p>
            </RevealOnScroll>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <MagneticButton
                as="a"
                href="mailto:yunseric@gmail.com"
                distance={20}
                className="group inline-block"
              >
                <span className="text-[clamp(2.5rem,10vw,8rem)] font-[family-name:var(--font-syne)] font-bold text-[var(--color-text-primary)] leading-[0.9] tracking-[-0.04em] hover:opacity-40 transition-opacity duration-500">
                  Let's talk
                  <ArrowUpRight className="inline-block ml-[0.15em] size-[0.5em] transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:-translate-y-3" />
                </span>
              </MagneticButton>
            </motion.div>

            {/* Email below */}
            <RevealOnScroll delay={0.2}>
              <a
                href="mailto:yunseric@gmail.com"
                className="inline-block mt-6 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-300 tracking-[-0.01em]"
              >
                yunseric@gmail.com
              </a>
            </RevealOnScroll>
          </div>

          {/* Bottom Row - More refined */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-6 border-t border-[var(--color-border)]">
            {/* Left - Name & Copyright */}
            <div className="space-y-0.5">
              <p className="text-xs text-[var(--color-text-muted)] tracking-wide">
                © {new Date().getFullYear()}
              </p>
              <p className="text-base font-[family-name:var(--font-syne)] font-semibold text-[var(--color-text-primary)] tracking-[-0.02em]">
                Eric Yun
              </p>
            </div>

            {/* Center - Navigation as simple text links */}
            <nav className="flex gap-8">
              {[
                { href: "#work", label: "Work" },
                { href: "#about", label: "About" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-300 tracking-[-0.01em]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right - Social Links with refined spacing */}
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <MagneticButton
                  key={link.label}
                  as="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  distance={5}
                  aria-label={link.label}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-300"
                >
                  <link.icon className="size-[18px]" strokeWidth={1.5} />
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
