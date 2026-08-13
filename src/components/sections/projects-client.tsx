"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import type { Project } from "@/lib/types";
import type { Locale } from "@/i18n/routing";
import { useModal } from "@/components/modal-context";

const CATEGORIES = [
  "All",
  "Backend Heavy",
  "Fullstack Web",
  "Real-time Systems",
  "Microservices",
] as const;

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const t = useTranslations("Projects");
  const locale = useLocale() as Locale;
  const { openProject } = useModal();
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>("All");

  const filtered =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
      <span className="inline-block px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-medium mb-4">
        {t("tag")}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
        {t("heading")}
      </h2>
      <p className="max-w-2xl text-zinc-600 dark:text-zinc-300 mb-8">
        {t("description")}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {filtered.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => openProject(project)}
            className="group text-left rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-teal-500/50 transition-colors"
          >
            <div className="relative h-44 w-full overflow-hidden">
              <Image
                src={project.thumbnailUrl}
                alt={project.title[locale]}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-zinc-900">
                {project.category}
              </span>
              {project.featured && (
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium bg-teal-500 text-white">
                  {t("featuredBadge")}
                </span>
              )}
              <ArrowUpRight className="absolute bottom-3 right-3 w-8 h-8 p-1.5 rounded-full bg-white/90 text-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-1.5">
                {project.title[locale]}
              </h3>
              <p className="line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                {project.tagline[locale]}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 5 && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    +{project.techStack.length - 5}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium text-teal-600 dark:text-teal-400">
                {t("readCaseStudy")} →
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
