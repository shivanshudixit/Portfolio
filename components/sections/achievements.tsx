import { SectionIntro } from "@/components/ui/section-intro";
import { PracticeCard } from "@/components/ui/practice-card";
import { Code2, Sparkles, Award, Github } from "lucide-react";

export function Achievements({
  github,
  leetcode,
}: {
  github?: string;
  leetcode?: string;
}) {
  return (
    <section
      id="achievements"
      className="relative scroll-mt-24 px-4 py-24 sm:px-6 lg:px-10 lg:py-36"
      aria-labelledby="achievements-title"
    >
      <SectionIntro
        eyebrow="06 / Practice"
        title="Curiosity, shipped as a habit."
      />
      <div className="mx-auto mt-12 grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <PracticeCard
          icon={<Code2 className="h-5 w-5" />}
          label="LeetCode"
          text="Ongoing algorithms and problem-solving practice."
          href={leetcode}
        />
        <PracticeCard
          icon={<Sparkles className="h-5 w-5" />}
          label="AI projects"
          text="Exploring practical LLM applications and human-centred automation."
        />
        <PracticeCard
          icon={<Award className="h-5 w-5" />}
          label="Hackathons"
          text="A space to learn fast, prototype boldly, and collaborate."
        />
        <PracticeCard
          icon={<Github className="h-5 w-5" />}
          label="Open source"
          text="Building in the open where it makes the work stronger."
          href={github}
        />
      </div>
    </section>
  );
}
