import useLocalStorage from '../../hooks/useLocalStorage';
import type { Task } from '../../types';
import TodoForm from './TodoForm';

function TodoList() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

  function addTask(text: string) {
    const newTask: Task = {
      id: Date.now(),
      text,
      done: false,
    };
    setTasks([...tasks, newTask]);
  }

  function toggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <div className="bg-slate-800 rounded-2xl shadow-xl p-8 w-80">
      <h2 className="text-slate-400 text-sm font-medium uppercase tracking-wide mb-4">
        To-Do
      </h2>

      <TodoForm onAddTask={addTask} />

      <ul className="mt-4 space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center gap-2 text-white text-sm"
          >
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              className="accent-emerald-500"
            />
            <span
              className={`flex-1 ${task.done ? 'line-through text-slate-500' : ''}`}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              aria-label={`Delete task: ${task.text}`}
              className="text-slate-500 hover:text-red-400 text-xs transition-colors"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="text-slate-600 text-xs mt-4 italic">No tasks yet.</p>
      )}
    </div>
  );
}

export default TodoList;