import { createContext, useContext, useEffect, type ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { THEMES, type Theme } from '../utils/themes';

interface ThemeContextValue {
  themeId: string;
  theme: Theme;
  setThemeId: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Maps each key in a Theme's colors object to the CSS custom
 * property it controls on the document root. Centralizing this
 * mapping here means adding a new themed color later is a
 * two-step change (add it to ThemeColors in themes.ts, add one
 * line here) rather than a hunt through every component file.
 */
const CSS_VAR_MAP: Record<keyof Theme['colors'], string> = {
  bgPrimary: '--bg-primary',
  bgCard: '--bg-card',
  bgInput: '--bg-input',
  overlay: '--overlay',
  textPrimary: '--text-primary',
  textSecondary: '--text-secondary',
  textMuted: '--text-muted',
  textFaint: '--text-faint',
  border: '--border',
  accent: '--accent',
  accentHover: '--accent-hover',
};

function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useLocalStorage<string>('themeId', THEMES[0].id);
  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];

  /**
   * This is the entire mechanism: whenever the active theme
   * changes, write its colors onto <html> as CSS custom
   * properties. Every component using a class like
   * bg-[var(--bg-card)] picks up the new value INSTANTLY and
   * SIMULTANEOUSLY, everywhere it's used — Settings and
   * Dashboard, or any future page, update together automatically
   * because they're all just reading the same live variables,
   * not separately "knowing" about a theme.
   */
  useEffect(() => {
    const root = document.documentElement;
    (Object.keys(theme.colors) as Array<keyof Theme['colors']>).forEach((key) => {
      root.style.setProperty(CSS_VAR_MAP[key], theme.colors[key]);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ themeId, theme, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}

export { ThemeProvider, useThemeContext };