import useLocalStorage from '../../hooks/useLocalStorage';
import { DEFAULT_CATEGORIES } from '../../utils/categories';
import type { Category } from '../../types';
import CategoryForm from './CategoryForm';

function CategorySettings() {
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', DEFAULT_CATEGORIES);

  function addCategory(category: Category) {
    setCategories([...categories, category]);
  }

  function deleteCategory(id: string) {
    setCategories(categories.filter((category) => category.id !== id));
  }

  return (
    <div>
      <ul className="flex flex-col gap-2 mb-4">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex items-center justify-between bg-[var(--bg-input)] rounded-lg px-3 py-2 border border-[var(--border)]"
          >
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
              <span className="text-[var(--text-secondary)] text-sm">{category.name}</span>
            </div>
            <button
              onClick={() => deleteCategory(category.id)}
              aria-label={`Delete category: ${category.name}`}
              className="text-[var(--text-faint)] hover:text-red-400 text-xs transition-colors"
            >
              ✕
            </button>
          </li>
        ))}
        {categories.length === 0 && (
          <p className="text-[var(--text-faint)] text-xs italic">No categories yet.</p>
        )}
      </ul>

      <CategoryForm onAddCategory={addCategory} />
    </div>
  );
}

export default CategorySettings;