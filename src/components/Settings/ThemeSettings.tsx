import { useThemeContext } from '../../context/ThemesContext';
import { THEMES } from '../../utils/themes';

/**
 * Each swatch button is styled directly from THAT theme's own
 * colors.colors — not the currently active CSS variables — so
 * every option always previews its own true appearance
 * regardless of what's currently applied. This is why you'll
 * see `style={{ backgroundColor: theme.colors.bgCard }}` here
 * instead of a var()-based class.
 */
function ThemeSettings() {
  const { themeId, setThemeId } = useThemeContext();

  return (
    <div>
      <p className="text-[var(--text-faint)] text-xs mb-3">
        Choose a color theme for the whole app.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setThemeId(theme.id)}
            aria-pressed={themeId === theme.id}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium border transition-colors ${
              themeId === theme.id ? 'border-[var(--accent)]' : 'border-transparent hover:border-[var(--border)]'
            }`}
            style={{ backgroundColor: theme.colors.bgCard, color: theme.colors.textSecondary }}
          >
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: theme.colors.accent }}
              aria-hidden="true"
            />
            {theme.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSettings;