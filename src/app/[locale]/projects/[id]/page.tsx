import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import {
  ExternalLink,
  Github,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Calendar,
  UserCheck,
} from "lucide-react";
import { getProjects, getProjectBySlug, getProfile } from "@/lib/data";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { Locale } from "@/i18n/routing";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const project = await getProjectBySlug(id);
  if (!project) return {};
  const lang = locale as Locale;
  return {
    title: `${project.title[lang]} · Portfolio`,
    description: project.tagline[lang],
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, t, locale, profile] = await Promise.all([
    getProjectBySlug(id),
    getTranslations("CaseStudyModal"),
    getLocale(),
    getProfile(),
  ]);

  if (!project) notFound();
  const lang = locale as Locale;

  return (
    <>
      <Navbar resumeUrl={profile.resumeUrl} />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-8">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-mono font-semibold border border-teal-500/20">
            {project.category}
          </span>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {project.period}
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            {project.title[lang]}
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {project.tagline[lang]}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-300">
            <UserCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>
              {t("roleLabel")} {project.role[lang]}
            </span>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 aspect-video relative">
          <Image
            src={project.thumbnailUrl}
            alt={project.title[lang]}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            {t("problemHeading")}
          </h2>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {project.problem[lang]}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            {t("archHeading")}
          </h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {project.architectureSolution[lang]}
          </p>
          {project.systemArchitecture && (
            <ArchitectureDiagram architecture={project.systemArchitecture} />
          )}
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 uppercase tracking-wide">
            <Layers className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            {t("techHeading")}
          </h2>
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
          <h2 className="text-base font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {t("resultsHeading")}
          </h2>

          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
            <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-2">
              {t("metricsLabel")}
            </span>
            <ul className="space-y-2">
              {project.resultsAndTradeoffs.metrics.map((metric, idx) => (
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
                    {item[lang]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
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
        </div>
      </main>
      <Footer />
    </>
  );
}
