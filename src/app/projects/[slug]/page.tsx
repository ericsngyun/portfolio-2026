import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { getProjectBySlug, projects, getAllProjectSlugs } from "@/lib/projects";
import { TechBadge } from "@/components/ui/TechBadge";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} | Eric Yun`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Find adjacent projects for navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <article className="px-6 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors duration-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          <ArrowLeft className="size-4" />
          Back to Projects
        </Link>

        {/* Hero */}
        <header className="mb-12">
          {/* Project Image Placeholder */}
          <div className="mb-8 aspect-video w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
            <div className="flex h-full items-center justify-center">
              <span className="text-6xl font-bold text-zinc-300 dark:text-zinc-600">
                {project.name.charAt(0)}
              </span>
            </div>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                {project.name}
              </h1>
              <p className="mt-2 text-pretty text-xl text-zinc-600 dark:text-zinc-400">
                {project.tagline}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {project.year}
            </span>
          </div>

          {/* Links */}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-medium text-white transition-colors duration-200 ease-out hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-300"
              )}
            >
              View Live
              <ExternalLink className="size-4" />
            </a>
          )}
        </header>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Overview
          </h2>
          <p className="text-pretty leading-relaxed text-zinc-700 dark:text-zinc-300">
            {project.description}
          </p>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Key Features
          </h2>
          <div className="space-y-6">
            {project.features.map((feature, index) => (
              <div key={index}>
                <h3 className="text-balance font-semibold text-zinc-900 dark:text-zinc-100">
                  {feature.title}
                </h3>
                <p className="mt-1 text-pretty text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Engineering Highlights */}
        <section className="mb-12">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Engineering Highlights
          </h2>
          <ul className="space-y-3">
            {project.highlights.map((highlight, index) => (
              <li
                key={index}
                className="flex gap-3 text-pretty text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                {highlight}
              </li>
            ))}
          </ul>
        </section>

        {/* Navigation */}
        <nav className="flex items-center justify-between border-t border-zinc-200 pt-8 dark:border-zinc-800">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-2 text-sm text-zinc-500 transition-colors duration-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>
                <span className="block text-xs text-zinc-400 dark:text-zinc-500">
                  Previous
                </span>
                {prevProject.name}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center gap-2 text-right text-sm text-zinc-500 transition-colors duration-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              <span>
                <span className="block text-xs text-zinc-400 dark:text-zinc-500">
                  Next
                </span>
                {nextProject.name}
              </span>
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </article>
  );
}
