import { UMBRAL_REFRESCO } from "@/hooks/usePullToRefresh";
import { useEnLinea } from "@/hooks/useEnLinea";
import { cn } from "@/lib/cn";
import { Icono } from "@/ui/Icono";

// Propuesta: el handoff no diseña pull-to-refresh ni estado sin conexión.

/** Indicador que baja desde el header mientras se tira hacia abajo. */
export function IndicadorRefresco({ distancia, refrescando }: { distancia: number; refrescando: boolean }) {
  if (!distancia && !refrescando) return null;
  const progreso = Math.min(1, distancia / UMBRAL_REFRESCO);
  return (
    <div
      role="status"
      aria-label={refrescando ? "Actualizando catálogo" : undefined}
      className="fixed inset-x-0 z-30 flex justify-center pointer-events-none"
      style={{ top: `calc(64px + env(safe-area-inset-top, 0px) + ${distancia * 0.6}px)` }}
    >
      <span
        className="w-9 h-9 rounded-full bg-white shadow-cta border border-outline-subtle flex items-center justify-center text-primary"
        style={{ opacity: 0.4 + progreso * 0.6 }}
      >
        {/* Gira al tirar: da la pista de cuánto falta para soltar. */}
        <span className="flex" style={refrescando ? undefined : { transform: `rotate(${progreso * 270}deg)` }}>
          <Icono nombre="refresh" tam={20} className={cn(refrescando && "motion-safe:animate-spin")} />
        </span>
      </span>
    </div>
  );
}

/** Barra bajo el header cuando no hay red; la PWA sigue mostrando lo que ya cargó. */
export function AvisoSinConexion() {
  const enLinea = useEnLinea();
  if (enLinea) return null;
  return (
    <div
      role="status"
      className="fixed inset-x-0 mx-auto max-w-app z-30 bg-primary text-white flex items-center justify-center gap-2 py-1.5 px-4 font-label text-meta"
      style={{ top: "calc(64px + env(safe-area-inset-top, 0px))" }}
    >
      <Icono nombre="wifi_off" tam={14} />
      <span>Sin conexión · ves lo último que cargaste</span>
    </div>
  );
}
