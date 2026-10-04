import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCategorias, useMarcas } from "@/datos/consultas";
import { EncabezadoSeccion } from "@/componentes/EncabezadoSeccion";
import { CATEGORIAS, NOMBRE_CATEGORIA } from "@/lib/categorias";
import { escribirFiltros } from "@/lib/filtrosUrl";
import { EtiquetaPropuesta } from "@/ui/Badge";
import { BarraBusqueda } from "@/ui/BarraBusqueda";
import { Chip } from "@/ui/Chip";
import { Esqueleto } from "@/ui/Estados";
import { Foto } from "@/ui/Foto";

const RANGOS = [
  { texto: "Hasta $800", min: null, max: 800 },
  { texto: "$800 – $2,000", min: 800, max: 2000 },
  { texto: "$2,000 – $4,000", min: 2000, max: 4000 },
  { texto: "Más de $4,000", min: 4000, max: null },
];

/** Propuesta: pestaña Explorar = categorías + búsqueda con filtros (C8). */
export default function Explorar() {
  const navegar = useNavigate();
  const [texto, setTexto] = useState("");
  const { data: datosCategorias } = useCategorias();
  const categorias = datosCategorias && [...datosCategorias].sort((a, b) => CATEGORIAS.indexOf(a.categoria) - CATEGORIAS.indexOf(b.categoria));
  const { data: marcas } = useMarcas();
  const buscar = (params: Parameters<typeof escribirFiltros>[0]) => navegar(`/buscar?${escribirFiltros(params)}`);

  return (
    <div className="flex flex-col pb-8">
      <div className="px-4 pt-4 pb-2 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2 px-1">
          <h1 className="font-headline text-lg font-bold text-primary uppercase tracking-tight">Explorar</h1>
          <EtiquetaPropuesta />
        </div>
        <BarraBusqueda
          valor={texto}
          onCambio={setTexto}
          onEnviar={(q) => q.trim() && buscar({ texto: q })}
          onFiltros={() => navegar("/buscar?filtros=1")}
        />
      </div>

      <section className="px-3 pt-3">
        <EncabezadoSeccion titulo="Categorías" />
        <div className="grid grid-cols-2 gap-3">
          {!categorias
            ? Array.from({ length: 6 }, (_, i) => <Esqueleto key={i} className="aspect-[4/3] rounded-xl" />)
            : categorias.map((c) => (
                <Link
                  key={c.categoria}
                  to={`/buscar?${escribirFiltros({ categoria: c.categoria })}`}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-outline-subtle/80 shadow-sm bg-white flex flex-col justify-end"
                >
                  <Foto foto={{ ...c.foto, alt: "" }} zoomHover />
                  {/* Misma franja que el overlay de la tarjeta del handoff. */}
                  <span className="relative z-10 px-3 py-2 bg-primary/90 backdrop-blur-md text-white flex items-baseline justify-between gap-2">
                    <span className="font-headline text-sm font-semibold">{NOMBRE_CATEGORIA[c.categoria]}</span>
                    <span className="font-label text-micro text-on-primary-variant tabular-nums">{c.total}</span>
                  </span>
                </Link>
              ))}
        </div>
      </section>

      <section className="px-3 pt-6">
        <EncabezadoSeccion titulo="Por precio" />
        <div className="flex flex-wrap gap-2 px-1">
          {RANGOS.map((r) => (
            <Chip key={r.texto} onClick={() => buscar({ precioMin: r.min, precioMax: r.max })}>
              {r.texto}
            </Chip>
          ))}
        </div>
      </section>

      <section className="px-3 pt-6">
        <EncabezadoSeccion titulo="Marcas" />
        <div className="flex flex-wrap gap-2 px-1">
          {marcas?.map((m) => (
            <Chip key={m.marca} onClick={() => buscar({ texto: m.marca })}>
              {m.marca} <span className="text-on-surface-variant/80">({m.total})</span>
            </Chip>
          ))}
        </div>
      </section>
    </div>
  );
}
