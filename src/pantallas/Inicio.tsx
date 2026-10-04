import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Categoria } from "@/datos/tipos";
import { useCatalogo } from "@/datos/consultas";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import { useScrollInfinito } from "@/hooks/useScrollInfinito";
import { IndicadorRefresco } from "@/componentes/Avisos";
import { BannerCustodia } from "@/componentes/BannerCustodia";
import { EncabezadoSeccion } from "@/componentes/EncabezadoSeccion";
import { FilaCategorias } from "@/componentes/FilaCategorias";
import { GrillaOffset } from "@/componentes/GrillaOffset";
import { GrillaPrendas } from "@/componentes/GrillaPrendas";
import { HojaFiltros } from "@/componentes/HojaFiltros";
import { SubencabezadoCatalogo } from "@/componentes/SubencabezadoCatalogo";
import { escribirFiltros } from "@/lib/filtrosUrl";
import { BarraBusqueda } from "@/ui/BarraBusqueda";
import { EstadoError, EstadoVacio } from "@/ui/Estados";

/** P1 del handoff: Inicio / catálogo curado (design/screen.png). */
export default function Inicio() {
  const navegar = useNavigate();
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [orden, setOrden] = useState<"curada" | "recientes">("curada");
  // Propuesta: el botón `tune` del handoff abre los filtros; al aplicar se va a resultados.
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);

  const catalogo = useCatalogo({ categoria, orden });
  const prendas = catalogo.data?.pages.flatMap((p) => p.items) ?? [];
  const total = catalogo.data?.pages[0]?.total ?? 0;

  const centinela = useScrollInfinito(() => {
    if (catalogo.hasNextPage && !catalogo.isFetchingNextPage) catalogo.fetchNextPage();
  }, !!catalogo.hasNextPage);
  const refresco = usePullToRefresh(catalogo.refrescar);

  const cambiarCategoria = (c: Categoria | null) => setCategoria(c);

  return (
    <>
      <IndicadorRefresco {...refresco} />
      <div className="flex flex-col w-full text-on-surface">
        <BannerCustodia />

        <div className="px-4 pt-3.5 pb-2 flex flex-col gap-3">
          <BarraBusqueda
            valor={texto}
            onCambio={setTexto}
            onEnviar={(q) => q.trim() && navegar(`/buscar?q=${encodeURIComponent(q.trim())}`)}
            onFiltros={() => setFiltrosAbiertos(true)}
          />
          <FilaCategorias actual={categoria} onCambio={cambiarCategoria} />
          <SubencabezadoCatalogo orden={orden} onCambio={setOrden} />
        </div>

        <section aria-label="Catálogo" className="px-3 pt-2 pb-8">
          <EncabezadoSeccion titulo="Catálogo Verificado · Archivo Offset" accion="Vista Offset" />

          {catalogo.isPending ? (
            <GrillaOffset items={[]} render={() => null} cargando={6} />
          ) : catalogo.isError ? (
            <EstadoError onReintentar={() => catalogo.refetch()} />
          ) : prendas.length === 0 ? (
            <EstadoVacio
              icono="inventory_2"
              titulo="No hay prendas en esta categoría"
              texto="Prueba con otra categoría o vuelve más tarde."
              accion={{ texto: "Ver todas", onClick: () => cambiarCategoria(null) }}
            />
          ) : (
            // Cambiar de categoría u orden remonta la grilla: se cierra la tarjeta abierta.
            <GrillaPrendas key={`${categoria}-${orden}`} prendas={prendas} cargando={catalogo.isFetchingNextPage ? 2 : 0} />
          )}

          <div ref={centinela} aria-hidden="true" />
          {catalogo.isFetchNextPageError && (
            <EstadoError mensaje="No se pudieron cargar más prendas." onReintentar={() => catalogo.fetchNextPage()} />
          )}
          {!catalogo.hasNextPage && prendas.length > 0 && (
            // Propuesta: fin del scroll infinito.
            <p className="pt-8 text-center font-label text-meta uppercase tracking-wider text-on-surface-variant">
              Viste las {total} prendas del catálogo
            </p>
          )}
        </section>
      </div>

      <HojaFiltros
        abierta={filtrosAbiertos}
        onCambio={setFiltrosAbiertos}
        filtros={{ texto, categoria, orden }}
        onAplicar={(f) => navegar(`/buscar?${escribirFiltros({ ...f, texto })}`)}
      />
    </>
  );
}
