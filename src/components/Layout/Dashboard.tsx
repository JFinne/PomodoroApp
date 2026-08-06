import useLocalStorage from '../../hooks/useLocalStorage';
import Timer from '../Timer/Timer';
import TodoList from '../TodoList/TodoList';
import AddonMenu from './AddonMenu';
import type { AddonConfig } from '../../types';

const ADDONS: AddonConfig[] = [{ key: 'todo', label: 'To-Do List' }];

function Dashboard() {
  const [openPanels, setOpenPanels] = useLocalStorage<Record<string, boolean>>(
    'openPanels',
    { todo: true } // To-Do list visible by default on first visit
  );

  function togglePanel(key: string) {
    setOpenPanels({ ...openPanels, [key]: !openPanels[key] });
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-8 p-6">
      <Timer />

      <AddonMenu addons={ADDONS} openPanels={openPanels} onToggle={togglePanel} />

      {/* Conditionally rendered based on toggle state. Each
          panel checks its own key — this is the pattern every
          future addon will follow. */}
      {openPanels.todo && <TodoList />}
    </div>
  );
}

export default Dashboard;