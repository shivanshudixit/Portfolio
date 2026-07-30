"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { ArrowUpRight, Check, Code2, GitBranch, X } from "lucide-react";
import type { Project } from "@/data/portfolio";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/75 p-3 backdrop-blur-md sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
          role="presentation"
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            data-lenis-prevent
            className="relative max-h-[92dvh] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-[28px] border border-white/[.12] bg-[#0a0a0c] p-5 shadow-[0_28px_100px_rgba(0,0,0,.7)] sm:p-8"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            {/* Header / Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/[.1] bg-black/20 text-white/70 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#89d0ff]"
              aria-label="Close project details"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Project Artwork */}
            <div
              className={`project-art project-art-${project.accent} mb-8 h-44 rounded-2xl border border-white/[.08] sm:h-60`}
              aria-hidden="true"
            >
              <div className="project-art-mark">{project.index}</div>
              <div className="project-art-orbit" />
            </div>

            {/* Title and Metadata */}
            <p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#89d0ff]">
              {project.category} / {project.index}
            </p>
            <h2
              id="project-dialog-title"
              className="mt-3 max-w-3xl font-[family-name:var(--font-geist)] text-4xl font-medium tracking-[-.06em] text-white sm:text-6xl"
            >
              {project.name}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/62">
              {project.description}
            </p>

            {/* Detailed Content Panels */}
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <InfoPanel
                icon={<GitBranch className="h-4 w-4" />}
                title="Architecture"
                entries={project.architecture}
              />
              <InfoPanel
                icon={<Check className="h-4 w-4" />}
                title="Key features"
                entries={project.features}
              />
              <article className="rounded-2xl border border-white/[.08] bg-white/[.025] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[.14em] text-white/40">
                  Challenge
                </p>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  {project.challenge}
                </p>
              </article>
              <article className="rounded-2xl border border-[#77c4ff]/[.18] bg-[#77c4ff]/[.045] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[.14em] text-[#9ad6ff]">
                  Intent & impact
                </p>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  {project.impact}
                </p>
              </article>
            </div>

            {/* Footer / Links */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-5 border-t border-white/[.08] pt-6">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/[.09] bg-white/[.035] px-3 py-1.5 font-mono text-[10px] text-white/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[.08] px-4 py-2.5 font-mono text-[10px] text-white/38">
                  <Code2 className="h-3.5 w-3.5" />
                  Private build
                </span>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#89d0ff]/40 bg-[#77c4ff]/[.07] px-4 py-2.5 font-mono text-[10px] text-[#a7dcff] transition hover:border-[#89d0ff]/70 hover:bg-[#77c4ff]/[.14]"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    View live
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/[.08] px-4 py-2.5 font-mono text-[10px] text-white/38">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    Demo on request
                  </span>
                )}
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InfoPanel({
  icon,
  title,
  entries,
}: {
  icon: ReactNode;
  title: string;
  entries: string[];
}) {
  return (
    <article className="rounded-2xl border border-white/[.08] bg-white/[.025] p-5">
      <div className="flex items-center gap-2 text-[#89d0ff]">
        {icon}
        <p className="font-mono text-[10px] uppercase tracking-[.14em]">
          {title}
        </p>
      </div>
      <ul className="mt-4 space-y-2.5">
        {entries.map((entry) => (
          <li key={entry} className="flex items-center gap-2 text-sm text-white/68">
            <span className="h-1 w-1 rounded-full bg-[#89d0ff]" />
            {entry}
          </li>
        ))}
      </ul>
    </article>
  );
}
