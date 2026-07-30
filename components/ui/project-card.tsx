import { Reveal } from "@/components/reveal";
import type { Project } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <Reveal delay={index * 0.05}>
      <article className="project-card group relative overflow-hidden rounded-[28px] border border-white/[.09] bg-[#09090b] p-5 transition duration-500 hover:border-white/[.18] sm:p-7">
        <div
          className={`project-art project-art-${project.accent} absolute inset-y-0 right-0 hidden w-[42%] border-l border-white/[.06] md:block`}
          aria-hidden="true"
        >
          <div className="project-art-mark">{project.index}</div>
          <div className="project-art-orbit" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.14em]">
            <span className="text-[#89d0ff]">{project.index}</span>
            <span className="text-white/35">{project.category}</span>
          </div>
          <h3 className="mt-7 font-[family-name:var(--font-geist)] text-3xl tracking-[-.065em] sm:text-5xl">
            {project.name}
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
            {project.summary}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/[.09] bg-black/15 px-3 py-1.5 font-mono text-[10px] text-white/56"
              >
                {tech}
              </span>
            ))}
          </div>
          <button
            onClick={onOpen}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/[.12] bg-white/[.04] px-4 py-2.5 font-mono text-[10px] text-white/76 transition hover:border-[#89d0ff]/60 hover:bg-[#77c4ff]/[.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#89d0ff]"
          >
            View case study <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </article>
    </Reveal>
  );
}
