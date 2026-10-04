import { useState } from "react";
import type { Prenda } from "@/datos/tipos";
import { GrillaOffset } from "./GrillaOffset";
import { HojaCompraRapida } from "./HojaCompraRapida";
import { TarjetaPrenda } from "./TarjetaPrenda";

interface Props {
  prendas: Prenda[];
  /** Tarjetas de carga al final (scroll infinito) o en lugar de la grilla (carga inicial). */
  cargando?: number;
}

/**
 * Grilla offset con la interacción del handoff: una sola tarjeta abierta a la
 * vez (ninguna al cargar), primer toque abre el overlay y el segundo la compra
 * rápida. Para cerrar la tarjeta abierta al cambiar de filtro, cambiar su `key`.
 */
export function GrillaPrendas({ prendas, cargando = 0 }: Props) {
  const [abiertaId, setAbiertaId] = useState<string | null>(null);
  const [enCompra, setEnCompra] = useState<Prenda | null>(null);
  return (
    <>
      <GrillaOffset
        items={prendas}
        cargando={cargando}
        render={(p, i) => (
          <TarjetaPrenda
            key={p.id}
            prenda={p}
            abierta={abiertaId === p.id}
            prioridad={i < 4}
            onToque={() => (abiertaId === p.id ? setEnCompra(p) : setAbiertaId(p.id))}
            onCerrar={() => setAbiertaId(null)}
          />
        )}
      />
      <HojaCompraRapida prenda={enCompra} onCerrar={() => setEnCompra(null)} />
    </>
  );
}
