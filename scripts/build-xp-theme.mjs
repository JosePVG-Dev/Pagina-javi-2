import fs from 'node:fs';
import path from 'node:path';

const pkgDir = 'node_modules/classic-stylesheets/themes/winxp';
const outDir = 'src/styles/xp';

const css = fs.readFileSync(path.join(pkgDir, 'theme.css'), 'utf8');

function splitTopLevel(input) {
  const blocks = [];
  let i = 0;
  while (i < input.length) {
    const open = input.indexOf('{', i);
    if (open === -1) break;
    let depth = 0;
    let j = open;
    for (; j < input.length; j++) {
      if (input[j] === '{') depth++;
      else if (input[j] === '}') {
        depth--;
        if (depth === 0) { j++; break; }
      }
    }
    blocks.push({
      prelude: input.slice(i, open).replace(/\/\*[\s\S]*?\*\//g, '').trim(),
      body: input.slice(open + 1, j - 1),
      raw: input.slice(i, j).replace(/^\s+/, ''),
    });
    i = j;
  }
  return blocks;
}

const blocks = splitTopLevel(css);

let varsRule = '';
const topLevel = [];
const scoped = [];

for (const b of blocks) {
  const p = b.prelude;
  if (p === ':root') {
    varsRule = '.xp-section' + b.raw.slice(b.raw.indexOf('{')).replace(/\s+$/, '');
  } else if (p === 'body') {
    // dropped on purpose: the theme would repaint the whole page
  } else if (p.startsWith('@keyframes')) {
    topLevel.push(b.raw.trim());
  } else {
    scoped.push(b.raw.trim());
  }
}

const out = [
  '/*',
  ' * Vendored from classic-stylesheets@2.1.3 — themes/winxp/theme.css (MIT).',
  ' * Only change: every rule is confined to `.xp-section` so this section can',
  ' * have its own look without touching the rest of the site.',
  ' * Regenerate with scripts/build-xp-theme.mjs if the package is updated.',
  ' */',
  '',
  varsRule,
  '',
  // the theme relies on `body` for typography, which we deliberately dropped
  '.xp-section {',
  '  font-family: Tahoma, "Segoe UI", Verdana, sans-serif;',
  '  font-size: 11px;',
  '  line-height: 1.35;',
  '  color: var(--window-fg);',
  '}',
  '',
  // upstream pulls the title bar over the window padding; a maximized window
  // has none, so without this the bar overflows the viewport by 4px
  '.window.maximized > .title-bar {',
  '  margin: 0;',
  '}',
  '',
  ...topLevel.map((t) => t + '\n'),
  '@scope (.xp-section) {',
  ...scoped.map((s) => '  ' + s.split('\n').join('\n  ')),
  '}',
  '',
].join('\n');

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'theme.css'), out);

for (const file of fs.readdirSync(pkgDir)) {
  if (file.endsWith('.svg')) fs.copyFileSync(path.join(pkgDir, file), path.join(outDir, file));
}

console.log('rules scoped:', scoped.length, '| vars:', varsRule.length > 0, '| bytes:', out.length);
