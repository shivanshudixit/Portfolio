import Image from "next/image";
import { ArrowUpRight, Target, Layers3, Lightbulb } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { focusAreas } from "@/data/portfolio";

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 px-4 py-24 sm:px-6 lg:px-10 lg:py-36"
      aria-labelledby="about-title"
    >
      <SectionIntro
        eyebrow="01 / About"
        title="Building software that solves real-world problems."
      />
      <div className="mx-auto mt-12 grid max-w-7xl gap-3 lg:grid-cols-[1.06fr_.94fr]">
        <Reveal className="glass-panel card-tilt relative overflow-hidden rounded-[26px] p-6 sm:p-9">
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#77c4ff]/10 blur-3xl" />
          <div className="flex flex-col gap-7 sm:flex-row">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-white/[.12] bg-[#111] sm:h-36 sm:w-36">
              <Image
                src="/shivanshu-dixit.jpeg"
                alt="Shivanshu Dixit"
                fill
                sizes="144px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#89d0ff]">
                A little context
              </p>
              <p className="mt-3 max-w-xl font-[family-name:var(--font-geist)] text-[1.45rem] leading-[1.2] tracking-[-.045em] text-white/92 sm:text-3xl">
                I&apos;m Shivanshu Dixit, an Information Technology
                undergraduate passionate about building software that solves
                real-world problems.
              </p>
            </div>
          </div>
          <p className="mt-9 max-w-2xl leading-7 text-white/60">
            I enjoy combining thoughtful product design with scalable
            engineering to create applications that are both useful and
            intuitive. My interests span full-stack development, AI-powered
            applications, system design, and modern product engineering. I
            believe the best software is built by understanding both the
            people using it and the systems running behind it.
          </p>
          <div className="mt-9 flex flex-wrap gap-2">
            {[
              "AI-powered Applications",
              "Full-Stack Software",
              "Intelligent Automation",
              "Product Engineering",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/[.1] bg-white/[.04] px-3 py-1.5 font-mono text-[10px] text-white/60"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          <Reveal
            delay={0.06}
            className="glass-panel rounded-[26px] p-6 sm:col-span-2"
          >
            <p className="font-mono text-[10px] uppercase tracking-[.16em] text-white/42">
              Current focus
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {focusAreas.map((item, index) => (
                <div
                  key={item}
                  className="group flex items-center justify-between border-b border-white/[.08] pb-3 text-sm text-white/72 last:sm:col-span-2"
                >
                  <span>
                    <span className="mr-3 font-mono text-[10px] text-[#89d0ff]">
                      0{index + 1}
                    </span>
                    {item}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/20 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#89d0ff]" />
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.11} className="glass-panel rounded-[26px] p-6">
            <Target className="h-5 w-5 text-[#89d0ff]" />
            <p className="mt-7 font-[family-name:var(--font-geist)] text-xl tracking-[-.045em]">
              Build with Purpose
            </p>
            <p className="mt-2 text-sm leading-6 text-white/52">
              Every project should solve a real problem, not just demonstrate
              technology.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="glass-panel rounded-[26px] p-6">
            <Layers3 className="h-5 w-5 text-[#89d0ff]" />
            <p className="mt-7 font-[family-name:var(--font-geist)] text-xl tracking-[-.045em]">
              Think in Systems
            </p>
            <p className="mt-2 text-sm leading-6 text-white/52">
              Great software comes from understanding how products, users, and
              engineering decisions work together.
            </p>
          </Reveal>
          <Reveal
            delay={0.19}
            className="glass-panel rounded-[26px] p-6 sm:col-span-2"
          >
            <Lightbulb className="h-5 w-5 text-[#89d0ff]" />
            <p className="mt-7 font-[family-name:var(--font-geist)] text-xl tracking-[-.045em]">
              Learn by Building
            </p>
            <p className="mt-2 text-sm leading-6 text-white/52">
              The fastest way to grow as an engineer is by turning ideas into
              working products and continuously improving them through
              iteration.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
