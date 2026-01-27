import Link from "next/link";
import { ArrowDown, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        {/* Name */}
        <h1 className="text-balance text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl md:text-7xl dark:text-zinc-50">
          Eric Yun
        </h1>

        {/* Role */}
        <p className="mt-4 text-pretty text-xl text-zinc-600 sm:text-2xl dark:text-zinc-400">
          Full-Stack Engineer & Designer
        </p>

        {/* Tagline */}
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          I build products from concept to deployment—tournament platforms,
          AI-powered tools, and polished web experiences. Focused on clean
          architecture, performant systems, and thoughtful design.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#projects"
            className={cn(
              "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors duration-200 ease-out hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-300"
            )}
          >
            View Projects
            <ArrowDown className="size-4" />
          </Link>

          <a
            href="/resume.pdf"
            download
            className={cn(
              "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-6 text-sm font-medium text-zinc-900 transition-colors duration-200 ease-out hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-300"
            )}
          >
            <FileText className="size-4" />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
