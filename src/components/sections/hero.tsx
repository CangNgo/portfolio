import { Github, Linkedin, Mail } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { getProfile } from "@/lib/data";
import type { Locale } from "@/i18n/routing";

export async function Hero() {
  const [t, profile, locale] = await Promise.all([
    getTranslations("Hero"),
    getProfile(),
    getLocale(),
  ]);
  const lang = locale as Locale;

  return (
    <section id="hero" className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-medium mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
        </span>
        {profile.status[lang]}
      </div>

      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3">
        {profile.name}
      </h1>
      <p className="text-xl sm:text-2xl font-medium text-teal-600 dark:text-teal-400 mb-2">
        {profile.role}
      </p>
      <p className="text-zinc-500 dark:text-zinc-400 mb-6">{t("subtitle")}</p>

      <p className="max-w-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8">
        {profile.bio[lang]}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {["Java", "JavaScript/TypeScript", "Java Spring Boot", "NestJS", "React/Nextjs", "Redis & RabbitMQ"].map((tag) => (
          <span
            key={tag}
            className="px-3 py-1.5 rounded-full text-sm font-medium bg-zinc-200/70 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-10">
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
        >
          {t("ctaResume")}
        </a>
        <a
          href="#contact"
          className="px-5 py-2.5 rounded-full text-sm font-medium border border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors"
        >
          {t("ctaContact")}
        </a>
      </div>

      <div className="flex items-center gap-4">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          title={t("githubTitle")}
          className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/70 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          title={t("linkedinTitle")}
          className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/70 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href={`mailto:${profile.email}`}
          title={t("emailTitle")}
          className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/70 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors"
        >
          <Mail className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
