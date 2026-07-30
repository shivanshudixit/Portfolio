import { Github, Linkedin, Code2 } from "lucide-react";

export function Footer({
  github,
  linkedin,
  leetcode,
  setTerminalOpen,
  scrollTo,
}: {
  github?: string;
  linkedin?: string;
  leetcode?: string;
  setTerminalOpen: (open: boolean) => void;
  scrollTo: (id: string) => void;
}) {
  return (
    <footer className="relative border-t border-white/[.08] px-4 pt-16 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 pb-12 font-mono text-[10px] text-white/38">
        <span>© {new Date().getFullYear()} Shivanshu Dixit</span>
        <div className="flex items-center gap-4">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
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
              rel="noopener noreferrer"
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
              rel="noopener noreferrer"
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
  );
}
