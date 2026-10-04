import { useNavigate } from "react-router-dom";
import { usePrendas } from "@/datos/consultas";
import { useGuardados } from "@/hooks/useGuardados";
import { GrillaOffset } from "@/componentes/GrillaOffset";
import { GrillaPrendas } from "@/componentes/GrillaPrendas";
import { EtiquetaPropuesta } from "@/ui/Badge";
import { EstadoVacio } from "@/ui/Estados";

/** Propuesta: pestaña Guardados. Lo último guardado va primero. */
export default function Guardados() {
  const navegar = useNavigate();
  const { ids } = useGuardados();
  const { data: prendas } = usePrendas(ids);

  return (
    <div className="px-3 pt-4 pb-8">
      <div className="flex items-center justify-between gap-2 px-1 pb-3">
        <h1 className="font-headline text-lg font-bold text-primary uppercase tracking-tight">
          Guardados{ids.length > 0 && <span className="text-on-surface-variant"> ({ids.length})</span>}
        </h1>
        <EtiquetaPropuesta />
      </div>
      {ids.length === 0 ? (
        <EstadoVacio
          icono="bookmark"
          titulo="Aún no guardas prendas"
          texto="Toca el marcador de una prenda para tenerla a mano aquí."
          accion={{ texto: "Ver el catálogo", onClick: () => navegar("/") }}
        />
      ) : !prendas ? (
        <GrillaOffset items={[]} render={() => null} cargando={Math.min(ids.length, 4)} />
      ) : (
        <GrillaPrendas prendas={prendas.filter((p) => ids.includes(p.id))} />
      )}
    </div>
  );
}
