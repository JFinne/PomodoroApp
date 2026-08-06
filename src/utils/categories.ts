import type { Category } from '../types';

/**
 * A fixed palette of swatch options, rather than a free-form
 * color picker. This keeps every category color visually
 * distinct and legible against the dark theme (a user-picked
 * arbitrary hex could easily be unreadable, e.g. near-black on
 * the dark background) — constraining the choice up front
 * avoids that failure mode entirely.
 */
export const CATEGORY_COLORS: string[] = [
  '#10b981', // emerald
  '#3b82f6', // blue
  '#f59e0b', // amber
  '#ef4444', // red
  '#a855f7', // purple
  '#ec4899', // pink
  '#14b8a6', // teal
  '#94a3b8', // slate (neutral option)
];

/**
 * A couple of categories exist by default so the feature isn't
 * an empty, confusing list on first visit — but the user can
 * delete or rename these freely from Settings.
 */
export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'work', name: 'Work', color: CATEGORY_COLORS[1] },
  { id: 'life', name: 'Life', color: CATEGORY_COLORS[0] },
];