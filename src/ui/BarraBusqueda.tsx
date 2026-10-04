import { useId, type FormEvent, type RefObject } from "react";
import { cn } from "@/lib/cn";
import { Icono } from "./Icono";

interface Props {
  valor: string;
  onCambio: (v: string) => void;
  onEnviar?: (v: string) => void;
  onFiltros?: () => void;
  /** Cantidad de filtros activos (propuesta: punto sobre el botón). */
  filtrosActivos?: number;
  autoFocus?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  className?: string;
}

/**
 * Buscador del handoff. Sin el recuadro gris interno (A7, artefacto del plugin
 * `forms`) y con texto de 16 px (B1); la altura total se mantiene en 56 px.
 */
export function BarraBusqueda({ valor, onCambio, onEnviar, onFiltros, filtrosActivos = 0, autoFocus, inputRef, className }: Props) {
  const id = useId();
  const enviar = (e: FormEvent) => {
    e.preventDefault();
    onEnviar?.(valor);
  };
  return (
    <form role="search" onSubmit={enviar} className={cn("relative w-full", className)}>
      <div className="flex items-center bg-surface-container-lowest px-3.5 py-2.5 rounded-xl border border-outline-subtle/80 shadow-buscador transition-colors focus-within:border-on-surface-variant/50">
        <Icono nombre="search" tam={18} className="text-on-surface-variant mr-2.5" />
        <label htmlFor={id} className="sr-only">
          Buscar prendas
        </label>
        <input
          id={id}
          ref={inputRef}
          type="search"
          enterKeyHint="search"
          autoComplete="off"
          autoFocus={autoFocus}
          value={valor}
          onChange={(e) => onCambio(e.target.value)}
          placeholder="Buscar por prenda, corte o tejido..."
          className="h-[34px] w-full min-w-0 text-ellipsis bg-transparent text-on-surface placeholder:text-on-surface-variant focus:outline-none font-body [&::-webkit-search-cancel-button]:hidden"
        />
        {onFiltros && (
          <button
            type="button"
            onClick={onFiltros}
            aria-label={filtrosActivos ? `Filtros, ${filtrosActivos} activos` : "Filtros"}
            className="relative toque-44 flex items-center justify-center p-1 text-on-surface-variant hover:text-primary transition-colors"
          >
            <Icono nombre="tune" tam={16} />
            {filtrosActivos > 0 && <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-cobalt" />}
          </button>
        )}
      </div>
    </form>
  );
}
