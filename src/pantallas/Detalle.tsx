import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePrenda, usePrendasDeVendedor, useResenas } from "@/datos/consultas";
import { MINUTOS_RESERVA, useBolsa } from "@/hooks/useBolsa";
import { useGuardados } from "@/hooks/useGuardados";
import { EncabezadoSeccion } from "@/componentes/EncabezadoSeccion";
import { GrillaPrendas } from "@/componentes/GrillaPrendas";
import { MarcoPantalla } from "@/componentes/Marcos";
import { SelloAutenticidad } from "@/componentes/SelloAutenticidad";
import { NOMBRE_CATEGORIA } from "@/lib/categorias";
import { cn } from "@/lib/cn";
import { fechaMesAnio, haceCuanto } from "@/lib/formato";
import { Aviso } from "@/ui/Aviso";
import { Avatar } from "@/ui/Avatar";
import { Badge } from "@/ui/Badge";
import { Boton } from "@/ui/Boton";
import { BotonIcono } from "@/ui/BotonIcono";
import { Carrusel } from "@/ui/Carrusel";
import { Esqueleto, EstadoVacio } from "@/ui/Estados";
import { Precio } from "@/ui/Precio";
import { Estrellas, Valoracion } from "@/ui/Valoracion";

/** Propuesta: detalle de prenda. Se llega desde la miniatura o el título de la compra rápida. */
export default function Detalle() {
  const { id } = useParams();
  const navegar = useNavigate();
  const { data: prenda, isPending } = usePrenda(id);
  const { estaGuardada, alternar } = useGuardados();
  const { contiene, agregar } = useBolsa();
  const [avisoVisible, setAvisoVisible] = useState(false);

  const otras = usePrendasDeVendedor(prenda?.vendedor.id).data?.filter((p) => p.id !== prenda?.id).slice(0, 4) ?? [];
  const { data: resenas } = useResenas(prenda?.vendedor.id);

  if (isPending) {
    return (
      <MarcoPantalla titulo="Cargando…">
        <Esqueleto className="w-full aspect-[4/5] rounded-none" />
        <div className="px-4 pt-4 flex flex-col gap-2">
          <Esqueleto className="h-4 w-32" />
          <Esqueleto className="h-6 w-56" />
          <Esqueleto className="h-7 w-28" />
        </div>
      </MarcoPantalla>
    );
  }
  if (!prenda) {
    return (
      <MarcoPantalla titulo="Prenda no disponible">
        <EstadoVacio
          icono="inventory_2"
          titulo="Esta prenda ya no está disponible"
          texto="Puede que se haya vendido o que la hayan retirado."
          accion={{ texto: "Volver al catálogo", onClick: () => navegar("/") }}
        />
      </MarcoPantalla>
    );
  }

  const guardada = estaGuardada(prenda.id);
  const enBolsa = contiene(prenda.id);
  const compartir = typeof navigator.share === "function";

  const anadir = () => {
    agregar(prenda.id);
    setAvisoVisible(true);
  };

  const pie = (
    <div className="flex flex-col gap-2">
      {avisoVisible && (
        <Aviso>
          ¡Prenda agregada a tu bolsa con reserva de {MINUTOS_RESERVA}&nbsp;min!{" "}
          <Link to="/bolsa" className="relative toque-44 whitespace-nowrap underline underline-offset-2 font-semibold text-cobalt-light">
            Ver bolsa
          </Link>
        </Aviso>
      )}
      {enBolsa ? (
        <Boton icono="shopping_bag" onClick={() => navegar("/bolsa")}>
          En tu bolsa · Ver bolsa
        </Boton>
      ) : (
        <Boton icono="shopping_bag" onClick={anadir}>
          Añadir a la Bolsa · Compra Segura
        </Boton>
      )}
    </div>
  );

  const detalles: [string, string][] = [
    ["Categoría", NOMBRE_CATEGORIA[prenda.categoria]],
    ["Talla", prenda.talla],
    ["Condición", prenda.condicion],
    ["Ubicación", prenda.ciudad],
    ["Publicada", haceCuanto(prenda.publicadaEn)],
  ];

  return (
    <MarcoPantalla
      titulo={prenda.tituloCorto ?? prenda.titulo}
      pie={pie}
      acciones={
        <>
          {compartir && (
            <BotonIcono
              etiqueta="Compartir"
              icono="share"
              onClick={() => navigator.share({ title: prenda.titulo, url: location.href }).catch(() => undefined)}
            />
          )}
          <BotonIcono
            etiqueta={guardada ? "Quitar de Guardados" : "Guardar"}
            icono="bookmark"
            relleno={guardada}
            aria-pressed={guardada}
            onClick={() => alternar(prenda.id)}
            className={cn(guardada && "text-cobalt hover:text-cobalt")}
          />
        </>
      }
    >
      <Carrusel fotos={prenda.fotos} proporcion={5 / 4} />

      <div className="px-4 pt-4 flex flex-col gap-1">
        <span className="text-xs font-label tracking-wider uppercase text-on-surface-variant font-semibold">{prenda.marca}</span>
        <h2 className="text-xl font-headline font-bold text-primary leading-snug">{prenda.titulo}</h2>
        <Precio valor={prenda.precio} moneda={prenda.moneda} tam="lg" anterior={prenda.precioAnterior} className="text-primary" />
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <Badge variante="condicion">{prenda.condicion}</Badge>
          <Badge variante="talla">Talla: {prenda.talla}</Badge>
        </div>
      </div>

      <div className="px-4 pt-5 flex flex-col gap-2">
        <span className="text-meta font-label uppercase text-on-surface-variant tracking-wider">Reporte de Inspección Vértice</span>
        <p className="text-sm text-on-surface leading-relaxed font-body">{prenda.descripcion}</p>
        <SelloAutenticidad />
      </div>

      <dl className="mx-4 mt-4 rounded-xl border border-outline-subtle bg-surface-container-lowest divide-y divide-outline-subtle">
        {detalles.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4 px-3 py-2.5">
            <dt className="font-label text-meta uppercase tracking-wider text-on-surface-variant">{k}</dt>
            <dd className="text-sm text-on-surface text-right">{v}</dd>
          </div>
        ))}
      </dl>

      <section aria-label="Quién vende" className="mx-4 mt-4 rounded-xl border border-outline-subtle bg-surface-container-lowest p-3 flex items-center gap-3">
        <Avatar nombre={prenda.vendedor.nombre} tam={44} />
        <div className="flex flex-col min-w-0 flex-1">
          <span className="font-headline text-sm font-bold text-primary truncate">{prenda.vendedor.nombre}</span>
          <span className="text-xs text-on-surface-variant">
            {prenda.vendedor.ciudad} · {prenda.vendedor.ventas} ventas · desde {fechaMesAnio(prenda.vendedor.miembroDesde)}
          </span>
          <Valoracion valor={prenda.vendedor.valoracion} resenas={prenda.vendedor.resenas} className="mt-0.5" />
        </div>
      </section>

      {!!resenas?.length && (
        <section className="px-4 pt-6">
          <EncabezadoSeccion titulo={`Reseñas de ${prenda.vendedor.nombre.split(" ")[0]}`} />
          <ul className="flex flex-col gap-3 px-1">
            {resenas.slice(0, 2).map((r) => (
              <li key={r.id} className="border-b border-surface-container pb-3 last:border-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-label text-xs font-semibold text-on-surface">
                    {r.autor} · <span className="font-normal text-on-surface-variant">{r.ciudad}</span>
                  </span>
                  <Estrellas valor={r.estrellas} />
                </div>
                <p className="text-sm text-on-surface mt-1">{r.texto}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {otras.length > 0 && (
        <section className="px-3 pt-6">
          <EncabezadoSeccion titulo={`Más de ${prenda.vendedor.nombre.split(" ")[0]}`} />
          <GrillaPrendas key={prenda.id} prendas={otras} />
        </section>
      )}
    </MarcoPantalla>
  );
}
