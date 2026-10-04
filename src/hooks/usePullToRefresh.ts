import { useEffect, useRef, useState } from "react";

export const UMBRAL_REFRESCO = 72; // px que hay que tirar para disparar

/**
 * Pull-to-refresh táctil sobre la ventana. Solo arranca si la página está
 * arriba del todo; el rebote nativo está apagado en CSS (overscroll-behavior).
 */
export function usePullToRefresh(alRefrescar: () => Promise<unknown>) {
  const [distancia, setDistancia] = useState(0);
  const [refrescando, setRefrescando] = useState(false);
  const inicio = useRef<number | null>(null);
  const actual = useRef(0);
  const callback = useRef(alRefrescar);
  callback.current = alRefrescar;
  const ocupado = useRef(false);

  useEffect(() => {
    const alTocar = (e: TouchEvent) => {
      // No arranca dentro de un bottom sheet ni si la página no está arriba del todo.
      if (ocupado.current || window.scrollY > 0 || (e.target as Element).closest?.('[role="dialog"]')) return;
      inicio.current = e.touches[0].clientY;
    };
    const alMover = (e: TouchEvent) => {
      if (inicio.current == null) return;
      const delta = e.touches[0].clientY - inicio.current;
      if (delta <= 0 || window.scrollY > 0) {
        actual.current = 0;
        setDistancia(0);
        return;
      }
      // Resistencia: cuesta más cuanto más se tira.
      actual.current = Math.min(120, delta * 0.5);
      setDistancia(actual.current);
    };
    const alSoltar = async () => {
      if (inicio.current == null) return;
      inicio.current = null;
      if (actual.current >= UMBRAL_REFRESCO) {
        ocupado.current = true;
        setRefrescando(true);
        setDistancia(UMBRAL_REFRESCO);
        try {
          await callback.current();
        } finally {
          ocupado.current = false;
          setRefrescando(false);
        }
      }
      actual.current = 0;
      setDistancia(0);
    };
    window.addEventListener("touchstart", alTocar, { passive: true });
    window.addEventListener("touchmove", alMover, { passive: true });
    window.addEventListener("touchend", alSoltar);
    window.addEventListener("touchcancel", alSoltar);
    return () => {
      window.removeEventListener("touchstart", alTocar);
      window.removeEventListener("touchmove", alMover);
      window.removeEventListener("touchend", alSoltar);
      window.removeEventListener("touchcancel", alSoltar);
    };
  }, []);

  return { distancia, refrescando };
}
