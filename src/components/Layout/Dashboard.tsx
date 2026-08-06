import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import Timer from '../Timer/Timer';
import TodoList from '../TodoList/TodoList';

/**
 * AddonMenu is gone from here — toggling now happens in
 * Settings via AddonSettings.tsx. Dashboard's job is now just
 * to READ openPanels (not manage the toggle UI) and render
 * whatever's currently turned on.
 */
function Dashboard() {
  const [openPanels] = useLocalStorage<Record<string, boolean>>(
    'openPanels',
    { todo: true }
  );

  return (
    // Changed from vertically-centered (justify-center) to
    // top-aligned. The padding-top scales up at larger
    // breakpoints (sm/lg) so the timer sits progressively higher
    // relative to viewport on bigger screens, without crowding
    // the top edge on small phones where vertical space is
    // already tight.
    <div className="min-h-screen bg-slate-900 flex flex-col items-center gap-8 px-4 pt-8 sm:pt-12 lg:pt-16 pb-10 relative">
      <Link
        to="/settings"
        aria-label="Open settings"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-500 hover:text-slate-300 text-sm transition-colors"
      >
        ⚙ Settings
      </Link>

      <Timer />

      {openPanels.todo && <TodoList />}
    </div>
  );
}

export default Dashboard;