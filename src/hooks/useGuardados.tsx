import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { escribir, leer } from "@/lib/almacen";

const CLAVE = "vertice.guardados";

interface Guardados {
  ids: string[];
  estaGuardada: (id: string) => boolean;
  alternar: (id: string) => boolean; // devuelve el nuevo estado
}

const Contexto = createContext<Guardados | null>(null);

export function GuardadosProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => leer(CLAVE, []));
  const idsRef = useRef(ids);

  const alternar = useCallback((id: string) => {
    const previos = idsRef.current;
    const ahora = !previos.includes(id);
    // Lo último guardado va primero en la pantalla Guardados.
    const nuevos = ahora ? [id, ...previos] : previos.filter((x) => x !== id);
    idsRef.current = nuevos;
    escribir(CLAVE, nuevos);
    setIds(nuevos);
    return ahora;
  }, []);

  const valor = useMemo(() => ({ ids, estaGuardada: (id: string) => ids.includes(id), alternar }), [ids, alternar]);
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useGuardados() {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error("useGuardados fuera de GuardadosProvider");
  return ctx;
}
