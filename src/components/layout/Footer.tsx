import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    href: "mailto:contact@ericyun.dev",
    label: "Email",
    icon: Mail,
  },
  {
    href: "https://github.com/ericyun",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://linkedin.com/in/ericyun",
    label: "LinkedIn",
    icon: Linkedin,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white px-6 py-12 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Copyright */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {new Date().getFullYear()} Eric Yun. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-zinc-500 transition-colors duration-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              <link.icon className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
