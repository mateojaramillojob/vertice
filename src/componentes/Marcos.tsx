import type { ReactNode } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { cn } from "@/lib/cn";
import { EtiquetaPropuesta } from "@/ui/Badge";
import { BotonIcono } from "@/ui/BotonIcono";
import { AvisoSinConexion } from "./Avisos";
import { BarraPestanas } from "./BarraPestanas";
import { Encabezado } from "./Encabezado";

/** Pantallas con tab bar: Inicio, Explorar, Guardados, Perfil. */
export function MarcoPestanas() {
  return (
    <>
      <Encabezado />
      <AvisoSinConexion />
      <main className="relative w-full max-w-app mx-auto min-h-screen bg-surface pt-[calc(4rem+env(safe-area-inset-top,0px))] pb-[calc(6rem+env(safe-area-inset-bottom,0px))]">
        <Outlet />
      </main>
      <BarraPestanas />
    </>
  );
}

/** Volver atrás dentro de la app; si se entró directo por URL, al inicio. */
export function useVolver() {
  const navegar = useNavigate();
  return () => ((window.history.state?.idx ?? 0) > 0 ? navegar(-1) : navegar("/"));
}

interface PropsPantalla {
  titulo: string;
  propuesta?: boolean;
  acciones?: ReactNode;
  /** Barra fija inferior (CTA del detalle, total de la bolsa…). */
  pie?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Pantallas secundarias sin tab bar. Mismo header que el handoff (64 px, blanco
 * al 90 % con blur) con botón de volver. Propuesta: el handoff no las diseña.
 */
export function MarcoPantalla({ titulo, propuesta = true, acciones, pie, children, className }: PropsPantalla) {
  const volver = useVolver();
  return (
    <>
      <header className="fixed top-0 inset-x-0 mx-auto w-full max-w-app z-40 bg-white/90 backdrop-blur-xl pt-safe border-b border-outline-subtle/80 shadow-header">
        <div className="h-16 px-2 flex items-center gap-1">
          <BotonIcono etiqueta="Volver" icono="arrow_back" onClick={volver} color="text-primary" />
          <h1 className="flex-1 min-w-0 truncate font-headline text-base font-bold text-primary">{titulo}</h1>
          {propuesta && <EtiquetaPropuesta className="mr-1" />}
          {acciones}
        </div>
      </header>
      <AvisoSinConexion />
      <main
        className={cn(
          "relative w-full max-w-app mx-auto min-h-screen bg-surface pt-[calc(4rem+env(safe-area-inset-top,0px))]",
          pie ? "pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))]" : "pb-[calc(2rem+env(safe-area-inset-bottom,0px))]",
          className,
        )}
      >
        {children}
      </main>
      {pie && (
        <div className="fixed bottom-0 inset-x-0 mx-auto w-full max-w-app z-40 bg-white/95 backdrop-blur-xl border-t border-outline-subtle shadow-tabbar px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
          {pie}
        </div>
      )}
    </>
  );
}
