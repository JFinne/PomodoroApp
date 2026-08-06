import useLocalStorage from '../../hooks/useLocalStorage';
import AddonMenu from '../Layout/AddonMenu';
import type { AddonConfig } from '../../types';

const ADDONS: AddonConfig[] = [{ key: 'todo', label: 'To-Do List' }];

function AddonSettings() {
  const [openPanels, setOpenPanels] = useLocalStorage<Record<string, boolean>>(
    'openPanels',
    { todo: true }
  );

  function togglePanel(key: string) {
    setOpenPanels({ ...openPanels, [key]: !openPanels[key] });
  }

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