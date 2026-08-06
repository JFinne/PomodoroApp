import useLocalStorage from '../../hooks/useLocalStorage';
import { DEFAULT_CATEGORIES } from '../../utils/categories';
import type { Category } from '../../types';
import CategoryForm from './CategoryForm';

/**
 * ============================================================
 * CategorySettings.tsx
 * ============================================================
 * Owns the 'categories' localStorage key — the SAME key
 * TodoList reads from. Because both components call
 * useLocalStorage('categories', ...) independently, they stay
 * in sync automatically: whatever's saved here is what TodoList
 * sees the next time it renders (e.g. after navigating back
 * from Settings to the dashboard).
 * ============================================================
 */

function CategorySettings() {
  const [categories, setCategories] = useLocalStorage<Category[]>(
    'categories',
    DEFAULT_CATEGORIES
  );

  function addCategory(category: Category) {
    setCategories([...categories, category]);
  }

  function deleteCategory(id: string) {
    setCategories(categories.filter((category) => category.id !== id));
    // Note: tasks that referenced this category keep their
    // categoryId pointing at a now-deleted category. TodoList
    // handles this gracefully — see the lookup fallback there —
    // rather than needing to hunt down and update every task
    // here, which would be a much more invasive operation for a
    // simple delete action.
  }

  return (
    <div>
      <h3 className="text-white text-sm font-semibold mb-3">To-Do Categories</h3>

      <ul className="flex flex-col gap-2 mb-4">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex items-center justify-between bg-slate-900 rounded-lg px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-slate-300 text-sm">{category.name}</span>
            </div>
            <button
              onClick={() => deleteCategory(category.id)}
              aria-label={`Delete category: ${category.name}`}
              className="text-slate-500 hover:text-red-400 text-xs transition-colors"
            >
              ✕
            </button>
          </li>
        ))}
        {categories.length === 0 && (
          <p className="text-slate-600 text-xs italic">No categories yet.</p>
        )}
      </ul>

      <CategoryForm onAddCategory={addCategory} />
    </div>
  );
}

export default CategorySettings;