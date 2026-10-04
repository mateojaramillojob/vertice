import { Link, useNavigate } from "react-router-dom";
import { useNotificaciones } from "@/datos/consultas";
import { Avatar } from "@/ui/Avatar";
import { BotonIcono } from "@/ui/BotonIcono";

/** Header fijo del handoff: logotipo, badge de moneda, buscar, notificaciones y perfil. */
export function Encabezado() {
  const navegar = useNavigate();
  const { data: notificaciones } = useNotificaciones();
  const sinLeer = notificaciones?.filter((n) => !n.leida).length ?? 0;

  return (
    <header className="fixed top-0 inset-x-0 mx-auto w-full max-w-app z-40 bg-white/90 backdrop-blur-xl pt-safe border-b border-outline-subtle/80 shadow-header">
      <div className="h-16 px-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Link to="/" aria-label="Vértice, ir al inicio" className="font-headline text-logo tracking-tight text-primary uppercase font-bold">
            VÉRTICE
          </Link>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container border border-outline-subtle">
            <span aria-hidden="true" className="text-[11px] leading-none">
              🇲🇽
            </span>
            <span className="font-label text-micro font-semibold text-on-surface-variant uppercase tracking-wider">
              <span className="sr-only">Moneda: </span>MXN
            </span>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <BotonIcono etiqueta="Buscar" icono="search" onClick={() => navegar("/buscar")} />
          <BotonIcono
            etiqueta={sinLeer ? `Notificaciones, ${sinLeer} sin leer` : "Notificaciones"}
            icono="notifications"
            punto={sinLeer > 0}
            onClick={() => navegar("/notificaciones")}
          />
          <Link to="/perfil" aria-label="Mi perfil" className="relative toque-44 ml-1 rounded-full">
            <Avatar />
          </Link>
        </div>
      </div>
    </header>
  );
}
