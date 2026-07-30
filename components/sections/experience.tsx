import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { experiences } from "@/data/portfolio";
import { BriefcaseBusiness } from "lucide-react";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-24 px-4 py-24 sm:px-6 lg:px-10 lg:py-36"
      aria-labelledby="experience-title"
    >
      <SectionIntro
        eyebrow="04 / Experience"
        title="Building scalable systems and solving real-world problems."
      />
      <div className="mx-auto mt-12 grid max-w-7xl gap-8">
        {experiences.map((exp) => (
          <Reveal
            key={exp.id}
            id={`experience-${exp.id}`}
            role="article"
            className="glass-panel grid gap-10 rounded-[28px] p-6 sm:p-9 lg:grid-cols-[.72fr_1.28fr]"
          >
            <div>
              <BriefcaseBusiness className="h-6 w-6 text-[#89d0ff]" />
              <p className="mt-10 font-mono text-[10px] uppercase tracking-[.18em] text-white/42">
                {exp.duration}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-geist)] text-3xl leading-none tracking-[-.06em]">
                {exp.company || exp.role}
              </h3>
              {exp.company && (
                <p className="mt-4 font-mono text-xs uppercase tracking-[.1em] text-[#89d0ff]">
                  {exp.role}
                </p>
              )}
            </div>
            <div className="border-l-0 border-white/[.08] lg:border-l lg:pl-10">
              <p className="text-base leading-7 text-white/68">
                {exp.summary}
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {exp.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/[.08] bg-white/[.025] p-4 font-mono text-[10px] leading-5 text-white/54"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
