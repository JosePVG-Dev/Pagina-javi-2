# Diseño responsive del portfolio

- **Fecha:** 2026-11-11
- **Estado:** aprobado por el usuario
- **Alcance:** toda la página (nav, hero, precios, catálogo, contacto y pie) en móvil y tablet. Escritorio intacto salvo mejoras de anclaje.
- **Decisiones del usuario:** navegación **B** (barra compacta de dos pisos), **XP fiel** (se conservan marcos, beige y barra azul) y pasada **de página completa**.

## 1. Contexto

El sitio es una sola página bilingüe (ES/EN) construida con Astro 5, Tailwind CSS 4 y el tema XP vendado. En escritorio funciona, pero al estrechar:

- La barra superior no cabe: marca, tres enlaces e idioma compiten en una fila.
- El carrusel de precios mide 420 px de alto con controles que casi no caben a 320 px.
- El padding de sección (24 px) más el del `.xp-group` (20 px) deja muy poco ancho útil en teléfonos.
- A 768 px la rejilla de precios ya es de dos columnas: la lista queda en ~240 px y el carrusel en ~360 × 560 px, demasiado estrecho y alto.
- Los anclajes quedan debajo de la barra fija porque no hay `scroll-margin-top`.
- Los inputs a 11 px provocan el zoom automático de iOS al enfocar.
- El catálogo salta de 2 columnas a 5 sin paso intermedio para tablet.

## 2. Objetivos y no objetivos

**Objetivos**

- Que la página sea usable y legible de 320 px a 1023 px sin scroll horizontal.
- Mantener el aspecto XP: marcos de grupo, beige, barra azul, botones y tipografía.
- No tocar el layout de escritorio (≥1024 px) salvo el espacio de los anclajes.
- No añadir JavaScript ni duplicar markup de navegación.
- Resolver los problemas táctiles: tamaños de toque, swipe del carrusel, zoom de iOS.

**No objetivos**

- Rediseñar la identidad visual, el copy, los precios o las imágenes.
- Cambiar `src/styles/xp/theme.css` (vendado) ni `src/data/planes.ts` / `src/i18n/ui.ts`.
- Añadir un menú hamburguesa, scroll-spy o nuevas secciones.
- Cambiar el autoplay del carrusel o su comportamiento de accesibilidad.

## 3. Puntos de ruptura

Se usan los breakpoints por defecto de Tailwind, sin inventar nuevos.

| Rango | Tratamiento |
| --- | --- |
| `< 640 px` | Teléfono. Nav de dos filas, una columna, controles táctiles, inputs a 16 px. |
| `640–767 px` | Teléfono grande. Mismo layout; catálogo a 3 columnas y formulario a 2 columnas. |
| `768–1023 px` | Tablet. Nav de una fila, precios apilados, carrusel a ancho completo, inputs a 16 px. |
| `≥ 1024 px` | Escritorio. Layout actual: precios a 2fr/3fr y catálogo a 5 columnas. |

Cambios de rejilla concretos:

- Precios: de 1 columna a 2fr/3fr en `lg` (antes `md`).
- Catálogo: 2 columnas → 3 en `sm` → 5 en `lg`.
- Formulario: 1 columna → 2 en `sm` (ya existe).
- Nav: dos filas → una en `md`.

## 4. Reglas globales

### Espaciado

| Elemento | Móvil | Desde `md` |
| --- | --- | --- |
| Secciones (`Precios`, `Catálogo`, `Contacto`) | `px-4 py-4` | `px-10 py-8` |
| Hero | `px-4 py-10` | `px-10 py-20` |
| `.xp-group` | `0.75rem` | `2rem 2.25rem` |

Con `px-4` + `p-3`, a 320 px quedan **264 px** de contenido. Es el mínimo que necesita la fila de controles del carrusel (260 px).

### Anclajes y desbordes

- `.xp-section { overflow-x: clip; }` para cortar el sangrado del WordArt rotado o de los stamps sin crear un contenedor de scroll (sticky sigue funcionando).
- `scroll-margin-top` en `#inicio`, `#precios`, `#catalogo` y `#contacto`:
  - **96 px** por debajo de `md` (barra de dos filas, ~91 px de alto).
  - **56 px** desde `md` (barra de una fila).
- Se mantiene `scroll-behavior: smooth`.

### Toque y formularios

- Enlaces de sección de la nav: 40 px de alto en móvil, 32 px desde `md`.
- Botones `.button` por debajo de `lg`: `min-height: 40px`, `display: inline-flex`, centrado vertical y horizontal. Incluye CTA del hero, CTA del catálogo, flechas y pausa del carrusel, CTA de precios y submit del formulario.
- Submit del formulario: 44 px de alto en móvil y ancho completo; desde `sm`, ancho automático.
- Inputs de texto, email, `select` y `textarea`: **16 px** por debajo de `lg` para evitar el zoom de iOS/iPadOS; **12 px** desde `lg`. No se cambia el resto del estilo XP del control.
- El input de archivo se queda en 12 px con padding vertical; no dispara zoom de teclado.

### Lo que no cambia

- No hay JS nuevo. La nav de dos filas es CSS.
- El carrusel conserva Pointer Events, swipe, autoplay y `prefers-reduced-motion`.
- El escritorio conserva paddings, tipografía y rejillas; solo cambia el hueco de los anclajes.

## 5. Navegación (opción B)

### Estructura

Se mantiene un único `<nav>` con `flex-wrap`. El orden del DOM sigue siendo marca → enlaces → idioma; en móvil el idioma se coloca visualmente en la primera fila con `order`.

- **Fila 1 (móvil):** marca a la izquierda, `ES | EN` a la derecha. Altura mínima 36 px.
- **Fila 2 (móvil):** Precios, Catálogo y Contacto repartidos con `justify-between`, 40 px de alto, separados de la fila 1 por una línea `border-white/25`.
- **Desde `md`:** una sola fila como ahora: marca, enlaces, idioma. Enlaces de 32 px de alto.

La barra sigue siendo `sticky top-0 z-20`, con el gradiente XP del tema.

### Detalle de implementación

- `nav`: `flex flex-wrap items-center justify-between gap-x-6 px-4 py-1.5`.
- La marca lleva `order-1`.
- La lista de enlaces lleva `order-3 w-full` en móvil y `md:order-2 md:w-auto`.
- El grupo de idioma lleva `order-2 md:order-3`.
- La lista lleva `border-t border-white/25 pt-0.5` en móvil y `md:border-0 md:pt-0`.
- Enlaces de sección: `flex min-h-10 items-center px-2 md:min-h-8`.
- Marca e idioma: `flex min-h-9 items-center`; enlaces de idioma con `px-1.5`.

## 6. Hero

- Menos aire vertical: `py-10` en móvil, `py-20` desde `md`.
- Stamps: `mt-9` en móvil, `mt-12` desde `md`.
- Acciones: `mt-10` en móvil, `mt-20` desde `md`.
- Los botones ya se apilan por debajo de 420 px; no se toca esa regla.

### Stamps

Se conservan los tres GIF, pero por debajo de `md`:

- `height: auto` para no deformarlos.
- Topes de ancho: pareja **40%**, evoluciones **52%**, rainbow **35%**.
- Gap de `0.75rem 1rem`.

Así caben en dos filas a 320 px en lugar de tres, y a 768 px vuelven a su tamaño intrínseco y caben en una sola fila.

### WordArt

- `font-size: clamp(30px, 8vw, 60px)` (antes `5.2vw`), para que a 390 px tenga algo más de presencia sin desbordar.

## 7. Precios

### Rejilla

- Una columna hasta `lg`; `lg:grid-cols-[2fr_3fr]` desde 1024 px.
- En tablet la lista ocupa todo el ancho y el carrusel va debajo a ancho completo. Esto evita el carrusel de 360 × 560 px.
- Encabezado: `text-[22px] md:text-[26px]`.

### Carrusel

- Altura: **420 px** en móvil; **560 px** desde `md` (se mantiene la altura actual de tablet/escritorio).
- `sizes`: `(min-width: 1024px) 520px, (min-width: 768px) 620px, 88vw`.
- Fila de controles: `mt-2`, `flex flex-wrap items-center justify-between gap-x-4 gap-y-2`.
- Puntos de 24 px; flechas de 36 × 28 px (con `min-height: 40px` en móvil y tablet por la regla global). A 320 px la fila completa mide 260 px y cabe en 264 px.
- Si el ancho efectivo es menor, la fila puede envolver: los puntos quedan arriba y las flechas abajo a la derecha, sin recortarse.

### Lista de precios

- Por debajo de `lg`: `min-height: 44px` por fila y nombre a 12 px.
- Etiqueta a 10 px; importe a 18 px (sin cambios).
- El nombre puede envolver; el importe no se encoge (`white-space: nowrap` ya existe).
- CTA de precios: ancho completo y 40 px de alto mínimo por debajo de `lg`.
- Se mantiene el orden lista → carrusel. Al tocar un precio, la imagen actualizada queda justo debajo; invertir el orden dejaría el cambio fuera de pantalla.

## 8. Catálogo

- Rejilla: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`.
- Gap: `gap-3` en móvil, `sm:gap-4` desde 640 px.
- Tarjetas: `p-1.5` en móvil, `sm:p-2`; etiqueta a 9 px en móvil y 10 px desde `sm`.
- Encabezado: `text-[20px] md:text-[22px]`, con wrap y CTA táctil de 40 px.
- `sizes`: `(min-width: 1024px) 210px, (min-width: 640px) 30vw, 45vw`.

## 9. Contacto

- Sección y grupo con los paddings globales.
- Encabezado: `text-[22px] md:text-[26px]`; cuerpo a 12 px.
- Formulario a una columna hasta `sm`; dos columnas desde `sm` (ya existe).
- Inputs a 16 px por debajo de `lg`; 12 px desde `lg`.
- Submit: `w-full sm:w-auto`, 44 px de alto mínimo en móvil.
- Status y hints conservan sus tamaños (10–11 px).

## 10. Pie

- Por debajo de `sm`: columna centrada, `gap-y-1`, texto centrado.
- Desde `sm`: una fila con `justify-between`, como ahora.
- El separador `|` se oculta por debajo de `sm` (`hidden sm:inline`).
- Se mantiene el panel azul y el enlace de crédito subrayado.

## 11. Archivos afectados

| Archivo | Cambio |
| --- | --- |
| `src/components/sections/Nav.astro` | Clases de las dos filas, alturas táctiles y orden visual. |
| `src/components/sections/Hero.astro` | Paddings y márgenes verticales. |
| `src/components/sections/Precios.astro` | Rejilla a `lg`, controles con wrap, `sizes`. |
| `src/components/sections/Catalogo.astro` | Columnas 2/3/5, gaps, `sizes`, tamaños de texto. |
| `src/components/sections/Contacto.astro` | Submit full-width, tamaños de encabezado. |
| `src/components/sections/Footer.astro` | Columna en móvil, separador oculto. |
| `src/styles/xp/layout.css` | Padding de `.xp-group`, `overflow-x`, `scroll-margin-top`, botones táctiles. |
| `src/styles/xp/stamps.css` | Topes de ancho y gap en móvil. |
| `src/styles/xp/wordart.css` | `clamp()` del tamaño. |
| `src/styles/xp/precios.css` | Fila de precio táctil en móvil y tablet. |
| `src/styles/xp/contacto.css` | Inputs a 16 px por debajo de `lg`, submit. |

No se tocan `theme.css`, `planes.ts`, `ui.ts`, `BaseLayout.astro` ni el JS de los componentes.

## 12. Criterios de aceptación

1. A 320, 360, 390, 768 y 1024 px no aparece scroll horizontal.
2. La nav de dos filas cabe sin recortar marca, enlaces ni `ES | EN`; a 768 vuelve a una fila.
3. Al pulsar Precios, Catálogo o Contacto, el título queda visible y no debajo de la barra.
4. La fila de controles del carrusel cabe completa a 320 px; si no, envuelve sin recortarse.
5. El carrusel sigue funcionando con swipe y con las flechas; el autoplay no cambia.
6. El catálogo muestra 2 columnas en móvil, 3 en tablet y 5 en escritorio.
7. El formulario se ve a una columna en móvil, dos desde 640 px, y no hace zoom al enfocar en iOS.
8. El pie se apila en móvil y vuelve a una fila desde 640 px.
9. El escritorio (≥1024 px) conserva el layout actual.
10. No se añade ningún bundle de JavaScript.

## 13. Riesgos y decisiones conscientes

- **La barra de dos filas come alto.** Es la opción elegida; se compensa con menos padding en el hero y con `scroll-margin-top`.
- **Inputs a 16 px en tablet.** Se prioriza que iOS no haga zoom sobre el look compacto de 11 px. En escritorio se mantiene 12 px.
- **Precios apilados en tablet.** Alarga la página, pero evita el carrusel estrecho y alto de 360 × 560 px.
- **Stamps escalados.** Los GIF pixel-art pueden perder algo de detalle al reducirlos; se mantiene `image-rendering: pixelated`.
- **`overflow-x: clip`.** Si algo necesitara sangrar a propósito, quedaría cortado; no es el caso hoy.
- **Orden de tabulación en la nav móvil.** El DOM mantiene marca → enlaces → idioma; visualmente el idioma sube a la primera fila. Es un desfase menor, aceptado para no duplicar markup.

## 14. Validación

Según `AGENTS.md`, no se ejecutan `astro check`, build ni pase de navegador salvo que el usuario lo pida. La validación es visual del usuario en el dev server (`npm run dev`), redimensionando a los anchos de los criterios de aceptación.
