import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { escribir, leer } from "@/lib/almacen";

const CLAVE = "vertice.bolsa";
/** Regla del handoff: "¡Prenda agregada a tu bolsa con reserva de 15 min!" */
export const MINUTOS_RESERVA = 15;
const RESERVA_MS = MINUTOS_RESERVA * 60_000;

export interface ItemBolsa {
  id: string;
  reservadaEn: number; // epoch ms
}

interface Bolsa {
  items: ItemBolsa[];
  contiene: (id: string) => boolean;
  agregar: (id: string) => void;
  quitar: (id: string) => void;
  /** ms que le quedan a la reserva (0 si venció). */
  restante: (item: ItemBolsa) => number;
}

const Contexto = createContext<Bolsa | null>(null);

const vigentes = (items: ItemBolsa[], ahora = Date.now()) => items.filter((i) => ahora - i.reservadaEn < RESERVA_MS);

export function BolsaProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemBolsa[]>(() => vigentes(leer(CLAVE, [])));
  const [ahora, setAhora] = useState(() => Date.now());

  // Un tic por segundo mientras haya reservas: mueve los contadores y suelta las vencidas.
  useEffect(() => {
    if (!items.length) return;
    const t = setInterval(() => {
      const n = Date.now();
      setAhora(n);
      setItems((previos) => {
        const v = vigentes(previos, n);
        if (v.length === previos.length) return previos;
        escribir(CLAVE, v);
        return v;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [items.length]);

  const guardar = useCallback((cambio: (previos: ItemBolsa[]) => ItemBolsa[]) => {
    setItems((previos) => {
      const nuevos = cambio(previos);
      escribir(CLAVE, nuevos);
      return nuevos;
    });
  }, []);

  const agregar = useCallback(
    (id: string) => {
      setAhora(Date.now());
      guardar((p) => (p.some((i) => i.id === id) ? p : [...p, { id, reservadaEn: Date.now() }]));
    },
    [guardar],
  );
  const quitar = useCallback((id: string) => guardar((p) => p.filter((i) => i.id !== id)), [guardar]);

  const valor = useMemo<Bolsa>(
    () => ({
      items,
      contiene: (id) => items.some((i) => i.id === id),
      agregar,
      quitar,
      restante: (item) => Math.max(0, RESERVA_MS - (ahora - item.reservadaEn)),
    }),
    [items, agregar, quitar, ahora],
  );
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useBolsa() {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error("useBolsa fuera de BolsaProvider");
  return ctx;
}
