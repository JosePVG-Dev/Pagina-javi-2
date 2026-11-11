# Responsive móvil y tablet — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hacer usable el portfolio de 320 px a 1023 px sin scroll horizontal, conservando el look XP y dejando el escritorio como está.

**Architecture:** Solo cambios de markup (clases Tailwind) y CSS en los componentes existentes. La nav pasa a dos filas por debajo de `md` con `flex-wrap` y `order`; las secciones aprietan paddings, la rejilla de precios se apila hasta `lg` y el catálogo gana un paso de 3 columnas. No se añade JavaScript ni se duplica markup.

**Tech Stack:** Astro 5, Tailwind CSS 4, CSS XP vendado en `src/styles/xp/`. Sin React, sin islas, sin bundle de JS nuevo.

**Spec:** `docs/superpowers/specs/2026-11-11-responsive-design.md`

## Global Constraints

- No añadir JavaScript, dependencias, islas ni directivas `client:*`.
- No editar `src/styles/xp/theme.css` (vendado), `src/data/planes.ts`, `src/i18n/ui.ts` ni `src/layouts/BaseLayout.astro`.
- No cambiar copy, precios, imágenes ni orden de las secciones.
- El escritorio (≥1024 px) conserva su layout; los cambios táctiles se limitan a `max-width: 1023px` salvo los indicados.
- Tailwind 4 se configura por CSS; no existe `tailwind.config.*`.
- `AGENTS.md` prohíbe `astro check`, `npm run build` y pase de navegador salvo petición del usuario. No hay framework de tests. Cada tarea termina en commit; la validación visual se concentra en la revisión final del usuario (Task 8).
- No mezclar en los commits los cambios pendientes del usuario en `Contacto.astro`, `Precios.astro`, `ui.ts` y `contacto.css`. El pre-flight lo impide.
- Commits en español, en imperativo y con alcance claro.

## Review Focus

Estos son los fallos más probables que el spec no cubre con tests automáticos (no hay tests). Cada uno se comprueba en la revisión final del usuario:

- **320 px con copy inglés largo** (`Pricing`, `Catalog`, `Contact`, `Ask for a quote`, `Full body, maximum detail`): debe envolver, nunca desbordar. Owners: Tasks 2, 4, 5, 7.
- **iPhone/iPad al enfocar un campo**: la página no debe ampliarse. Owner: Task 6.
- **Tablet 768–1023**: la nav debe volver a una fila, los precios apilarse y el carrusel no quedar en 360 × 560. Owners: Tasks 2 y 4.
- **Anclajes con barra sticky**: el título de la sección no debe quedar debajo de la barra. Owners: Tasks 1 y 2.
- **WordArt rotado y stamps**: no deben crear scroll horizontal ni recortarse de forma rara. Owners: Tasks 1 y 3.
- **Controles del carrusel a 320 px**: los cinco puntos y las tres flechas deben caber; si no, envolver sin recortarse. Owner: Task 4.
- **Pie en móvil**: debe apilarse y el separador `|` no debe quedar huérfano. Owner: Task 7.

## Estructura de archivos

| Archivo | Responsabilidad |
| --- | --- |
| `src/styles/xp/layout.css` | Paddings de grupo, `overflow-x`, anclajes y altura táctil de botones. |
| `src/components/sections/Nav.astro` | Markup de la barra de dos filas; el script existente no se toca. |
| `src/components/sections/Hero.astro` | Paddings y márgenes del hero. |
| `src/styles/xp/stamps.css` | Topes de ancho de los GIF y gap en móvil. |
| `src/styles/xp/wordart.css` | Tamaño fluido del rótulo. |
| `src/components/sections/Precios.astro` | Rejilla a `lg`, fila de controles con wrap, `sizes`. |
| `src/styles/xp/precios.css` | Filas de precio táctiles en móvil/tablet. |
| `src/components/sections/Catalogo.astro` | Columnas 2/3/5, gaps, tamaños de texto y `sizes`. |
| `src/components/sections/Contacto.astro` | Encabezado y submit a ancho completo en móvil. |
| `src/styles/xp/contacto.css` | Inputs a 16 px por debajo de `lg`, submit táctil. |
| `src/components/sections/Footer.astro` | Pie apilado en móvil y separador oculto. |

No se crean archivos nuevos de código.

---

## Pre-flight

- [ ] **Step 0: Verifica el árbol de trabajo**

Run:

```bash
git status --short
```

Esperado: sin cambios pendientes en los archivos que toca este plan. Si aparecen `M src/components/sections/Contacto.astro`, `M src/components/sections/Precios.astro`, `M src/i18n/ui.ts` o `?? src/styles/xp/contacto.css`, **detente** y pide al usuario que los commitee o los guarde. No los stages con los commits del responsive.

Contexto: el usuario tenía trabajo sin commitear en esos archivos al escribir el plan. El plan asume que se resuelve antes de empezar.

---

### Task 1: Base global (grupos, anclajes y botones táctiles)

**Files:**
- Modify: `src/styles/xp/layout.css`

**Interfaces:**
- Consumes: nada.
- Produces: `.xp-group` con padding móvil, `scroll-margin-top` en las cuatro secciones, `.xp-section { overflow-x: clip }` y la regla global de botones táctiles que usan las tareas 2–7.

- [ ] **Step 1: Ajusta `.xp-group` y añade las reglas globales**

En `src/styles/xp/layout.css`, cambia el padding base y añade los bloques. El archivo debe quedar así en su parte superior (las reglas `.footer-credit` del final no se tocan):

```css
/* Paneles de contenido estilo "property sheet" de XP: marco grabado de 1px,
   mismo beige, sin relleno propio. Es la forma en que los diálogos de XP
   agrupaban bloques de contenido (group box), en lugar de barras de color. */
.xp-group {
  border: 1px solid #d0d0bf;
  border-radius: 3px;
  padding: 0.75rem;
}

/* La barra superior es sticky: los anclajes necesitan hueco para no quedar
   debajo. En móvil la barra tiene dos filas (~91 px); en escritorio, una. */
#inicio,
#precios,
#catalogo,
#contacto {
  scroll-margin-top: 96px;
}

/* Evita scroll horizontal por el WordArt rotado o los stamps, sin crear un
   contenedor de scroll (sticky sigue funcionando). */
.xp-section {
  overflow-x: clip;
}

/* El tema XP deja los botones muy bajos para dedo. */
@media (max-width: 1023px) {
  .xp-section a.button,
  .xp-section button.button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 40px;
  }
}

@media (min-width: 768px) {
  #inicio,
  #precios,
  #catalogo,
  #contacto {
    scroll-margin-top: 56px;
  }

  .xp-group {
    padding: 2rem 2.25rem;
  }
}
```

- [ ] **Step 2: Revisa el diff**

Run:

```bash
git diff -- src/styles/xp/layout.css
```

Esperado: solo el padding base, los cuatro selectores de anclaje, `overflow-x`, la media de botones y el `scroll-margin` de escritorio dentro del bloque `min-width: 768px`.

- [ ] **Step 3: Commit**

```bash
git add src/styles/xp/layout.css
git commit -m "fix(responsive): base tactil y anclajes"
```

---

### Task 2: Nav de dos filas

**Files:**
- Modify: `src/components/sections/Nav.astro:13-54`

**Interfaces:**
- Consumes: la regla `min-height: 40px` de Task 1 para los botones, y los `scroll-margin-top` de Task 1.
- Produces: la barra sticky de dos filas por debajo de `md` y de una fila desde `md`.

- [ ] **Step 1: Sustituye el bloque `<header>`**

Reemplaza el `<header>` actual por este. El `<script is:inline>` que viene después se queda **exactamente igual**.

```astro
<header class="top-panel sticky top-0 z-20">
  <nav class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 px-4 py-1.5">
    <a
      href="#inicio"
      class="order-1 flex min-h-9 items-center text-[12px] font-bold uppercase tracking-[0.25em] md:min-h-8"
    >
      Bloomysrkj
    </a>

    <ul
      class="order-3 flex w-full items-center justify-between gap-1 border-t border-white/25 pt-0.5 text-[11px] md:order-2 md:w-auto md:justify-end md:border-0 md:pt-0"
    >
      <li>
        <a href="#precios" class="flex min-h-10 items-center px-2 hover:bg-white/25 md:min-h-8">
          {copy.pricing}
        </a>
      </li>
      <li>
        <a href="#catalogo" class="flex min-h-10 items-center px-2 hover:bg-white/25 md:min-h-8">
          {copy.catalog}
        </a>
      </li>
      <li>
        <a href="#contacto" class="flex min-h-10 items-center px-2 hover:bg-white/25 md:min-h-8">
          {copy.contact}
        </a>
      </li>
    </ul>

    <div
      class="order-2 flex min-h-9 items-center gap-0.5 text-[11px] md:order-3 md:min-h-8 md:border-l md:border-white/30 md:pl-2"
      role="group"
      aria-label={copy.language}
    >
      {
        languages.map((code, i) => (
          <>
            {i > 0 && <span aria-hidden="true" class="opacity-60">|</span>}
            <a
              href={routes[code]}
              hreflang={code}
              lang={code}
              title={langLabels[code]}
              data-lang={code}
              aria-current={code === lang ? 'true' : undefined}
              class:list={[
                'flex min-h-9 items-center px-1.5 md:min-h-8',
                code === lang
                  ? 'bg-white/25 font-bold underline underline-offset-2'
                  : 'hover:bg-white/25',
              ]}
            >
              {code.toUpperCase()}
            </a>
          </>
        ))
      }
    </div>
  </nav>
</header>
```

- [ ] **Step 2: Revisa el diff y el script**

Run:

```bash
git diff -- src/components/sections/Nav.astro
```

Esperado: solo cambia el bloque `<header>`. El `<script is:inline>` conserva el `localStorage` y los listeners `[data-lang]`.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Nav.astro
git commit -m "feat(responsive): nav de dos filas en movil"
```

**Revisión del usuario (no la ejecutes tú):** a 320–767 la marca y `ES | EN` deben compartir la primera fila, y los tres enlaces la segunda. A 768 debe volver una sola fila.

---

### Task 3: Hero y stamps

**Files:**
- Modify: `src/components/sections/Hero.astro:18`, `:30`, `:60`
- Modify: `src/styles/xp/stamps.css`
- Modify: `src/styles/xp/wordart.css:11`

**Interfaces:**
- Consumes: `.xp-section { overflow-x: clip }` de Task 1.
- Produces: hero más compacto en móvil y stamps que no se apilan en tres filas.

- [ ] **Step 1: Aprieta los espaciados del hero**

En `Hero.astro`, cambia estas tres clases:

```astro
<section id="inicio" class="px-4 py-10 md:px-10 md:py-20">
```

```astro
<div class="stamps mt-9 md:mt-12" aria-hidden="true">
```

```astro
<div class="hero-actions mt-10 md:mt-20">
```

- [ ] **Step 2: Ajusta los stamps**

En `src/styles/xp/stamps.css`, deja el archivo así:

```css
/* Stamps: GIFs pixel-art de la web de referencia. Son decorativos, así que se
   sirven tal cual (sin pasar por astro:assets, que aplanaría la animación) y
   se escalan con `pixelated` para que no se emborronen. */

.stamps {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: center;
  gap: 0.75rem 1rem;
}

.stamps img {
  display: block;
  max-width: 100%;
  height: auto;
  image-rendering: pixelated;
}

@media (min-width: 768px) {
  .stamps {
    gap: 1rem 2rem;
  }
}

.stamps .stamp--pareja {
  transform: rotate(-5deg);
}

.stamps .stamp--evoluciones {
  transform: rotate(-2deg);
}

.stamps .stamp--rainbow {
  transform: rotate(3deg);
}

/* En móvil los GIF se reducen para no apilarse en tres filas. */
@media (max-width: 767px) {
  .stamps .stamp--pareja {
    max-width: 40%;
  }

  .stamps .stamp--evoluciones {
    max-width: 52%;
  }

  .stamps .stamp--rainbow {
    max-width: 35%;
  }
}
```

- [ ] **Step 3: Haz fluido el WordArt**

En `src/styles/xp/wordart.css`, cambia:

```css
font-size: clamp(30px, 5.2vw, 60px);
```

por:

```css
font-size: clamp(30px, 8vw, 60px);
```

- [ ] **Step 4: Revisa el diff**

Run:

```bash
git diff -- src/components/sections/Hero.astro src/styles/xp/stamps.css src/styles/xp/wordart.css
```

Esperado: tres clases en el hero, el CSS de stamps con los topes y `height: auto`, y el `clamp` con `8vw`.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Hero.astro src/styles/xp/stamps.css src/styles/xp/wordart.css
git commit -m "feat(responsive): hero y stamps en movil"
```

**Revisión del usuario (no la ejecutes tú):** a 320/390 los tres stamps deben ocupar dos filas como máximo y no debe aparecer scroll horizontal.

---

### Task 4: Precios y carrusel

**Files:**
- Modify: `src/components/sections/Precios.astro:28`, `:31`, `:40`, `:149`, `:166`
- Modify: `src/styles/xp/precios.css`

**Interfaces:**
- Consumes: la regla de botones táctiles de Task 1 y el padding de `.xp-group` de Task 1.
- Produces: precios apilados hasta `lg`, carrusel a ancho completo en tablet, controles con wrap y filas táctiles.

- [ ] **Step 1: Ajusta la sección y la rejilla**

En `Precios.astro`:

```astro
<section id="precios" class="px-4 py-4 md:px-10 md:py-8">
```

```astro
<h2 class="text-[22px] leading-tight font-bold md:text-[26px]">{copy.heading}</h2>
```

```astro
<div
  class="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_3fr] lg:items-start"
  data-pricing
  data-plan-template={copy.choosePlan}
  data-start-index={featuredSlideIndex}
>
```

- [ ] **Step 2: Actualiza `sizes` y la fila de controles**

En la `<Image>` del carrusel:

```astro
sizes="(min-width: 1024px) 520px, (min-width: 768px) 620px, 88vw"
```

En la fila que contiene puntos y flechas:

```astro
<div class="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
```

- [ ] **Step 3: Añade la fila táctil en `precios.css`**

Antes del bloque `@media (prefers-reduced-motion: reduce)`, añade:

```css
/* En móvil y tablet el renglón es zona de toque: más alto y nombre legible. */
@media (max-width: 1023px) {
  #precios .price-row {
    min-height: 44px;
  }

  #precios .price-row-name {
    font-size: 12px;
  }
}
```

- [ ] **Step 4: Revisa el diff**

Run:

```bash
git diff -- src/components/sections/Precios.astro src/styles/xp/precios.css
```

Esperado: `lg` en la rejilla, `22px` base del título, `sizes` nuevo, `flex-wrap` en controles y el bloque de fila táctil. La altura del carrusel (420 px base / 560 desde `md`) no cambia.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Precios.astro src/styles/xp/precios.css
git commit -m "feat(responsive): precios y carrusel en movil y tablet"
```

**Revisión del usuario (no la ejecutes tú):** a 320 los cinco puntos y las tres flechas deben caber; a 768 la lista y el carrusel deben apilarse a ancho completo.

---

### Task 5: Catálogo

**Files:**
- Modify: `src/components/sections/Catalogo.astro:15`, `:18`, `:24`, `:27`, `:33`, `:41`

**Interfaces:**
- Consumes: el padding de `.xp-group` y los botones táctiles de Task 1.
- Produces: 2 columnas en móvil, 3 desde `sm`, 5 desde `lg`.

- [ ] **Step 1: Ajusta sección, rejilla y tarjetas**

```astro
<section id="catalogo" class="px-4 py-4 md:px-10 md:py-8">
```

```astro
<h2 class="text-[20px] font-bold md:text-[22px]">{copy.heading}</h2>
```

```astro
<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
```

```astro
<article class="raised p-1.5 sm:p-2">
```

- [ ] **Step 2: Ajusta `sizes` y la etiqueta**

```astro
sizes="(min-width: 1024px) 210px, (min-width: 640px) 30vw, 45vw"
```

```astro
<p class="mt-2 px-1 pb-1 text-[9px] uppercase tracking-[0.15em] text-[#4a4a4a] sm:text-[10px]">
  {items[item.id].type}
</p>
```

- [ ] **Step 3: Revisa el diff**

Run:

```bash
git diff -- src/components/sections/Catalogo.astro
```

Esperado: solo las clases de sección, título, rejilla, tarjeta, `sizes` y etiqueta.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Catalogo.astro
git commit -m "feat(responsive): catalogo 2/3/5 columnas"
```

**Revisión del usuario (no la ejecutes tú):** a 320 deben verse 2 columnas sin desbordar; a 768, 3; a 1024, 5.

---

### Task 6: Contacto y formulario táctil

**Files:**
- Modify: `src/components/sections/Contacto.astro:26`, `:28`, `:72`
- Modify: `src/styles/xp/contacto.css`

**Interfaces:**
- Consumes: la regla de botones táctiles de Task 1.
- Produces: submit a ancho completo en móvil, inputs a 16 px por debajo de `lg` y 11 px desde `lg`.

- [ ] **Step 1: Ajusta la sección y el submit**

```astro
<section id="contacto" class="px-4 py-4 md:px-10 md:py-8">
```

```astro
<h2 class="text-[22px] font-bold md:text-[26px]">{copy.heading}</h2>
```

```astro
<button type="submit" class="button brief-submit w-full sm:w-auto">{copy.form.submit}</button>
```

- [ ] **Step 2: Añade el tamaño de input para iOS/iPadOS**

En `src/styles/xp/contacto.css`, después del bloque que define `input[type='text']`, `input[type='email']`, `select` y `textarea`, añade:

```css
/* iOS/iPadOS hace zoom al enfocar campos con letra menor de 16 px. */
@media (max-width: 1023px) {
  #contacto input[type='text'],
  #contacto input[type='email'],
  #contacto select,
  #contacto textarea {
    font-size: 16px;
  }
}
```

- [ ] **Step 3: Ajusta el input de archivo y el submit**

Cambia el `font-size: 10px` de `#contacto input[type='file']` por:

```css
font-size: 12px;
```

Al final del archivo, añade:

```css
@media (max-width: 639px) {
  #contacto .brief-submit {
    min-height: 44px;
  }
}
```

- [ ] **Step 4: Revisa el diff**

Run:

```bash
git diff -- src/components/sections/Contacto.astro src/styles/xp/contacto.css
```

Esperado: paddings, título, submit con `w-full sm:w-auto`, inputs a 16 px por debajo de `lg`, archivo a 12 px y submit a 44 px por debajo de `sm`.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Contacto.astro src/styles/xp/contacto.css
git commit -m "feat(responsive): formulario tactil y sin zoom en iOS"
```

**Revisión del usuario (no la ejecutes tú):** en un iPhone/iPad, enfocar el campo de Discord no debe ampliar la página; a 640 el formulario debe pasar a dos columnas.

---

### Task 7: Pie

**Files:**
- Modify: `src/components/sections/Footer.astro:13-26`

**Interfaces:**
- Consumes: nada.
- Produces: pie apilado y centrado por debajo de `sm`, una fila desde `sm`.

- [ ] **Step 1: Sustituye el contenido del pie**

```astro
<footer class="bottom-panel">
  <div
    class="mx-auto flex max-w-6xl flex-col items-center gap-y-1 px-4 py-2 text-center text-[11px] sm:flex-row sm:flex-wrap sm:justify-between sm:gap-x-4 sm:py-1 sm:text-left"
  >
    <span>© {new Date().getFullYear()} Bloomysrkj</span>
    <span class="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-start">
      <span>{copy.tagline}</span>
      <span aria-hidden="true" class="hidden opacity-70 sm:inline">|</span>
      <a
        href="https://josepvg.dev"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-credit"
      >
        {copy.credit}
      </a>
    </span>
  </div>
</footer>
```

- [ ] **Step 2: Revisa el diff**

Run:

```bash
git diff -- src/components/sections/Footer.astro
```

Esperado: columna centrada en móvil, fila desde `sm`, separador con `hidden sm:inline`.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Footer.astro
git commit -m "feat(responsive): pie apilado en movil"
```

**Revisión del usuario (no la ejecutes tú):** a 320 el pie debe ir en columna y el `|` no debe aparecer; a 640 debe volver a una fila.

---

### Task 8: Revisión final del usuario

**Files:** ninguno.

**Interfaces:**
- Consumes: todo lo anterior.
- Produces: confirmación visual del usuario.

- [ ] **Step 1: Comprueba el estado**

Run:

```bash
git status --short
git log --oneline -9
```

Esperado: árbol limpio y siete commits del responsive sobre el commit del plan. No ejecutes `astro check`, `npm run build` ni un pase de navegador: `AGENTS.md` lo reserva a petición del usuario.

- [ ] **Step 2: Pasa la lista al usuario**

Pídele que revise con `npm run dev` (si no lo tiene ya) a estos anchos:

- **320, 360 y 390 px:** nav de dos filas sin recortes; stamps en dos filas como máximo; sin scroll horizontal; controles del carrusel completos; filas de precio de 44 px; catálogo a 2 columnas; formulario a 1 columna; pie apilado.
- **768 y 1023 px:** nav de una fila; precios apilados con carrusel a ancho completo; catálogo a 3 columnas; formulario a 2 columnas; inputs a 16 px.
- **1024 px:** precios a 2fr/3fr, catálogo a 5 columnas, nav de una fila e inputs a 11 px como antes.
- **Anclajes:** pulsar Precios, Catálogo y Contacto; el título no debe quedar debajo de la barra.
- **Carrusel:** swipe, flechas, puntos y autoplay.
- **WordArt y stamps:** sin scroll horizontal ni recortes raros.
- **Pie:** el separador `|` solo desde 640 px.

- [ ] **Step 3: Si hay ajustes**

Aplica cada ajuste en un commit nuevo, sin `amend` y sin mezclar cambios ajenos. Vuelve a pasar la lista del Step 2.

## Self-review del plan

- **Cobertura del spec:** §3 → Tasks 1–7; §4 → Task 1; §5 → Task 2; §6 → Task 3; §7 → Task 4; §8 → Task 5; §9 → Task 6; §10 → Task 7; §11 → estructura de archivos; §12 → Task 8; §13 → Review Focus; §14 → Global Constraints.
- **Placeholders:** no hay TBD/TODO ni pasos «similar a». Todos los valores son concretos.
- **Consistencia:** el `clamp` final es `8vw`; los inputs quedan a 16 px por debajo de `lg` y 11 px desde `lg`; los botones táctiles aplican por debajo de `lg`; las filas de precio son táctiles por debajo de `lg`.
- **Review Focus:** las siete líneas tienen su comprobación en la Task correspondiente y en el checklist de Task 8.
