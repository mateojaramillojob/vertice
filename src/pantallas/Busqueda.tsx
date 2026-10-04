import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { FiltrosCatalogo } from "@/datos/tipos";
import { useCatalogo, useMarcas } from "@/datos/consultas";
import { useScrollInfinito } from "@/hooks/useScrollInfinito";
import { EncabezadoSeccion } from "@/componentes/EncabezadoSeccion";
import { GrillaOffset } from "@/componentes/GrillaOffset";
import { GrillaPrendas } from "@/componentes/GrillaPrendas";
import { HojaFiltros } from "@/componentes/HojaFiltros";
import { MarcoPantalla } from "@/componentes/Marcos";
import { escribir, leer } from "@/lib/almacen";
import { CATEGORIAS, CONDICIONES, NOMBRE_CATEGORIA } from "@/lib/categorias";
import { contarActivos, escribirFiltros, leerFiltros, NOMBRE_ORDEN } from "@/lib/filtrosUrl";
import { formatoPrecio } from "@/lib/formato";
import { BarraBusqueda } from "@/ui/BarraBusqueda";
import { Chip } from "@/ui/Chip";
import { EstadoError, EstadoVacio } from "@/ui/Estados";
import { Icono } from "@/ui/Icono";

const CLAVE_RECIENTES = "vertice.busquedas";

/** Chips de los filtros aplicados; tocar uno lo quita. */
function filtrosActivos(f: FiltrosCatalogo): { texto: string; quitar: Partial<FiltrosCatalogo> }[] {
  const out: { texto: string; quitar: Partial<FiltrosCatalogo> }[] = [];
  if (f.categoria) out.push({ texto: NOMBRE_CATEGORIA[f.categoria], quitar: { categoria: null } });
  for (const t of f.tallas ?? []) out.push({ texto: `Talla ${t}`, quitar: { tallas: f.tallas!.filter((x) => x !== t) } });
  for (const c of f.condiciones ?? [])
    out.push({ texto: CONDICIONES.find((x) => x.id === c)?.nombre ?? c, quitar: { condiciones: f.condiciones!.filter((x) => x !== c) } });
  if (f.precioMin != null || f.precioMax != null) {
    const texto =
      f.precioMin != null && f.precioMax != null
        ? `${formatoPrecio(f.precioMin, "MXN")} – ${formatoPrecio(f.precioMax, "MXN")}`
        : f.precioMin != null
          ? `Desde ${formatoPrecio(f.precioMin, "MXN")}`
          : `Hasta ${formatoPrecio(f.precioMax!, "MXN")}`;
    out.push({ texto, quitar: { precioMin: null, precioMax: null } });
  }
  if (f.orden && f.orden !== "curada") out.push({ texto: NOMBRE_ORDEN[f.orden], quitar: { orden: "curada" } });
  return out;
}

/** Propuesta: búsqueda y resultados. Los filtros viven en la URL. */
export default function Busqueda() {
  const [sp, setSp] = useSearchParams();
  const clave = sp.toString();
  // Memo por el texto de la URL: el objeto de filtros es la clave de la consulta.
  const filtros = useMemo(() => leerFiltros(new URLSearchParams(clave)), [clave]);
  const hayBusqueda = !!filtros.texto || contarActivos(filtros) > 0;

  const [texto, setTexto] = useState(filtros.texto ?? "");
  useEffect(() => setTexto(filtros.texto ?? ""), [filtros.texto]);
  const [hojaAbierta, setHojaAbierta] = useState(sp.get("filtros") === "1");
  const [recientes, setRecientes] = useState<string[]>(() => leer(CLAVE_RECIENTES, []));

  const catalogo = useCatalogo(filtros, { activo: hayBusqueda });
  const prendas = catalogo.data?.pages.flatMap((p) => p.items) ?? [];
  const total = catalogo.data?.pages[0]?.total ?? 0;
  const centinela = useScrollInfinito(() => {
    if (catalogo.hasNextPage && !catalogo.isFetchingNextPage) catalogo.fetchNextPage();
  }, !!catalogo.hasNextPage);
  const { data: marcas } = useMarcas();

  const aplicar = (f: FiltrosCatalogo) => {
    setSp(escribirFiltros(f));
    setHojaAbierta(false);
    const q = f.texto?.trim();
    if (q) {
      const nuevas = [q, ...recientes.filter((r) => r.toLowerCase() !== q.toLowerCase())].slice(0, 6);
      setRecientes(nuevas);
      escribir(CLAVE_RECIENTES, nuevas);
    }
  };
  const cambiarHoja = (abierta: boolean) => {
    setHojaAbierta(abierta);
    if (!abierta && sp.has("filtros")) setSp(escribirFiltros(filtros), { replace: true });
  };

  return (
    <MarcoPantalla titulo="Buscar">
      <div className="px-4 pt-3.5 pb-2 flex flex-col gap-3">
        <BarraBusqueda
          valor={texto}
          onCambio={setTexto}
          onEnviar={(q) => aplicar({ ...filtros, texto: q })}
          onFiltros={() => setHojaAbierta(true)}
          filtrosActivos={contarActivos(filtros)}
          autoFocus={!hayBusqueda && !hojaAbierta}
        />
        {filtrosActivos(filtros).length > 0 && (
          <div role="group" aria-label="Filtros aplicados" className="flex items-center gap-2 overflow-x-auto no-scrollbar py-[7px] -my-[5px]">
            {filtrosActivos(filtros).map((a) => (
              <Chip key={a.texto} activo aria-label={`Quitar filtro ${a.texto}`} onClick={() => aplicar({ ...filtros, ...a.quitar })}>
                <span className="flex items-center gap-1">
                  {a.texto} <Icono nombre="close" tam={14} />
                </span>
              </Chip>
            ))}
          </div>
        )}
      </div>

      {!hayBusqueda ? (
        <div className="px-3 pt-2 flex flex-col gap-6">
          {recientes.length > 0 && (
            <section>
              <EncabezadoSeccion titulo="Búsquedas recientes" />
              <div className="flex flex-wrap gap-2 px-1">
                {recientes.map((r) => (
                  <Chip key={r} onClick={() => aplicar({ ...filtros, texto: r })}>
                    <span className="flex items-center gap-1">
                      <Icono nombre="history" tam={14} /> {r}
                    </span>
                  </Chip>
                ))}
              </div>
            </section>
          )}
          <section>
            <EncabezadoSeccion titulo="Categorías" />
            <div className="flex flex-wrap gap-2 px-1">
              {CATEGORIAS.map((c) => (
                <Chip key={c} onClick={() => aplicar({ ...filtros, categoria: c })}>
                  {NOMBRE_CATEGORIA[c]}
                </Chip>
              ))}
            </div>
          </section>
          <section>
            <EncabezadoSeccion titulo="Marcas" />
            <div className="flex flex-wrap gap-2 px-1">
              {marcas?.slice(0, 14).map((m) => (
                <Chip key={m.marca} onClick={() => aplicar({ ...filtros, texto: m.marca })}>
                  {m.marca} <span className="text-on-surface-variant/80">({m.total})</span>
                </Chip>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <section aria-label="Resultados" className="px-3 pt-2 pb-8">
          <EncabezadoSeccion
            titulo={catalogo.isPending ? "Buscando…" : `${total} resultado${total === 1 ? "" : "s"}${filtros.texto ? ` · “${filtros.texto}”` : ""}`}
          />
          {catalogo.isPending ? (
            <GrillaOffset items={[]} render={() => null} cargando={4} />
          ) : catalogo.isError ? (
            <EstadoError onReintentar={() => catalogo.refetch()} />
          ) : prendas.length === 0 ? (
            <EstadoVacio
              icono="search"
              titulo="Sin resultados"
              texto="Prueba con otra palabra o quita algunos filtros."
              accion={{ texto: "Quitar filtros", onClick: () => aplicar({ texto: filtros.texto }) }}
            />
          ) : (
            <GrillaPrendas key={clave} prendas={prendas} cargando={catalogo.isFetchingNextPage ? 2 : 0} />
          )}
          <div ref={centinela} aria-hidden="true" />
        </section>
      )}

      <HojaFiltros abierta={hojaAbierta} onCambio={cambiarHoja} filtros={filtros} onAplicar={(f) => aplicar({ ...f, texto })} />
    </MarcoPantalla>
  );
}
