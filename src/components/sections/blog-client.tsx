"use client";

import { Calendar, Clock, ArrowUpRight, Sparkles } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import type { BlogPost } from "@/lib/types";
import type { Locale } from "@/i18n/routing";
import { useModal } from "@/components/modal-context";

export function BlogClient({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations("Blog");
  const locale = useLocale() as Locale;
  const { openBlog } = useModal();

  return (
    <section id="blog" className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
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
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.id}
            onClick={() => openBlog(post)}
            className="group cursor-pointer p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-teal-500/50 dark:hover:border-teal-500/50 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.publishedAt}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
                {post.featured && (
                  <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 text-[10px] font-bold uppercase">
                    {t("featuredBadge")}
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {post.title[locale]}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {post.summary[locale]}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[11px] font-mono text-zinc-700 dark:text-zinc-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-teal-600 dark:text-teal-400 font-medium group-hover:translate-x-1 transition-transform">
              <span>{t("readArticle")}</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
