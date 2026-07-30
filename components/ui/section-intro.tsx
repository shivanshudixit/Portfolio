import { Reveal } from "@/components/reveal";

export function SectionIntro({
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
  } else if (normalizedTitle.includes("human judgment") || normalizedTitle.includes("scalable systems")) {
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
