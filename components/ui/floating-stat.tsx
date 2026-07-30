export function FloatingStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/[.1] bg-white/[.055] px-4 py-3 text-left shadow-[inset_0_1px_rgba(255,255,255,.04)] backdrop-blur-md">
      <p className="font-[family-name:var(--font-geist)] text-2xl font-medium tracking-[-.06em] text-white">
        {value}
      </p>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-[.08em] text-zinc-400">
        {label}
      </p>
    </div>
  );
}
