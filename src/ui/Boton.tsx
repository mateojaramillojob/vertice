import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icono } from "./Icono";
import type { NombreIcono } from "./iconos";

type Variante = "primario" | "secundario";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
  icono?: NombreIcono;
  iconoRelleno?: boolean;
  /** Propuesta: el handoff no diseña estado de carga. */
  cargando?: boolean;
  /** Por defecto ocupa todo el ancho, como en el bottom sheet del handoff. */
  ancho?: "completo" | "auto";
  children: ReactNode;
}

// Valores del bottom sheet de design/code.html (#addToCartBtn y #saveItemBtn).
const ESTILOS: Record<Variante, string> = {
  primario:
    "py-3.5 px-4 bg-primary text-on-primary font-headline font-bold text-sm rounded-xl gap-2 shadow-cta hover:bg-primary-light enabled:active:scale-[0.98] transition-all",
  secundario:
    "py-2.5 px-4 bg-transparent text-primary font-label text-xs uppercase tracking-wider font-semibold rounded-xl gap-1.5 border border-outline-subtle hover:bg-surface-container transition-colors",
};

const TAM_ICONO: Record<Variante, number> = { primario: 18, secundario: 16 };

export function Boton({ variante = "primario", icono, iconoRelleno, cargando, ancho = "completo", className, children, disabled, ...resto }: Props) {
  return (
    <button
      type="button"
      {...resto}
      disabled={disabled || cargando}
      aria-busy={cargando || undefined}
      className={cn(
        "relative toque-44 flex items-center justify-center",
        ancho === "completo" ? "w-full" : "w-auto",
        ESTILOS[variante],
        "disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none",
        className,
      )}
    >
      {cargando ? (
        <Icono nombre="refresh" tam={TAM_ICONO[variante]} className="motion-safe:animate-spin" />
      ) : (
        icono && <Icono nombre={icono} tam={TAM_ICONO[variante]} relleno={iconoRelleno} />
      )}
      <span>{children}</span>
    </button>
  );
}
