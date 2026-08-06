import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import Timer from '../Timer/Timer';
import TodoList from '../TodoList/TodoList';

function Dashboard() {
  const [openPanels] = useLocalStorage<Record<string, boolean>>(
    'openPanels',
    { todo: true }
  );

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-8 p-6 relative">
      <Link
        to="/settings"
        aria-label="Open settings"
        className="absolute top-6 right-6 text-slate-500 hover:text-slate-300 text-sm transition-colors"
      >
        ⚙ Settings
      </Link>

      <Timer />

      {openPanels.todo && <TodoList />}
    </div>
  );
}

export default Dashboard;