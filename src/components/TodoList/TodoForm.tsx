import { useState } from 'react';

interface TodoFormProps {
  onAddTask: (text: string) => void;
}

function TodoForm({ onAddTask }: TodoFormProps) {
  const [inputValue, setInputValue] = useState<string>('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = inputValue.trim();
    if (trimmed === '') return;

    onAddTask(trimmed);
    setInputValue('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Add a task..."
        aria-label="New task"
        className="flex-1 bg-slate-900 text-white text-sm rounded-lg px-3 py-2
                   placeholder:text-slate-600 outline-none focus:ring-2
                   focus:ring-emerald-500"
      />
      <button
        type="submit"
        className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm
                   font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;