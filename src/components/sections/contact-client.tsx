"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Github,
  Linkedin,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { Profile } from "@/lib/types";

export function ContactClient({ profile }: { profile: Profile }) {
  const t = useTranslations("Contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
      <div className="mb-12">
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

      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              {t("contactDetailsHeading")}
            </h3>

            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-teal-500/40 transition-colors text-xs text-zinc-700 dark:text-zinc-300"
            >
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 block uppercase">
                  {t("emailLabel")}
                </span>
                <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                  {profile.email}
                </span>
              </div>
            </a>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800/60 text-xs text-zinc-700 dark:text-zinc-300">
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 block uppercase">
                  {t("locationLabel")}
                </span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {profile.location}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800/60 text-xs text-zinc-700 dark:text-zinc-300">
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 block uppercase">
                  {t("phoneLabel")}
                </span>
                <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                  {t("phoneValue")}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider block mb-3">
              {t("socialHeading")}
            </span>
            <div className="flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-500" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {t("successHeading")}
                </h3>
                <p className="text-xs text-zinc-500 max-w-sm">{t("successMessage")}</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-lg text-xs font-mono text-teal-600 dark:text-teal-400 bg-teal-500/10 border border-teal-500/20 hover:bg-teal-500/20 transition-colors"
                >
                  {t("sendAnother")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      {t("formNameLabel")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ngo Tan Cang"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      {t("formEmailLabel")}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="your.email@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    {t("formSubjectLabel")}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder={t("formSubjectPlaceholder")}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    {t("formMessageLabel")}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={t("formMessagePlaceholder")}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {error && <p className="text-xs text-rose-500">{t("formError")}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium text-xs text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? t("formSubmitting") : t("formSubmit")}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
