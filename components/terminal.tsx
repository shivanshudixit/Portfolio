import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Command } from "lucide-react";

export function Terminal({
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
