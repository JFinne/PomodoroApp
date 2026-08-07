import { Link } from 'react-router-dom';
import { usePanelsContext } from '../../context/PanelsContext';
import AddonSettings from './AddonSettings';
import CategorySettings from './CategorySettings';
import TimerPresetSettings from './TimerPresetSettings';
import ThemeSettings from './ThemeSettings';
import CollapsibleSection from './CollapsibleSection';

function ComingSoonRow({ title }: { title: string }) {
  return (
    <div className="bg-[var(--bg-card)] rounded-2xl shadow-xl px-6 py-5 flex items-center justify-between opacity-60">
      <span className="text-[var(--text-muted)] text-xs font-medium uppercase tracking-wide">{title}</span>
      <span className="text-[var(--text-faint)] text-[10px] uppercase tracking-wide">Coming soon</span>
    </div>
  );
}

function Settings() {
  const { openPanels } = usePanelsContext();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-6 flex flex-col items-center">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="text-[var(--text-faint)] hover:text-[var(--text-secondary)] text-sm mb-6 inline-block transition-colors"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-[var(--text-primary)] text-2xl font-bold mb-6">Settings</h1>

        <div className="flex flex-col gap-4">
          <CollapsibleSection title="Addon Manager" defaultOpen>
            <AddonSettings />
          </CollapsibleSection>

          {openPanels.timerManager && (
            <CollapsibleSection title="Timer Manager">
              <TimerPresetSettings />
            </CollapsibleSection>
          )}

          <CollapsibleSection title="To-Do List Categories">
            <CategorySettings />
          </CollapsibleSection>

          <CollapsibleSection title="Theme">
            <ThemeSettings />
          </CollapsibleSection>

          <ComingSoonRow title="Account" />
        </div>
      </div>
    </div>
  );
}

export default Settings;