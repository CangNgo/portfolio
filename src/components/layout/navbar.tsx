"use client";

import { useEffect, useState } from "react";
import { Code2, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";

const SECTION_IDS = [
  "hero",
  "experience",
  "projects",
  "skills",
  "blog",
  "contact",
] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar({ resumeUrl }: { resumeUrl: string }) {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navLinks = [
    { id: "experience", label: t("experience") },
    { id: "projects", label: t("projects") },
    { id: "skills", label: t("skills") },
    { id: "blog", label: t("blog") },
    { id: "contact", label: t("contact") },
  ];

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop - 120;
        const bottom = top + el.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bottom) {
          setActiveSection(id);
          break;
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white"
        >
          <Code2 className="w-5 h-5 text-teal-500" />
          Cang Ngo
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSection === link.id
                  ? "text-teal-600 dark:text-teal-400"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center ml-2 px-4 py-2 rounded-full text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
          >
            {t("viewResume")}
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-full text-zinc-500 hover:bg-zinc-200/70 dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => {
                scrollTo(link.id);
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeSection === link.id
                  ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10"
                  : "text-zinc-600 dark:text-zinc-300"
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-center px-4 py-2.5 rounded-lg text-sm font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
          >
            {t("viewResumeFull")}
          </a>
        </div>
      )}
    </header>
  );
}
