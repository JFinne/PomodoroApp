import { Link } from 'react-router-dom';
import { usePanelsContext } from '../../context/PanelsContext';
import Timer from '../Timer/Timer';
import TodoList from '../TodoList/TodoList';
import DailyPlanner from '../DailyPlanner/DailyPlanner';

function Dashboard() {
  const { openPanels } = usePanelsContext();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col lg:flex-row lg:items-start lg:justify-center flex-wrap items-center gap-6 lg:gap-8 px-4 pt-8 sm:pt-12 lg:pt-16 pb-10 relative">
      <Link
        to="/settings"
        aria-label="Open settings"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[var(--text-faint)] hover:text-[var(--text-secondary)] text-sm transition-colors"
      >
        ⚙ Settings
      </Link>

      {/* order-* controls MOBILE stacking (default, no breakpoint
          prefix); lg:order-* overrides it only at the lg
          breakpoint and up. Below lg, DailyPlanner comes last,
          while Timer and TodoList are grouped together (Timer on
          top, TodoList underneath). At lg and above, DailyPlanner
          moves to the left of that Timer/TodoList column. */}
      <div className="order-2 lg:order-1 w-full lg:w-auto flex justify-center">
        {openPanels.dailyPlanner && <DailyPlanner />}
      </div>

      <div className="order-1 lg:order-2 flex flex-col items-center gap-6 lg:gap-8">
        <Timer />
        {openPanels.todo && <TodoList />}
      </div>
    </div>
  );
}

export default Dashboard;