import type { ReactNode } from "react";
import { Icono } from "@/ui/Icono";

/** Título serif en mayúsculas con acción en cobalto ("Catálogo verificado · Archivo offset"). */
export function EncabezadoSeccion({ titulo, accion, nivel = 2 }: { titulo: ReactNode; accion?: ReactNode; nivel?: 1 | 2 }) {
  const H = nivel === 1 ? "h1" : "h2";
  return (
    <div className="px-1 pb-3 flex items-baseline justify-between gap-2">
      <H className="font-headline text-sm font-semibold tracking-tight text-on-surface uppercase">{titulo}</H>
      {accion && (
        <span className="font-label text-micro text-cobalt font-medium flex items-center gap-0.5 tracking-wider uppercase">
          {accion} <Icono nombre="tune" tam={13} />
        </span>
      )}
    </div>
  );
}
