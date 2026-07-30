import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { GraduationCap } from "lucide-react";

export function Education() {
  const [cgpa] = useState("7.32");

  return (
    <section
      id="education"
      className="relative scroll-mt-24 px-4 py-24 sm:px-6 lg:px-10 lg:py-36"
      aria-labelledby="education-title"
    >
      <SectionIntro
        eyebrow="05 / Education"
        title="Learning in public, building in parallel."
      />
      <div className="mx-auto mt-12 grid max-w-7xl gap-3 lg:grid-cols-[1.15fr_.85fr]">
        <Reveal className="glass-panel rounded-[28px] p-6 sm:p-9">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <GraduationCap className="h-6 w-6 text-[#89d0ff]" />
              <h3 className="mt-8 font-[family-name:var(--font-geist)] text-4xl tracking-[-.065em]">
                ABES Engineering College
              </h3>
              <p className="mt-3 text-white/56">
                Bachelor of Technology · Information Technology
              </p>
            </div>
            <span className="rounded-full border border-[#89d0ff]/25 bg-[#77c4ff]/[.06] px-3 py-1.5 font-mono text-[10px] text-[#a7dcff]">
              2023 — 2027
            </span>
          </div>
          <div className="mt-10 grid gap-6 border-t border-white/[.08] pt-6 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.15em] text-white/38">
                Current CGPA
              </p>
              <p className="mt-2 font-[family-name:var(--font-geist)] text-2xl tracking-[-.04em] text-white/85">
                {cgpa}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.15em] text-white/38">
                Academic direction
              </p>
              <p className="mt-2 text-sm leading-6 text-white/63">
                Developing a strong foundation in computer science while
                applying it to full-stack software engineering, AI-powered
                applications, and scalable product development.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal
          delay={0.08}
          className="glass-panel rounded-[28px] p-6 sm:p-9"
        >
          <p className="font-mono text-[10px] uppercase tracking-[.15em] text-white/38">
            Semester timeline
          </p>
          <ol className="mt-7 space-y-0">
            {[
              "Foundation",
              "Exploration",
              "Core Computing",
              "Full-Stack Development",
              "Product Development",
              "AI Engineering",
            ].map((item, index) => (
              <li
                key={item}
                className="relative flex gap-4 border-l border-white/[.13] pb-6 pl-5 last:pb-0"
              >
                <span className="absolute -left-[4px] top-1 h-2 w-2 rounded-full bg-[#89d0ff] shadow-[0_0_10px_#89d0ff]" />
                <span className="font-mono text-[10px] text-white/35">
                  0{index + 1}
                </span>
                <span className="text-sm text-white/68">{item}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
