import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const THEME_KEY = 'portfolio-theme';

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    const initial = storedTheme ?? 'light';
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-medium transition hover:scale-[1.02]"
    >
      <span>{theme === 'light' ? 'Modo claro' : 'Modo oscuro'}</span>
      <span aria-hidden="true">{theme === 'light' ? 'LIGHT' : 'DARK'}</span>
    </button>
  );
}
