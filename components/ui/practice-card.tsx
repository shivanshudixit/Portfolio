import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

export function PracticeCard({
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
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {content}
    </a>
  ) : (
    <article className={classes}>{content}</article>
  );
}
