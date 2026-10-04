# ANÁLISIS DEL HANDOFF — VÉRTICE

> Origen: `stitch_visual_circular_fashion_marketplace.zip` (export de Google Stitch, 04-10-2026).
> Fuente de verdad visual (decidida): **`screen.png` + `code.html`**. `DESIGN.md` se documenta y se descarta (ver §5.3-1).
> Leyenda: **[M]** = medido (valor del HTML o `getComputedStyle` en el navegador a 414 px) · **[E]** = estimado a ojo sobre el PNG.

---

## 0. Resumen

1. **El handoff trae una sola pantalla:** el Inicio/catálogo (`screen.png`). El HTML suma un **bottom sheet de compra rápida** con toast de confirmación, que no aparece en el PNG. Todo lo demás (detalle, publicar, checkout, chat, perfil…) **no está diseñado**.
2. **Estilo:** minimalismo editorial "lujo silencioso". Azul tinta `#0F172A` y acento cobalto `#2563EB` sobre gris casi blanco `#FAFAFA`. Titulares serif **Bodoni Moda**, cuerpo **Inter**, etiquetas en **Space Grotesk**. Radios de 12 px, sombras casi imperceptibles y blur en las barras.
3. **Posicionamiento:** más cerca de **Vestiaire** (curaduría, "inspección física 48 h", "garantía de autenticidad", pago retenido) que de Vinted.
4. **Dos bugs del export:**
   - La tab bar queda **encima** del bottom sheet y tapa "Guardar en Deseos" y el toast.
   - A 360 px el overlay de la tarjeta se rompe.
5. **Fallas de accesibilidad:**
   - El zoom está bloqueado.
   - Hay 6 tipos de botón con área táctil menor a 44 px.
   - Hay textos de 10–11 px.
   - El placeholder tiene contraste 2.7:1.
   - Los íconos no tienen etiqueta accesible.
6. **Las fotos no vienen en el zip:** son 9 URLs remotas de Google que pueden caducar, y una trae texto incrustado.

---

## 1. Inventario del zip

| Archivo | Formato | Tamaño | Qué es |
|---|---|---|---|
| `screen.png` | PNG RGB, **414 × 1600 px, 1x** | 438 KB | Captura completa del Inicio (scroll entero) |
| `code.html` | HTML + Tailwind por CDN (`forms`, `container-queries`) + JS inline | 31 KB | Código de la misma pantalla, el bottom sheet y el script de interacción |
| `DESIGN.md` | Markdown | 1.5 KB | Guía "Bauhaus — Neo-Brutalist" que **no corresponde** a la pantalla |

**No vienen en el zip:**
- Logo en archivo (es texto en Bodoni), favicon ni íconos de app (los necesita la PWA).
- Fuentes locales: se cargan de Google Fonts (Bodoni Moda, Inter, Space Grotesk y Hanken Grotesk, que no se usa).
- Íconos: se usa **Material Symbols Outlined** desde Google Fonts.
- Fotos: 9 `<img>` apuntan a `lh3.googleusercontent.com/aida-public/…`, imágenes generadas por IA y alojadas en Google.

Pude leer todo. No hace falta que mandes otro export.

**Referencias derivadas** que generé en `design/_derivados/` (los originales están intactos, verificado con SHA-256):

| Archivo | Contenido |
|---|---|
| `01-inicio-render-414.jpg` | `code.html` renderizado a 414 px. Coincide con `screen.png` |
| `02-bottomsheet-414-tabbar-encima.jpg` | Bottom sheet abierto. La tab bar tapa el botón secundario |
| `03-bottomsheet-414-scroll-toast-oculto.jpg` | Sheet tras pulsar "Añadir". El toast queda escondido bajo la tab bar |
| `04-inicio-render-360-overlay-roto.jpg` | Inicio a 360 px. Marca, talla y precio partidos en dos líneas |

---

## 2. Pantallas y flujo

### 2.1 Pantallas identificadas

| # | Pantalla | Propósito | Origen | Estado |
|---|---|---|---|---|
| P1 | **Inicio / Catálogo curado** | Feed vertical de prendas verificadas en masonry de 2 columnas, con búsqueda y filtro por categoría | `screen.png`, `code.html` | Diseñada |
| P1a | Tarjeta con overlay "inspeccionada" | Primer toque: muestra marca, talla, nombre, precio y "Comprar" sobre la foto | `screen.png` (1.ª tarjeta), `code.html` | Diseñada |
| P2 | **Bottom sheet: Compra rápida** | Segundo toque: miniatura, marca, nombre, precio, condición, talla, "Reporte de inspección", sello de autenticidad y CTAs | Solo `code.html` (oculto) | Diseñada en código, sin mockup |
| P2a | Toast "Prenda agregada… reserva de 15 min" | Confirmación de añadir a la bolsa, dentro del sheet | Solo `code.html` | Diseñada en código |

### 2.2 Navegación principal

- **Header fijo** (64 px):
  - Logotipo "VÉRTICE" con badge de país y moneda "🇲🇽 MXN".
  - A la derecha: lupa, campana con punto de no leídas y avatar.
- **Micro-banner** (no es fijo, se va con el scroll): "Custodia Vértice: Inspección física garantizada · 48h", con ícono de escudo.
- **Tab bar fija** (64 px), con 5 destinos: **Inicio** (activo) · **Explorar** · **FAB "+" (Vender)** · **Guardados** · **Perfil**.

### 2.3 Flujo: qué lleva a dónde

| Elemento (P1) | Destino | ¿Diseñado? |
|---|---|---|
| Logotipo | Inicio (implícito) | — |
| Badge 🇲🇽 MXN | Selector de país y moneda (implícito) | ❌ Además no es botón en el HTML |
| Lupa (header) | Búsqueda | ❌ Duplica la barra de búsqueda |
| Campana + punto | Notificaciones | ❌ |
| Avatar | Perfil | ❌ Duplica la pestaña Perfil |
| Banner "Custodia 48h" | Información del programa de inspección | ❌ No es interactivo |
| Barra de búsqueda | Resultados de búsqueda | ❌ |
| Botón `tune` en el buscador | Filtros (bottom sheet) | ❌ |
| Chips de categoría | Filtran el catálogo en la misma pantalla | ⚠️ Solo el estado visual |
| "Selección Curada / Recién Subido" | ¿Cambio de feed u orden? | ❓ Ambiguo |
| "Vista Offset" + `tune` | ¿Cambio de layout de la grilla? | ❓ Ambiguo |
| Tarjeta, 1.er toque | Overlay de info (P1a) | ✅ |
| Tarjeta, 2.º toque | Bottom sheet de compra (P2) | ✅ (solo código) |
| Marcador en la tarjeta | Guardar en Deseos (toggle) | ⚠️ Sin estado "guardado" en la tarjeta. Bug: el clic se propaga a la tarjeta |
| Sheet: "Añadir a la Bolsa" | Toast con reserva de 15 min | ✅ Pero **no existe un acceso a la bolsa** en ninguna parte |
| Sheet: "Guardar en Deseos" | Toggle a "Guardado" (2 s) | ✅ |
| Sheet: miniatura | ¿Detalle completo de la prenda? | ❌ **No hay ninguna ruta a una página de detalle** |
| Tabs Explorar / Guardados / Perfil / "+" | Sus pantallas | ❌ |

### 2.4 Plataforma

- **Solo mobile.** Ancho de referencia **414 px [M]**, DPR 1x. Es una pantalla de app (`<meta name="shell-type" content="mobile_tab">`), con soporte de safe areas (`env(safe-area-inset-*)`).
- No hay diseño para tablet ni desktop. A 360 px no hay scroll horizontal, pero el overlay de la tarjeta se rompe (§5.4).

---

## 3. Design tokens

### 3.1 Paleta

| Token | HEX | Uso observado | |
|---|---|---|---|
| `primary` | `#0F172A` | Texto principal, logotipo, chip activo, CTA, FAB, avatar, badge de talla, overlay (95 %), toast | [M] |
| `primary-light` | `#1E293B` | **Definido y sin uso** | [M] |
| `cobalt` | `#2563EB` | Acento: punto de notificación, punto del banner, escudo, sello "verified", "Vista Offset", "Stream activo" | [M] |
| `cobalt-light` | `#3B82F6` | Acento sobre fondo oscuro: "Comprar →", punto de "Activo", ícono del toast | [M] |
| `on-primary` | `#FFFFFF` | Texto sobre `primary` | [M] |
| `surface` | `#FAFAFA` | Fondo de página | [M] |
| `surface-container` | `#F1F5F9` | Banner, chips inactivos, badge MXN, sello, badge de condición, botón cerrar | [M] |
| `surface-container-high` | `#E2E8F0` | Solo en hover de chips | [M] |
| `surface-container-lowest` | `#FFFFFF` | Tarjetas, buscador, header (90 %), tab bar (95 %), sheet | [M] |
| `on-surface` | `#0F172A` | = `primary` | [M] |
| `on-surface-variant` | `#64748B` | Texto secundario, íconos inactivos, labels | [M] |
| `outline-subtle` | `#E2E8F0` | Bordes de 1 px (a veces al 80 %) | [M] |
| *(sin token)* slate-300 | `#CBD5E1` | Marca dentro del overlay, manija del sheet | [M] |
| *(sin token)* slate-950 | `#020617` al 60 % | Scrim del bottom sheet | [M] |
| *(sin token)* gray-500 | `#6B7280` | Borde interno del input, artefacto del plugin `forms` (§5.3-7) | [M] |

**Estados (éxito, error, aviso): no existen en el diseño.** El único "éxito" es el toast, en `primary` con ícono `cobalt-light`. Hay que definir estos colores; los propondré en el paso 3 marcados como *propuesta*.

### 3.2 Tipografía

Familias: `headline` = **Bodoni Moda** (serif, ejes opsz 6–96 y wght 400–900) · `body` = **Inter** · `label` y `mono` = **Space Grotesk** (no es monoespaciada).

| Nivel | Familia | Tamaño / Interlineado | Peso | Tracking | Caja | Dónde | |
|---|---|---|---|---|---|---|---|
| Logotipo | Bodoni Moda | 22 / 33 | 700 | −0.55 px (−0.025em) | MAYÚS | Header | [M] |
| Precio grande | Bodoni Moda | 18 / 28 | 900 | 0 | — | Sheet | [M] |
| Título de prenda (sheet) | Bodoni Moda | 16 / 22 | 700 | 0 | — | Sheet | [M] |
| Título de sección | Bodoni Moda | 14 / 20 | 600 | −0.35 px | MAYÚS | "Catálogo verificado…" | [M] |
| CTA primario | Bodoni Moda | 14 / 20 | 700 | 0 | — | "Añadir a la Bolsa" | [M] |
| Título de prenda (tarjeta) | Bodoni Moda | 12 / 15 | 600 | 0 | — | Overlay (truncado) | [M] |
| Título del sello | Bodoni Moda | 12 / 16 | 600 | 0 | — | Garantía | [M] |
| Precio en tarjeta | Inter | 14 / 20 | 700 | −0.35 px | — | Overlay | [M] |
| Cuerpo | Inter | 12 / 19.5 (1.625) | 400 | 0 | — | Reporte de inspección | [M] |
| Cuerpo pequeño | Inter | 11 / 16.5 | 400 | 0 | — | Texto del sello | [M] |
| Input | Inter | 12 / 16 | 400 | 0 | — | Buscador | [M] |
| Chip | Space Grotesk | 12 / 16 | 500 activo · 400 inactivo | −0.3 px | — | Categorías | [M] |
| Overline (sheet) | Space Grotesk | 12 / 16 | 600 | +0.6 px (0.05em) | MAYÚS | Marca en el sheet | [M] |
| Botón secundario | Space Grotesk | 12 / 16 | 600 | +0.6 px | MAYÚS | "Guardar en Deseos" | [M] |
| Toast | Space Grotesk | 12 / 16 | 400 | 0 | — | Sheet | [M] |
| Breadcrumb | Space Grotesk | 12 / 16 (600) · 11 / 16 (400) | — | 0 | — | "Selección Curada / Recién Subido" | [M] |
| Overline (tarjeta) | Space Grotesk | 11 / 16.5 | 400 | +0.55 px | MAYÚS | Marca en el overlay | [M] |
| Banner / estado | Space Grotesk | 11 / 16.5 | 500 / 400 | +0.55 px | MAYÚS | Banner, "Stream activo", "Reporte de inspección" | [M] |
| Badge | Space Grotesk | 10 / 15 (talla en overlay: 11, 700) | 500 | 0 | MAYÚS | Condición, talla, "Activo" | [M] |
| Micro | Space Grotesk | 10 / 15 | 400–600 | +0.5 px | MAYÚS | MXN, "Vista Offset", "Comprar →" | [M] |
| Label de tab | Space Grotesk | 10 / 15 | 600 activo · 400 inactivo | −0.25 px | — | Tab bar | [M] |

> En la escala real conviven 10, 11, 12, 14, 16, 18 y 22 px. **Más de la mitad del texto está por debajo de 12 px** (§5.4).

### 3.3 Espaciado y grid

Escala base de Tailwind (4 px). Valores en px a 414 de ancho:

| Elemento | Valor | |
|---|---|---|
| Margen lateral (header, banner, buscador, chips) | 16 | [M] |
| Margen lateral de la grilla | 12, más 4 internos en el título (el título alinea a 16) | [M] |
| Grilla | 2 columnas de **189 px**, gap horizontal y vertical **12** | [M] |
| Columna derecha | desplazada **24 px** hacia abajo (`pt-6`), el efecto "offset" | [M] |
| Aspect ratio de las tarjetas | variable: 3:3.8 · 3:4.1 · 3:4.2 · 3:4.4 · 3:4.6 | [M] |
| Bloque de controles | padding 14 arriba / 8 abajo; gap entre filas 12 | [M] |
| Gap entre chips | 8 · padding de chip 6 × 14 | [M] |
| Título de sección → grilla | 12 | [M] |
| Fin de grilla | 32 | [M] |
| `main` | padding-top 64 (header) / bottom 96 (tab bar) | [M] |
| Header | alto 64, más 1 de borde · gap de íconos 4 · botones de 40 | [M] |
| Banner | padding 8 × 16. Alto 33.5 en una línea; **2 líneas en el PNG y a 360 px** | [M] / [E] |
| Buscador | contenedor con padding 10 × 14, alto 56 (inflado por el input del plugin `forms`) | [M] |
| Overlay de tarjeta | padding 12 · gap 4 | [M] |
| Bottom sheet | padding 20 · max-width 448 · max-height 777 | [M] |
| Tab bar | alto 64 · padding 12 lateral · ítems de 56 × 48 · FAB de 48, sube 16 px | [M] |

### 3.4 Radios

| Token | Valor | Uso | |
|---|---|---|---|
| `DEFAULT` | **2 px** (el de Tailwind sería 4) | Badges de condición, talla y talla del overlay | [M] |
| `lg` | 6 px | Miniatura del sheet, toast | [M] |
| `xl` | **12 px** | Tarjetas, buscador, sello, botones del sheet | [M] |
| `2xl` | 16 px | Esquinas superiores del bottom sheet | [M] |
| `full` | 9999 px | Chips, badge MXN, "Activo", botones de ícono, avatar, FAB, puntos | [M] |

### 3.5 Elevación, sombras y transparencias

| Elemento | Valor | |
|---|---|---|
| Header | fondo `#FFF` al 90 %, `backdrop-blur` 24 px, `0 1px 10px rgba(15,23,42,.03)`, borde inferior `#E2E8F0` al 80 % | [M] |
| Tab bar | `#FFF` al 95 %, blur 24 px, `0 -2px 12px rgba(15,23,42,.03)`, borde superior `#E2E8F0` | [M] |
| Buscador | `0 2px 8px rgba(15,23,42,.03)` | [M] |
| Tarjeta, chip activo, marcador | `0 1px 2px rgba(0,0,0,.05)` (shadow-sm) | [M] |
| CTA primario | `0 4px 6px -1px rgba(15,23,42,.1), 0 2px 4px -2px rgba(15,23,42,.1)` | [M] |
| FAB | `0 4px 16px rgba(15,23,42,.35)` más anillo blanco de 4 px | [M] |
| Avatar | anillo de 2 px `rgba(15,23,42,.1)` | [M] |
| Bottom sheet | `0 25px 50px -12px rgba(0,0,0,.25)` | [M] |
| Scrim | `#020617` al 60 % + blur 4 px | [M] |
| Píldoras sobre foto | `primary` al 80 % + blur 12 px, o `#FFF` al 90 % + blur 4 px | [M] |

### 3.6 Íconos

- **Material Symbols Outlined**, peso 400, sin relleno (FILL 0). La pestaña activa **no** usa la variante rellena; solo cambia de color.
- Íconos usados: `search`, `notifications`, `person`, `verified_user`, `tune`, `unfold_less` / `touch_app`, `bookmark_border` / `bookmark`, `arrow_forward`, `close`, `verified`, `shopping_bag`, `check_circle`, `done`, `home`, `explore`, `add`, `account_circle`.
- Tamaños: **11 valores distintos** (11, 13, 14, 15, 16, 17, 18, 21, 22, 24 y 26 px) [M]. Propondré una escala de 16 / 20 / 24.

### 3.7 Movimiento

| Elemento | Valor | |
|---|---|---|
| Transiciones | color 150 ms · scrim 200 ms · sheet y overlay 300 ms (translate-y) · zoom de la foto en hover 500 ms (scale 1.05) | [M] |
| Presionado | `active:scale-[.98]` en el CTA, `.95` en el FAB | [M] |
| `animate-pulse` infinito | Punto del banner y punto de "Activo". No respeta `prefers-reduced-motion` | [M] |

---

## 4. Componentes

| Componente | Variantes y estados visibles | Notas |
|---|---|---|
| **AppHeader** | Una sola variante: fija, translúcida con blur | Logotipo + CurrencyBadge + 2 IconButton + Avatar |
| **Wordmark** | — | Texto "VÉRTICE" en Bodoni 700, mayúsculas. No hay SVG |
| **CurrencyBadge** | Una sola (🇲🇽 MXN) | Píldora `surface-container`. Debería abrir el selector de país |
| **IconButton** | Reposo (`#64748B`) · hover (`primary`) · con **NotificationDot** (6 px, cobalto) | 40 × 40 |
| **Avatar** | Placeholder (ícono `person` sobre `primary`) | 32 px. Falta la variante con foto |
| **InfoBanner** | Una sola: punto pulsante + texto + escudo | Banner de garantía |
| **SearchBar** | Reposo con placeholder | Ícono + input + botón de filtros. Faltan foco, con texto y botón limpiar |
| **CategoryChip** | **Activo** (`primary`, sin borde, 28 px) · **inactivo** (`surface-container`, borde, 30 px) · hover | Fila con scroll horizontal y snap implícito. El activo lleva contador "(48)" |
| **Breadcrumb / SegmentToggle** | Activo (600, `primary`) · inactivo (400, `#64748B`) | "Selección Curada / Recién Subido". Función ambigua |
| **StatusIndicator** | Punto cobalto + texto en mayúsculas | "Stream activo" |
| **SectionHeader** | Título serif en mayúsculas + acción en cobalto con ícono | "Catálogo verificado · Archivo offset" + "Vista offset" |
| **MasonryGrid** | 2 columnas, la derecha desplazada 24 px, alturas variables | El DOM va por columna: 1, 3, 5, 7 / 2, 4, 6, 8 |
| **ProductCard** | **Normal** (foto + SaveButton) · **inspeccionada** (overlay oscuro + badge "Activo" + botón colapsar) · hover (zoom de foto) | Sin overlay **no muestra precio, marca ni talla** |
| **ProductCardOverlay** | Visible / oculta (translate-y + opacidad) | Marca, TallaBadge, título truncado, precio, "Comprar →" |
| **SaveButton** (marcador) | Sin guardar (`bookmark_border`, píldora blanca 28 px) · guardado (`bookmark` cobalto, solo en el sheet) | En la tarjeta no hay estado guardado |
| **StatusPill** | "Activo" (oscura con blur, punto pulsante) | Significado no definido |
| **BottomSheet** | Cerrado / abierto (scrim + slide-up) | Manija, botón cerrar de 28 px, scroll interno |
| **Badge** | **Condición** (claro con borde) · **talla** (oscuro sólido) · **talla sobre foto** (blanco al 15 %) | Radio 2 px |
| **VerificationSeal** | Una sola: ícono `verified` + título serif + texto | Contenedor `surface-container` de 12 px |
| **Button** | **Primario** (`primary`, Bodoni, ícono, 48 px) · **secundario / outline** (borde, Space Grotesk en mayúsculas, 38 px) · estados: presionado (scale), éxito temporal ("Añadido a tu Bolsa", "Guardado") | Hover sin efecto real (`slate-900` = `primary`) |
| **Toast** | Éxito (oscuro, ícono `check_circle`) | Va dentro del sheet; no hay toast global |
| **TabBar** | Ítem activo (`primary`, 600) · inactivo (`#64748B`) · hover | 4 ítems + FAB |
| **FAB** | Reposo · presionado (scale .95) | 48 px, anillo blanco, sombra marcada |

**No diseñados, pero los pediste en el prompt:** carrusel de fotos, burbuja de chat, badge de valoración (estrellas), corazón de favorito, filtros en bottom sheet, indicador de pull-to-refresh y loader de scroll infinito.

---

## 5. Huecos y dudas

### 5.1 Estados no diseñados

| Tipo | Faltan |
|---|---|
| **Cargando** | Skeleton de la grilla masonry, skeleton del sheet, carga progresiva de fotos (blur-up o color dominante), loader de scroll infinito, indicador de pull-to-refresh |
| **Vacío** | Catálogo sin resultados (búsqueda o filtros), Guardados vacío, Bolsa vacía, sin notificaciones, perfil sin publicaciones |
| **Error** | Error de red, foto que no carga (placeholder), **prenda vendida o reservada por otro mientras la miras** (clave por la regla de reserva de 15 min), pago rechazado |
| **Sin conexión** | Banner offline de la PWA, catálogo en caché, acciones encoladas |
| **Éxito** | Solo existe el toast del sheet. Faltan: prenda publicada, oferta enviada, compra confirmada, guardado (feedback en la tarjeta) |
| **Estados de la prenda** | Vendida, reservada, rebajada, nueva, "en inspección" |
| **Estados de control** | Foco visible (teclado), deshabilitado, cargando en botones, error y ayuda en inputs, chip presionado |
| **Sesión** | Qué pasa al guardar o comprar sin haber iniciado sesión |

### 5.2 Pantallas que una app tipo Vinted / Vestiaire necesita y no están

| Prioridad | Pantalla | Comentario |
|---|---|---|
| **P0** | **Detalle de prenda** | Carrusel con swipe y zoom, vendedor, valoraciones, condición, medidas, envío, "Comprar" y "Hacer oferta". Hoy solo existe el sheet rápido |
| P0 | **Búsqueda y resultados** + **filtros en bottom sheet** | Categoría, talla, marca, condición, precio, color, ciudad, orden |
| P0 | **Bolsa y checkout** | Resumen, envío, dirección, pago, reserva de 15 min con contador, confirmación |
| P0 | **Publicar prenda** (FAB "+") | Fotos, categoría, marca, talla, condición, precio sugerido, envío. Flujo de varios pasos |
| P0 | **Guardados** (tab) | Grilla de favoritos, aviso de bajada de precio |
| P0 | **Perfil propio** (tab) | Armario, ventas, compras, valoraciones, ajustes |
| P0 | **Inicio de sesión / registro / onboarding** | Incluye elegir país |
| P1 | **Explorar** (tab) | ¿Categorías, marcas, colecciones? Su diferencia con Inicio no está definida |
| P1 | **Chat comprador–vendedor** | Burbujas, oferta dentro del chat, adjuntos |
| P1 | **Ofertas / contraofertas** | Enviar, aceptar, rechazar, expirar |
| P1 | **Pedidos y seguimiento** | Estados: pagado, en inspección, enviado, entregado, aprobado |
| P1 | **Notificaciones** | Campana |
| P1 | **Perfil público del vendedor** + **valoraciones** | — |
| P2 | **Verificación de autenticidad** | Explica el proceso de 48 h, el certificado y el reporte de inspección |
| P2 | **Selector de país y moneda** | MXN, ARS, COP, CLP |
| P2 | Monedero y pagos, devoluciones y disputas, ajustes, ayuda | — |

### 5.3 Inconsistencias y propuestas de unificación

Ninguna se aplica sin tu OK.

| # | Inconsistencia | Propuesta |
|---|---|---|
| 1 | **`DESIGN.md` (Bauhaus: amarillo `#ffcc00`, bordes negros de 3 px, sin radios ni sombras) contra la pantalla** (tinta y cobalto, Bodoni, radios de 12, sombras suaves) | ✅ Decidido: manda la pantalla. `DESIGN.md` queda como archivo histórico |
| 2 | Favorito con **marcador**; el prompt pide **corazón** | Pregunta 1 (§5.7) |
| 3 | El **precio** va en Inter 700 en la tarjeta y en Bodoni 900 en el sheet | Un solo estilo de precio en Inter 700 con números tabulares. Los trazos finos de Bodoni se leen mal en cifras pequeñas |
| 4 | Nombre y marca cambian entre la tarjeta ("Trench Gamuzado", "Massimo Dutti") y el sheet ("Trench Oversize Gamuzado", "Massimo Dutti Studio") | Una sola fuente de datos; la tarjeta trunca con elipsis |
| 5 | El botón de la esquina de la tarjeta es oscuro con `unfold_less` en la primera y blanco con marcador en las demás | Un solo SaveButton en todas las tarjetas |
| 6 | El **chip activo mide 28 px** (sin borde) y el **inactivo 30 px** (con borde) | Borde de 1 px del mismo color en el activo para igualar la altura |
| 7 | **Doble borde en el buscador**: el plugin `forms` pinta un recuadro gris `#6B7280` dentro del contenedor. Sale en el PNG, pero es un artefacto | Quitarlo; el contenedor completo es el campo |
| 8 | Solo el chip "Todas" lleva contador "(48)" | Quitar el contador, o ponerlo en todos |
| 9 | El token `mono` es Space Grotesk, que no es monoespaciada. `label` y `mono` son la misma fuente | Un solo token: `label` |
| 10 | Se carga Hanken Grotesk y no se usa. `primary-light` está definido y no se usa | Eliminar la fuente; usar `primary-light` como hover y presionado |
| 11 | El hover del CTA y del FAB es `slate-900`, igual a `primary`: no se ve ningún cambio | Hover = `primary-light` `#1E293B` |
| 12 | 11 tamaños de ícono distintos | Escala 16 / 20 / 24 |
| 13 | Botón primario en Bodoni normal y secundario en Space Grotesk mayúsculas: dos voces tipográficas en la misma pareja de botones | Ambos en la misma familia (ver pregunta 10) |
| 14 | Lupa del header y barra de búsqueda duplicadas. Avatar y pestaña Perfil duplicados. **No hay acceso a la Bolsa** | Quitar la lupa del header y cambiar el avatar por un ícono de **Bolsa con contador** |
| 15 | Cuatro niveles de encabezado antes del primer producto: banner, breadcrumb + "Stream activo", título + "Vista offset" | Simplificar a un banner y un título con acción |
| 16 | Badge "Activo" solo en la primera tarjeta, sin significado claro | Pregunta 4 |
| 17 | Condición en formatos mezclados: "Excelente (9.5/10)", "Como nuevo", "Impecable", "Muy bueno (8.8/10)", "Pátina original (9/10)", "Impecable con guardapolvo" | Escala fija estilo Vinted (Nuevo con etiqueta · Nuevo sin etiqueta · Muy bueno · Bueno · Aceptable), más nota de inspección opcional |
| 18 | Tallas en formatos mezclados: "M", "30 / M", "41 EU", "Única", "32" | Sistema de tallas por categoría y país (EU / MX / AR para calzado) |
| 19 | El banner ocupa una línea en el navegador, pero dos en el PNG y a 360 px | Copy más corto, para que quepa en una línea a 360 |

### 5.4 Usabilidad y accesibilidad (WCAG AA)

**Bloqueantes:**
- **Zoom bloqueado:** `maximum-scale=1, user-scalable=no` incumple WCAG 1.4.4. Se elimina.
- **La tab bar tapa el bottom sheet:** los dos usan `z-50` y la tab bar va después en el DOM. "Guardar en Deseos" queda parcialmente oculto y el **toast completamente oculto** (capturas 02 y 03).
- **El overlay se rompe a 360 px:** "MASSIMO / DUTTI", "Talla / M" y "$1,450 / MXN" pasan a dos líneas (captura 04).
- **El doble toque no se descubre** y contradice el patrón de Vinted y Vestiaire, donde un toque abre el detalle. Además, sin overlay la grilla **no muestra precio, marca ni talla**, y en estas apps escanear precios es la tarea principal. Pregunta 2.
- **Íconos como ligaduras de texto, sin `aria-label`:** un lector de pantalla leería "search", "notifications" o "bookmark_border", en inglés.
- **Elementos no semánticos:** las tarjetas son `div` con `click` (sin teclado ni rol) y los enlaces del tab bar son `href="#"`. El sheet no tiene `role="dialog"`, ni trampa de foco, ni cierre con Esc.
- **El marcador propaga el clic a la tarjeta:** guardar también despliega el overlay.

**Áreas táctiles por debajo de 44 × 44 px [M]:**

| Elemento | Tamaño |
|---|---|
| Marcador de tarjeta | 28 × 28 |
| Botón cerrar del sheet | 28 × 28 |
| Botón `tune` del buscador | 24 × 24 |
| Avatar | 32 × 32 |
| Íconos del header | 40 × 40 |
| Chips | 28–30 de alto |
| "Vista Offset" | ~84 × 30 |

**Texto pequeño [M]:**
- **10 px:** MXN, "Activo", "Comprar →", badges de condición y talla, labels del tab bar, "Vista Offset".
- **11 px:** banner, breadcrumb, "Stream activo", marca del overlay, "Reporte de inspección", texto del sello.
- **Input a 12 px:** iOS hace zoom automático al enfocarlo porque está por debajo de 16 px.
- Propuesta: mínimo 12 px para metadatos, 14–16 px para cuerpo e input a 16 px.

**Contraste [M] (calculado con la fórmula WCAG):**

| Par | Ratio | Resultado |
|---|---|---|
| `#64748B` sobre `#FFFFFF` | 4.76 | ✅ AA |
| `#64748B` sobre `#FAFAFA` | 4.56 | ✅ AA (justo) |
| `#64748B` sobre `#F1F5F9` (chips, banner, MXN) | **4.34** | ❌ falla en texto de 10–12 px |
| Placeholder (`#64748B` al 70 %) sobre blanco | **2.72** | ❌ |
| Separador "/" (al 40 %) | 1.68 | ❌ (es decorativo; aceptable si va `aria-hidden`) |
| `#3B82F6` "Comprar →" sobre overlay `#1B2335` | **4.27** | ❌ en 10 px |
| `#2563EB` sobre `#FAFAFA` / `#F1F5F9` | 4.95 / 4.72 | ✅ |
| `#CBD5E1` sobre overlay | 10.57 | ✅ |
| Blanco sobre `#0F172A` | 17.85 | ✅ |
| Borde `#E2E8F0` sobre `#FAFAFA` (buscador) | **1.18** | ⚠️ El límite del campo casi no se ve (WCAG 1.4.11) |

Propuesta: oscurecer `on-surface-variant` a algo como `#475569`, que da 7.6:1 sobre blanco y unos 7:1 sobre `#F1F5F9`. Lo confirmo en el paso 3.

**Otros:**
- `animate-pulse` infinito sin respetar `prefers-reduced-motion`.
- Las fotos solo tienen `data-alt`, en inglés; falta `alt`.
- El orden del DOM es por columna (1, 3, 5, 7 / 2, 4, 6, 8) y no coincide con la lectura visual (1, 2, 3, 4…). Además complica el scroll infinito: cada nueva página tiene que repartirse entre las dos columnas.
- `backdrop-filter` en el header, el tab bar y las píldoras es costoso en Android de gama baja, muy común en LATAM. Propondré una alternativa sólida.

### 5.5 Contenido, datos y assets

- **Fotos remotas:** 9 imágenes en `lh3.googleusercontent.com/aida-public/…`, generadas por IA y hospedadas por Google, sin garantía de que duren. La del **vestido trae texto incrustado** ("Modo A – Marketplace Minimal Monocromático").
- **Marcas del mock europeas y japonesas** (Massimo Dutti, Arket, COS, Acne, Dries Van Noten, Lemaire, Schott, Studio D'Artisan). No se sienten LATAM. Propondré una mezcla de globales y regionales (Johanna Ortiz, Silvia Tcherassi, Studio F, Vélez, Jazmín Chebar, Rapsodia, Carla Fernández, Pineda Covalin…).
- **Copy interno filtrado:** "Stream activo", "Archivo offset", "Vista offset" parecen nombres de trabajo del diseñador, no texto para el usuario.
- **"Fideicomiso":** en México es una figura legal regulada. Afirmar que el dinero está "en fideicomiso" es una promesa legal. Un texto más seguro: "Tu pago queda retenido hasta que recibes y apruebas la prenda". Hay que validarlo con quien lleve la parte legal.
- **Reglas de negocio implícitas en el copy:**
  - Inspección física en **48 h** antes del envío (modelo con custodia, como Vestiaire).
  - **Reserva de 15 min** al añadir a la bolsa.
  - Pago retenido hasta que el comprador aprueba.
  - Certificado de autenticidad para algunas piezas.
- **Moneda:** el formato "$1,450 MXN" sirve en México, pero no en Argentina ("$ 1.450"), Colombia ("$ 145.000") ni Chile ("$145.000"). Además los rangos de precio cambian mucho por país.
- **Modo oscuro:** el HTML declara `darkMode: "class"`, pero no hay tokens oscuros.

### 5.6 Anexo: datos mock del HTML

| id | Prenda | Marca | Talla | Condición | Precio | Aspect ratio | Columna |
|---|---|---|---|---|---|---|---|
| 1 | Trench Oversize Gamuzado | Massimo Dutti Studio | M | Excelente (9.5/10) | $1,450 MXN | 3:4.4 | Izq |
| 2 | Vestido Lino Estructurado | COS Archive | S | Como nuevo | $890 MXN | 3:4.6 | Der |
| 3 | Pantalón Plisado Pinzas | Arket Atelier | 30 / M | Excelente | $780 MXN | 3:4.6 | Izq |
| 4 | Blazer Cuadro Terra | Dries Van Noten (Arch) | L | Impecable | $3,200 MXN | 3:4.1 | Der |
| 5 | Botín Chelsea Punta Cuadrada | Acne Studios | 41 EU | Muy bueno (8.8/10) | $2,100 MXN | 3:3.8 | Izq |
| 6 | Bolso Baguette Cuero Oliva | Lemaire | Única | Impecable con guardapolvo | $4,600 MXN | 3:3.8 | Der |
| 7 | Cazadora Vintage Piel Envejecida | Schott NYC Archive | L | Pátina original (9/10) | $2,850 MXN | 3:4.4 | Izq |
| 8 | Jeans Selvedge Índigo | Studio D'Artisan | 32 | Excelente (9.2/10) | $1,650 MXN | 3:4.2 | Der |

### 5.7 Preguntas para ti

> **Respuestas (04-10-2026):**
> 1. **Marcador.** Se mantiene el diseño.
> 2. **El overlay no aparece al cargar.** Se muestra solo al tocar la tarjeta. El resto de la interacción queda como en el diseño (ver la interpretación en `PROPUESTA.md` §4).
> 3. **Modelo de negocio:** se define después.
> 4. *(Pregunta 5)* **País:** es un mockup y no importa. Se queda MXN como en el diseño.
> 5. *(Pregunta 6)* **Fotos:** se usan las del handoff (URLs remotas) y luego se reemplazan por las definitivas.
>
> Las preguntas 4, 7, 8, 9, 10 y 11 tienen un valor por defecto propuesto en `PROPUESTA.md` §5.

Por orden de impacto:

1. **Favorito:** ¿**corazón** (lo que pide el prompt, estilo Vinted) o **marcador** (lo que muestra el diseño, más "editorial")?
2. **Toque en la tarjeta:** ¿mantengo el **doble toque** (overlay y luego sheet) o aplico la propuesta?
   - Marca, talla y precio siempre visibles bajo la foto.
   - Un toque abre el **detalle** de la prenda.
   - El sheet de compra rápida queda como atajo opcional.
3. **Modelo de negocio:** ¿**todas** las prendas pasan por inspección física de Vértice (como Vestiaire) o es **P2P** con verificación opcional para piezas premium? Esto cambia checkout, envíos, publicar y pedidos.
4. **Copy interno:** ¿qué significan "Stream activo", "Archivo offset", "Vista offset", "Selección curada / Recién subido" y el badge "Activo"? ¿Los reemplazo por copy de usuario?
5. **Países:** ¿lanzas solo en **México** (badge MXN fijo) o con selector **MX / AR / CO / CL** desde el inicio?
6. **Fotos:** ¿descargo las 9 imágenes remotas al repo (`lh3.googleusercontent.com`, unos 9 archivos JPG/WebP) o uso fotos mock propias? En cualquier caso reemplazaría la del vestido por el texto incrustado.
7. **Header:** ¿quito la lupa duplicada y cambio el avatar por la **Bolsa con contador**?
8. **Inicio contra Explorar:** ¿qué diferencia hay entre los dos tabs?
9. **Escritorio:** ¿solo mobile por ahora (columna centrada en pantallas grandes) o quieres una grilla de 3–4 columnas desde 768 px?
10. **Tipografía de botones:** ¿CTA en Bodoni (como el diseño) o todos los botones en una sola familia de UI?
11. **Modo oscuro:** ¿entra en el alcance?
