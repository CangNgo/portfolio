"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Calendar,
  UserCheck,
} from "lucide-react";
import { useModal } from "@/components/modal-context";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import type { Locale } from "@/i18n/routing";

export function CaseStudyModal() {
  const t = useTranslations("CaseStudyModal");
  const locale = useLocale() as Locale;
  const { activeProject, closeProject } = useModal();

  if (!activeProject) return null;
  const project = activeProject;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/70 backdrop-blur-sm"
      onClick={closeProject}
    >
      <div
        className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-mono font-semibold border border-teal-500/20">
              {project.category}
            </span>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {project.period[locale]}
            </span>
          </div>

          <button
            type="button"
            onClick={closeProject}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label={t("close")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              {project.title[locale]}
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {project.tagline[locale]}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-300">
              <UserCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>
                {t("roleLabel")} {project.role[locale]}
              </span>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 aspect-video relative">
            <Image
              src={project.thumbnailUrl}
              alt={project.title[locale]}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
          </div>

          <section className="space-y-3">
            <h3 className="text-base font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              {t("problemHeading")}
            </h3>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {project.problem[locale]}
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              {t("archHeading")}
            </h3>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {project.architectureSolution[locale]}
            </p>

            {project.systemArchitecture && (
              <ArchitectureDiagram architecture={project.systemArchitecture} />
            )}
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 uppercase tracking-wide">
              <Layers className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              {t("techHeading")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-base font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {t("resultsHeading")}
            </h3>

            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
              <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-2">
                {t("metricsLabel")}
              </span>
              <ul className="space-y-2">
                {project.resultsAndTradeoffs.metrics[locale].map((metric, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.resultsAndTradeoffs.tradeoffs.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                <span className="text-xs font-mono font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  {t("tradeoffsLabel")}
                </span>
                <ul className="space-y-2">
                  {project.resultsAndTradeoffs.tradeoffs.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed pl-2 border-l-2 border-amber-500/40"
                    >
                      {item[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>

        <div className="p-4 sm:px-8 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t("liveDemo")}</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>{t("githubRepo")}</span>
              </a>
            )}

            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-teal-600 dark:text-teal-400 hover:underline"
            >
              {t("viewFullPage")}
            </Link>
          </div>

          <button
            type="button"
            onClick={closeProject}
            className="px-4 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
}
