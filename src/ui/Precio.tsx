import type { Moneda } from "@/datos/tipos";
import { formatoPrecio } from "@/lib/formato";
import { cn } from "@/lib/cn";

interface Props {
  valor: number;
  moneda: Moneda;
  /** sm = tarjeta (14/20), lg = bottom sheet y detalle (18/28). */
  tam?: "sm" | "lg";
  anterior?: number;
  className?: string;
}

/**
 * Un solo estilo de precio (B4): Inter 700 con números tabulares. En el
 * handoff la tarjeta usaba Inter y el sheet Bodoni 900.
 */
export function Precio({ valor, moneda, tam = "sm", anterior, className }: Props) {
  return (
    <span className={cn("inline-flex items-baseline gap-1.5 whitespace-nowrap", className)}>
      <span className={cn("font-body font-bold tracking-tight tabular-nums", tam === "sm" ? "text-sm" : "text-lg")}>
        {formatoPrecio(valor, moneda)}
      </span>
      {anterior && anterior > valor && (
        <span className="font-body text-xs text-on-surface-variant line-through tabular-nums">
          <span className="sr-only">Antes </span>
          {formatoPrecio(anterior, moneda)}
        </span>
      )}
    </span>
  );
}
