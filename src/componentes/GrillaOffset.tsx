import type { ReactNode } from "react";
import { EsqueletoTarjeta } from "@/ui/Estados";

interface Props<T> {
  items: T[];
  render: (item: T, indice: number) => ReactNode;
  /** Agrega tarjetas de carga al final de cada columna (scroll infinito). */
  cargando?: number;
}

const PROPORCIONES_CARGA = [4.4 / 3, 4.1 / 3, 3.8 / 3, 4.6 / 3];

/**
 * Grilla "offset" del handoff: 2 columnas con gap de 12 px y la derecha
 * desplazada 24 px. Los items alternan columna (1, 3, 5… a la izquierda) como en
 * el mockup; así, agregar páginas nunca reordena lo que ya está en pantalla.
 */
export function GrillaOffset<T>({ items, render, cargando = 0 }: Props<T>) {
  const columnas: [ReactNode[], ReactNode[]] = [[], []];
  items.forEach((item, i) => columnas[i % 2].push(render(item, i)));
  for (let i = 0; i < cargando; i++) {
    columnas[(items.length + i) % 2].push(<EsqueletoTarjeta key={`carga-${i}`} proporcion={PROPORCIONES_CARGA[i % 4]} />);
  }
  return (
    <div className="grid grid-cols-2 gap-3 items-start">
      <div className="flex flex-col gap-3">{columnas[0]}</div>
      <div className="flex flex-col gap-3 pt-6">{columnas[1]}</div>
    </div>
  );
}
