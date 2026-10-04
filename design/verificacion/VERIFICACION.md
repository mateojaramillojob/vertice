# Verificación contra el diseño

Método: la app se levanta en el navegador integrado y `design/screen.png` se superpone al 50 % de opacidad, escalado a **390 px** (el ancho real del render; ver la corrección en `ANALISIS.md`). Las medidas se toman con `getComputedStyle`. También se revisa a 360 px (mínimo) y 414 px.

---

## P1 · Inicio ✅ (commit "Construir el Inicio…")

Capturas: `inicio-390-calco-sobre-mockup.jpg` (superposición), `inicio-360-tarjeta-abierta.jpg`, `inicio-414-carga-inicial.jpg`, `inicio-360-error-propuesta.jpg`.

**Coincide con el mockup** (superposición a 390 px):
- Header: logotipo, badge MXN, lupa, campana con punto, avatar. Mismas posiciones, 64 px de alto.
- Buscador: misma caja, 56 px de alto, ícono de filtros en la misma posición.
- Chips: mismas posiciones; "Calzado" queda cortado en el borde derecho igual que en el PNG.
- "Selección Curada / Recién Subido" y "Stream Activo".
- Título "Catálogo Verificado · Archivo Offset" partido en las mismas dos líneas, y "Vista Offset" en dos líneas.
- Grilla: tarjetas del mismo ancho y alto (proporciones 3:4.4, 3:4.6…), gap de 12 px y columna derecha 24 px más abajo.
- Tarjeta abierta: píldora "Activo", botón de colapsar, overlay con marca, talla, título, precio y "Comprar →" en las mismas posiciones.
- Tab bar: 4 pestañas + FAB, mismas posiciones.

**Diferencias, todas aprobadas:**

| Diferencia | Motivo |
|---|---|
| Al cargar, ninguna tarjeta muestra el overlay (en el PNG la primera viene abierta) | Respuesta 2 del 04-10 |
| Banner: corta en "INSPECCIÓN FÍSICA / GARANTIZADA · 48H" (el PNG corta antes de "48H") | B3: texto de 11 → 12 px |
| Buscador sin recuadro gris interno; placeholder más grande | A7 y B1 (16 px) |
| Etiquetas del tab bar, MXN, "Recién Subido", badges y "Vista Offset" algo más grandes | B3: mínimo 12 px |
| Texto secundario un poco más oscuro | B2: `#475569` |
| Precio de la tarjeta con números tabulares | B4 |

**Encontrado y corregido durante la verificación:**
- Las barras de scroll eran visibles; el handoff las oculta. Corregido globalmente.
- El placeholder del buscador se cortaba sin elipsis a 360 px. Corregido.
- El pull-to-refresh volvía a pedir todas las páginas cargadas (más de 3 s). Ahora vuelve a la primera (~0.7 s).

**Interacciones probadas:**
- Primer toque abre el overlay y cierra el de la otra tarjeta; segundo toque abre la compra rápida.
- El marcador guarda sin abrir el overlay.
- Chips: "Denim" deja 6 prendas.
- "Recién Subido" reordena.
- Scroll infinito: 8 → 48 prendas y el mensaje final.
- Pull-to-refresh con eventos táctiles simulados.
- `?mock=error` muestra el estado de error.
- A 360 px no hay scroll horizontal. El overlay queda en una línea por fila: marca con elipsis y "Comprar" solo como flecha (A2).

---

## P2 · Compra rápida (bottom sheet) ✅

Referencia: no hay mockup, así que se compara con el render de `design/code.html` a 414 px (`_derivados/02`).
Capturas: `compra-rapida-414-calco-sobre-render.jpg` (superposición), `compra-rapida-414-tras-anadir.jpg`, `compra-rapida-360.jpg`.

**Coincide con el render:**
- Arranca a la misma altura: 388 px contra ~390 en el render.
- Manija descentrada a propósito, como en el original, y botón cerrar.
- Miniatura de 80 × 96, marca, título en Bodoni, badges, "Reporte de inspección", sello de autenticidad, CTA primario de 48 px y secundario con borde.

**Diferencias, todas aprobadas:**

| Diferencia | Motivo |
|---|---|
| La tab bar queda **debajo** del sheet y se ven "Guardar en Deseos" y el aviso; en el render del handoff los tapaba | A1 (bug corregido) |
| Precio en Inter 700 en vez de Bodoni 900 | B4 |
| Badges, etiquetas y texto del sello a 12 px; el sello reparte el texto distinto | B3 |
| El aviso trae "Ver bolsa" | B5 |
| "Guardado" se mantiene mientras la prenda siga guardada; en el handoff volvía a "Guardar en Deseos" a los 2 s | Estado real (antes era una demo) |
| Miniatura y título enlazan al detalle de la prenda | Propuesta §6-4 |

**Encontrado y corregido:**
- vaul le pone al contenido un `::after` alto; con `overflow-y-auto` en el mismo elemento se podía scrollear hacia un hueco vacío. El scroll pasó a un div interno.
- A 360 px el aviso dejaba el ícono solo en una línea y partía "15 / min". Ahora el ícono acompaña al texto y "15 min" va con espacio irrompible.

**Interacciones probadas:**
- Arrastrar o Esc cierra la hoja.
- "Añadir" cambia el botón durante 3 s y muestra el aviso.
- La reserva de 15 min se guarda en la bolsa.
- "Guardar en Deseos" alterna y comparte estado con el marcador de la tarjeta.
- A 360 × 740 cabe sin scroll.
