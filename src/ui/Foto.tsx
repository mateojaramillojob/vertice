import { useState } from "react";
import type { Foto as TipoFoto } from "@/datos/tipos";
import { cn } from "@/lib/cn";
import { Icono } from "./Icono";

interface Props {
  foto: TipoFoto;
  prioridad?: boolean;
  /** Zoom suave al pasar el mouse (handoff: group-hover:scale-105, 500 ms). */
  zoomHover?: boolean;
  className?: string;
}

/**
 * Foto a sangre que llena su contenedor. Si la URL falla (las del handoff pueden
 * caducar) muestra un placeholder en vez de un ícono roto. Propuesta.
 */
export function Foto({ foto, prioridad, zoomHover, className }: Props) {
  const [fallo, setFallo] = useState(false);
  if (fallo) {
    return (
      <div className={cn("absolute inset-0 flex flex-col items-center justify-center gap-1 bg-surface-container text-on-surface-variant", className)}>
        <Icono nombre="image_not_supported" tam={24} />
        <span className="font-label text-micro uppercase tracking-wider">Foto no disponible</span>
        <span className="sr-only">{foto.alt}</span>
      </div>
    );
  }
  const encuadre = foto.encuadre;
  return (
    <img
      src={foto.url}
      alt={foto.alt}
      loading={prioridad ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      onError={() => setFallo(true)}
      className={cn(
        "absolute inset-0 w-full h-full object-cover",
        zoomHover && "transition-transform duration-500 group-hover:scale-105",
        className,
      )}
      style={encuadre ? { transform: `scale(${encuadre.escala})`, transformOrigin: encuadre.origen } : undefined}
    />
  );
}
