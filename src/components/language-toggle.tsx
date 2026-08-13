"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function LanguageToggle() {
  const t = useTranslations("Nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  function toggle() {
    const next: Locale = locale === "vi" ? "en" : "vi";
    router.replace(pathname, { locale: next });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title={t("langToggleTitle")}
      aria-label={t("langToggleTitle")}
      className="flex items-center gap-1.5 px-2.5 py-2 rounded-full text-sm font-medium text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/70 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors"
    >
      <Globe className="w-4 h-4" />
      <span className="uppercase">{locale}</span>
    </button>
  );
}
