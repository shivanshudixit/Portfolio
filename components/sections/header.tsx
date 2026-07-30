import { motion } from "motion/react";
import { TerminalSquare, Menu, X, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Projects", "projects"],
  ["Skills", "skills"],
  ["Experience", "experience"],
  ["Education", "education"],
  ["Contact", "contact"],
] as const;

export function Header({
  navVisible,
  menuOpen,
  setMenuOpen,
  setTerminalOpen,
  scrollTo,
  resume,
}: {
  navVisible: boolean;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTerminalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scrollTo: (id: string) => void;
  resume?: string;
}) {
  return (
    <>
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
              id={`nav-${id}`}
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
                id={`mobile-nav-${id}`}
                role="menuitem"
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
    </>
  );
}
