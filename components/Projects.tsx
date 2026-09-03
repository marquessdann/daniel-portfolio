import { projects } from "@/data/projects";
import ProjectShowcase from "@/components/ProjectShowcase";

export default function Projects() {
  return (
    <section id="work" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <span className="section-label">02 / Selected Work</span>
        <h2 className="mt-6 font-display text-4xl font-medium text-ink sm:text-5xl">
          Things I&apos;ve built
        </h2>
      </div>

      <div className="mt-16">
        {projects.map((project, i) => (
          <ProjectShowcase key={project.name} project={project} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
