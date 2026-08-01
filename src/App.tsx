import Timer from './components/Timer/Timer';
import TodoList from './components/TodoList/TodoList';
import Notes from './components/Notes/Notes';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center gap-6 p-6">
      <Timer />
      <TodoList />
      <Notes />
    </div>
  );
}

export default App;