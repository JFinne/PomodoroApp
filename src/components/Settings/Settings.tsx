import { Link } from 'react-router-dom';
import { usePanelsContext } from '../../context/PanelsContext';
import AddonSettings from './AddonSettings';
import CategorySettings from './CategorySettings';
import TimerPresetSettings from './TimerPresetSettings';
import CollapsibleSection from './CollapsibleSection';

/**
 * Small reusable row for placeholder sections (Theme, Account)
 * that have no real content yet. Deliberately NOT built from
 * CollapsibleSection — there's nothing to expand, so giving it
 * a chevron would be misleading. Instead it mirrors the same
 * header styling with a "Coming soon" badge standing in for the
 * chevron's spot, so it still reads as part of the same list
 * rather than a visually different element.
 */
function ComingSoonRow({ title }: { title: string }) {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-xl px-6 py-5 flex items-center justify-between opacity-60">
      <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">{title}</span>
      <span className="text-slate-600 text-[10px] uppercase tracking-wide">Coming soon</span>
    </div>
  );
}

function Settings() {
  const { openPanels } = usePanelsContext();

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex flex-col items-center">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="text-slate-500 hover:text-slate-300 text-sm mb-6 inline-block transition-colors"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-white text-2xl font-bold mb-6">Settings</h1>

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

          <ComingSoonRow title="Theme" />
          <ComingSoonRow title="Account" />
        </div>
      </div>
    </div>
  );
}

export default Settings;