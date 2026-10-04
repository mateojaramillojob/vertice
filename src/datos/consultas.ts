import { useInfiniteQuery, useQuery, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { repositorio } from ".";
import type { FiltrosCatalogo, Notificacion, Pagina, Prenda } from "./tipos";

// Hooks de lectura. La UI usa solo estos; no llama al repositorio directamente.

/** 8 por página: la primera coincide con el mockup (4 por columna). */
export const TAM_PAGINA = 8;

export function useCatalogo(filtros: FiltrosCatalogo, { activo = true }: { activo?: boolean } = {}) {
  const qc = useQueryClient();
  const clave = ["catalogo", filtros];
  const consulta = useInfiniteQuery({
    queryKey: clave,
    enabled: activo,
    queryFn: ({ pageParam }) => repositorio.listarPrendas(filtros, pageParam, TAM_PAGINA),
    initialPageParam: null as string | null,
    getNextPageParam: (ultima) => ultima.siguiente,
  });
  /** Pull-to-refresh: vuelve a la primera página en vez de repedir todas las cargadas. */
  const refrescar = async () => {
    qc.setQueryData<InfiniteData<Pagina<Prenda>, string | null>>(clave, (d) =>
      d ? { pages: d.pages.slice(0, 1), pageParams: d.pageParams.slice(0, 1) } : d,
    );
    await consulta.refetch();
  };
  return { ...consulta, refrescar };
}

export function useContarPrendas(filtros: FiltrosCatalogo) {
  return useQuery({
    queryKey: ["conteo", filtros],
    queryFn: () => repositorio.contarPrendas(filtros),
    placeholderData: (anterior) => anterior,
  });
}

export function useConteoCategorias() {
  return useQuery({ queryKey: ["conteo-categorias"], queryFn: () => repositorio.conteoPorCategoria() });
}

export function useCategorias() {
  return useQuery({ queryKey: ["categorias"], queryFn: () => repositorio.listarCategorias() });
}

export function usePrenda(id: string | undefined) {
  return useQuery({
    queryKey: ["prenda", id],
    queryFn: () => repositorio.obtenerPrenda(id!),
    enabled: !!id,
  });
}

export function usePrendas(ids: string[]) {
  return useQuery({
    queryKey: ["prendas", ids],
    queryFn: () => repositorio.obtenerPrendas(ids),
    placeholderData: (anterior) => anterior,
  });
}

export function useMarcas() {
  return useQuery({ queryKey: ["marcas"], queryFn: () => repositorio.listarMarcas() });
}

export function usePrendasDeVendedor(vendedorId: string | undefined) {
  return useQuery({
    queryKey: ["vendedor", vendedorId, "prendas"],
    queryFn: () => repositorio.listarPrendasDeVendedor(vendedorId!),
    enabled: !!vendedorId,
  });
}

export function useNotificaciones() {
  return useQuery({ queryKey: ["notificaciones"], queryFn: () => repositorio.listarNotificaciones() });
}

/** Marca notificaciones como leídas. Hoy solo cambia la caché local; con backend será una mutación. */
export function useMarcarLeidas() {
  const qc = useQueryClient();
  return (ids?: string[]) =>
    qc.setQueryData<Notificacion[]>(["notificaciones"], (lista) =>
      lista?.map((n) => (!ids || ids.includes(n.id) ? { ...n, leida: true } : n)),
    );
}

export function useUsuarioActual() {
  return useQuery({ queryKey: ["usuario"], queryFn: () => repositorio.obtenerUsuarioActual() });
}

export function useResenas(vendedorId: string | undefined) {
  return useQuery({
    queryKey: ["vendedor", vendedorId, "resenas"],
    queryFn: () => repositorio.listarResenas(vendedorId!),
    enabled: !!vendedorId,
  });
}
