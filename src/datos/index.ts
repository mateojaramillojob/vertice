import type { Repositorio } from "./repositorio";
import { repositorioMock } from "./mock/repositorioMock";

// Punto único de conexión: para usar Supabase, crear `supabase/repositorioSupabase.ts`
// que implemente `Repositorio` y exportarlo aquí en lugar del mock.
export const repositorio: Repositorio = repositorioMock;

export type * from "./tipos";
