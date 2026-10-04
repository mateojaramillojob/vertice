import type { Prenda } from "@/datos/tipos";
import { cn } from "@/lib/cn";
import { formatoPrecio } from "@/lib/formato";
import { Badge } from "@/ui/Badge";
import { BotonIcono } from "@/ui/BotonIcono";
import { Foto } from "@/ui/Foto";
import { Icono } from "@/ui/Icono";
import { Pildora } from "@/ui/Pildora";
import { Precio } from "@/ui/Precio";
import { BotonGuardar } from "./BotonGuardar";

interface Props {
  prenda: Prenda;
  /** Overlay desplegado (primer toque). Al cargar, ninguna tarjeta viene abierta. */
  abierta: boolean;
  /** Primer toque abre el overlay; con el overlay abierto, el toque abre la compra rápida. */
  onToque: () => void;
  onCerrar: () => void;
  prioridad?: boolean;
}

/** Tarjeta de prenda del handoff (.product-card), con el overlay de dos toques. */
export function TarjetaPrenda({ prenda, abierta, onToque, onCerrar, prioridad }: Props) {
  const titulo = prenda.tituloCorto ?? prenda.titulo;
  const marca = prenda.marcaCorta ?? prenda.marca;

  return (
    <article
      className="group relative bg-white rounded-xl overflow-hidden border border-outline-subtle/80 shadow-sm flex flex-col justify-end select-none [container-type:inline-size]"
      style={{ aspectRatio: `1 / ${prenda.proporcion}` }}
    >
      <Foto foto={prenda.fotos[0]} prioridad={prioridad} zoomHover />

      {/* Toda la tarjeta es el botón; el overlay es visual y su texto va en la etiqueta. */}
      <button
        type="button"
        onClick={onToque}
        aria-expanded={abierta}
        aria-haspopup={abierta ? "dialog" : undefined}
        aria-label={`${titulo}, ${marca}, talla ${prenda.talla}, ${formatoPrecio(prenda.precio, prenda.moneda)}`}
        className="absolute inset-0 z-[5] w-full cursor-pointer rounded-xl"
      />

      {abierta && <Pildora className="absolute top-2.5 left-2.5 z-10 pointer-events-none">Activo</Pildora>}

      <div className="absolute top-2.5 right-2.5 z-10">
        {abierta ? (
          <BotonIcono variante="foto-oscuro" icono="unfold_less" etiqueta="Ocultar detalles" onClick={onCerrar} />
        ) : (
          <BotonGuardar prenda={prenda} />
        )}
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "relative z-10 p-3 bg-primary/95 backdrop-blur-md text-white flex flex-col gap-1 rounded-b-xl border-t border-white/10 pointer-events-none transition-all duration-300",
          abierta ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
        )}
      >
        <div className="flex items-baseline justify-between gap-2">
          <span className="min-w-0 truncate text-meta font-label tracking-wider uppercase text-on-primary-variant">{marca}</span>
          <Badge variante="talla-foto">Talla {prenda.talla}</Badge>
        </div>
        <p className="text-xs font-headline font-semibold truncate leading-tight">{titulo}</p>
        <div className="flex items-center justify-between gap-2 pt-1">
          <Precio valor={prenda.precio} moneda={prenda.moneda} className="text-white" />
          {/* A 360 px la tarjeta mide 162: ahí "Comprar" deja solo la flecha para no partir el precio (A2). */}
          <span className="shrink-0 font-label text-micro uppercase underline flex items-center gap-0.5 text-cobalt-light">
            <span className="[@container(max-width:175px)]:hidden">Comprar</span>
            <Icono nombre="arrow_forward" tam={11} />
          </span>
        </div>
      </div>
    </article>
  );
}
