import { SectionIntro } from "@/components/ui/section-intro";
import { ProjectCard } from "@/components/ui/project-card";
import { projects, type Project } from "@/data/portfolio";

export function ProjectsSection({
  setActiveProject,
}: {
  setActiveProject: React.Dispatch<React.SetStateAction<Project | null>>;
}) {
  return (
    <section
      id="projects"
      className="relative scroll-mt-24 px-4 py-24 sm:px-6 lg:px-10 lg:py-36"
      aria-labelledby="projects-title"
    >
      <SectionIntro
        eyebrow="02 / Selected work"
        title="Products with a point of view."
        description="Three explorations in intelligent systems, trust, and practical product craft."
      />
      <div className="mx-auto mt-12 max-w-7xl space-y-4">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpen={() => setActiveProject(project)}
          />
        ))}
      </div>
    </section>
  );
}
