import { Link } from "react-router-dom";
import type { Notificacion, TipoNotificacion } from "@/datos/tipos";
import { useMarcarLeidas, useNotificaciones } from "@/datos/consultas";
import { MarcoPantalla } from "@/componentes/Marcos";
import { cn } from "@/lib/cn";
import { haceCuanto } from "@/lib/formato";
import { Cargando, EstadoVacio } from "@/ui/Estados";
import { Icono } from "@/ui/Icono";
import type { NombreIcono } from "@/ui/iconos";

const ICONO: Record<TipoNotificacion, NombreIcono> = {
  precio: "trending_down",
  inspeccion: "verified",
  guardado: "bookmark",
  envio: "local_shipping",
  sistema: "notifications",
};

function Fila({ n, onAbrir }: { n: Notificacion; onAbrir: () => void }) {
  const contenido = (
    <>
      <span className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", n.leida ? "bg-surface-container text-on-surface-variant" : "bg-primary text-white")}>
        <Icono nombre={ICONO[n.tipo]} tam={20} />
      </span>
      <span className="flex flex-col min-w-0 flex-1">
        <span className="font-label text-sm font-semibold text-on-surface">{n.titulo}</span>
        <span className="text-sm text-on-surface-variant">{n.cuerpo}</span>
        <span className="font-label text-meta uppercase tracking-wider text-on-surface-variant mt-1">{haceCuanto(n.fecha)}</span>
      </span>
      {!n.leida && (
        <span className="w-2 h-2 rounded-full bg-cobalt mt-2 shrink-0">
          <span className="sr-only">Sin leer</span>
        </span>
      )}
    </>
  );
  const clase = cn("flex items-start gap-3 px-4 py-3.5", !n.leida && "bg-surface-container-lowest");
  return n.prendaId ? (
    <Link to={`/prenda/${n.prendaId}`} onClick={onAbrir} className={cn(clase, "hover:bg-surface-container")}>
      {contenido}
    </Link>
  ) : (
    <div className={clase}>{contenido}</div>
  );
}

/** Propuesta: notificaciones (campana del header del handoff). */
export default function Notificaciones() {
  const { data: notificaciones, isPending } = useNotificaciones();
  const marcarLeidas = useMarcarLeidas();
  const sinLeer = notificaciones?.filter((n) => !n.leida) ?? [];
  const leidas = notificaciones?.filter((n) => n.leida) ?? [];
  const secciones = [
    { titulo: "Nuevas", lista: sinLeer },
    { titulo: "Anteriores", lista: leidas },
  ];

  return (
    <MarcoPantalla
      titulo="Notificaciones"
      acciones={
        sinLeer.length > 0 && (
          <button type="button" onClick={() => marcarLeidas()} className="relative toque-44 px-2 font-label text-xs uppercase tracking-wider font-semibold text-cobalt">
            Marcar leídas
          </button>
        )
      }
    >
      {isPending ? (
        <Cargando etiqueta="Cargando notificaciones" />
      ) : !notificaciones?.length ? (
        <EstadoVacio icono="notifications" titulo="Sin notificaciones" texto="Aquí verás bajadas de precio, inspecciones y envíos." />
      ) : (
        <>
          {secciones.map(
            ({ titulo, lista }) =>
              lista.length > 0 && (
                <section key={titulo} aria-label={titulo}>
                  <h2 className="px-4 pt-5 pb-2 font-headline text-sm font-semibold uppercase tracking-tight text-on-surface">{titulo}</h2>
                  <ul className="divide-y divide-outline-subtle border-y border-outline-subtle">
                    {lista.map((n) => (
                      <li key={n.id}>
                        <Fila n={n} onAbrir={() => marcarLeidas([n.id])} />
                      </li>
                    ))}
                  </ul>
                </section>
              ),
          )}
        </>
      )}
    </MarcoPantalla>
  );
}
