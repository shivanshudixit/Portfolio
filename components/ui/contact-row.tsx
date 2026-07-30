import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function ContactRow({
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
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {content}
    </a>
  ) : (
    <div className="flex items-center gap-3 rounded-xl p-2">{content}</div>
  );
}
