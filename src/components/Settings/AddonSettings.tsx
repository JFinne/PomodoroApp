import { usePanelsContext } from '../../context/PanelsContext';
import AddonMenu from '../Layout/AddonMenu';
import type { AddonConfig } from '../../types';

const ADDONS: AddonConfig[] = [
  { key: 'todo', label: 'To-Do List' },
  { key: 'timerManager', label: 'Timer Manager' },
  { key: 'dailyPlanner', label: 'Daily Planner' },
];

function AddonSettings() {
  const { openPanels, togglePanel } = usePanelsContext();

  return (
    <div>
      <p className="text-slate-500 text-xs mb-3">
        Choose which tools appear on your dashboard.
      </p>
      <AddonMenu addons={ADDONS} openPanels={openPanels} onToggle={togglePanel} />
    </div>
  );
}

export default AddonSettings;