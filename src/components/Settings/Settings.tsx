import { Link } from 'react-router-dom';
import { usePanelsContext } from '../../context/PanelsContext';
import AddonSettings from './AddonSettings';
import CategorySettings from './CategorySettings';
import TimerPresetSettings from './TimerPresetSettings';

function Settings() {
  // Same shared context AddonSettings reads/writes — now this
  // section appears or disappears the INSTANT the checkbox is
  // toggled, with no navigation required, because both
  // components are looking at the exact same state.
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

        <div className="flex flex-col gap-6">
          <section className="bg-slate-800 rounded-2xl shadow-xl p-6">
            <AddonSettings />
          </section>

          {/* Only rendered when the Timer Manager addon is
              toggled on — turning it off in the list above hides
              this section immediately, since both read the same
              underlying state. */}
          {openPanels.timerManager && (
            <section className="bg-slate-800 rounded-2xl shadow-xl p-6">
              <TimerPresetSettings />
            </section>
          )}

          <section className="bg-slate-800 rounded-2xl shadow-xl p-6">
            <CategorySettings />
          </section>

          <section className="bg-slate-800 rounded-2xl shadow-xl p-6 opacity-50">
            <h3 className="text-white text-sm font-semibold mb-1">Theme</h3>
            <p className="text-slate-500 text-xs">Coming soon.</p>
          </section>

          <section className="bg-slate-800 rounded-2xl shadow-xl p-6 opacity-50">
            <h3 className="text-white text-sm font-semibold mb-1">Account</h3>
            <p className="text-slate-500 text-xs">Coming soon.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Settings;