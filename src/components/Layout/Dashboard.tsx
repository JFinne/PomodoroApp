import { Link } from 'react-router-dom';
import { usePanelsContext } from '../../context/PanelsContext';
import Timer from '../Timer/Timer';
import TodoList from '../TodoList/TodoList';

function Dashboard() {
  const { openPanels } = usePanelsContext();

  return (
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