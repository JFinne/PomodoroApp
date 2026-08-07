import { useState } from 'react';
import { Check } from 'lucide-react';
import useLocalStorage from '../../hooks/useLocalStorage';
import type { Task, Category } from '../../types';
import { DEFAULT_CATEGORIES } from '../../utils/categories';
import TodoForm from './TodoForm';

const UNCATEGORIZED_COLOR = '#cbd5e1';

function TodoList() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [categories] = useLocalStorage<Category[]>('categories', DEFAULT_CATEGORIES);
  const [isFormOpen, setIsFormOpen] = useState(false);

  function addTask(text: string, categoryId?: string) {
    const newTask: Task = { id: Date.now(), text, done: false, categoryId };
    setTasks([...tasks, newTask]);
    setIsFormOpen(false);
  }

  function toggleTask(id: number) {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function getCategoryColor(categoryId?: string): string {
    return categories.find((category) => category.id === categoryId)?.color ?? UNCATEGORIZED_COLOR;
  }

  function getCategoryName(categoryId?: string): string | undefined {
    return categories.find((category) => category.id === categoryId)?.name;
  }

  return (
    <div className="bg-[var(--bg-card)] rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-[28rem]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[var(--text-muted)] text-sm font-medium uppercase tracking-wide">
          To-Do
        </h2>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="text-xs font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
        >
          {isFormOpen ? 'Cancel' : '+ New Task'}
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-[var(--overlay)] border border-[var(--border)] rounded-xl p-4 mb-4">
          <TodoForm onAddTask={addTask} categories={categories} />
        </div>
      )}

      <ul className="space-y-1">
        {tasks.map((task) => {
          const color = getCategoryColor(task.categoryId);
          const categoryName = getCategoryName(task.categoryId);

          return (
            <li
              key={task.id}
              className="group flex items-center gap-3 py-1.5 px-1 rounded-lg hover:bg-[var(--overlay)] transition-colors"
            >
              <button
                onClick={() => toggleTask(task.id)}
                role="checkbox"
                aria-checked={task.done}
                aria-label={task.done ? `Mark "${task.text}" as not done` : `Mark "${task.text}" as done`}
                className="shrink-0 w-4 h-4 rounded-full border transition-colors flex items-center justify-center"
                style={{ borderColor: color, backgroundColor: task.done ? color : 'transparent' }}
              >
                {task.done && <Check size={10} strokeWidth={3} className="text-slate-900" />}
              </button>

              <span
                className={`flex-1 text-sm transition-opacity ${
                  task.done ? 'text-[var(--text-faint)] line-through' : 'text-[var(--text-primary)]'
                }`}
                style={{ opacity: task.done ? 0.6 : 1 }}
              >
                {task.text}
              </span>

              {categoryName && (
                <span
                  className="text-[10px] font-semibold text-slate-900 px-2 py-0.5 rounded-full shrink-0"
                  style={{ backgroundColor: color, opacity: task.done ? 0.6 : 1 }}
                >
                  {categoryName}
                </span>
              )}

              <button
                onClick={() => deleteTask(task.id)}
                aria-label={`Delete task: ${task.text}`}
                className="opacity-0 group-hover:opacity-100 text-[var(--text-faint)] hover:text-red-400 text-xs transition-opacity"
              >
                ✕
              </button>
            </li>
          );
        })}
      </ul>

      {tasks.length === 0 && !isFormOpen && (
        <p className="text-[var(--text-faint)] text-xs mt-4 italic">No tasks yet.</p>
      )}
    </div>
  );
}

export default TodoList;