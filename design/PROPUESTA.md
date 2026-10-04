# PROPUESTA DE IMPLEMENTACIÓN (Paso 3) — VÉRTICE

> Estado: **esperando aprobación**. No se ha escrito código de la app.
> Se basa en `ANALISIS.md` y en las respuestas del 04-10-2026.

---

## 1. Stack

| Capa | Elección | Por qué |
|---|---|---|
| Build | **Vite 5 + React 18 + TypeScript 5** | Es tu patrón (`mercar`, `iron-stack-gainz`). Sale estático para GitHub Pages sin configuración extra |
| Estilos | **Tailwind 3.4** + variables CSS | El export de Stitch ya está en Tailwind: las clases del diseño se trasladan casi 1:1, y eso da la máxima fidelidad y comparaciones fáciles |
| PWA | **vite-plugin-pwa** (`autoUpdate`, caché de Google Fonts y de las fotos) | Mismo bloque que en tus otras apps |
| Rutas | **react-router-dom 6** con `basename={import.meta.env.BASE_URL}` y una copia de `index.html` como `404.html` | Así los enlaces profundos (`/vertice/prenda/12`) no dan 404 en GitHub Pages |
| Bottom sheets | **vaul** (ya lo usas en iron-stack) | Arrastre para cerrar, trampa de foco, `role="dialog"` y Esc incluidos. Resuelve la accesibilidad del sheet |
| Carrusel | **embla-carousel-react** (ya lo usas en iron-stack) | Swipe nativo y liviano para la galería del detalle |
| Datos | **TanStack Query** (`useInfiniteQuery`) sobre un repositorio mock | Scroll infinito, pull-to-refresh y caché sin código propio. Cuando llegue Supabase solo se cambia el repositorio |
| Íconos | **Material Symbols Outlined** desde Google Fonts, **solo con los íconos usados** (parámetro `icon_names`) | Es el set del diseño. Con el subset baja de unos 3 MB a pocos KB |
| Fuentes | Bodoni Moda, Inter y Space Grotesk desde Google Fonts, con la PWA cacheándolas | Como en mercar. Hanken Grotesk queda fuera porque no se usa |
| Deploy | `.github/workflows/deploy.yml` copiado de mercar, `base: "/vertice/"` | **No creo el repo ni hago push** hasta que me lo digas |

**Por qué no Next.js:** GitHub Pages solo sirve archivos estáticos. Con Next habría que usar `output: "export"`, que deja afuera lo que justifica Next (SSR, rutas de API, `next/image`). Para un frontend con datos mock y Supabase después, Vite hace lo mismo con menos piezas, y es lo que ya despliegas.

No incluyo shadcn/Radix completo (iron-stack trae unas 30 dependencias). Los componentes del diseño son pocos y muy específicos, así que conviene hacerlos a mano.

---

## 2. Mapeo de tokens

**Una sola fuente:** `src/estilos/tokens.css` define variables CSS en `:root`, y `tailwind.config.ts` las expone **con los mismos nombres que usa Stitch**. Así una clase del diseño (`bg-surface-container`, `text-on-surface-variant`, `font-headline`, `rounded-xl`) significa lo mismo en el código.

```css
/* src/estilos/tokens.css (extracto) */
:root {
  --primary: #0F172A;  --primary-light: #1E293B;
  --cobalt: #2563EB;   --cobalt-light: #3B82F6;
  --surface: #FAFAFA;  --surface-container: #F1F5F9;
  --surface-container-high: #E2E8F0; --surface-container-lowest: #FFFFFF;
  --on-surface: #0F172A; --on-surface-variant: #64748B; /* §5-B2 */
  --outline-subtle: #E2E8F0;
  /* propuesta: estados, el diseño no los trae */
  --success: #15803D; --error: #B91C1C; --warning: #B45309;
}
```

| Grupo | En `tailwind.config.ts` |
|---|---|
| Colores | `primary`, `cobalt`, `surface-*`, `on-*`, `outline-subtle`, `success`, `error`, `warning` → `var(--…)` (con soporte de opacidad `/80`) |
| Familias | `font-headline` (Bodoni Moda) · `font-body` (Inter) · `font-label` (Space Grotesk). `mono` se unifica con `label` |
| Escala de texto con nombre | `text-micro` 10/15 · `text-meta` 11/16.5 · `text-xs` 12/16 · `text-sm` 14/20 · `text-base` 16/22 · `text-lg` 18/28 · `text-logo` 22/33. **Cambiar el mínimo de legibilidad (§5-B3) sería editar dos líneas** |
| Radios | `DEFAULT` 2px · `lg` 6 · `xl` 12 · `2xl` 16 · `full` (igual que Stitch) |
| Sombras con nombre | `shadow-header`, `shadow-tabbar`, `shadow-buscador`, `shadow-cta`, `shadow-fab`, `shadow-sheet` (valores de §3.5 del análisis) |
| Medidas fijas | `h-barra` 64px (header y tab bar) · `gap-grilla` 12 · `pt-offset` 24 (desfase de la columna derecha) |
| Íconos | Componente `<Icono nombre="search" tam={21} />` con `aria-hidden`. El tamaño de cada sitio se respeta tal como está en el diseño |

---

## 3. Estructura de carpetas

Sigo la convención de `mercar`, con nombres en español.

```
vertice/
├─ design/                    handoff (originales intactos), ANALISIS.md, PROPUESTA.md
├─ index.html                 viewport SIN user-scalable=no; fuentes; theme-color #0F172A
├─ public/                    favicon e íconos PWA (placeholder "V" en Bodoni, ver §5-B6)
└─ src/
   ├─ main.tsx · App.tsx      providers y rutas
   ├─ estilos/                tokens.css · index.css (base, safe areas, reduced-motion)
   ├─ ui/                     design system genérico, sin datos de negocio
   │   Icono · Boton · BotonIcono · Chip · Badge · Pildora · Avatar · BarraBusqueda
   │   Hoja (bottom sheet) · Aviso (toast) · Esqueleto · EstadoVacio · Carrusel
   ├─ componentes/            piezas de Vértice que usan la ui
   │   Encabezado · BarraPestanas · BotonVender · BannerCustodia · FilaCategorias
   │   EncabezadoSeccion · GrillaOffset · TarjetaPrenda · BotonGuardar
   │   HojaCompraRapida · SelloAutenticidad · IndicadorRefresco
   ├─ pantallas/              Inicio · CatalogoUI (/ui) · Explorar* · Guardados* · Perfil*
   │                          Detalle* · Busqueda* · Notificaciones* · …   (* = propuesta)
   ├─ datos/                  ← capa separada para conectar el backend
   │   tipos.ts               Prenda, Marca, Condicion, Talla, Vendedor, Pagina<T>
   │   repositorio.ts         interfaz: listarPrendas({categoria, cursor}), obtenerPrenda(id), …
   │   mock/prendas.ts        las 8 prendas del diseño + ~40 más para el scroll infinito
   │   mock/imagenes.ts       ⚑ las 9 URLs del handoff en UN archivo, para reemplazarlas fácil
   │   mock/repositorioMock.ts  paginación con cursor, latencia simulada y errores opcionales
   │   index.ts               exporta el repositorio activo (mock hoy, Supabase mañana)
   ├─ hooks/                  useScrollInfinito · usePullToRefresh · useGuardados (localStorage)
   └─ lib/                    formatoPrecio (Intl, es-MX/MXN) · cn
```

**Datos mock:**
- Las 8 prendas del handoff van **tal cual** (título, marca, talla, condición, precio, aspect ratio), para que el Inicio sea fiel al PNG.
- Las adicionales usan las mismas 9 fotos en rotación, con marcas y ciudades de LATAM, en MXN.
- La moneda es un campo de `Prenda`, así que cambiar de país después no rompe nada.

---

## 4. Cómo interpreto tu respuesta 2 (interacción de la tarjeta)

> "Que no sea al principio y si hace click que muestre."

1. Al cargar, **ninguna** tarjeta muestra el overlay. Todas se ven como en el PNG salvo la primera: foto, botón de marcador arriba a la derecha y nada más.
2. **Primer toque** sobre una tarjeta: se despliega el overlay (marca, talla, nombre, precio, "Comprar →"). Aparece la píldora "Activo" y el marcador cambia por el botón de colapsar, como en la primera tarjeta del diseño. Si había otra tarjeta abierta, se cierra.
3. **Segundo toque** sobre la misma tarjeta: abre el bottom sheet de compra rápida.
4. El botón de colapsar cierra el overlay. **El marcador guarda la prenda sin abrir el overlay** (corrige el bug de propagación del clic).

Para que funcione con teclado y lector de pantalla, la tarjeta será un `<button aria-expanded>`; no hay cambio visual.

---

## 5. Decisiones que necesito confirmar

### A. Correcciones que aplico por defecto (bugs o accesibilidad sin cambio visual)

| # | Corrección |
|---|---|
| A1 | Tab bar **debajo** del bottom sheet y del scrim (bug de z-index). Así se ven el botón secundario y el toast |
| A2 | Overlay a 360 px: marca truncada con elipsis, talla y precio sin corte de línea (`whitespace-nowrap`), para que se vea como a 414 |
| A3 | Zoom permitido: se quita `user-scalable=no` y `maximum-scale=1` |
| A4 | `aria-label` en todos los botones de ícono, `alt` en las fotos y separadores con `aria-hidden` |
| A5 | **Áreas táctiles de 44 px invisibles:** el ícono mantiene su tamaño visual (28 / 32 / 40 px) y el área tocable se amplía con un pseudo-elemento |
| A6 | `prefers-reduced-motion`: sin pulso infinito ni zoom en las fotos para quien lo tenga activado |
| A7 | Se elimina el doble borde del buscador (artefacto del plugin `forms`) |
| A8 | El chip activo y el inactivo con la misma altura (borde de 1 px del color del fondo en el activo) |
| A9 | Hover del CTA y del FAB = `primary-light` (hoy el hover no cambia nada) |

### B. Cambios visibles que solo hago con tu OK

| # | Propuesta | Si dices que no |
|---|---|---|
| B1 | Input del buscador a **16 px** (iOS hace zoom al enfocar si baja de 16) | Se queda en 12 px y iOS hará zoom |
| B2 | `on-surface-variant` de `#64748B` a **`#475569`**: pasa AA en chips y banner (4.34 → 6.9:1). El placeholder pasa de opacidad 70 % a **100 %** (de 2.72 a 7.58:1; al 70 % se quedaría en 3.59) | Se queda igual que el diseño |
| B3 | **Mínimo de 12 px** en todo el texto (hoy hay 10 y 11 px) | Se queda igual que el diseño |
| B4 | Precio en un solo estilo (Inter 700 con números tabulares) también en el sheet | Bodoni 900 en el sheet e Inter en la tarjeta |
| B5 | El toast "agregada a tu bolsa" con enlace **"Ver bolsa"** (hoy no hay forma de llegar a la bolsa) | Sin acceso a la bolsa hasta definir el checkout |
| B6 | Ícono de app y favicon: monograma **"V" en Bodoni** blanco sobre `#0F172A` (no hay logo en el handoff) | Me pasas un logo |

### C. Valores por defecto para las preguntas sin responder

| Pregunta | Por defecto |
|---|---|
| 4. Copy interno ("Stream activo", "Vista offset"…) | **Se queda tal cual.** "Vista offset" queda como acción sin efecto, marcada con *pendiente* |
| 7. Header (lupa duplicada, avatar) | **Se queda como en el diseño** |
| 8. Inicio contra Explorar | Explorar = **categorías + búsqueda con filtros** (propuesta) |
| 9. Escritorio | **Solo mobile.** En pantallas anchas, columna centrada de 480 px |
| 10. Tipografía de botones | **Como el diseño** (CTA en Bodoni, secundario en Space Grotesk) |
| 11. Modo oscuro | **Fuera de alcance** |
| "Fideicomiso" | Se queda el texto del diseño, marcado como **pendiente de revisión legal** |

---

## 6. Orden de construcción

Cada pantalla: captura al mismo ancho que la referencia → comparación → lista de diferencias → ajustes → **commit** → aviso de qué sigue.

| # | Entrega | Referencia de verificación |
|---|---|---|
| 0 | **Andamiaje**: Vite, Tailwind con tokens, PWA, rutas, fuentes, íconos, capa de datos mock | `npm run build` sin errores |
| 1 | **Design system** + página **`/ui`** con todos los componentes y sus estados (incluye estados propuestos: skeleton, vacío, error, deshabilitado y foco) | Valores de `ANALISIS.md` §3–4 |
| 2 | **Inicio** con header, banner, buscador, chips, grilla offset, tarjeta con overlay, tab bar, **pull-to-refresh** y **scroll infinito** | `screen.png` a **414 px** y revisión a 360 |
| 3 | **Hoja de compra rápida** y toast | `_derivados/02` y `03` (render del HTML a 414, ya que no hay PNG) |
| 4 | *Propuesta*: **Detalle de prenda** con carrusel por swipe (se llega desde la miniatura o el título del sheet) | Lenguaje visual del Inicio |
| 5 | *Propuesta*: **Filtros en bottom sheet** + **Búsqueda / resultados** + **Explorar** | ″ |
| 6 | *Propuesta*: **Guardados** (con estado vacío) | ″ |
| 7 | *Propuesta*: **Perfil** + **Notificaciones** | ″ |
| — | **En espera del modelo de negocio:** Bolsa/checkout, Publicar (FAB "+"), Pedidos, Ofertas, Chat, Verificación | — |

Las pantallas de propuesta llevan una etiqueta visible **"Propuesta"** (desactivable) y quedan anotadas en `CLAUDE.md`.

---

## 7. Lo que necesito de ti para arrancar

1. **OK al stack** (§1) y a la estructura (§2–3).
2. **Sí o no a cada punto B1–B6.** Puedes responder "todo sí" o "todo no".
3. **OK a los valores por defecto C** (o tus cambios).
4. Que mi interpretación de §4 sea correcta.
