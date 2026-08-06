import type { Preset } from '../types';

/**
 * Presets as DATA, not hardcoded UI. Adding a fourth preset
 * later is a one-line addition here — the dropdown component
 * that renders these never needs to change.
 */
export const PRESETS: Preset[] = [
  {
    id: 'classic',
    label: 'Classic (25/5)',
    workDuration: 25 * 60,
    shortBreakDuration: 5 * 60,
    longBreakDuration: 15 * 60,
  },
  {
    id: 'deep-work',
    label: 'Deep Work (50/10)',
    workDuration: 50 * 60,
    shortBreakDuration: 10 * 60,
    longBreakDuration: 20 * 60,
  },
  {
    id: 'quick-sprint',
    label: 'Quick Sprint (15/3)',
    workDuration: 15 * 60,
    shortBreakDuration: 3 * 60,
    longBreakDuration: 10 * 60,
  },
];