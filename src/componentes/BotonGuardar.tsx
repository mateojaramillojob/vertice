import type { Prenda } from "@/datos/tipos";
import { useGuardados } from "@/hooks/useGuardados";
import { cn } from "@/lib/cn";
import { BotonIcono } from "@/ui/BotonIcono";

/** Marcador sobre la foto. Guardada = relleno cobalto, como "Guardado" en el sheet del handoff. */
export function BotonGuardar({ prenda, className }: { prenda: Prenda; className?: string }) {
  const { estaGuardada, alternar } = useGuardados();
  const guardada = estaGuardada(prenda.id);
  const nombre = prenda.tituloCorto ?? prenda.titulo;
  return (
    <BotonIcono
      variante="foto-claro"
      icono="bookmark"
      relleno={guardada}
      aria-pressed={guardada}
      etiqueta={guardada ? `Quitar ${nombre} de Guardados` : `Guardar ${nombre}`}
      onClick={() => alternar(prenda.id)}
      className={cn(guardada && "text-cobalt", className)}
    />
  );
}
