import { useState } from 'react';
import type { Category } from '../../types';

interface TodoFormProps {
  onAddTask: (text: string, categoryId?: string) => void;
  categories: Category[];
}

function TodoForm({ onAddTask, categories }: TodoFormProps) {
  const [inputValue, setInputValue] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = inputValue.trim();
    if (trimmed === '') return;

    // Empty string means "no category selected" — pass
    // undefined instead so it matches Task's optional categoryId
    // field rather than storing an empty string as a fake ID.
    onAddTask(trimmed, categoryId === '' ? undefined : categoryId);
    setInputValue('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Add a task..."
        aria-label="New task"
        className="bg-slate-900 text-white text-sm rounded-lg px-3 py-2
                   placeholder:text-slate-600 outline-none focus:ring-2
                   focus:ring-emerald-500"
      />

      <div className="flex gap-2">
        <select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          aria-label="Task category"
          className="flex-1 bg-slate-900 text-slate-300 text-sm rounded-lg px-3 py-2
                     outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
        >
          <option value="">No category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm
                     font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default TodoForm;