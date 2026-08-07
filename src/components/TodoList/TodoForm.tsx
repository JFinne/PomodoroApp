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
        className="bg-[var(--bg-input)] text-[var(--text-primary)] text-sm rounded-lg px-3 py-2
                   placeholder:text-[var(--text-faint)] outline-none focus:ring-2
                   focus:ring-[var(--accent)] border border-[var(--border)]"
      />

      <div className="flex gap-2">
        <select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          aria-label="Task category"
          className="flex-1 bg-[var(--bg-input)] text-[var(--text-secondary)] text-sm rounded-lg px-3 py-2
                     outline-none focus:ring-2 focus:ring-[var(--accent)] border border-[var(--border)] cursor-pointer"
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
          className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm
                     font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default TodoForm;