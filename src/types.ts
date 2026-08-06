export interface Task {
  id: number;
  text: string;
  done: boolean;
  categoryId?: string; // optional — a task doesn't require a category
}

export interface Category {
  id: string;
  name: string;
  color: string; // hex value, e.g. '#10b981'
}

export interface Preset {
  id: string;
  label: string;
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}

export interface AddonConfig {
  key: string;
  label: string;
}