"use client";

import { useState } from "react";
import { Server, Layout, Database, Wrench, Search, Sparkles, Check } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import type { SkillCategory } from "@/lib/types";
import type { Locale } from "@/i18n/routing";

function getCategoryIcon(categoryTitleEn: string) {
  switch (categoryTitleEn) {
    case "Backend Development":
      return <Server className="w-4 h-4 text-emerald-500" />;
    case "Frontend Development":
      return <Layout className="w-4 h-4 text-blue-500" />;
    case "Databases & Storage":
      return <Database className="w-4 h-4 text-cyan-500" />;
    case "DevOps & Architecture":
      return <Wrench className="w-4 h-4 text-purple-500" />;
    default:
      return <Server className="w-4 h-4 text-teal-500" />;
  }
}

export function SkillsClient({ categories }: { categories: SkillCategory[] }) {
  const t = useTranslations("Skills");
  const locale = useLocale() as Locale;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string | null>("Java (Spring Boot)");

  return (
    <section id="skills" className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("tag")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t("heading")}
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 max-w-xl">
            {t("description")}
          </p>
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category, catIdx) => {
          const filteredSkills = category.skills.filter(
            (s) =>
              s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.description[locale].toLowerCase().includes(searchQuery.toLowerCase()),
          );

          if (filteredSkills.length === 0 && searchQuery) return null;

          return (
            <div
              key={catIdx}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
                <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  {getCategoryIcon(category.title.en)}
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {category.title[locale]}
                </h3>
              </div>

              <div className="space-y-3">
                {filteredSkills.map((skill) => {
                  const isSelected = selectedSkill === skill.name;
                  return (
                    <div
                      key={skill.name}
                      onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-teal-500/10 dark:bg-teal-500/15 border-teal-500/40 shadow-xs"
                          : "bg-zinc-50/80 dark:bg-zinc-950/60 border-zinc-200/60 dark:border-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            {skill.name}
                          </span>
                          {skill.highlight && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-500/20 text-teal-600 dark:text-teal-400">
                              {t("coreBadge")}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                            {skill.experienceYears}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-[10px] font-mono text-zinc-700 dark:text-zinc-300">
                            {skill.level}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1">
                        {skill.description[locale]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 flex items-start gap-3">
        <Check className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {t("philosophy")}
        </p>
      </div>
    </section>
  );
}
