import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { repositorio } from ".";
import type { FiltrosCatalogo } from "./tipos";

// Hooks de lectura. La UI usa solo estos; no llama al repositorio directamente.

/** 8 por página: la primera coincide con el mockup (4 por columna). */
export const TAM_PAGINA = 8;

export function useCatalogo(filtros: FiltrosCatalogo) {
  return useInfiniteQuery({
    queryKey: ["catalogo", filtros],
    queryFn: ({ pageParam }) => repositorio.listarPrendas(filtros, pageParam, TAM_PAGINA),
    initialPageParam: null as string | null,
    getNextPageParam: (ultima) => ultima.siguiente,
  });
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
