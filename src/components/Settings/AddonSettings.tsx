import { usePanelsContext } from '../../context/PanelsContext';
import AddonMenu from '../Layout/AddonMenu';
import type { AddonConfig } from '../../types';

const ADDONS: AddonConfig[] = [
  { key: 'todo', label: 'To-Do List' },
  { key: 'timerManager', label: 'Timer Manager' },
];

function AddonSettings() {
  // Reads from the SHARED context now, not its own independent
  // useLocalStorage call — this is the actual fix for the
  // "doesn't show up until you navigate away and back" bug.
  const { openPanels, togglePanel } = usePanelsContext();

  return (
    <div>
      <h3 className="text-white text-sm font-semibold mb-3">Dashboard Tools</h3>
      <p className="text-slate-500 text-xs mb-3">
        Choose which tools appear on your dashboard.
      </p>
      <AddonMenu addons={ADDONS} openPanels={openPanels} onToggle={togglePanel} />
    </div>
  );
}

export default AddonSettings;