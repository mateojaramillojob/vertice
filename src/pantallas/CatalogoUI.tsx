import { useEffect, useState, type ReactNode } from "react";
import type { Prenda } from "@/datos/tipos";
import { usePrendas } from "@/datos/consultas";
import { BannerCustodia } from "@/componentes/BannerCustodia";
import { BarraPestanas } from "@/componentes/BarraPestanas";
import { Encabezado } from "@/componentes/Encabezado";
import { EncabezadoSeccion } from "@/componentes/EncabezadoSeccion";
import { HojaCompraRapida } from "@/componentes/HojaCompraRapida";
import { MarcoPantalla } from "@/componentes/Marcos";
import { SelloAutenticidad } from "@/componentes/SelloAutenticidad";
import { SubencabezadoCatalogo } from "@/componentes/SubencabezadoCatalogo";
import { TarjetaPrenda } from "@/componentes/TarjetaPrenda";
import { cn } from "@/lib/cn";
import { Aviso } from "@/ui/Aviso";
import { Avatar } from "@/ui/Avatar";
import { Badge, EtiquetaPropuesta } from "@/ui/Badge";
import { BarraBusqueda } from "@/ui/BarraBusqueda";
import { Boton } from "@/ui/Boton";
import { BotonIcono } from "@/ui/BotonIcono";
import { Carrusel } from "@/ui/Carrusel";
import { Chip } from "@/ui/Chip";
import { Cargando, EsqueletoTarjeta, EstadoError, EstadoVacio } from "@/ui/Estados";
import { Icono } from "@/ui/Icono";
import { ICONOS } from "@/ui/iconos";
import { Estado, Pildora } from "@/ui/Pildora";
import { Precio } from "@/ui/Precio";
import { Estrellas, Valoracion } from "@/ui/Valoracion";

const COLORES: { token: string; uso: string; propuesta?: boolean }[] = [
  { token: "primary", uso: "Texto, CTA, FAB, chip activo" },
  { token: "primary-light", uso: "Hover y presionado de primary" },
  { token: "cobalt", uso: "Acento, sello, puntos" },
  { token: "cobalt-light", uso: "Acento sobre oscuro" },
  { token: "on-primary-variant", uso: "Texto secundario sobre oscuro" },
  { token: "surface", uso: "Fondo de página" },
  { token: "surface-container", uso: "Banner, chips, sello" },
  { token: "surface-container-high", uso: "Hover de chips" },
  { token: "surface-container-lowest", uso: "Tarjetas, barras, sheet" },
  { token: "on-surface", uso: "Texto principal" },
  { token: "on-surface-variant", uso: "Texto secundario (B2: #475569)" },
  { token: "outline-subtle", uso: "Bordes de 1 px" },
  { token: "scrim", uso: "Fondo del sheet (al 60 %)" },
  { token: "success", uso: "Éxito", propuesta: true },
  { token: "error", uso: "Error", propuesta: true },
  { token: "warning", uso: "Aviso, etiqueta Propuesta", propuesta: true },
];

const TIPOGRAFIA: { nombre: string; spec: string; clase: string; muestra: string }[] = [
  { nombre: "Logotipo", spec: "Bodoni Moda 22/33 · 700 · mayús", clase: "font-headline text-logo font-bold uppercase tracking-tight", muestra: "VÉRTICE" },
  { nombre: "Título de prenda (sheet)", spec: "Bodoni Moda 16/22 · 700", clase: "font-headline text-base font-bold leading-snug", muestra: "Trench Oversize Gamuzado" },
  { nombre: "Título de sección", spec: "Bodoni Moda 14/20 · 600 · mayús", clase: "font-headline text-sm font-semibold uppercase tracking-tight", muestra: "Catálogo Verificado" },
  { nombre: "CTA primario", spec: "Bodoni Moda 14/20 · 700", clase: "font-headline text-sm font-bold", muestra: "Añadir a la Bolsa" },
  { nombre: "Título en tarjeta", spec: "Bodoni Moda 12/15 · 600", clase: "font-headline text-xs font-semibold leading-tight", muestra: "Trench Gamuzado" },
  { nombre: "Precio grande", spec: "Inter 18/28 · 700 · tabular (B4)", clase: "font-body text-lg font-bold tabular-nums tracking-tight", muestra: "$1,450 MXN" },
  { nombre: "Precio en tarjeta", spec: "Inter 14/20 · 700 · tabular", clase: "font-body text-sm font-bold tabular-nums tracking-tight", muestra: "$1,450 MXN" },
  { nombre: "Cuerpo", spec: "Inter 12/19.5 · 400", clase: "font-body text-xs leading-relaxed", muestra: "Lana virgen fría con caída pesada y tiro alto." },
  { nombre: "Input", spec: "Inter 16 (B1; diseño 12)", clase: "font-body text-base", muestra: "Buscar por prenda, corte o tejido..." },
  { nombre: "Chip / label", spec: "Space Grotesk 12/16 · 500", clase: "font-label text-xs font-medium tracking-tight", muestra: "Sastrería" },
  { nombre: "Overline", spec: "Space Grotesk 12/16 · 600 · mayús · +0.05em", clase: "font-label text-xs font-semibold uppercase tracking-wider", muestra: "Massimo Dutti Studio" },
  { nombre: "Meta", spec: "Space Grotesk 12/17 (B3; diseño 11)", clase: "font-label text-meta uppercase tracking-wider", muestra: "Reporte de inspección" },
  { nombre: "Micro", spec: "Space Grotesk 12/16 (B3; diseño 10)", clase: "font-label text-micro uppercase", muestra: "Excelente (9.5/10)" },
];

const RADIOS = [
  { clase: "rounded", nombre: "DEFAULT · 2 px", uso: "Badges" },
  { clase: "rounded-lg", nombre: "lg · 6 px", uso: "Miniatura, toast" },
  { clase: "rounded-xl", nombre: "xl · 12 px", uso: "Tarjetas, botones" },
  { clase: "rounded-2xl", nombre: "2xl · 16 px", uso: "Bottom sheet" },
  { clase: "rounded-full", nombre: "full", uso: "Chips, píldoras" },
];

const SOMBRAS = ["shadow-header", "shadow-tabbar", "shadow-buscador", "shadow-sm", "shadow-cta", "shadow-fab", "shadow-sheet"];

function hexDe(token: string) {
  const rgb = getComputedStyle(document.documentElement).getPropertyValue(`--${token}`).trim().split(/\s+/).map(Number);
  return "#" + rgb.map((n) => n.toString(16).padStart(2, "0")).join("").toUpperCase();
}

function Seccion({ id, titulo, children }: { id: string; titulo: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="px-4 py-6 border-b border-outline-subtle">
      <h2 id={`${id}-t`} className="font-headline text-sm font-semibold uppercase tracking-tight text-primary mb-4">
        {titulo}
      </h2>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}

function Muestra({ nombre, propuesta, oscuro, bloque, children, className }: { nombre: string; propuesta?: boolean; oscuro?: boolean; bloque?: boolean; children: ReactNode; className?: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="font-label text-meta uppercase tracking-wider text-on-surface-variant">{nombre}</span>
        {propuesta && <EtiquetaPropuesta />}
      </div>
      <div className={cn("rounded-xl", bloque ? "block" : "flex flex-wrap items-center gap-3 p-3", oscuro ? "bg-primary" : "bg-surface-container-lowest border border-outline-subtle", className)}>
        {children}
      </div>
    </div>
  );
}

/** Página /ui: catálogo del design system. No es parte de la app final. */
export default function CatalogoUI() {
  const { data: prendas } = usePrendas(["1", "5"]);
  const [hexes, setHexes] = useState<Record<string, string>>({});
  const [busqueda, setBusqueda] = useState("");
  const [chip, setChip] = useState(true);
  const [orden, setOrden] = useState<"curada" | "recientes">("curada");
  const [abierta, setAbierta] = useState(true);
  const [enCompra, setEnCompra] = useState<Prenda | null>(null);

  useEffect(() => setHexes(Object.fromEntries(COLORES.map((c) => [c.token, hexDe(c.token)]))), []);

  const p1 = prendas?.[0];
  const p2 = prendas?.[1];
  const rota: Prenda | undefined = p2 && { ...p2, id: "rota", fotos: [{ url: "https://lh3.googleusercontent.com/no-existe", alt: "Foto que no carga" }] };

  return (
    <MarcoPantalla titulo="Design system · /ui" propuesta={false}>
      <p className="px-4 pt-5 text-sm text-on-surface-variant">
        Tokens y componentes de Vértice extraídos del handoff de Stitch. Lo marcado como <EtiquetaPropuesta className="align-middle" /> no venía en el diseño.
      </p>

      <Seccion id="colores" titulo="Colores">
        <div className="grid grid-cols-2 gap-3">
          {COLORES.map((c) => (
            <div key={c.token} className="rounded-xl border border-outline-subtle overflow-hidden bg-surface-container-lowest">
              <div className="h-14 border-b border-outline-subtle" style={{ background: `rgb(var(--${c.token}))` }} />
              <div className="p-2">
                <div className="font-label text-xs font-semibold text-primary break-all">{c.token}</div>
                <div className="font-label text-micro text-on-surface-variant tabular-nums">{hexes[c.token]}</div>
                <div className="text-micro text-on-surface-variant">{c.uso}</div>
                {c.propuesta && <EtiquetaPropuesta className="mt-1" />}
              </div>
            </div>
          ))}
        </div>
      </Seccion>

      <Seccion id="tipografia" titulo="Tipografía">
        {TIPOGRAFIA.map((t) => (
          <div key={t.nombre} className="border-b border-surface-container pb-3 last:border-0">
            <div className="font-label text-micro uppercase tracking-wider text-on-surface-variant">
              {t.nombre} · {t.spec}
            </div>
            <div className={cn("text-primary mt-1", t.clase)}>{t.muestra}</div>
          </div>
        ))}
      </Seccion>

      <Seccion id="forma" titulo="Radios y sombras">
        <div className="grid grid-cols-3 gap-3">
          {RADIOS.map((r) => (
            <div key={r.clase} className="flex flex-col items-center gap-1 text-center">
              <div className={cn("w-14 h-14 bg-surface-container border border-outline-subtle", r.clase)} />
              <span className="font-label text-micro text-primary">{r.nombre}</span>
              <span className="text-micro text-on-surface-variant">{r.uso}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 bg-surface p-3 rounded-xl">
          {SOMBRAS.map((s) => (
            <div key={s} className={cn("h-14 rounded-xl bg-white flex items-center justify-center font-label text-micro text-on-surface-variant", s)}>
              {s.replace("shadow-", "")}
            </div>
          ))}
        </div>
      </Seccion>

      <Seccion id="iconos" titulo={`Íconos · Material Symbols (${ICONOS.length})`}>
        <div className="grid grid-cols-4 gap-2">
          {ICONOS.map((n) => (
            <div key={n} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-surface-container-lowest border border-outline-subtle">
              <Icono nombre={n} tam={22} className="text-primary" />
              <span className="font-label text-[10px] leading-tight text-on-surface-variant text-center break-all">{n}</span>
            </div>
          ))}
        </div>
      </Seccion>

      <Seccion id="botones" titulo="Botones">
        <Muestra nombre="Primario · reposo / éxito (3 s)" className="flex-col items-stretch">
          <Boton icono="shopping_bag">Añadir a la Bolsa · Compra Segura</Boton>
          <Boton icono="done">Añadido a tu Bolsa</Boton>
        </Muestra>
        <Muestra nombre="Secundario · reposo / guardado" className="flex-col items-stretch">
          <Boton variante="secundario" icono="bookmark">
            Guardar en Deseos
          </Boton>
          <Boton variante="secundario" icono="bookmark" iconoRelleno className="[&>span:first-child]:text-cobalt">
            Guardado
          </Boton>
        </Muestra>
        <Muestra nombre="Deshabilitado / cargando" propuesta className="flex-col items-stretch">
          <Boton icono="shopping_bag" disabled>
            Añadir a la Bolsa · Compra Segura
          </Boton>
          <Boton cargando>Procesando</Boton>
        </Muestra>
        <Muestra nombre="Botones de ícono · barra (40 px, área 44)">
          <BotonIcono etiqueta="Buscar" icono="search" />
          <BotonIcono etiqueta="Notificaciones, 2 sin leer" icono="notifications" punto />
          <BotonIcono etiqueta="Volver" icono="arrow_back" />
        </Muestra>
        <Muestra nombre="Botones de ícono · sobre foto (28 px, área 44) y cerrar" className="bg-surface-container-high">
          <BotonIcono etiqueta="Guardar" icono="bookmark" variante="foto-claro" />
          <BotonIcono etiqueta="Quitar de guardados" icono="bookmark" variante="foto-claro" relleno className="text-cobalt" />
          <BotonIcono etiqueta="Ocultar detalles" icono="unfold_less" variante="foto-oscuro" />
          <BotonIcono etiqueta="Cerrar" icono="close" variante="suave" />
        </Muestra>
      </Seccion>

      <Seccion id="piezas" titulo="Chips, badges y estados">
        <Muestra nombre="Chip · activo / inactivo (misma altura, A8)">
          <Chip activo={chip} onClick={() => setChip(true)}>
            Todas (48)
          </Chip>
          <Chip activo={!chip} onClick={() => setChip(false)}>
            Sastrería
          </Chip>
        </Muestra>
        <Muestra nombre="Badges · condición / talla">
          <Badge variante="condicion">Excelente (9.5/10)</Badge>
          <Badge variante="talla">Talla: M</Badge>
        </Muestra>
        <Muestra nombre="Sobre oscuro · talla en overlay / píldora" oscuro>
          <Badge variante="talla-foto">Talla M</Badge>
          <Pildora>Activo</Pildora>
        </Muestra>
        <Muestra nombre="Estado · punto + mayúsculas">
          <Estado>Stream Activo</Estado>
          <Estado pulso>Con pulso</Estado>
        </Muestra>
        <Muestra nombre="Etiqueta de propuesta" propuesta>
          <EtiquetaPropuesta />
        </Muestra>
        <Muestra nombre="Avatar · handoff (32 px)">
          <Avatar />
        </Muestra>
        <Muestra nombre="Avatar con iniciales" propuesta>
          <Avatar nombre="Valeria Ortiz" tam={40} />
          <Avatar nombre="Andrés Gutiérrez" tam={56} />
        </Muestra>
        <Muestra nombre="Precio · tarjeta / grande (B4)">
          <Precio valor={1450} moneda="MXN" />
          <Precio valor={1450} moneda="MXN" tam="lg" />
        </Muestra>
        <Muestra nombre="Precio rebajado · valoración" propuesta>
          <Precio valor={1690} moneda="MXN" tam="lg" anterior={1990} />
          <Valoracion valor={4.9} resenas={128} />
          <Estrellas valor={4} />
        </Muestra>
      </Seccion>

      <Seccion id="busqueda" titulo="Búsqueda y encabezados">
        <Muestra nombre="Barra de búsqueda (sin doble borde, 16 px)" className="bg-surface border-0 p-0">
          <BarraBusqueda valor={busqueda} onCambio={setBusqueda} onFiltros={() => undefined} />
        </Muestra>
        <Muestra nombre="Con filtros activos" propuesta className="bg-surface border-0 p-0">
          <BarraBusqueda valor="" onCambio={() => undefined} onFiltros={() => undefined} filtrosActivos={2} />
        </Muestra>
        <Muestra nombre="Banner de custodia" className="p-0 overflow-hidden">
          <BannerCustodia />
        </Muestra>
        <Muestra nombre="Subencabezado y título de sección" className="flex-col items-stretch bg-surface">
          <SubencabezadoCatalogo orden={orden} onCambio={setOrden} />
          <EncabezadoSeccion titulo="Catálogo Verificado · Archivo Offset" accion="Vista Offset" />
        </Muestra>
      </Seccion>

      <Seccion id="tarjetas" titulo="Tarjeta de prenda">
        <p className="text-xs text-on-surface-variant">
          Primer toque despliega el overlay; con el overlay abierto, el toque abre la compra rápida. El marcador guarda sin desplegar.
        </p>
        <div className="grid grid-cols-2 gap-3 items-start">
          {p1 && (
            <div>
              <span className="font-label text-meta uppercase tracking-wider text-on-surface-variant">Abierta</span>
              <TarjetaPrenda prenda={p1} abierta={abierta} onToque={() => (abierta ? setEnCompra(p1) : setAbierta(true))} onCerrar={() => setAbierta(false)} />
            </div>
          )}
          {p2 && (
            <div>
              <span className="font-label text-meta uppercase tracking-wider text-on-surface-variant">Cerrada</span>
              <TarjetaPrenda prenda={p2} abierta={false} onToque={() => setEnCompra(p2)} onCerrar={() => undefined} />
            </div>
          )}
          {rota && (
            <div>
              <span className="font-label text-meta uppercase tracking-wider text-on-surface-variant">Foto no disponible</span>
              <TarjetaPrenda prenda={rota} abierta={false} onToque={() => undefined} onCerrar={() => undefined} />
            </div>
          )}
          <div>
            <span className="font-label text-meta uppercase tracking-wider text-on-surface-variant">Cargando</span>
            <EsqueletoTarjeta />
          </div>
        </div>
        <EtiquetaPropuesta className="self-start" />
        <span className="text-micro text-on-surface-variant -mt-3">Estados de foto rota y carga.</span>
        <Muestra nombre="Bottom sheet · compra rápida">
          <Boton variante="secundario" ancho="auto" icono="shopping_bag" onClick={() => p1 && setEnCompra(p1)}>
            Abrir compra rápida
          </Boton>
        </Muestra>
        <Muestra nombre="Sello de autenticidad" bloque className="p-3">
          <SelloAutenticidad />
        </Muestra>
        <Muestra nombre="Aviso · éxito (handoff)" bloque className="p-3">
          <Aviso>¡Prenda agregada a tu bolsa con reserva de 15 min!</Aviso>
        </Muestra>
        <Muestra nombre="Aviso · error" propuesta bloque className="p-3">
          <Aviso tipo="error">No pudimos reservar la prenda. Inténtalo de nuevo.</Aviso>
        </Muestra>
      </Seccion>

      <Seccion id="estados" titulo="Estados de pantalla">
        <Muestra nombre="Vacío" propuesta bloque>
          <EstadoVacio icono="bookmark" titulo="Aún no guardas prendas" texto="Toca el marcador de una prenda para verla aquí." accion={{ texto: "Explorar catálogo", onClick: () => undefined }} />
        </Muestra>
        <Muestra nombre="Error" propuesta bloque>
          <EstadoError onReintentar={() => undefined} />
        </Muestra>
        <Muestra nombre="Cargando más (scroll infinito)" propuesta bloque>
          <Cargando etiqueta="Cargando más prendas" />
        </Muestra>
        <Muestra nombre="Carrusel con swipe" propuesta bloque className="overflow-hidden">
          {p1 && <Carrusel fotos={p1.fotos} proporcion={1} />}
        </Muestra>
      </Seccion>

      <Seccion id="barras" titulo="Header y tab bar">
        {/* translateZ crea un contexto: las barras fijas quedan dentro de la caja. */}
        <div className="relative h-24 rounded-xl overflow-hidden border border-outline-subtle [transform:translateZ(0)] bg-surface">
          <Encabezado />
        </div>
        <div className="relative h-24 rounded-xl overflow-hidden border border-outline-subtle [transform:translateZ(0)] bg-surface">
          <BarraPestanas />
        </div>
      </Seccion>

      <HojaCompraRapida prenda={enCompra} onCerrar={() => setEnCompra(null)} />
    </MarcoPantalla>
  );
}
