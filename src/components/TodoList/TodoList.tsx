import { useState } from 'react';
import { Check } from 'lucide-react';
import useLocalStorage from '../../hooks/useLocalStorage';
import type { Task, Category } from '../../types';
import { DEFAULT_CATEGORIES } from '../../utils/categories';
import TodoForm from './TodoForm';

const UNCATEGORIZED_COLOR = '#cbd5e1'; // slate-300 — close to plain white text, but consistent with the rest of the color system rather than being a special case

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
    const match = categories.find((category) => category.id === categoryId);
    return match?.color ?? UNCATEGORIZED_COLOR;
  }

  // Returns undefined (not a fallback string) when there's no
  // category — this is what lets the pill below decide to not
  // render at all for uncategorized tasks, rather than showing
  // an empty or "Uncategorized" pill on every single task.
  function getCategoryName(categoryId?: string): string | undefined {
    return categories.find((category) => category.id === categoryId)?.name;
  }

  return (
    // w-full lets it shrink to fit small phone screens (respecting
    // the parent's horizontal padding), while max-w-[28rem] caps
    // it at the same visual size as before on larger screens — so
    // desktop looks identical to what you already had, but mobile
    // no longer overflows the viewport.
    <div className="bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-[28rem]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-slate-400 text-sm font-medium uppercase tracking-wide">
          To-Do
        </h2>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          {isFormOpen ? 'Cancel' : '+ New Task'}
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 mb-4">
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
              className="group flex items-center gap-3 py-1.5 px-1 rounded-lg hover:bg-slate-900/40 transition-colors"
            >
              {/* Custom checkbox: a plain circle outline, filled
                  solid when checked. Built from a <button> rather
                  than a styled <input type="checkbox"> because
                  native checkboxes carry browser-default styling
                  (the little inset shadow / tick mark) that's hard
                  to fully override consistently across browsers —
                  a button gives full control over exactly how it
                  looks in both states. */}
              <button
                onClick={() => toggleTask(task.id)}
                role="checkbox"
                aria-checked={task.done}
                aria-label={task.done ? `Mark "${task.text}" as not done` : `Mark "${task.text}" as done`}
                className="shrink-0 w-4 h-4 rounded-full border transition-colors flex items-center justify-center"
                style={{
                  borderColor: color,
                  backgroundColor: task.done ? color : 'transparent',
                }}
              >
                {task.done && <Check size={10} strokeWidth={3} className="text-slate-900" />}
              </button>

              <span
                className={`flex-1 text-sm transition-opacity ${
                  task.done ? 'text-slate-500 line-through' : 'text-white'
                }`}
                style={{ opacity: task.done ? 0.6 : 1 }}
              >
                {task.text}
              </span>

              {/* Category label pill — only rendered when the
                  task actually has a category, so uncategorized
                  tasks aren't cluttered with an empty gray pill.
                  Text is dark (slate-900) rather than pure black,
                  which reads slightly softer against these
                  saturated swatch colors while still giving
                  strong contrast against every color in
                  CATEGORY_COLORS. */}
              {categoryName && (
                <span
                  className="text-[10px] font-semibold text-slate-900 px-2 py-0.5 rounded-full shrink-0"
                  style={{ backgroundColor: color, opacity: task.done ? 0.6 : 1 }}
                >
                  {categoryName}
                </span>
              )}

              {/* Delete button only appears on hover — reduces
                  visual clutter on a list that's just being
                  scanned, not acted on. */}
              <button
                onClick={() => deleteTask(task.id)}
                aria-label={`Delete task: ${task.text}`}
                className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 text-xs transition-opacity"
              >
                ✕
              </button>
            </li>
          );
        })}
      </ul>

      {tasks.length === 0 && !isFormOpen && (
        <p className="text-slate-600 text-xs mt-4 italic">No tasks yet.</p>
      )}
    </div>
  );
}

export default TodoList;