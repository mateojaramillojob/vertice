import { useEffect, useRef } from "react";

/**
 * Devuelve un ref para un elemento centinela al final de la lista: cuando entra
 * a 600 px del viewport se pide la siguiente página.
 */
export function useScrollInfinito(alLlegar: () => void, activo: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const callback = useRef(alLlegar);
  callback.current = alLlegar;

  useEffect(() => {
    const el = ref.current;
    if (!el || !activo) return;
    const obs = new IntersectionObserver((entradas) => entradas[0].isIntersecting && callback.current(), {
      rootMargin: "0px 0px 600px 0px",
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [activo]);

  return ref;
}
