# Astro Portfolio Design

**Goal**
Create a simple personal portfolio using the latest Astro stack with React components for interactivity, Tailwind CSS for styling, and TypeScript for type safety.

**Chosen approach (A)**
- Astro latest as the site framework.
- React integration for interactive UI islands.
- Tailwind CSS latest for utility-first styling.
- TypeScript strict defaults from Astro scaffold.

**Scope**
- Project scaffold and boilerplate only.
- Base layout, homepage, and reusable sections.
- A small interactive React component to validate client-side interactivity.
- No backend, CMS, auth, or deployment setup.

**Architecture**
- `src/layouts/BaseLayout.astro`: shared head/meta and page shell.
- `src/pages/index.astro`: portfolio landing page.
- `src/components/*.astro`: static presentational sections.
- `src/components/react/*.tsx`: interactive React islands.
- `src/styles/global.css`: Tailwind import and global tokens.

**Interactivity strategy**
- Use Astro islands (`client:load` for immediate interaction).
- Keep React usage focused on stateful UI only.

**Quality checks**
- `npm run check` for Astro+TS diagnostics.
- `npm run build` to verify production build.
