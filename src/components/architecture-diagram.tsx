"use client";

import { useState } from "react";
import { Monitor, Waypoints, Server, Database, Zap, Radio, Globe2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import type { ArchitectureNode, SystemArchitecture } from "@/lib/types";
import type { Locale } from "@/i18n/routing";

const NODE_ICONS: Record<ArchitectureNode["type"], typeof Monitor> = {
  client: Monitor,
  gateway: Waypoints,
  service: Server,
  cache: Zap,
  broker: Radio,
  database: Database,
  external: Globe2,
};

const NODE_COLORS: Record<ArchitectureNode["type"], string> = {
  client: "text-blue-500 bg-blue-500/10",
  gateway: "text-teal-500 bg-teal-500/10",
  service: "text-violet-500 bg-violet-500/10",
  cache: "text-amber-500 bg-amber-500/10",
  broker: "text-pink-500 bg-pink-500/10",
  database: "text-emerald-500 bg-emerald-500/10",
  external: "text-zinc-500 bg-zinc-500/10",
};

export function ArchitectureDiagram({
  architecture,
}: {
  architecture: SystemArchitecture;
}) {
  const t = useTranslations("CaseStudyModal");
  const locale = useLocale() as Locale;
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(
    architecture.nodes[1] ?? architecture.nodes[0],
  );

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4 sm:p-5">
      <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">
        {t("diagramTitle")}
      </h4>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
        {t("diagramSubtitle")}
      </p>
      <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">
        {architecture.summary[locale]}
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {architecture.nodes.map((node) => {
              const Icon = NODE_ICONS[node.type];
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNode(node)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-left text-sm transition-colors border ${
                    isSelected
                      ? "border-teal-500 bg-white dark:bg-zinc-900"
                      : "border-transparent bg-white/60 dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <span className={`p-1.5 rounded-lg ${NODE_COLORS[node.type]}`}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200 truncate">
                    {node.label}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400 mb-2">
            {t("flowsLabel")}
          </p>
          <div className="space-y-1.5">
            {architecture.links.map((link, i) => (
              <div
                key={`${link.from}-${link.to}-${i}`}
                className="px-3 py-1.5 rounded-lg bg-white/60 dark:bg-zinc-900/40 text-xs text-zinc-600 dark:text-zinc-300"
              >
                <span className="font-mono">{link.from}</span> →{" "}
                <span className="font-mono">{link.to}</span>
                {link.label && <span className="text-zinc-400"> ({link.label})</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
          {selectedNode ? (
            <>
              <span
                className={`inline-flex p-2 rounded-lg mb-3 ${NODE_COLORS[selectedNode.type]}`}
              >
                {(() => {
                  const Icon = NODE_ICONS[selectedNode.type];
                  return <Icon className="w-5 h-5" />;
                })()}
              </span>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400 mb-1">
                {t("architecturalPurpose")}
              </p>
              <h5 className="font-semibold text-zinc-900 dark:text-white">
                {selectedNode.label}
              </h5>
              {selectedNode.sublabel && (
                <p className="text-xs text-zinc-400 mb-3">{selectedNode.sublabel}</p>
              )}
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-6">
                {selectedNode.description[locale]}
              </p>
              <p className="text-xs text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                {t("flowModelVersion")} ·{" "}
                <span className="text-teal-500">{t("active")}</span>
              </p>
            </>
          ) : (
            <p className="text-sm text-zinc-400">{t("selectNodeHint")}</p>
          )}
        </div>
      </div>
    </div>
  );
}
