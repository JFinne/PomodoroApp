import { useState } from 'react';
import { CATEGORY_COLORS } from '../../utils/categories';
import type { Category } from '../../types';

interface CategoryFormProps {
  onAddCategory: (category: Category) => void;
}

/**
 * Dumb component, same pattern as TodoForm: owns only the
 * in-progress form values (name text + selected color swatch),
 * and hands a finished Category object up via onAddCategory.
 */
function CategoryForm({ onAddCategory }: CategoryFormProps) {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(CATEGORY_COLORS[0]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = name.trim();
    if (trimmed === '') return;

    onAddCategory({
      id: crypto.randomUUID(),
      name: trimmed,
      color: selectedColor,
    });

    setName('');
    setSelectedColor(CATEGORY_COLORS[0]);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Category name..."
        aria-label="New category name"
        className="bg-slate-900 text-white text-sm rounded-lg px-3 py-2
                   placeholder:text-slate-600 outline-none focus:ring-2
                   focus:ring-emerald-500"
      />

      {/* Swatch picker: each color is a clickable circle. The
          selected one gets a ring around it so it's clear which
          is currently chosen. */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORY_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => setSelectedColor(color)}
            aria-label={`Select color ${color}`}
            aria-pressed={selectedColor === color}
            className={`w-6 h-6 rounded-full transition-transform ${
              selectedColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-800 scale-110' : ''
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <button
        type="submit"
        className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm
                   font-semibold px-4 py-2 rounded-lg transition-colors self-start"
      >
        Add Category
      </button>
    </form>
  );
}

export default CategoryForm;