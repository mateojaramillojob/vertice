import { useState } from "react";
import { usePrendasDeVendedor, useResenas, useUsuarioActual } from "@/datos/consultas";
import { GrillaPrendas } from "@/componentes/GrillaPrendas";
import { fechaMesAnio } from "@/lib/formato";
import { Avatar } from "@/ui/Avatar";
import { EtiquetaPropuesta } from "@/ui/Badge";
import { Chip } from "@/ui/Chip";
import { Cargando } from "@/ui/Estados";
import { Icono } from "@/ui/Icono";
import { Estrellas, Valoracion } from "@/ui/Valoracion";

/** Propuesta: perfil propio con armario y reseñas. */
export default function Perfil() {
  const { data: usuario } = useUsuarioActual();
  const { data: armario } = usePrendasDeVendedor(usuario?.id);
  const { data: resenas } = useResenas(usuario?.id);
  const [pestana, setPestana] = useState<"armario" | "resenas">("armario");

  if (!usuario) return <Cargando etiqueta="Cargando perfil" />;

  const cifras: [string, string][] = [
    [String(usuario.ventas), "Ventas"],
    [String(usuario.compras), "Compras"],
    [usuario.valoracion.toFixed(1), "Valoración"],
  ];

  return (
    <div className="px-4 pt-4 pb-8 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="font-headline text-lg font-bold text-primary uppercase tracking-tight">Perfil</h1>
        <EtiquetaPropuesta />
      </div>

      <section aria-label="Datos de la cuenta" className="flex items-center gap-4">
        <Avatar nombre={usuario.nombre} tam={64} />
        <div className="flex flex-col min-w-0">
          <span className="font-headline text-lg font-bold text-primary leading-snug">{usuario.nombre}</span>
          <span className="text-xs text-on-surface-variant flex items-center gap-1">
            <Icono nombre="location_on" tam={14} /> {usuario.ciudad} · desde {fechaMesAnio(usuario.miembroDesde)}
          </span>
          <Valoracion valor={usuario.valoracion} resenas={usuario.resenas} className="mt-1" />
        </div>
      </section>

      <dl className="grid grid-cols-3 gap-3">
        {cifras.map(([valor, nombre]) => (
          <div key={nombre} className="rounded-xl border border-outline-subtle bg-surface-container-lowest p-3 flex flex-col-reverse items-center gap-0.5">
            <dt className="font-label text-micro uppercase tracking-wider text-on-surface-variant">{nombre}</dt>
            <dd className="font-body text-lg font-bold tabular-nums text-primary">{valor}</dd>
          </div>
        ))}
      </dl>

      <div className="bg-surface-container border border-outline-subtle p-3 rounded-xl flex items-center gap-3">
        <Icono nombre="receipt_long" tam={22} className="text-on-surface-variant" />
        <div className="flex flex-col">
          <span className="text-xs font-headline font-semibold text-primary">Pedidos y ventas</span>
          <span className="text-meta text-on-surface-variant">Llegan cuando se defina el modelo de negocio (inspección o venta directa).</span>
        </div>
      </div>

      <div role="group" aria-label="Contenido del perfil" className="flex gap-2">
        <Chip activo={pestana === "armario"} onClick={() => setPestana("armario")}>
          Armario{armario ? ` (${armario.length})` : ""}
        </Chip>
        <Chip activo={pestana === "resenas"} onClick={() => setPestana("resenas")}>
          Reseñas{resenas ? ` (${resenas.length})` : ""}
        </Chip>
      </div>

      {pestana === "armario" ? (
        <div className="-mx-1">{armario ? <GrillaPrendas prendas={armario} /> : <Cargando />}</div>
      ) : (
        <ul className="flex flex-col gap-3">
          {resenas?.map((r) => (
            <li key={r.id} className="rounded-xl border border-outline-subtle bg-surface-container-lowest p-3">
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
      )}
    </div>
  );
}
