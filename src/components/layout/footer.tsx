import { Github, Linkedin, Mail, Code2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getProfile } from "@/lib/data";
import { ScrollTopButton } from "./scroll-top-button";

export async function Footer() {
  const [t, profile] = await Promise.all([getTranslations("Footer"), getProfile()]);

  return (
    <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 font-mono font-bold text-xs">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <div className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">
              {profile.name} — {profile.role}
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">
              {t("tagline")}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1" />

          <ScrollTopButton label={t("backToTop")} />
        </div>
      </div>
    </footer>
  );
}
