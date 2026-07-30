export type Project = {
  id: string;
  index: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  accent: "blue" | "violet" | "mint";
  technologies: string[];
  features: string[];
  architecture: string[];
  challenge: string;
  impact: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    id: "lost-found-network",
    index: "01",
    name: "Lost & Found Network",
    category: "AI-assisted SaaS",
    summary: "A trusted network for reconnecting people with lost belongings.",
    description:
      "A full-stack product that brings discovery, verification, messaging, and community reputation into one focused experience.",
    accent: "blue",
    technologies: ["Next.js", "TypeScript", "Prisma", "Supabase", "Leaflet Maps"],
    features: ["Secure authentication", "Admin dashboard", "Direct messaging", "Smart notifications", "Reputation system"],
    architecture: ["Next.js application", "Prisma data layer", "Supabase services", "Map discovery"],
    challenge: "Making discovery feel fast and trustworthy while balancing moderation, location context, and private conversations.",
    impact: "Designed to turn a fragmented, stressful problem into a clear path from report to reunion.",
    liveUrl: "https://lost-found-olive.vercel.app/",
  },
  {
    id: "cred-setu",
    index: "02",
    name: "CRED-setu",
    category: "Responsible ML",
    summary: "Alternative-data credit intelligence for underserved communities.",
    description:
      "An explainable credit-scoring platform that pairs pragmatic machine learning with clear reasoning for each prediction.",
    accent: "violet",
    technologies: ["FastAPI", "Scikit-learn", "LightGBM", "SHAP", "Python"],
    features: ["Alternative data modelling", "Feature engineering", "Explainability layer", "API-first scoring", "Model evaluation"],
    architecture: ["FastAPI service", "Feature pipeline", "LightGBM model", "SHAP explanations"],
    challenge: "Building for prediction quality without making the model a black box for people who need to understand its output.",
    impact: "Explores a more inclusive direction for financial access through transparent, data-informed decisions.",
  },
  {
    id: "ai-resume-builder",
    index: "03",
    name: "AI Resume Builder",
    category: "LLM product",
    summary: "AI-assisted resume creation with ATS-aware refinement.",
    description:
      "A thoughtful writing workflow that helps turn experience into tailored, structurally clear resume content.",
    accent: "mint",
    technologies: ["Next.js", "OpenAI APIs", "TypeScript", "Tailwind CSS", "Zod"],
    features: ["Guided content generation", "ATS optimisation", "Role-specific tailoring", "Structured sections", "Iterative editing"],
    architecture: ["Next.js interface", "Validated prompts", "AI generation", "Export-ready document data"],
    challenge: "Keeping generation useful and specific without flattening a person’s real voice into generic language.",
    impact: "Creates a calmer, more deliberate path from raw experience to job-ready presentation.",
    liveUrl: "https://jioresume.com/",
  },
];

export const skillGroups = [
  { label: "Languages", skills: ["C++", "JavaScript", "TypeScript", "SQL"] },
  { label: "Frontend", skills: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"] },
  { label: "Backend", skills: ["Node.js", "Express.js", "REST APIs"] },
  { label: "Databases", skills: ["MongoDB", "MySQL", "Supabase"] },
  { label: "AI", skills: ["AI Agents", "Prompt Engineering", "AI-assisted development"] },
  { label: "Developer Tools", skills: ["Git", "GitHub", "Vercel", "VS Code"] },
  { label: "Core", skills: ["DSA", "OOP", "DBMS", "OS", "Computer Networks"] },
];

export const focusAreas = [
  "Full-Stack Development",
  "AI-Powered Applications",
  "System Design",
  "Software Architecture",
  "Scalable Product Development",
];

export type Experience = {
  id: string;
  index: string;
  role: string;
  company?: string;
  duration: string;
  summary: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    id: "independent-full-stack",
    index: "01",
    role: "Independent Full-Stack Developer",
    duration: "2023 — Present",
    summary: "Designing and building modern web applications from concept to deployment while continuously improving software architecture, user experience, and application performance.",
    highlights: [
      "Designed and developed end-to-end full-stack applications.",
      "Focused on clean architecture, scalable code, and responsive user interfaces.",
      "Explored AI-assisted development workflows to accelerate product development while validating and refining generated code.",
      "Continuously improved projects through testing, optimization, and iterative development."
    ]
  },
  {
    id: "lost-found-network-lead",
    index: "02",
    role: "Lead Developer | Personal Project",
    company: "Lost & Found Network",
    duration: "2025 — Present",
    summary: "Building a full-stack platform that connects people with lost and found belongings through a secure, scalable, and user-friendly digital experience.",
    highlights: [
      "Designed the complete product architecture from planning to deployment.",
      "Implemented secure authentication, user onboarding, reporting workflows, and role-based dashboards.",
      "Built location-aware features, search functionality, real-time messaging, notifications, and claim management.",
      "Focused on performance optimization, database design, and scalable application architecture.",
      "Improved accessibility, responsive design, and overall user experience through continuous iteration."
    ]
  }
];
