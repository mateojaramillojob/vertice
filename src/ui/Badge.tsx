import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variante = "condicion" | "talla" | "talla-foto";

// Badges del bottom sheet (#modalCondBadge, #modalSizeBadge) y talla del overlay.
const ESTILOS: Record<Variante, string> = {
  condicion: "text-micro font-label uppercase font-medium px-2 py-0.5 rounded bg-surface-container border border-outline-subtle text-on-surface",
  talla: "text-micro font-label uppercase font-medium px-2 py-0.5 rounded bg-primary text-on-primary",
  "talla-foto": "text-meta font-label font-bold px-1.5 py-0.5 rounded bg-white/15 text-white whitespace-nowrap",
};

export function Badge({ variante, className, children }: { variante: Variante; className?: string; children: ReactNode }) {
  return <span className={cn(ESTILOS[variante], className)}>{children}</span>;
}

/** Marca las pantallas y piezas que no venían en el handoff. */
export function EtiquetaPropuesta({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full border border-warning/40 bg-warning/10 text-warning font-label text-micro uppercase tracking-wider font-semibold",
        className,
      )}
    >
      Propuesta
    </span>
  );
}
