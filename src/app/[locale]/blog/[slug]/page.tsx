import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { BookOpen } from "lucide-react";
import { getBlogPosts, getBlogPostBySlug, getProfile } from "@/lib/data";
import { renderMarkdown } from "@/lib/markdown";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { Locale } from "@/i18n/routing";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  const lang = locale as Locale;
  return {
    title: `${post.title[lang]} · Portfolio`,
    description: post.summary[lang],
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, t, locale, profile] = await Promise.all([
    getBlogPostBySlug(slug),
    getTranslations("Blog"),
    getLocale(),
    getProfile(),
  ]);

  if (!post) notFound();
  const lang = locale as Locale;

  return (
    <>
      <Navbar resumeUrl={profile.resumeUrl} />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-6">
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
          <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>{post.publishedAt}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          {post.title[lang]}
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

        <div
          className="prose dark:prose-invert prose-zinc max-w-none text-sm sm:text-base prose-headings:font-bold prose-a:text-teal-600 dark:prose-a:text-teal-400"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content[lang]) }}
        />

        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <span className="text-xs font-mono text-zinc-400">
            {t("writtenBy")} {profile.name}
          </span>
        </div>
      </main>
      <Footer />
    </>
  );
}
