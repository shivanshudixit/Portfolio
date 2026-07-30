import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { ArrowDownRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { MagneticButton } from "@/components/magnetic-button";
import { FloatingStat } from "@/components/ui/floating-stat";

const NodeNetwork = dynamic(
  () => import("@/components/node-network").then((module) => module.NodeNetwork),
  { ssr: false, loading: () => <div className="w-full h-full min-h-[300px]" /> }
);

const rotatingRoles = [
  "Full Stack Developer",
  "Building AI Products",
  "Software Engineer",
];

export function Hero({
  scrollTo,
  resume,
}: {
  scrollTo: (id: string) => void;
  resume?: string;
}) {
  const [roleIndex, setRoleIndex] = useState(0);
  const heroBeams = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !heroBeams.current) return;
    const context = gsap.context(() => {
      gsap.to(".hero-beam", {
        xPercent: 10,
        yPercent: -4,
        rotation: "+=3",
        duration: 11,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.7,
      });
    }, heroBeams);
    return () => context.revert();
  }, [reduceMotion]);

  useEffect(() => {
    const timer = window.setInterval(
      () => setRoleIndex((current) => (current + 1) % rotatingRoles.length),
      3100
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      className="relative isolate flex min-h-[100svh] items-center px-4 pb-16 pt-28 sm:px-6 lg:px-10"
      aria-labelledby="hero-title"
    >
      <div
        ref={heroBeams}
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="hero-beam absolute -left-[20%] top-[12%] h-[18rem] w-[70%] rotate-[-18deg] bg-[linear-gradient(90deg,transparent,rgba(119,196,255,.11),transparent)] blur-3xl" />
        <div className="hero-beam absolute -right-[20%] top-[32%] h-[22rem] w-[60%] rotate-[24deg] bg-[linear-gradient(90deg,transparent,rgba(110,153,255,.095),transparent)] blur-3xl" />
      </div>
      <div className="absolute inset-0 -z-20 opacity-85" aria-hidden="true">
        <NodeNetwork />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[linear-gradient(to_bottom,transparent,#050505_88%)]"
        aria-hidden="true"
      />
      <div className="mx-auto w-full max-w-[1500px]">
        <Reveal className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#89d0ff]/60" />
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#a6dcff]">
            Portfolio / {new Date().getFullYear()}
          </p>
          <span className="h-px w-8 bg-[#89d0ff]/60" />
        </Reveal>
        <h1
          id="hero-title"
          className="hero-name relative mx-auto max-w-[1460px] text-center font-[family-name:var(--font-geist)] text-[clamp(4.6rem,16.2vw,14rem)] font-medium leading-[.72] tracking-[-.05em] text-transparent [background:linear-gradient(110deg,#edf8ff_8%,#8bcfff_36%,#ffffff_49%,#72bdf4_62%,#d8f0ff_84%)] [background-size:220%_100%] bg-clip-text [filter:drop-shadow(0_0_26px_rgba(119,196,255,.18))]"
        >
          Shivanshu
          <br />
          <span className="pl-[.05em]">Dixit</span>
        </h1>
        <Reveal delay={0.16} className="mx-auto mt-12 max-w-xl text-center">
          <p className="text-lg tracking-[-.03em] text-white/70 sm:text-xl">
            <span className="inline-block min-w-[10.5rem] text-[#b8e2ff]">
              {rotatingRoles[roleIndex]}
            </span>
            <span className="mx-2 text-white/25">/</span>Building thoughtful
            software, AI-powered products, and scalable web experiences.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <MagneticButton
              tone="primary"
              onClick={() => scrollTo("projects")}
              icon
            >
              Explore projects
            </MagneticButton>
            <MagneticButton href={resume || "#contact"} icon>
              {resume ? "Download resume" : "Request resume"}
            </MagneticButton>
            <MagneticButton
              tone="quiet"
              onClick={() => scrollTo("contact")}
              icon
            >
              Contact
            </MagneticButton>
          </div>
        </Reveal>
        <Reveal
          delay={0.25}
          className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-4"
        >
          <FloatingStat value="03+" label="Featured Projects" />
          <FloatingStat value="100+" label="DSA Problems Solved" />
          <FloatingStat value="06" label="Semesters Completed" />
          <FloatingStat value="AI" label="Product Development" />
        </Reveal>
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => scrollTo("about")}
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.14em] text-white/40 transition hover:text-[#a8dcff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#89d0ff]"
          >
            <span>Scroll to explore</span>
            <ArrowDownRight className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
