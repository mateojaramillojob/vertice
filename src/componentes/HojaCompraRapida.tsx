import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Prenda } from "@/datos/tipos";
import { MINUTOS_RESERVA, useBolsa } from "@/hooks/useBolsa";
import { useGuardados } from "@/hooks/useGuardados";
import { cn } from "@/lib/cn";
import { Aviso } from "@/ui/Aviso";
import { Badge } from "@/ui/Badge";
import { Boton } from "@/ui/Boton";
import { Foto } from "@/ui/Foto";
import { Hoja, HojaTitulo } from "@/ui/Hoja";
import { Precio } from "@/ui/Precio";
import { SelloAutenticidad } from "./SelloAutenticidad";

interface Props {
  prenda: Prenda | null;
  onCerrar: () => void;
}

/** Bottom sheet de compra rápida del handoff (#quickBuyModal), segundo toque sobre la tarjeta. */
export function HojaCompraRapida({ prenda, onCerrar }: Props) {
  // Se conserva la última prenda para que no se vacíe durante la animación de cierre.
  const [mostrada, setMostrada] = useState(prenda);
  useEffect(() => {
    if (prenda) setMostrada(prenda);
  }, [prenda]);

  return (
    <Hoja abierta={!!prenda} onCambio={(a) => !a && onCerrar()}>
      {mostrada && <Contenido key={mostrada.id} prenda={mostrada} onCerrar={onCerrar} />}
    </Hoja>
  );
}

function Contenido({ prenda, onCerrar }: { prenda: Prenda; onCerrar: () => void }) {
  const { agregar } = useBolsa();
  const { estaGuardada, alternar } = useGuardados();
  const guardada = estaGuardada(prenda.id);
  const [recienAgregada, setRecienAgregada] = useState(false);
  const [avisoVisible, setAvisoVisible] = useState(false);

  // Como en el handoff: el botón muestra "Añadido" 3 s y vuelve; el aviso se queda.
  useEffect(() => {
    if (!recienAgregada) return;
    const t = setTimeout(() => setRecienAgregada(false), 3000);
    return () => clearTimeout(t);
  }, [recienAgregada]);

  const anadir = () => {
    agregar(prenda.id);
    setRecienAgregada(true);
    setAvisoVisible(true);
  };

  const enlaceDetalle = `/prenda/${prenda.id}`;

  return (
    <>
      <div className="flex gap-4 items-start pb-4 border-b border-surface-container">
        <Link
          to={enlaceDetalle}
          onClick={onCerrar}
          aria-label={`Ver detalle de ${prenda.titulo}`}
          className="relative w-20 h-24 rounded-lg overflow-hidden bg-surface-container shrink-0 border border-outline-subtle"
        >
          <Foto foto={prenda.fotos[0]} prioridad />
        </Link>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-xs font-label tracking-wider uppercase text-on-surface-variant font-semibold">{prenda.marca}</span>
          <HojaTitulo asChild>
            <h3 className="text-base font-headline font-bold text-primary mt-0.5 leading-snug">
              <Link to={enlaceDetalle} onClick={onCerrar} className="hover:underline underline-offset-2">
                {prenda.titulo}
              </Link>
            </h3>
          </HojaTitulo>
          <Precio valor={prenda.precio} moneda={prenda.moneda} tam="lg" className="text-primary mt-1" />
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variante="condicion">{prenda.condicion}</Badge>
            <Badge variante="talla">Talla: {prenda.talla}</Badge>
          </div>
        </div>
      </div>

      <div className="py-3 flex flex-col gap-2">
        <span className="text-meta font-label uppercase text-on-surface-variant tracking-wider">Reporte de Inspección Vértice</span>
        <p className="text-xs text-on-surface leading-relaxed font-body">{prenda.descripcion}</p>
      </div>

      <SelloAutenticidad />

      <div className="pt-4 flex flex-col gap-2">
        <Boton icono={recienAgregada ? "done" : "shopping_bag"} onClick={anadir}>
          {recienAgregada ? "Añadido a tu Bolsa" : "Añadir a la Bolsa · Compra Segura"}
        </Boton>
        <Boton
          variante="secundario"
          icono="bookmark"
          iconoRelleno={guardada}
          aria-pressed={guardada}
          onClick={() => alternar(prenda.id)}
          className={cn(guardada && "[&>span:first-child]:text-cobalt")}
        >
          {guardada ? "Guardado" : "Guardar en Deseos"}
        </Boton>
      </div>

      {avisoVisible && (
        <Aviso className="mt-3">
          ¡Prenda agregada a tu bolsa con reserva de {MINUTOS_RESERVA}&nbsp;min!{" "}
          {/* B5 (aprobado): el handoff no tenía forma de llegar a la bolsa. */}
          <Link to="/bolsa" onClick={onCerrar} className="relative toque-44 whitespace-nowrap underline underline-offset-2 font-semibold text-cobalt-light">
            Ver bolsa
          </Link>
        </Aviso>
      )}
    </>
  );
}
