import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Boton } from "./Boton";
import { Icono } from "./Icono";
import type { NombreIcono } from "./iconos";

// Todo este archivo es propuesta: el handoff no diseña carga, vacío ni error.

export function Esqueleto({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("bg-surface-container motion-safe:animate-pulse rounded", className)} />;
}

/** Tarjeta de carga con la misma forma que TarjetaPrenda. */
export function EsqueletoTarjeta({ proporcion = 4.4 / 3 }: { proporcion?: number }) {
  return (
    <div
      aria-hidden="true"
      className="relative rounded-xl overflow-hidden border border-outline-subtle/80 bg-surface-container motion-safe:animate-pulse"
      style={{ aspectRatio: `1 / ${proporcion}` }}
    >
      <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/70" />
    </div>
  );
}

interface EstadoProps {
  icono: NombreIcono;
  titulo: string;
  texto?: ReactNode;
  accion?: { texto: string; onClick: () => void; icono?: NombreIcono };
  tono?: "neutro" | "error";
  className?: string;
}

export function EstadoVacio({ icono, titulo, texto, accion, tono = "neutro", className }: EstadoProps) {
  return (
    <div role={tono === "error" ? "alert" : undefined} className={cn("flex flex-col items-center text-center px-8 py-12 gap-3", className)}>
      <span
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center",
          tono === "error" ? "bg-error/10 text-error" : "bg-surface-container text-on-surface-variant",
        )}
      >
        <Icono nombre={icono} tam={26} />
      </span>
      <h2 className="font-headline text-base font-bold text-primary">{titulo}</h2>
      {texto && <p className="text-sm text-on-surface-variant max-w-[30ch]">{texto}</p>}
      {accion && (
        <Boton variante="secundario" ancho="auto" icono={accion.icono} onClick={accion.onClick} className="mt-2">
          {accion.texto}
        </Boton>
      )}
    </div>
  );
}

export function EstadoError({ onReintentar, mensaje }: { onReintentar: () => void; mensaje?: string }) {
  return (
    <EstadoVacio
      tono="error"
      icono="wifi_off"
      titulo="No pudimos cargar el catálogo"
      texto={mensaje ?? "Revisa tu conexión e inténtalo de nuevo."}
      accion={{ texto: "Reintentar", icono: "refresh", onClick: onReintentar }}
    />
  );
}

export function Cargando({ etiqueta = "Cargando" }: { etiqueta?: string }) {
  return (
    <div role="status" className="flex items-center justify-center gap-2 py-6 text-on-surface-variant font-label text-meta uppercase tracking-wider">
      <Icono nombre="refresh" tam={16} className="motion-safe:animate-spin" />
      <span>{etiqueta}…</span>
    </div>
  );
}
