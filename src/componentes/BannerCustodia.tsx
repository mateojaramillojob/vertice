import { Icono } from "@/ui/Icono";

/** Micro-banner de garantía del handoff. */
export function BannerCustodia() {
  return (
    <div className="w-full bg-surface-container border-b border-outline-subtle py-2 px-4 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cobalt motion-safe:animate-pulse shrink-0" />
        <span className="font-label text-meta uppercase tracking-wider text-on-surface-variant font-medium">
          Custodia Vértice: Inspección física garantizada · 48h
        </span>
      </div>
      <Icono nombre="verified_user" tam={15} className="text-cobalt" />
    </div>
  );
}
