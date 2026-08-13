"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BookOpen, X } from "lucide-react";
import { useModal } from "@/components/modal-context";
import type { Locale } from "@/i18n/routing";

export function BlogReaderModal({ authorName }: { authorName: string }) {
  const t = useTranslations("Blog");
  const locale = useLocale() as Locale;
  const { activeBlog, closeBlog } = useModal();

  if (!activeBlog) return null;
  const post = activeBlog;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/70 backdrop-blur-sm"
      onClick={closeBlog}
    >
      <div
        className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
            <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>{post.publishedAt}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <button
            type="button"
            onClick={closeBlog}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label={t("closeArticle")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            {post.title[locale]}
          </h1>

          <div className="flex flex-wrap gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-mono font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="prose dark:prose-invert max-w-none text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-4 whitespace-pre-line font-sans">
            {post.content[locale]}
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-block text-sm font-medium text-teal-600 dark:text-teal-400 hover:underline"
          >
            {t("viewFullPage")}
          </Link>
        </div>

        <div className="p-4 px-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-400">
            {t("writtenBy")} {authorName}
          </span>
          <button
            type="button"
            onClick={closeBlog}
            className="px-4 py-1.5 rounded-lg text-xs font-medium bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
          >
            {t("closeArticle")}
          </button>
        </div>
      </div>
    </div>
  );
}
