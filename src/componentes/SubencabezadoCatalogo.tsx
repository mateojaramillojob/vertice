import { cn } from "@/lib/cn";
import { Estado } from "@/ui/Pildora";

type OrdenInicio = "curada" | "recientes";

/**
 * "Selección Curada / Recién Subido" + "Stream Activo" del handoff. Se interpreta
 * como selector de orden: la opción activa va en negrita, como en el diseño.
 */
export function SubencabezadoCatalogo({ orden, onCambio }: { orden: OrdenInicio; onCambio: (o: OrdenInicio) => void }) {
  const opcion = (valor: OrdenInicio, texto: string) => (
    <button
      type="button"
      aria-pressed={orden === valor}
      onClick={() => onCambio(valor)}
      className={cn(
        "relative toque-44",
        orden === valor ? "text-on-surface font-semibold" : "text-on-surface-variant hover:text-on-surface text-meta",
      )}
    >
      {texto}
    </button>
  );
  return (
    <div className="flex items-center justify-between pt-1">
      <div role="group" aria-label="Orden del catálogo" className="flex items-center gap-1.5 text-xs font-label">
        {opcion("curada", "Selección Curada")}
        <span aria-hidden="true" className="text-on-surface-variant/40">
          /
        </span>
        {opcion("recientes", "Recién Subido")}
      </div>
      <Estado>Stream Activo</Estado>
    </div>
  );
}
