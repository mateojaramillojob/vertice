import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import type { NombreIcono } from "./iconos";

interface Props {
  nombre: NombreIcono;
  /** px. El handoff usa tamaños por sitio (21 en el header, 22 en la tab bar…). */
  tam?: number;
  relleno?: boolean;
  className?: string;
}

/** Ícono de Material Symbols. Siempre decorativo: la etiqueta va en el botón que lo contiene. */
export function Icono({ nombre, tam = 24, relleno = false, className }: Props) {
  const estilo: CSSProperties = { fontSize: tam, width: tam, height: tam };
  if (relleno) estilo.fontVariationSettings = "'FILL' 1";
  return (
    <span aria-hidden="true" className={cn("material-symbols-outlined", className)} style={estilo}>
      {nombre}
    </span>
  );
}
