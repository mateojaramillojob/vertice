import { cn } from "@/lib/cn";
import { Icono } from "./Icono";

/** Badge de valoración. Propuesta: el handoff no lo diseña. */
export function Valoracion({ valor, resenas, className }: { valor: number; resenas?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 font-label text-xs text-on-surface", className)}>
      <Icono nombre="star" tam={14} relleno className="text-primary" />
      <span className="font-semibold tabular-nums">{valor.toFixed(1)}</span>
      {resenas != null && <span className="text-on-surface-variant">· {resenas} reseñas</span>}
      <span className="sr-only">de 5 estrellas</span>
    </span>
  );
}

export function Estrellas({ valor }: { valor: number }) {
  return (
    <span className="inline-flex" aria-label={`${valor} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Icono key={i} nombre="star" tam={14} relleno={i <= valor} className={i <= valor ? "text-primary" : "text-outline-subtle"} />
      ))}
    </span>
  );
}
