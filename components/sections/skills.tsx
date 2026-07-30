import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { skillGroups } from "@/data/portfolio";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 px-4 py-24 sm:px-6 lg:px-10 lg:py-36"
      aria-labelledby="skills-title"
    >
      <SectionIntro
        eyebrow="03 / Capabilities"
        title="A practical stack for modern product engineering."
        description="No scorecards—just the tools and systems I reach for to take an idea from shape to shipping."
      />
      <div className="mx-auto mt-12 grid max-w-7xl gap-3 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal
            key={group.label}
            id={`skill-group-${index}`}
            role="region"
            aria-label={group.label}
            delay={index * 0.04}
            className="glass-panel card-tilt rounded-[24px] p-6"
          >
            <div className="flex items-center justify-between">
              <p className="font-[family-name:var(--font-geist)] text-xl tracking-[-.05em]">
                {group.label}
              </p>
              <span className="font-mono text-[10px] text-white/32">
                0{index + 1}
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/[.1] bg-white/[.03] px-3 py-1.5 font-mono text-[10px] text-white/65 transition hover:border-[#89d0ff]/45 hover:bg-[#77c4ff]/[.07] hover:text-[#d7efff]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
