import type { Repositorio } from "../repositorio";
import type { Categoria, FiltrosCatalogo, Prenda } from "../tipos";
import { CONDICIONES, normalizar } from "@/lib/categorias";
import { PRENDAS } from "./prendas";
import { NOTIFICACIONES, RESENAS, USUARIO_ACTUAL } from "./otros";

// Simula la red: latencia y, con `?mock=error` en la URL, un fallo, para poder
// ver los estados de carga y de error.
async function red<T>(valor: T, ms = 420): Promise<T> {
  await new Promise((r) => setTimeout(r, ms + Math.random() * 180));
  if (new URLSearchParams(location.search).get("mock") === "error") {
    throw new Error("No se pudo conectar con el servidor (simulado).");
  }
  return structuredClone(valor);
}

function filtrar(filtros: FiltrosCatalogo): Prenda[] {
  let lista = PRENDAS.filter((p) => p.estado !== "vendida");
  if (filtros.categoria) lista = lista.filter((p) => p.categoria === filtros.categoria);
  if (filtros.texto?.trim()) {
    const palabras = normalizar(filtros.texto).split(/\s+/);
    lista = lista.filter((p) => {
      const texto = normalizar(`${p.titulo} ${p.marca} ${p.categoria} ${p.descripcion} ${p.ciudad}`);
      return palabras.every((w) => texto.includes(w));
    });
  }
  if (filtros.tallas?.length) {
    const buscadas = filtros.tallas.map(normalizar);
    lista = lista.filter((p) => normalizar(p.talla).split(/[\s/]+/).some((t) => buscadas.includes(t)));
  }
  if (filtros.condiciones?.length) {
    const prefijos = CONDICIONES.filter((c) => filtros.condiciones!.includes(c.id)).map((c) => c.prefijo);
    lista = lista.filter((p) => prefijos.some((pre) => normalizar(p.condicion).startsWith(pre)));
  }
  if (filtros.precioMin != null) lista = lista.filter((p) => p.precio >= filtros.precioMin!);
  if (filtros.precioMax != null) lista = lista.filter((p) => p.precio <= filtros.precioMax!);

  switch (filtros.orden) {
    case "recientes":
      return [...lista].sort((a, b) => b.publicadaEn.localeCompare(a.publicadaEn));
    case "precio-asc":
      return [...lista].sort((a, b) => a.precio - b.precio);
    case "precio-desc":
      return [...lista].sort((a, b) => b.precio - a.precio);
    default:
      return lista; // "curada": el orden editorial del catálogo
  }
}

export const repositorioMock: Repositorio = {
  listarPrendas(filtros, cursor, limite) {
    const todas = filtrar(filtros);
    const desde = cursor ? Number(cursor) : 0;
    const items = todas.slice(desde, desde + limite);
    const siguiente = desde + limite < todas.length ? String(desde + limite) : null;
    return red({ items, siguiente, total: todas.length }, desde === 0 ? 420 : 650);
  },
  contarPrendas(filtros) {
    return red(filtrar(filtros).length, 120);
  },
  conteoPorCategoria() {
    const conteo = { todas: PRENDAS.length } as Record<Categoria | "todas", number>;
    for (const p of PRENDAS) conteo[p.categoria] = (conteo[p.categoria] ?? 0) + 1;
    return red(conteo, 200);
  },
  obtenerPrenda(id) {
    return red(PRENDAS.find((p) => p.id === id) ?? null);
  },
  obtenerPrendas(ids) {
    return red(ids.map((id) => PRENDAS.find((p) => p.id === id)).filter((p): p is Prenda => !!p), 300);
  },
  listarMarcas() {
    const conteo = new Map<string, number>();
    for (const p of PRENDAS) {
      const marca = p.marcaCorta ?? p.marca;
      conteo.set(marca, (conteo.get(marca) ?? 0) + 1);
    }
    return red(
      [...conteo].map(([marca, total]) => ({ marca, total })).sort((a, b) => b.total - a.total || a.marca.localeCompare(b.marca)),
      250,
    );
  },
  listarPrendasDeVendedor(vendedorId) {
    return red(PRENDAS.filter((p) => p.vendedor.id === vendedorId));
  },
  listarNotificaciones() {
    return red(NOTIFICACIONES);
  },
  obtenerUsuarioActual() {
    return red(USUARIO_ACTUAL, 200);
  },
  listarResenas() {
    return red(RESENAS, 300);
  },
};
