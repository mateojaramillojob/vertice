import type { Categoria, FiltrosCatalogo, Foto, Notificacion, Pagina, Prenda, Resena, Usuario } from "./tipos";

// Contrato entre la UI y el backend. Hoy lo cumple `mock/repositorioMock.ts`;
// para conectar Supabase basta otra implementación y cambiar `datos/index.ts`.
export interface Repositorio {
  listarPrendas(filtros: FiltrosCatalogo, cursor: string | null, limite: number): Promise<Pagina<Prenda>>;
  contarPrendas(filtros: FiltrosCatalogo): Promise<number>;
  conteoPorCategoria(): Promise<Record<Categoria | "todas", number>>;
  /** Portada (foto) y total de cada categoría, para Explorar. */
  listarCategorias(): Promise<{ categoria: Categoria; total: number; foto: Foto }[]>;
  obtenerPrenda(id: string): Promise<Prenda | null>;
  obtenerPrendas(ids: string[]): Promise<Prenda[]>;
  listarMarcas(): Promise<{ marca: string; total: number }[]>;
  listarPrendasDeVendedor(vendedorId: string): Promise<Prenda[]>;
  listarNotificaciones(): Promise<Notificacion[]>;
  obtenerUsuarioActual(): Promise<Usuario>;
  listarResenas(vendedorId: string): Promise<Resena[]>;
}
