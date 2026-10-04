import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { Foto } from "@/datos/tipos";
import { cn } from "@/lib/cn";
import { Foto as Imagen } from "./Foto";

interface Props {
  fotos: Foto[];
  /** alto ÷ ancho */
  proporcion?: number;
  className?: string;
}

/** Galería con swipe para el detalle de prenda. Propuesta: no está en el handoff. */
export function Carrusel({ fotos, proporcion = 4 / 3, className }: Props) {
  const [ref, api] = useEmblaCarousel({ loop: false });
  const [actual, setActual] = useState(0);

  const alCambiar = useCallback(() => api && setActual(api.selectedScrollSnap()), [api]);
  useEffect(() => {
    if (!api) return;
    api.on("select", alCambiar);
    return () => {
      api.off("select", alCambiar);
    };
  }, [api, alCambiar]);

  return (
    <section aria-roledescription="carrusel" aria-label="Fotos de la prenda" className={cn("relative", className)}>
      <div ref={ref} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {fotos.map((f, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="foto"
              aria-label={`${i + 1} de ${fotos.length}`}
              className="relative min-w-0 shrink-0 grow-0 basis-full overflow-hidden bg-surface-container"
              style={{ aspectRatio: `1 / ${proporcion}` }}
            >
              <Imagen foto={f} prioridad={i === 0} />
            </div>
          ))}
        </div>
      </div>
      {fotos.length > 1 && (
        <>
          <span className="absolute top-3 right-3 bg-primary/80 backdrop-blur-md px-2 py-0.5 rounded-full font-label text-micro text-white tabular-nums">
            {actual + 1}/{fotos.length}
          </span>
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1">
            {fotos.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === actual}
                onClick={() => api?.scrollTo(i)}
                className="relative toque-44 p-1"
              >
                <span className={cn("block h-1.5 rounded-full transition-all", i === actual ? "w-4 bg-white" : "w-1.5 bg-white/60")} />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
