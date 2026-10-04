import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Icono } from "./Icono";
import type { NombreIcono } from "./iconos";

type Variante = "barra" | "foto-claro" | "foto-oscuro" | "suave";

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  /** Obligatoria: es lo que lee el lector de pantalla. */
  etiqueta: string;
  icono: NombreIcono;
  variante?: Variante;
  tamIcono?: number;
  relleno?: boolean;
  /** Punto de "sin leer" del handoff (campana). */
  punto?: boolean;
}

// Medidas del handoff. El área táctil se amplía a 44 px sin cambiar lo visible (A5).
const ESTILOS: Record<Variante, { clase: string; icono: number }> = {
  // Íconos del header: 40 × 40, ícono de 21
  barra: { clase: "w-10 h-10 text-on-surface-variant hover:text-primary transition-colors", icono: 21 },
  // Marcador sobre la foto: 28 × 28, píldora blanca
  "foto-claro": { clase: "w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm text-primary shadow-sm", icono: 15 },
  // Botón de colapsar sobre la foto: 28 × 28, píldora oscura
  "foto-oscuro": { clase: "w-7 h-7 rounded-full bg-primary/80 backdrop-blur-md text-white", icono: 14 },
  // Cerrar del bottom sheet: 28 × 28
  suave: { clase: "w-7 h-7 rounded-full bg-surface-container text-on-surface-variant hover:text-primary transition-colors", icono: 18 },
};

export function BotonIcono({ etiqueta, icono, variante = "barra", tamIcono, relleno, punto, className, ...resto }: Props) {
  const estilo = ESTILOS[variante];
  return (
    <button
      type="button"
      aria-label={etiqueta}
      {...resto}
      className={cn("relative toque-44 flex items-center justify-center", estilo.clase, className)}
    >
      <Icono nombre={icono} tam={tamIcono ?? estilo.icono} relleno={relleno} />
      {punto && <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-cobalt" />}
    </button>
  );
}
