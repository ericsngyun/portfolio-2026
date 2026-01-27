"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TechBadge } from "./TechBadge";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow duration-200 ease-out hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-300"
      )}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Project Image Placeholder */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-zinc-300 dark:text-zinc-600">
            {project.name.charAt(0)}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/0 transition-colors duration-200 group-hover:bg-zinc-950/60">
          <span className="flex items-center gap-1 text-sm font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            View Project
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-balance text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {project.name}
          </h3>
          <span className="shrink-0 text-sm text-zinc-500 dark:text-zinc-400">
            {project.year}
          </span>
        </div>

        <p className="text-pretty text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.tagline}
        </p>

        {/* Tech Stack */}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
          {project.techStack.length > 4 && (
            <span className="inline-flex items-center text-xs text-zinc-500 dark:text-zinc-400">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
