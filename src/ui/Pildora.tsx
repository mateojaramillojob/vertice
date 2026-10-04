import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Píldora de estado sobre la foto ("Activo" en la tarjeta abierta del handoff). */
export function Pildora({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "bg-primary/80 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 text-micro font-label text-white",
        className,
      )}
    >
      <span className="w-1 h-1 rounded-full bg-cobalt-light motion-safe:animate-pulse" />
      <span>{children}</span>
    </span>
  );
}

/** Punto cobalto + texto en mayúsculas ("Stream activo", banner de custodia). */
export function Estado({ children, pulso, className }: { children: ReactNode; pulso?: boolean; className?: string }) {
  return (
    <span className={cn("flex items-center gap-1 font-label text-meta uppercase text-on-surface-variant", className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full bg-cobalt shrink-0", pulso && "motion-safe:animate-pulse")} />
      <span>{children}</span>
    </span>
  );
}
