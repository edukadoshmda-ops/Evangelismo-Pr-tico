export const THEME_STORAGE_KEY = 'evangelismo_pratico_theme';

export type Theme = 'light' | 'dark';

export const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};
