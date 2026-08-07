import type { AddonConfig } from '../../types';

interface AddonMenuProps {
  addons: AddonConfig[];
  openPanels: Record<string, boolean>;
  onToggle: (key: string) => void;
}

function AddonMenu({ addons, openPanels, onToggle }: AddonMenuProps) {
  return (
    <div className="flex flex-col gap-2">
      {addons.map((addon) => {
        const isOpen = Boolean(openPanels[addon.key]);
        return (
          <label
            key={addon.key}
            className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={isOpen}
              onChange={() => onToggle(addon.key)}
              className="w-4 h-4 accent-emerald-500 cursor-pointer"
            />
            {addon.label}
          </label>
        );
      })}
    </div>
  );
}

export default AddonMenu;