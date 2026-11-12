# AGENTS.md

Bilingual (Spanish/English) multi-page portfolio for illustrator "Bloomysrkj". Astro 5 + Tailwind CSS 4, built as a static site. **No React** — the framework was removed; do not assume it is available.

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

- Four static routes: the home in Spanish at `src/pages/index.astro` (`/`) and English at `src/pages/en/index.astro` (`/en/`), plus the Terms of Service in Spanish at `src/pages/tos.astro` (`/tos/`) and English at `src/pages/en/tos.astro` (`/en/tos/`). The two home routes render the shared body `src/components/PageSections.astro`; the two TOS routes render `src/components/TosBody.astro`. Both bodies sit inside `BaseLayout`. Do not duplicate markup between the two languages of a page.
- `src/components/PageSections.astro` takes `lang` and composes `Nav`, `Hero`, `Precios`, `Catalogo`, `Contacto`, `Footer` inside the `xp-section` wrapper. Every section takes a `lang` prop.
- `src/components/TosBody.astro` takes `lang`, imports `theme.css` and `layout.css` itself (the home path gets them through `Precios` and `PageSections`), and renders `Nav` with `page="tos"`, the TOS article (`.tos-copy` inside an `.xp-group`) and `Footer`. It reads `t[lang].tos`: intro and `summary` box, a table-of-contents `nav` generated from `sections` (`#tos-1`…`#tos-n`), each section's optional `body` / `items` / `links`, then `acceptance` and a `back` link to the home route.
- `src/components/sections/Nav.astro` takes `lang` and `page?: 'home' | 'tos'` (default `'home'`). Section anchors are absolute (`${routes[lang]}#precios`, `#catalogo`, `#contacto`) so they also work from the TOS page; the T.O.S. item points at `tosRoutes[lang]` and carries `aria-current="page"` on the TOS page; the `ES | EN` switcher targets `routes` on the home and `tosRoutes` on the TOS page. The nav also emits the `localStorage` language hook.
- `src/i18n/ui.ts` is the single source of copy: `locales`, the `Lang` type, `routes`, `tosRoutes`, `langLabels`, `contact` (email / handle / Toyhouse, non-translatable), the TOS types `TosLink` / `TosSection` / `TosCopy`, the typed `t` dictionary (both languages complete by type, including `nav.tos` and a full `tos` block per language), and the `fill()` template helper. All translatable strings live here.
- `src/data/planes.ts` is the single source of prices, gallery and catalog structure: the combinable axes `formatIds`/`FormatId` (chibi, half, full), `finishIds`/`FinishId` (sketch, simple, experimental) and `designIds`/`DesignId` (existing character vs. custom design), the `prices` matrix `[design][format][finish]` read through `priceFor()` (custom has no half body — use `formatsForDesign()`), `entryPrice` (the $5 icon), `galleryIds`/`GalleryId` + `photos`, and `catalogIds`/`catalog`. Translatable names, alts and catalog titles live in `src/i18n/ui.ts`, keyed by those ids — do not duplicate ids or prices.
- `src/layouts/BaseLayout.astro` owns `<head>`, `title`/`description` props (defaulting to `t[lang].meta`), the `alternates?: Record<Lang, string>` prop that feeds `hreflang` (default `routes`; the TOS pages pass `tosRoutes`), favicons and theme color, Google Fonts (Pirata One), and imports `src/styles/global.css` globally. It sets `<html lang>` from the `lang` prop and emits the English auto-detect script only on `/`.
- Client-side JavaScript is four scripts, and the build ships **no separate JS bundle**: the pricing gallery (vanilla, Pointer Events for swipe, 7 s autoplay that pauses on hover over the viewport, keyboard `focus-visible`, off-screen (`IntersectionObserver`) and hidden tab, stops on manual navigation and resumes only via the explicit pause/play button — WCAG 2.2.2, disabled under `prefers-reduced-motion`), the contact brief form (three selects feeding a live price from the matrix; composes a `mailto:`), the `localStorage` language-choice hook in `Nav.astro`, and the browser-language redirect in `BaseLayout.astro`. The first two are Astro-processed `<script>` (inlined into the HTML in the current build); the last two are `is:inline`, guarded by `try/catch`.
- No React, no islands, no `client:*` directives. If you ever need one, re-add `@astrojs/react` and the React deps deliberately.
- No CMS, backend, auth, or deploy/CI config. Git remote is GitHub; `dist/` is generated.

## Styling

- Tailwind 4 via `@tailwindcss/vite` in `astro.config.mjs`. There is **no** `tailwind.config.*`; configure through `@theme` / CSS in `src/styles/global.css`.
- Semantic CSS variables live in `global.css`. The XP palette (`--window-bg`, `--window-fg`, `--selection-bg`, `--desktop-bg`) is declared on `.xp-section` by the vendored theme, not in `global.css`.
- `BaseLayout` still applies the light `--bg`/`--text` tokens to `<body>`, but the `xp-section` wrapper covers the whole page, so those are only visible if content is shorter than the viewport.
- `:root[data-theme='dark']` is dead code left over from the removed theme toggle; the page does not switch themes.
- **The whole page is Windows XP on every route.** The wrapper in `PageSections.astro` (and in `TosBody.astro`) carries `xp-section`, which activates the vendored theme for the entire page. The nav is a `.top-panel` sticky toolbar (with the `ES | EN` switcher) and the footer a `.bottom-panel` status bar. Sections are plain beige blocks; the content ones (Precios, Catálogo, Contacto, and the TOS article) sit inside an `.xp-group` — the 1px etched frame XP dialogs used to group controls (`src/styles/xp/layout.css`). **Do not wrap sections in `.window`/`.title-bar`** (rejected as fake-window noise) and **do not separate them with colored bars** (also rejected); whitespace plus the group frame is the XP answer.
- The old dark-theme tokens (`--tapshoe`, `--ashen*`, `--lagon`, `--button-bg`, `--button-text`, `--text-on-dark-*`, `--line-dark`, `--tint-ashen`, `--nav-bg-dark`) and `--media-gradient` are **no longer referenced by any component**. They still exist in `global.css`; safe to delete, but do not reintroduce them in section markup.

## Windows XP theme

- `src/styles/xp/theme.css` is a vendored copy of `classic-stylesheets@2.1.3`' winxp theme, generated by `scripts/build-xp-theme.mjs`. The package's `:root` color tokens are rewritten onto `.xp-section`, its `body` rule is dropped on purpose, and every remaining rule is wrapped in a single `@scope (.xp-section)` block so nothing leaks to the rest of the page. The generator also emits the `.window.maximized > .title-bar { margin: 0 }` fix (upstream pulls the title bar over the window padding) and copies the theme's SVGs. **Do not hand-edit it** — re-run `node scripts/build-xp-theme.mjs` if the package is updated.
- `src/styles/xp/precios.css` holds the price matrix and gallery styles. It is deliberately **unlayered** so it can beat the theme's table/`button` rules; its selectors are prefixed with `#precios`. It also owns the carousel frame: fixed-height viewport (`420px`, `560px` from `md`) with `estrellas.webp` as backdrop (under a dark wash so the busy rainbow does not fight the artwork), and the 3px edge line that doubles as the autoplay clock (hidden via `[data-autoplay-off]`).
- Each section imports its own stylesheet: `Hero` → `wordart.css` + `stamps.css` + `hero.css`, `Precios` → `theme.css` + `precios.css`, `Contacto` → `contacto.css`. `layout.css` (the `.xp-group` frame and the anchor scroll margins) comes from `PageSections` on the home and from `TosBody` on the TOS pages.
- `src/styles/xp/wordart.css` renders the hero's WordArt rotulo: real text with `background-clip: text` (rainbow gradient), a light `-webkit-text-stroke` and a gray offset copy behind, scaled `scaleY(1.55)` and rotated `-3deg`. It is imported by `Hero.astro` and the copy lives in `ui.ts` as `hero.wordart`.
- `hero.css`, `stamps.css` and `contacto.css` follow the same "unlayered + section id prefix" pattern as `precios.css`; they exist to beat the theme's base `button` / form-control rules.

## Assets / gotchas

- Carousel artwork lives in `src/assets/carousel/` (`chibi.webp`, `full.png`, `render.jpg`, `icon.webp`, `custom.webp`) and is imported by `src/data/planes.ts` as `ImageMetadata`. `Precios.astro` renders it with Astro's `<Image>` (`astro:assets`), which emits WebP + srcset at build time — do not replace it with a plain `<img>` or a `public/` path. `estrellas.webp` in the same folder is only the carousel backdrop, referenced from `precios.css` (`desktop.webp` is the previous backdrop, now unused); `chibi.png` is an unused leftover.
- Catalog artwork lives in `src/assets/catalog/` (ten numbered `.webp` files) and is imported by `planes.ts`; `Catalogo.astro` renders it through `<Image>` the same way.
- Hero stamps live in `src/assets/stamps/` (animated GIFs: `pareja.gif`, `evoluciones.gif`, `no-rain-no-rainbows.gif`). They are imported in `Hero.astro` but rendered with a plain `<img src={stamp.src}>`: Astro imports any image as `ImageMetadata` (so `.src` is required) and `<Image>` would flatten the animation. `image-rendering: pixelated` (in `stamps.css`) and the `width`/`height` attributes keep them crisp and prevent layout shift.
- `src/assets/stamps/profile/` holds the decorative set downloaded from the artist's Toyhouse profile (58 blinkies, stamps, dividers and buttons, ~2.4 MB). Only the curated subset in `src/data/stamps.ts` is imported: `megaman.feature`/`megaman.strip` and `heroBlinkies` feed the `.stamps` band under the WordArt (pareja + Megaman as the feature pair, then a strip of small stamps and blinkies), and `stickerShelf` renders the compact `.sticker-shelf` under the CTAs so the hero keeps its buttons visible on load. The rest of the files are unused but stay in the folder to swap pieces in. Same rule as above: plain `<img src>`, never `<Image>`.
- The carousel frame has a fixed height (`420px`, `560px` from `md`) and uses `object-fit: contain`, because the artworks have mixed aspect ratios and `cover` crops the portraits. Keep the viewport's `padding` at `0`: with padding, `overflow: hidden` clips at the padding box and the next slide bleeds into the gap.
- `public/` holds only the favicons referenced by `BaseLayout` (`favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`) and `background.PNG`, which is ~14 MB and referenced nowhere. It is copied into `dist/` on every build; prefer optimized formats/sizes or remove it.
- Anything in `public/` is served from `/`; static imports belong in `src/`.
- `tos_borrador.md` (repo root) is the review draft of the T.O.S. that was agreed with the artist before publishing; the live copy is `t[lang].tos` in `ui.ts`. Keep the two in sync when the terms change, and treat remaining `@handle` / resolution placeholders as still pending.
- `plan_estandar_comisiones.md` (repo root) is market/pricing research for the commission ladder, not site content.
- `docs/plans/` and `docs/superpowers/` are historical planning material, not a current source of truth.
