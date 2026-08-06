import type { AddonConfig } from '../../types';

interface AddonMenuProps {
  addons: AddonConfig[];
  openPanels: Record<string, boolean>;
  onToggle: (key: string) => void;
}

function AddonMenu({ addons, openPanels, onToggle }: AddonMenuProps) {
  return (
    <div className="flex gap-2">
      {addons.map((addon) => {
        const isOpen = Boolean(openPanels[addon.key]);
        return (
          <button
            key={addon.key}
            onClick={() => onToggle(addon.key)}
            aria-pressed={isOpen}
            className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
              isOpen
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {addon.label}
          </button>
        );
      })}
    </div>
  );
}

export default AddonMenu;