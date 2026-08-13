import "server-only";
import { readFile } from "fs/promises";
import path from "path";
import { cache } from "react";
import type { Profile, Project, SkillCategory, BlogPost, WorkExperience } from "./types";

const DATA_DIR = path.join(process.cwd(), "src/data");

async function readJson<T>(fileName: string): Promise<T> {
  const filePath = path.join(DATA_DIR, fileName);
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export const getProfile = cache(() => readJson<Profile>("profile.json"));

export const getProjects = cache(() => readJson<Project[]>("projects.json"));

export async function getProjectBySlug(id: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.id === id);
}

export const getSkillCategories = cache(() => readJson<SkillCategory[]>("skills.json"));

export const getBlogPosts = cache(() => readJson<BlogPost[]>("blog.json"));

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export const getExperiences = cache(() => readJson<WorkExperience[]>("experience.json"));
