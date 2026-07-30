"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import Lenis from "lenis";
import {
  ArrowDownRight,
  ArrowUpRight,
  AtSign,
  Award,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Command,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Layers3,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Sparkles,
  Target,
  TerminalSquare,
  X,
} from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";
import { ProjectModal } from "@/components/project-modal";
import { Reveal } from "@/components/reveal";
import {
  projects,
  skillGroups,
  focusAreas,
  experiences,
  type Project,
} from "@/data/portfolio";

const NodeNetwork = dynamic(
  () =>
    import("@/components/node-network").then((module) => module.NodeNetwork),
  { ssr: false, loading: () => <div className="h-full w-full" /> },
);

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Projects", "projects"],
  ["Skills", "skills"],
  ["Experience", "experience"],
  ["Education", "education"],
  ["Contact", "contact"],
] as const;

const rotatingRoles = [
  "Full Stack Developer",
  "Building AI Products",
  "Software Engineer",
];
const konami = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function Portfolio() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [constellation, setConstellation] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const heroBeams = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const github = process.env.NEXT_PUBLIC_GITHUB_URL;
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL;
  const email = process.env.NEXT_PUBLIC_EMAIL;
  const phone = process.env.NEXT_PUBLIC_PHONE;
  const location = process.env.NEXT_PUBLIC_LOCATION;
  const resume = process.env.NEXT_PUBLIC_RESUME_URL;
  const leetcode = process.env.NEXT_PUBLIC_LEETCODE_URL;
  const [cgpa, setCgpa] = useState("7.32");
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.92,
    });
    lenisRef.current = lenis;
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (activeProject || menuOpen || terminalOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [activeProject, menuOpen, terminalOpen]);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const previous = Number(document.body.dataset.scrollY || 0);
      setNavVisible(current < 72 || current < previous);
      document.body.dataset.scrollY = String(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    if (!media.matches) return;
    const move = (event: MouseEvent) =>
      setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    if (cursorRef.current)
      cursorRef.current.style.transform = `translate3d(${cursor.x - 6}px, ${cursor.y - 6}px, 0)`;
    if (glowRef.current)
      glowRef.current.style.transform = `translate3d(${cursor.x - 180}px, ${cursor.y - 180}px, 0)`;
  }, [cursor]);

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
      3100,
    );
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const sequence: string[] = [];
    const onKey = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === "t" &&
        !(
          event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement
        )
      )
        setTerminalOpen((open) => !open);
      sequence.push(
        event.key.length === 1 ? event.key.toLowerCase() : event.key,
      );
      if (sequence.length > konami.length) sequence.shift();
      if (sequence.join("|") === konami.join("|")) {
        setConstellation(true);
        window.setTimeout(() => setConstellation(false), 5200);
      }
      if (event.key === "Escape") {
        setActiveProject(null);
        setMenuOpen(false);
        setTerminalOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeProject || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject, menuOpen]);

  const socials = useMemo(
    () =>
      [
        github && { label: "GitHub", href: github, icon: Github },
        linkedin && { label: "LinkedIn", href: linkedin, icon: Linkedin },
        email && { label: "Email", href: `mailto:${email}`, icon: Mail },
      ].filter(Boolean) as {
        label: string;
        href: string;
        icon: typeof Github;
      }[],
    [github, linkedin, email],
  );

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    setMenuOpen(false);
  };

  return (
    <main
      id="home"
      className="relative overflow-clip bg-[#050505] text-white selection:bg-[#77c4ff]/35 selection:text-white"
    >
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-[70] hidden h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(119,196,255,.13),transparent_64%)] blur-2xl md:block"
        aria-hidden="true"
      />
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[71] hidden h-3 w-3 rounded-full border border-[#b8e2ff] bg-[#77c4ff]/25 shadow-[0_0_22px_4px_rgba(119,196,255,.45)] md:block"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 z-0 opacity-[.24] [background-image:linear-gradient(rgba(255,255,255,.034)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.034)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,#000,transparent_84%)]"
        aria-hidden="true"
      />

      <motion.header
        className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[min(1180px,calc(100%-1.5rem))] items-center justify-between rounded-full border border-white/[.1] bg-[#09090b]/70 px-3 py-2 shadow-[0_10px_36px_rgba(0,0,0,.24)] backdrop-blur-2xl md:px-4"
        animate={{ y: navVisible ? 0 : -100, opacity: navVisible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <button
          onClick={() => scrollTo("home")}
          className="group flex items-center gap-2 rounded-full px-2 py-1 font-[family-name:var(--font-geist)] text-sm font-medium tracking-[-.04em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#89d0ff]"
          aria-label="Back to home"
        >
          <span className="relative grid h-6 w-6 place-items-center rounded-full border border-[#89d0ff]/55 bg-[#77c4ff]/10">
            <span className="h-1.5 w-1.5 rounded-full bg-[#bce4ff] shadow-[0_0_15px_#89d0ff]" />
          </span>
          <span>
            SD<span className="text-[#89d0ff]">.</span>
          </span>
        </button>
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Primary navigation"
        >
          {navItems.slice(1, 6).map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="rounded-full px-3 py-2 font-mono text-[10px] text-white/48 transition hover:bg-white/[.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#89d0ff]"
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setTerminalOpen((open) => !open)}
            className="hidden h-8 w-8 place-items-center rounded-full text-white/45 transition hover:bg-white/[.06] hover:text-[#9fd9ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#89d0ff] sm:grid"
            aria-label="Open terminal mode"
          >
            <TerminalSquare className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-8 w-8 place-items-center rounded-full text-white/65 transition hover:bg-white/[.06] lg:hidden"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
          <MagneticButton
            href={resume || "#contact"}
            tone="primary"
            className="hidden !px-4 !py-2.5 sm:inline-flex"
            icon
          >
            {resume ? "Resume" : "Connect"}
          </MagneticButton>
        </div>
      </motion.header>
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050505]/95 px-6 pb-8 pt-28 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto max-w-xl border-t border-white/[.08] pt-4">
            {navItems.map(([label, id], index) => (
              <motion.button
                key={id}
                onClick={() => scrollTo(id)}
                className="flex w-full items-center justify-between border-b border-white/[.08] py-5 text-left font-[family-name:var(--font-geist)] text-4xl tracking-[-.06em] text-white/85"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <span>{label}</span>
                <ArrowUpRight className="h-5 w-5 text-[#89d0ff]" />
              </motion.button>
            ))}
          </nav>
        </div>
      )}

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
              Portfolio / 2026
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
                  src="/shivanshu-dixit.jpg"
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

      <section
        id="achievements"
        className="relative scroll-mt-24 px-4 py-24 sm:px-6 lg:px-10 lg:py-36"
        aria-labelledby="achievements-title"
      >
        <SectionIntro
          eyebrow="06 / Practice"
          title="Curiosity, shipped as a habit."
        />
        <div className="mx-auto mt-12 grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <PracticeCard
            icon={<Code2 className="h-5 w-5" />}
            label="LeetCode"
            text="Ongoing algorithms and problem-solving practice."
            href={leetcode}
          />
          <PracticeCard
            icon={<Sparkles className="h-5 w-5" />}
            label="AI projects"
            text="Exploring practical LLM applications and human-centred automation."
          />
          <PracticeCard
            icon={<Award className="h-5 w-5" />}
            label="Hackathons"
            text="A space to learn fast, prototype boldly, and collaborate."
          />
          <PracticeCard
            icon={<Github className="h-5 w-5" />}
            label="Open source"
            text="Building in the open where it makes the work stronger."
            href={github}
          />
        </div>
      </section>

      <section
        id="contact"
        className="relative scroll-mt-24 px-4 pb-24 pt-24 sm:px-6 lg:px-10 lg:pb-36 lg:pt-36"
        aria-labelledby="contact-title"
      >
        <Reveal className="contact-panel mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-[#89d0ff]/[.16] p-6 sm:p-10 lg:p-14">
          <div className="relative z-10 grid gap-12 lg:grid-cols-[1.16fr_.84fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#9bd8ff]">
                07 / Contact
              </p>
              <h2
                id="contact-title"
                className="mt-5 max-w-2xl font-[family-name:var(--font-geist)] text-5xl leading-[.88] tracking-[-.08em] sm:text-7xl"
              >
                Let’s make something people want to keep using.
              </h2>
              <p className="mt-7 max-w-xl text-base leading-7 text-white/62">
                For an AI product, a thoughtful web experience, or a technical
                conversation—this is a good place to begin.
              </p>
              <div className="mt-9 flex flex-wrap gap-2">
                {socials.length ? (
                  socials.map(({ label, href, icon: Icon }) => (
                    <MagneticButton
                      key={label}
                      href={href}
                      external={href.startsWith("http")}
                      icon
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {label}
                    </MagneticButton>
                  ))
                ) : (
                  <p className="rounded-full border border-white/[.1] bg-white/[.04] px-4 py-3 font-mono text-[10px] text-white/48">
                    Contact details can be enabled securely with environment
                    variables.
                  </p>
                )}
              </div>
            </div>
            <div className="rounded-[24px] border border-white/[.1] bg-black/20 p-5 sm:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[.16em] text-white/42">
                Direct channels
              </p>
              <div className="mt-7 space-y-4">
                <ContactRow
                  icon={<AtSign className="h-4 w-4" />}
                  label="Email"
                  value={email || "Available on request"}
                  href={email ? `mailto:${email}` : undefined}
                />
                <ContactRow
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone"
                  value={phone || "Available on request"}
                  href={phone ? `tel:${phone.replace(/\s/g, "")}` : undefined}
                />
                <ContactRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Location"
                  value={location || "Available on request"}
                />
                <ContactRow
                  icon={<MessageCircle className="h-4 w-4" />}
                  label="Resume"
                  value={resume ? "Download PDF" : "Available on request"}
                  href={resume}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="relative border-t border-white/[.08] px-4 pt-16 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 pb-12 font-mono text-[10px] text-white/38">
          <span>© {new Date().getFullYear()} Shivanshu Dixit</span>
          <div className="flex items-center gap-4">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="transition hover:text-[#a7dcff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#89d0ff]"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="transition hover:text-[#a7dcff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#89d0ff]"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {leetcode && (
              <a
                href={leetcode}
                target="_blank"
                rel="noreferrer"
                aria-label="LeetCode"
                className="transition hover:text-[#a7dcff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#89d0ff]"
              >
                <Code2 className="h-4 w-4" />
              </a>
            )}
            <span className="h-3 w-px bg-white/[.12]" />
            <button
              onClick={() => setTerminalOpen(true)}
              className="transition hover:text-[#a7dcff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#89d0ff]"
            >
              Press T for terminal
            </button>
            <button
              onClick={() => scrollTo("home")}
              className="transition hover:text-[#a7dcff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#89d0ff]"
            >
              Back to top ↑
            </button>
          </div>
        </div>
        <div className="footer-name pointer-events-none select-none overflow-hidden text-center font-[family-name:var(--font-geist)] text-[clamp(3.8rem,14vw,13rem)] font-medium leading-[1] tracking-[-.02rem] pb-6 text-transparent [background:linear-gradient(105deg,#d8efff_5%,#77c4ff_35%,#fff_49%,#72baf2_68%,#caeaff_90%)] [background-size:220%_100%] bg-clip-text">
          SHIVANSHU
        </div>
      </footer>

      {terminalOpen && (
        <Terminal
          onClose={() => setTerminalOpen(false)}
          onNavigate={scrollTo}
        />
      )}
      {constellation && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[80] grid place-items-center bg-[#050505]/68 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="rounded-3xl border border-[#89d0ff]/30 bg-[#09121c]/85 px-8 py-7 text-center shadow-[0_0_80px_rgba(119,196,255,.18)]">
            <Command className="mx-auto h-6 w-6 text-[#9edbff]" />
            <p className="mt-4 font-[family-name:var(--font-geist)] text-2xl tracking-[-.05em]">
              Constellation unlocked.
            </p>
            <p className="mt-2 font-mono text-[10px] text-white/46">
              The network noticed.
            </p>
          </div>
        </motion.div>
      )}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </main>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  const normalizedTitle = title.toLowerCase();
  let titleId = "about-title";

  if (normalizedTitle.includes("products")) {
    titleId = "projects-title";
  } else if (normalizedTitle.includes("practical stack")) {
    titleId = "skills-title";
  } else if (normalizedTitle.includes("human judgment")) {
    titleId = "experience-title";
  } else if (normalizedTitle.includes("learning")) {
    titleId = "education-title";
  } else if (normalizedTitle.includes("curiosity")) {
    titleId = "achievements-title";
  }
  return (
    <Reveal className="mx-auto max-w-7xl">
      <p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#89d0ff]">
        {eyebrow}
      </p>
      <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <h2
          id={titleId}
          className="max-w-3xl font-[family-name:var(--font-geist)] text-4xl leading-[.94] tracking-[-.07em] text-white sm:text-6xl"
        >
          {title}
        </h2>
        {description && (
          <p className="max-w-sm text-sm leading-6 text-white/52">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}

function FloatingStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/[.1] bg-white/[.055] px-4 py-3 text-left shadow-[inset_0_1px_rgba(255,255,255,.04)] backdrop-blur-md">
      <p className="font-[family-name:var(--font-geist)] text-2xl font-medium tracking-[-.06em] text-white">
        {value}
      </p>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-[.08em] text-white/46">
        {label}
      </p>
    </div>
  );
}

function ProjectCard({
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

function PracticeCard({
  icon,
  label,
  text,
  href,
}: {
  icon: ReactNode;
  label: string;
  text: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="text-[#89d0ff]">{icon}</div>
      <p className="mt-9 font-[family-name:var(--font-geist)] text-2xl tracking-[-.055em]">
        {label}
      </p>
      <p className="mt-3 text-sm leading-6 text-white/54">{text}</p>
      {href && (
        <span className="mt-7 inline-flex items-center gap-1.5 font-mono text-[10px] text-[#9fd9ff]">
          Visit profile <ExternalLink className="h-3 w-3" />
        </span>
      )}
    </>
  );
  const classes =
    "glass-panel card-tilt block min-h-56 rounded-[24px] p-6 transition hover:border-[#89d0ff]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#89d0ff]";
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={classes}>
      {content}
    </a>
  ) : (
    <article className={classes}>{content}</article>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/[.08] bg-white/[.035] text-[#9bd8ff]">
        {icon}
      </span>
      <span>
        <span className="block font-mono text-[9px] uppercase tracking-[.13em] text-white/36">
          {label}
        </span>
        <span className="mt-1 block text-sm text-white/72">{value}</span>
      </span>
      {href && <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-white/34" />}
    </>
  );
  return href ? (
    <a
      href={href}
      className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-white/[.04]"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      {content}
    </a>
  ) : (
    <div className="flex items-center gap-3 rounded-xl p-2">{content}</div>
  );
}

function Terminal({
  onClose,
  onNavigate,
}: {
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState(
    "Type help to see the available commands.",
  );
  const run = (event: FormEvent) => {
    event.preventDefault();
    const normalized = command.trim().toLowerCase();

    if (normalized === "help") {
      setOutput("about · projects · skills · contact · clear · exit");
    } else if (["about", "projects", "skills", "contact"].includes(normalized)) {
      onNavigate(normalized);
      onClose();
    } else if (normalized === "clear") {
      setOutput("");
    } else if (normalized === "exit") {
      onClose();
    } else if (normalized) {
      setOutput(`command not found: ${normalized}`);
    }
    
    setCommand("");
  };
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={onClose}
    >
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-label="Developer console"
        onMouseDown={(event) => event.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[#89d0ff]/25 bg-[#070b0f] shadow-[0_0_80px_rgba(119,196,255,.16)]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
      >
        <header className="flex items-center justify-between border-b border-white/[.08] px-4 py-3">
          <div className="flex items-center gap-2 font-mono text-[10px] text-[#a6dcff]">
            <span className="h-2 w-2 rounded-full bg-[#89d0ff] shadow-[0_0_10px_#89d0ff]" />
            portfolio.console
          </div>
          <button
            onClick={onClose}
            className="font-mono text-[10px] text-white/45 hover:text-white"
          >
            esc / close
          </button>
        </header>
        <div className="min-h-44 p-5 font-mono text-xs leading-6">
          <p className="text-[#9bd8ff]">
            shivanshu@portfolio:~${" "}
            <span className="text-white/75">{output}</span>
          </p>
          <form onSubmit={run} className="mt-3 flex items-center gap-2">
            <span className="text-[#89d0ff]">›</span>
            <input
              autoFocus
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              className="w-full bg-transparent text-white/80 outline-none placeholder:text-white/20"
              placeholder="help"
              aria-label="Terminal command"
            />
          </form>
        </div>
      </motion.section>
    </div>
  );
}
