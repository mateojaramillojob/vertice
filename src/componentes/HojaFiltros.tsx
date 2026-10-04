import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Categoria, FiltrosCatalogo, Orden } from "@/datos/tipos";
import { useContarPrendas } from "@/datos/consultas";
import { CATEGORIAS, CONDICIONES, NOMBRE_CATEGORIA, TALLAS } from "@/lib/categorias";
import { NOMBRE_ORDEN } from "@/lib/filtrosUrl";
import { EtiquetaPropuesta } from "@/ui/Badge";
import { Boton } from "@/ui/Boton";
import { Chip } from "@/ui/Chip";
import { Hoja, HojaTitulo } from "@/ui/Hoja";

interface Props {
  abierta: boolean;
  onCambio: (abierta: boolean) => void;
  filtros: FiltrosCatalogo;
  onAplicar: (f: FiltrosCatalogo) => void;
}

const alternar = (lista: string[] = [], v: string) => (lista.includes(v) ? lista.filter((x) => x !== v) : [...lista, v]);

function Grupo({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <fieldset className="py-3 border-b border-surface-container last:border-0">
      <legend className="font-label text-meta uppercase tracking-wider text-on-surface-variant mb-2.5">{titulo}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

/**
 * Propuesta: filtros en bottom sheet (el botón `tune` del buscador del handoff
 * no tenía destino). Se edita un borrador; el conteo del botón es en vivo.
 */
export function HojaFiltros({ abierta, onCambio, filtros, onAplicar }: Props) {
  const [borrador, setBorrador] = useState(filtros);
  // El borrador se reinicia solo al abrir: así no se pisa mientras se edita.
  const actuales = useRef(filtros);
  actuales.current = filtros;
  useEffect(() => {
    if (abierta) setBorrador(actuales.current);
  }, [abierta]);

  const { data: conteo, isFetching } = useContarPrendas(borrador);
  const cambiar = (cambio: Partial<FiltrosCatalogo>) => setBorrador((b) => ({ ...b, ...cambio }));
  const precio = (v: string) => (v.trim() === "" || Number.isNaN(Number(v)) ? null : Number(v));

  return (
    <Hoja abierta={abierta} onCambio={onCambio}>
      <div className="flex items-center justify-between gap-2 pb-1">
        <HojaTitulo className="font-headline text-base font-bold text-primary flex items-center gap-2">
          Filtros <EtiquetaPropuesta />
        </HojaTitulo>
        <button
          type="button"
          onClick={() => setBorrador({ texto: filtros.texto, orden: "curada" })}
          className="relative toque-44 font-label text-xs uppercase tracking-wider font-semibold text-cobalt"
        >
          Limpiar
        </button>
      </div>

      <Grupo titulo="Ordenar por">
        {(Object.keys(NOMBRE_ORDEN) as Orden[]).map((o) => (
          <Chip key={o} activo={(borrador.orden ?? "curada") === o} onClick={() => cambiar({ orden: o })}>
            {NOMBRE_ORDEN[o]}
          </Chip>
        ))}
      </Grupo>

      <Grupo titulo="Categoría">
        <Chip activo={!borrador.categoria} onClick={() => cambiar({ categoria: null })}>
          Todas
        </Chip>
        {CATEGORIAS.map((c: Categoria) => (
          <Chip key={c} activo={borrador.categoria === c} onClick={() => cambiar({ categoria: c })}>
            {NOMBRE_CATEGORIA[c]}
          </Chip>
        ))}
      </Grupo>

      <Grupo titulo="Talla">
        {[...TALLAS.ropa, ...TALLAS.cintura, ...TALLAS.calzado, ...TALLAS.otras].map((t) => (
          <Chip key={t} activo={borrador.tallas?.includes(t)} onClick={() => cambiar({ tallas: alternar(borrador.tallas, t) })}>
            {TALLAS.calzado.includes(t) ? `${t} EU` : t}
          </Chip>
        ))}
      </Grupo>

      <Grupo titulo="Condición">
        {CONDICIONES.map((c) => (
          <Chip key={c.id} activo={borrador.condiciones?.includes(c.id)} onClick={() => cambiar({ condiciones: alternar(borrador.condiciones, c.id) })}>
            {c.nombre}
          </Chip>
        ))}
      </Grupo>

      <Grupo titulo="Precio (MXN)">
        <div className="grid grid-cols-2 gap-3 w-full">
          {(
            [
              ["Mínimo", "precioMin", "0"],
              ["Máximo", "precioMax", "Sin límite"],
            ] as const
          ).map(([etiqueta, campo, marcador]) => (
            <label key={campo} className="flex flex-col gap-1">
              <span className="font-label text-micro uppercase tracking-wider text-on-surface-variant">{etiqueta}</span>
              <span className="flex items-center gap-1 rounded-xl border border-outline-subtle bg-surface-container-lowest px-3 focus-within:border-on-surface-variant/50">
                <span className="text-on-surface-variant">$</span>
                <input
                  inputMode="numeric"
                  value={borrador[campo] ?? ""}
                  onChange={(e) => cambiar({ [campo]: precio(e.target.value) })}
                  placeholder={marcador}
                  className="h-11 w-full min-w-0 bg-transparent text-on-surface placeholder:text-on-surface-variant focus:outline-none tabular-nums"
                />
              </span>
            </label>
          ))}
        </div>
      </Grupo>

      <div className="pt-4">
        <Boton icono="search" cargando={isFetching && conteo == null} disabled={conteo === 0} onClick={() => onAplicar(borrador)}>
          {conteo == null ? "Ver prendas" : conteo === 0 ? "Sin resultados" : `Ver ${conteo} prenda${conteo === 1 ? "" : "s"}`}
        </Boton>
      </div>
    </Hoja>
  );
}
