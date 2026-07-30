"use client";

import { ArrowUpRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useRef } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  external?: boolean;
  tone?: "primary" | "quiet" | "outline";
  icon?: boolean;
};

// Utility function to cleanly join Tailwind classes
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function MagneticButton({
  children,
  href,
  external,
  tone = "outline",
  icon = false,
  className = "",
  ...props
}: Props) {
  // Use separate strictly-typed refs to avoid type assertions
  const linkRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Helper to calculate and apply the magnetic transform
  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const target = href ? linkRef.current : buttonRef.current;
    
    if (!target) return;
    
    // Respect user preferences for reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Calculate distance from center of element to pointer
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.11;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.11;
    
    target.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  // Helper to reset the transform when mouse leaves
  const handleMouseLeave = () => {
    const target = href ? linkRef.current : buttonRef.current;
    if (target) {
      target.style.transform = "translate3d(0,0,0)";
    }
  };

  const baseClasses = cn(
    "magnetic-button",
    "group inline-flex items-center justify-center gap-2 rounded-full",
    "px-5 py-3 font-mono text-[11px] tracking-[-0.02em]",
    "transition-[background,border-color,color,box-shadow] duration-300",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#89d0ff]"
  );

  const toneClasses = cn(
    tone === "primary" && "border border-[#addcff] bg-[#a9d9ff] text-[#06101a] shadow-[0_0_30px_rgba(119,196,255,.22)] hover:bg-[#d2ebff]",
    tone === "quiet" && "border border-transparent bg-transparent text-white/70 hover:text-white",
    tone === "outline" && "border border-white/[.12] bg-white/[.045] text-white/85 hover:border-[#89d0ff]/60 hover:bg-[#77c4ff]/[.09]"
  );

  const finalClasses = cn(baseClasses, toneClasses, className);

  const content = (
    <>
      {children}
      {icon && (
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={linkRef}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={finalClasses}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      className={finalClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {content}
    </button>
  );
}
