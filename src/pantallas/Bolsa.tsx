import { Link, useNavigate } from "react-router-dom";
import { usePrendas } from "@/datos/consultas";
import { MINUTOS_RESERVA, useBolsa } from "@/hooks/useBolsa";
import { MarcoPantalla } from "@/componentes/Marcos";
import { cn } from "@/lib/cn";
import { Boton } from "@/ui/Boton";
import { BotonIcono } from "@/ui/BotonIcono";
import { Cargando, EstadoVacio } from "@/ui/Estados";
import { Foto } from "@/ui/Foto";
import { Icono } from "@/ui/Icono";
import { Precio } from "@/ui/Precio";

const reloj = (ms: number) => {
  const s = Math.ceil(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

/**
 * Propuesta: bolsa con la reserva de 15 min del handoff. Se llega desde "Ver
 * bolsa" (B5). El pago queda pendiente del modelo de negocio.
 */
export default function Bolsa() {
  const navegar = useNavigate();
  const { items, quitar, restante } = useBolsa();
  const { data: prendas } = usePrendas(items.map((i) => i.id));
  const enBolsa = items
    .map((i) => ({ item: i, prenda: prendas?.find((p) => p.id === i.id) }))
    .filter((x): x is { item: typeof x.item; prenda: NonNullable<typeof x.prenda> } => !!x.prenda);
  const subtotal = enBolsa.reduce((s, x) => s + x.prenda.precio, 0);

  const pie =
    items.length > 0 ? (
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <span className="font-label text-meta uppercase tracking-wider text-on-surface-variant">Subtotal · {items.length} prenda{items.length === 1 ? "" : "s"}</span>
          <Precio valor={subtotal} moneda="MXN" tam="lg" className="text-primary" />
        </div>
        <Boton icono="lock" disabled>
          Continuar al pago
        </Boton>
        <span className="text-center font-label text-micro text-on-surface-variant">Pendiente: el pago se diseña cuando se defina el modelo de negocio.</span>
      </div>
    ) : undefined;

  return (
    <MarcoPantalla titulo="Bolsa" pie={pie}>
      {items.length === 0 ? (
        <EstadoVacio
          icono="shopping_bag"
          titulo="Tu bolsa está vacía"
          texto={`Cada prenda que agregas queda reservada ${MINUTOS_RESERVA} minutos para ti.`}
          accion={{ texto: "Ver el catálogo", onClick: () => navegar("/") }}
        />
      ) : !prendas ? (
        <Cargando etiqueta="Cargando tu bolsa" />
      ) : (
        <div className="px-4 pt-4 flex flex-col gap-3">
          <p className="text-xs text-on-surface-variant flex items-center gap-1.5">
            <Icono nombre="schedule" tam={16} /> Las prendas quedan reservadas {MINUTOS_RESERVA} min; después vuelven al catálogo.
          </p>
          <ul className="flex flex-col gap-3">
            {enBolsa.map(({ item, prenda }) => {
              const ms = restante(item);
              return (
                <li key={prenda.id} className="flex gap-3 p-3 rounded-xl border border-outline-subtle bg-surface-container-lowest">
                  <Link to={`/prenda/${prenda.id}`} className="relative w-16 h-20 rounded-lg overflow-hidden bg-surface-container border border-outline-subtle shrink-0">
                    <Foto foto={prenda.fotos[0]} />
                  </Link>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-micro font-label tracking-wider uppercase text-on-surface-variant font-semibold truncate">{prenda.marca}</span>
                    <Link to={`/prenda/${prenda.id}`} className="font-headline text-sm font-bold text-primary leading-snug truncate">
                      {prenda.titulo}
                    </Link>
                    <span className="text-xs text-on-surface-variant">Talla {prenda.talla}</span>
                    <div className="flex items-center justify-between gap-2 mt-auto pt-1">
                      <Precio valor={prenda.precio} moneda={prenda.moneda} className="text-primary" />
                      <span
                        className={cn(
                          "font-label text-meta tabular-nums flex items-center gap-1",
                          ms < 3 * 60_000 ? "text-warning font-semibold" : "text-on-surface-variant",
                        )}
                      >
                        <Icono nombre="schedule" tam={14} />
                        <span className="sr-only">Reserva vence en </span>
                        {reloj(ms)}
                      </span>
                    </div>
                  </div>
                  <BotonIcono etiqueta={`Quitar ${prenda.titulo} de la bolsa`} icono="delete" variante="suave" onClick={() => quitar(prenda.id)} className="self-start" />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </MarcoPantalla>
  );
}
