# AGENTS.md

Bilingual (Spanish/English) single-page portfolio for illustrator "Bloomysrkj". Astro 5 + Tailwind CSS 4, built as a static site. **No React** — the framework was removed; do not assume it is available.

## Commands

- `npm run dev` — dev server at `http://localhost:4321` (use `npm run dev -- --host` to expose it on the LAN)
- `npm run build` — static build to `dist/`
- `npm run preview` — serve the built site
- `npx astro check` — type/diagnostics check (uses `@astrojs/check`)

There is no `npm run check` script, despite what `docs/plans/*` says. No test or lint tooling is configured.

## Validation scope

**Do not verify UI changes unless the user asks.** Apply the edit and stop: no `astro check`, no `npm run build`, no browser walk-through, no screenshots, no re-reading the rendered page. The user says what to change and reviews it themselves on the hot-reloaded dev server.

`astro check` is still fine when you changed a type contract (`planes.ts`, `ui.ts`) and are genuinely unsure it compiles — that is catching your own mistake, not a UI review. A real browser pass happens only when the user says `verifica`, `revisa`, `míralo`, or asks for a screenshot.

## Architecture

- Two static routes, one page each: Spanish at `src/pages/index.astro` (`/`) and English at `src/pages/en/index.astro` (`/en/`). Both render the same shared body, `src/components/PageSections.astro`, inside `BaseLayout`. Do not duplicate section markup between routes.
- `src/components/PageSections.astro` takes `lang` and composes `Nav`, `Hero`, `Precios`, `Catalogo`, `Contacto`, `Footer` inside the `xp-section` wrapper. Every section takes a `lang` prop.
- `src/i18n/ui.ts` is the single source of copy: `locales`, the `Lang` type, `routes`, `langLabels`, the typed `t` dictionary (both languages complete by type), and the `fill()` template helper. All translatable strings live here.
- `src/data/planes.ts` is the single source of plan/catalog structure: `planIds`/`PlanId`, `plans` (id + price), `photos`, `plansById`, `catalogIds`/`catalog`. Translatable names, tags, alts and catalog titles live in `src/i18n/ui.ts`, keyed by those ids — do not duplicate ids or prices.
- `src/layouts/BaseLayout.astro` owns `<head>`, per-language `<title>`/description, `hreflang` alternates, Google Fonts (Pirata One), and imports `src/styles/global.css` globally. It sets `<html lang>` from the `lang` prop and emits the English auto-detect script only on `/`.
- Client-side JavaScript is three inline scripts, so the build still ships **no JS bundle**: the pricing carousel (vanilla `<script>` in `Precios.astro`, Pointer Events for swipe, plus a 7 s autoplay that pauses on hover, keyboard focus and off-screen, stops on manual navigation and has an explicit pause/play button — WCAG 2.2.2), the `localStorage` language-choice hook in `Nav.astro`, and the browser-language redirect in `BaseLayout.astro` (`is:inline`, guarded by `try/catch`).
- No React, no islands, no `client:*` directives. If you ever need one, re-add `@astrojs/react` and the React deps deliberately.
- No CMS, backend, auth, or deploy/CI config. Git remote is GitHub; `dist/` is generated.

## Styling

- Tailwind 4 via `@tailwindcss/vite` in `astro.config.mjs`. There is **no** `tailwind.config.*`; configure through `@theme` / CSS in `src/styles/global.css`.
- Semantic CSS variables live in `global.css`. The XP palette (`--window-bg`, `--window-fg`, `--selection-bg`, `--desktop-bg`) is declared on `.xp-section` by the vendored theme, not in `global.css`.
- `BaseLayout` still applies the light `--bg`/`--text` tokens to `<body>`, but the `xp-section` wrapper covers the whole page, so those are only visible if content is shorter than the viewport.
- `:root[data-theme='dark']` is dead code left over from the removed theme toggle; the page does not switch themes.
- **The whole page is Windows XP.** The wrapper in `PageSections.astro` carries `xp-section`, which activates the vendored theme for the entire page. The nav is a `.top-panel` toolbar (with the `ES | EN` switcher) and the footer a `.bottom-panel` status bar. Sections are plain beige blocks; the content ones (Precios, Catálogo, Contacto) sit inside an `.xp-group` — the 1px etched frame XP dialogs used to group controls (`src/styles/xp/layout.css`). **Do not wrap sections in `.window`/`.title-bar`** (rejected as fake-window noise) and **do not separate them with colored bars** (also rejected); whitespace plus the group frame is the XP answer.
- The old dark-theme tokens (`--tapshoe`, `--ashen*`, `--lagon`, `--button-bg`, `--button-text`, `--text-on-dark-*`, `--line-dark`, `--tint-ashen`, `--nav-bg-dark`) are **no longer referenced by any component**. They still exist in `global.css`; safe to delete, but do not reintroduce them in section markup.
- `--media-gradient` **is** still used (catalog thumbnails and carousel placeholders) — keep it.

## Windows XP theme

- `src/styles/xp/theme.css` is a vendored copy of `classic-stylesheets`' winxp theme, generated by `scripts/build-xp-theme.mjs`. Every rule is wrapped in `@scope (.xp-section)` so nothing leaks to the rest of the page, and the color tokens were moved from `:root` to `.xp-section`. **Do not hand-edit it** — re-run `node scripts/build-xp-theme.mjs` if the package is updated.
- `src/styles/xp/precios.css` holds the pricing list and carousel styles. It is deliberately **unlayered** so it can beat the theme's bare `button` rules; its selectors are prefixed with `#precios`.
- Both stylesheets are imported from `Precios.astro`, not from the page.
- `src/styles/xp/wordart.css` renders the hero's WordArt rotulo: real text with `background-clip: text` (rainbow gradient), a light `-webkit-text-stroke` and a gray offset copy behind, scaled `scaleY(1.55)` and rotated. It is imported by `Hero.astro` and the copy lives in that file as the `wordart` const (placeholder for now).
- `Precios.astro` also carries an `.window.maximized > .title-bar { margin: 0 }` override: upstream pulls the title bar over the window padding, which overflows the viewport when maximized.

## Assets / gotchas

- Carousel artwork lives in `src/assets/carousel/` (`chibi.webp`, `full.png`, `render.jpg`) and is imported by `src/data/planes.ts` as `ImageMetadata`. `Precios.astro` renders it with Astro's `<Image>` (`astro:assets`), which emits WebP + srcset at build time — do not replace it with a plain `<img>` or a `public/` path.
- Hero stamps live in `src/assets/stamps/` (animated GIFs). They are imported in `Hero.astro` but rendered with a plain `<img src={stamp.src}>`: Astro imports any image as `ImageMetadata` (so `.src` is required) and `<Image>` would flatten the animation. `image-rendering: pixelated` and the `width`/`height` attributes keep them crisp and prevent layout shift.
- The carousel frame has a fixed height (`420px`, `560px` from `md`) and uses `object-fit: contain`, because the artworks have mixed aspect ratios and `cover` crops the portraits. Keep the viewport's `padding` at `0`: with padding, `overflow: hidden` clips at the padding box and the next slide bleeds into the gap.
- `public/background.PNG` is ~14 MB and referenced nowhere. It is copied into `dist/` on every build; prefer optimized formats/sizes or remove it.
- Anything in `public/` is served from `/`; static imports belong in `src/`.
- `docs/plans/` is historical planning material, not a current source of truth.
