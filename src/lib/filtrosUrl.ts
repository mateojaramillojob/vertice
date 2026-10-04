import type { Categoria, FiltrosCatalogo, Orden } from "@/datos/tipos";
import { CATEGORIAS } from "./categorias";

// Los filtros de búsqueda viven en la URL: se pueden compartir y "atrás" funciona.

const ORDENES: Orden[] = ["curada", "recientes", "precio-asc", "precio-desc"];
const lista = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);
const numero = (v: string | null) => (v && !Number.isNaN(Number(v)) ? Number(v) : null);

export function leerFiltros(sp: URLSearchParams): FiltrosCatalogo {
  const cat = sp.get("cat") as Categoria | null;
  const orden = sp.get("orden") as Orden | null;
  return {
    texto: sp.get("q") ?? "",
    categoria: cat && CATEGORIAS.includes(cat) ? cat : null,
    tallas: lista(sp.get("tallas")),
    condiciones: lista(sp.get("cond")),
    precioMin: numero(sp.get("min")),
    precioMax: numero(sp.get("max")),
    orden: orden && ORDENES.includes(orden) ? orden : "curada",
  };
}

export function escribirFiltros(f: FiltrosCatalogo): URLSearchParams {
  const sp = new URLSearchParams();
  if (f.texto?.trim()) sp.set("q", f.texto.trim());
  if (f.categoria) sp.set("cat", f.categoria);
  if (f.tallas?.length) sp.set("tallas", f.tallas.join(","));
  if (f.condiciones?.length) sp.set("cond", f.condiciones.join(","));
  if (f.precioMin != null) sp.set("min", String(f.precioMin));
  if (f.precioMax != null) sp.set("max", String(f.precioMax));
  if (f.orden && f.orden !== "curada") sp.set("orden", f.orden);
  return sp;
}

/** Filtros del sheet aplicados (sin contar el texto). */
export function contarActivos(f: FiltrosCatalogo) {
  return (
    (f.categoria ? 1 : 0) +
    (f.tallas?.length ?? 0) +
    (f.condiciones?.length ?? 0) +
    (f.precioMin != null || f.precioMax != null ? 1 : 0) +
    (f.orden && f.orden !== "curada" ? 1 : 0)
  );
}

export const NOMBRE_ORDEN: Record<Orden, string> = {
  curada: "Selección curada",
  recientes: "Recién subido",
  "precio-asc": "Menor precio",
  "precio-desc": "Mayor precio",
};
