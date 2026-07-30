"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Lenis from "lenis";
import { Github, Linkedin, Mail, Command } from "lucide-react";
import { ProjectModal } from "@/components/project-modal";
import { type Project } from "@/data/portfolio";
import { Terminal } from "@/components/terminal";

import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ProjectsSection } from "@/components/sections/projects-section";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

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
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const github = process.env.NEXT_PUBLIC_GITHUB_URL;
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL;
  const email = process.env.NEXT_PUBLIC_EMAIL;
  const phone = process.env.NEXT_PUBLIC_PHONE;
  const location = process.env.NEXT_PUBLIC_LOCATION;
  const resume = process.env.NEXT_PUBLIC_RESUME_URL;
  const leetcode = process.env.NEXT_PUBLIC_LEETCODE_URL;
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

      <Header
        navVisible={navVisible}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setTerminalOpen={setTerminalOpen}
        scrollTo={scrollTo}
        resume={resume}
      />

      <Hero scrollTo={scrollTo} resume={resume} />
      <About />
      <ProjectsSection setActiveProject={setActiveProject} />
      <Skills />
      <Experience />
      <Education />
      <Achievements github={github} leetcode={leetcode} />
      <Contact
        socials={socials}
        email={email}
        phone={phone}
        location={location}
        resume={resume}
      />
      <Footer
        github={github}
        linkedin={linkedin}
        leetcode={leetcode}
        setTerminalOpen={setTerminalOpen}
        scrollTo={scrollTo}
      />

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
