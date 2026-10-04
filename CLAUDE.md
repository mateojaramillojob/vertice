# VÉRTICE — marketplace de moda de segunda mano (LATAM)

App mobile-first de compraventa de ropa usada, con experiencia tipo Vinted / Vestiaire Collective.
Se construye a partir del handoff de Google Stitch que está en `design/`.

## Estado
- [x] Paso 1: handoff descomprimido en `design/` (los originales no se tocan)
- [x] Paso 2: `design/ANALISIS.md` (revisado; respuestas en §5.7)
- [x] Paso 3: `design/PROPUESTA.md`, **pendiente de aprobación**
- [ ] Paso 4: design system (`/ui`) y pantallas
- [ ] Paso 5: verificación contra el mockup por pantalla, con un commit cada una

## Reglas de trabajo
- Avanzar por etapas y **esperar aprobación** entre pasos.
- Si el diseño es ambiguo, preguntar; no inventar.
- No cambiar decisiones de diseño en silencio. Las mejoras se proponen y esperan OK.
- Las pantallas no diseñadas se marcan como **"propuesta"**.
- Por ahora solo frontend con datos mock, con la capa de datos separada para conectar el backend después.
- Usar los assets del handoff; no sustituirlos sin avisar.

## Decisiones tomadas
| Fecha | Decisión |
|---|---|
| 2026-10-04 | Fuente de verdad visual: `design/screen.png` + `design/code.html`. `design/DESIGN.md` (Bauhaus neo-brutalista) **se descarta** porque no corresponde a la pantalla |
| 2026-10-04 | El proyecto vive en `Mateo Jaramillo/vertice/`, junto a `mercar` e `iron-stack-gainz` |
| 2026-10-04 | Referencias derivadas (capturas y mediciones) en `design/_derivados/` |
| 2026-10-04 | Favorito = **marcador** (bookmark), como en el diseño. Nada de corazón |
| 2026-10-04 | Ninguna tarjeta trae el overlay abierto al cargar. **Primer toque** muestra el overlay; **segundo toque** abre el bottom sheet de compra rápida |
| 2026-10-04 | País y moneda no importan en el mockup: **MXN** como en el diseño, con la moneda como campo del modelo de datos |
| 2026-10-04 | Fotos: se usan las URLs remotas del handoff, centralizadas en un solo archivo de mock, para que Mateo las reemplace después |
| 2026-10-04 | Modelo de negocio (inspección para todas las prendas o P2P) **sin definir**. Checkout, publicar y pedidos esperan esa decisión |

## Cómo correrlo
- `npm run dev` levanta la app en el puerto 8082 (config `vertice` en `../.claude/launch.json`). El catálogo del design system está en **`/ui`**.
- `npm run build` hace typecheck + build y copia `404.html` para que las rutas profundas funcionen en GitHub Pages (`base: /vertice/`).
- `?mock=error` en la URL simula fallos de red, para ver los estados de error.
- Deploy: `.github/workflows/deploy.yml` (copiado de mercar). **Todavía no hay repo remoto ni push.**

## Estructura
- `src/estilos/tokens.css`: **única fuente** de colores (canales RGB). `tailwind.config.ts` los expone con los nombres de Stitch.
- `src/ui/`: design system genérico (Icono, Boton, BotonIcono, Chip, Badge, Hoja, Aviso, Estados, Precio, Carrusel, Foto…).
- `src/ui/iconos.ts`: **única lista de íconos**. De ahí salen el tipo `NombreIcono` y la URL del subset de Material Symbols; un ícono que no esté en la lista se ve como texto.
- `src/componentes/`: piezas de Vértice (Encabezado, BarraPestanas, TarjetaPrenda, GrillaOffset, HojaCompraRapida…).
- `src/pantallas/`: una por ruta. Las no diseñadas usan `MarcoPantalla` con la etiqueta "Propuesta".
- `src/datos/`: `tipos.ts` + interfaz `repositorio.ts`. Hoy se implementa con `mock/`. La UI solo usa los hooks de `consultas.ts`; para Supabase basta otra implementación en `datos/index.ts`.
- `src/datos/mock/imagenes.ts`: **todas las fotos** (las 9 URLs del handoff). Mateo las reemplaza por las definitivas.
- Guardados y bolsa viven en `localStorage` (`hooks/useGuardados`, `hooks/useBolsa`) hasta que haya backend.

## Convenciones
- UI en español latinoamericano neutro. Datos mock con marcas, tallas, ciudades y nombres de LATAM. Moneda local (MXN, ARS, COP, CLP) formateada con `Intl.NumberFormat` según el locale.
- Responsive desde **360 px**. Ancho de referencia del mockup: **414 px**.
- Accesibilidad **WCAG AA**: áreas táctiles ≥ 44 px, zoom permitido, `aria-label` en botones de ícono, respetar `prefers-reduced-motion`.

## Design tokens (provisionales, medidos del handoff; detalle en `design/ANALISIS.md` §3)
- **Colores:**
  - `primary #0F172A` · `primary-light #1E293B`
  - `cobalt #2563EB` · `cobalt-light #3B82F6`
  - `surface #FAFAFA` · `surface-container #F1F5F9` · `surface-container-high #E2E8F0` · `surface-container-lowest #FFFFFF`
  - `on-surface #0F172A` · `on-surface-variant #64748B` (propuesto oscurecer a `#475569` por contraste, pendiente de OK) · `outline-subtle #E2E8F0`
- **Fuentes:** headline **Bodoni Moda** · body **Inter** · label **Space Grotesk**
- **Radios:** 2 (badge) · 6 (lg) · 12 (xl: tarjetas, inputs, botones) · 16 (2xl: sheet) · full
- **Espaciado:** base 4 · gutter 16 · grilla masonry de 2 columnas con gap 12 y la columna derecha desplazada 24
- **Barras:** header y tab bar de 64 px
- **Íconos:** Material Symbols Outlined

## Cambios aprobados respecto al handoff (04-10-2026)
| # | Cambio |
|---|---|
| A1–A9 | Correcciones sin cambio visual: tab bar debajo del sheet, overlay sin partirse a 360 px (a menos de 175 px de ancho de tarjeta, "Comprar" queda solo como flecha), zoom permitido, aria-labels, áreas táctiles de 44 px con `.toque-44`, `prefers-reduced-motion`, sin doble borde en el buscador, chips de igual altura, hover = `primary-light` |
| B1 | Inputs a 16 px (el alto del buscador se mantiene en 56) |
| B2 | `on-surface-variant` = `#475569`; placeholder al 100 % |
| B3 | Mínimo de 12 px: tokens `text-micro` (antes 10) y `text-meta` (antes 11) |
| B4 | Un solo estilo de precio: `<Precio>`, Inter 700 tabular |
| B5 | "Ver bolsa" en el toast de compra rápida |
| B6 | Íconos de app: "V" de Bodoni blanca sobre `#0F172A` (dibujada a 16 px y escalada, para tener trazos visibles) |
| C | Copy interno del diseño tal cual; header como el diseño; Explorar = categorías + búsqueda; solo mobile (columna de 480 px en pantallas anchas); sin modo oscuro |

## Pendientes conocidos
- "Comprar →" (`#3B82F6` sobre el overlay) da 4.27:1, por debajo de AA en 12 px. Va como en el diseño; requiere decisión.
- "Fideicomiso" en el sello de autenticidad: pendiente de revisión legal.
- "Vista Offset" es texto sin acción, como en el handoff.

## Pendiente de respuesta del usuario
- Modelo de negocio (inspección para todas las prendas o P2P): bloquea checkout, publicar, pedidos, ofertas y chat.
