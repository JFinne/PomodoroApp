export interface ThemeColors {
  bgPrimary: string;   // page background
  bgCard: string;      // card/panel background
  bgInput: string;     // inputs, nested surfaces, secondary buttons
  overlay: string;     // subtle hover tints and nested panel backgrounds
  textPrimary: string; // main readable text
  textSecondary: string;
  textMuted: string;   // small uppercase labels
  textFaint: string;   // placeholders, faintest text
  border: string;
  accent: string;      // primary buttons, checkmarks, focus rings
  accentHover: string;
}

export interface Theme {
  id: string;
  label: string;
  colors: ThemeColors;
}

export const THEMES: Theme[] = [
  {
    id: 'dark',
    label: 'Dark',
    colors: {
      bgPrimary: '#0f172a',
      bgCard: '#1e293b',
      bgInput: '#0f172a',
      overlay: 'rgba(148, 163, 184, 0.08)',
      textPrimary: '#ffffff',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      textFaint: '#64748b',
      border: '#334155',
      accent: '#0f0596ff',
      accentHover: '#322b9bff',
    },
  },
  {
    id: 'light',
    label: 'Light',
    colors: {
      bgPrimary: '#f8fafc',
      bgCard: '#ffffff',
      bgInput: '#f1f5f9',
      overlay: 'rgba(15, 23, 42, 0.05)',
      textPrimary: '#0f172a',
      textSecondary: '#334155',
      textMuted: '#64748b',
      textFaint: '#94a3b8',
      border: '#e2e8f0',
      accent: '#0f0596ff',
      accentHover: '#322b9bff',
    },
  },
  {
    id: 'midnight',
    label: 'Midnight',
    colors: {
      bgPrimary: '#000000',
      bgCard: '#0a0a0a',
      bgInput: '#050505',
      overlay: 'rgba(255, 255, 255, 0.06)',
      textPrimary: '#f8fafc',
      textSecondary: '#a1a1aa',
      textMuted: '#71717a',
      textFaint: '#52525b',
      border: '#27272a',
      accent: '#0f0596ff',
      accentHover: '#322b9bff',
    },
  },
  {
    id: 'ocean',
    label: 'Ocean',
    colors: {
      bgPrimary: '#0c1e35',
      bgCard: '#13293f',
      bgInput: '#0c1e35',
      overlay: 'rgba(125, 211, 252, 0.08)',
      textPrimary: '#e0f2fe',
      textSecondary: '#7dd3fc',
      textMuted: '#38bdf8',
      textFaint: '#0ea5e9',
      border: '#1e4a72',
      accent: '#0ea5e9',
      accentHover: '#38bdf8',
    },
  },
  {
    id: 'forest',
    label: 'Forest',
    colors: {
      bgPrimary: '#0f1f14',
      bgCard: '#16291d',
      bgInput: '#0f1f14',
      overlay: 'rgba(134, 239, 172, 0.08)',
      textPrimary: '#ecfdf5',
      textSecondary: '#86efac',
      textMuted: '#4ade80',
      textFaint: '#22c55e',
      border: '#1f3d28',
      accent: '#22c55e',
      accentHover: '#4ade80',
    },
  },
];