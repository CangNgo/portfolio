import type { Locale } from "@/i18n/routing";

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export interface Profile {
  name: string;
  role: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  x?: string;
  resumeUrl: string;
  status: LocalizedText;
  bio: LocalizedText;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel?: string;
  type: "client" | "gateway" | "service" | "database" | "cache" | "broker" | "external";
  description: LocalizedText;
}

export interface ArchitectureLink {
  from: string;
  to: string;
  label?: string;
  type?: "sync" | "async" | "cache";
}

export interface SystemArchitecture {
  summary: LocalizedText;
  nodes: ArchitectureNode[];
  links: ArchitectureLink[];
}

export interface Project {
  id: string;
  title: LocalizedText;
  tagline: LocalizedText;
  featured: boolean;
  category:
    | "Backend Heavy"
    | "Fullstack Web"
    | "Real-time Systems"
    | "Microservices"
    | "Mobile App";
  thumbnailUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  period: LocalizedText;
  role: LocalizedText;
  problem: LocalizedText;
  architectureSolution: LocalizedText;
  keyFeatures?: LocalizedList;
  systemArchitecture?: SystemArchitecture;
  techStack: string[];
  resultsAndTradeoffs: {
    metrics: LocalizedList;
    tradeoffs: LocalizedText[];
  };
}

export interface SkillItem {
  name: string;
  level: string;
  experienceYears: string;
  description: LocalizedText;
  highlight?: boolean;
}

export interface SkillCategory {
  title: LocalizedText;
  skills: SkillItem[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  content: LocalizedText;
  publishedAt: string;
  readTime: string;
  tags: string[];
  externalUrl?: string;
  featured?: boolean;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: LocalizedText;
  period: string;
  isCurrent?: boolean;
  location?: string;
  description: LocalizedList;
  highlights: string[];
}
