"use client";

import { ArrowUp } from "lucide-react";

export function ScrollTopButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800 transition-colors text-xs font-mono flex items-center gap-1"
      title={label}
    >
      <span>{label}</span>
      <ArrowUp className="w-3.5 h-3.5" />
    </button>
  );
}
