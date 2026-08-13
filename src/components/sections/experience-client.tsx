"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import type { WorkExperience } from "@/lib/types";
import type { Locale } from "@/i18n/routing";

export function ExperienceClient({ experiences }: { experiences: WorkExperience[] }) {
  const t = useTranslations("Experience");
  const locale = useLocale() as Locale;
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
      <div className="grid md:grid-cols-[minmax(0,320px)_1fr] gap-12">
        <div className="md:sticky md:top-24 md:self-start">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-medium mb-4">
            {t("tag")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            {t("headingPrefix")}{" "}
            <span className="text-teal-600 dark:text-teal-400">
              {t("headingHighlight")}
            </span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 mb-6">{t("description")}</p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900">
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                {t("metricExperienceValue")}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {t("metricExperienceLabel")}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900">
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                {t("metricThroughputValue")}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {t("metricThroughputLabel")}
              </p>
            </div>
          </div>

          <ul className="space-y-2 mb-6 text-sm text-zinc-600 dark:text-zinc-300">
            {[t("bullet1"), t("bullet2"), t("bullet3")].map((bullet) => (
              <li key={bullet} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="inline-block px-5 py-2.5 rounded-full text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
          >
            {t("ctaContact")}
          </a>
        </div>

        <div ref={timelineRef} className="relative pl-8">
          <div className="absolute left-2.5 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
          <motion.div
            className="absolute left-2.5 top-0 w-px bg-gradient-to-b from-teal-500 to-teal-500/20 origin-top"
            style={{ scaleY, height: "100%" }}
          />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="relative"
              >
                <span
                  className={`absolute -left-7.5 flex h-4 w-4 items-center justify-center rounded-full ${
                    exp.isCurrent ? "bg-teal-500" : "bg-zinc-300 dark:bg-zinc-700"
                  }`}
                >
                  {exp.isCurrent && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-60" />
                  )}
                </span>

                <div className="p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                      {exp.period}
                    </span>
                    {exp.isCurrent && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-600 dark:text-teal-400">
                        {t("currentBadge")}
                      </span>
                    )}
                    {exp.location && (
                      <span className="text-xs text-zinc-400">{exp.location}</span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {exp.role[locale]}
                  </h3>
                  <p className="text-teal-600 dark:text-teal-400 font-medium mb-4">
                    {exp.company}
                  </p>

                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400 mb-2">
                    {t("keyAchievements")}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {exp.description[locale].map((line) => (
                      <li
                        key={line}
                        className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        {line}
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400 mb-2">
                    {t("techStackLabel")}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.highlights.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
