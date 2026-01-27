import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function ProjectGrid() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Selected Projects
          </h2>
          <p className="mt-3 text-pretty text-base text-zinc-600 dark:text-zinc-400">
            Full-stack applications, AI/ML systems, and design-forward web
            experiences.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
