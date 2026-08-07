export interface Task {
  id: number;
  text: string;
  done: boolean;
  categoryId?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
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

export interface CalendarEvent {
  id: string;
  date: string;      // 'YYYY-MM-DD'
  title: string;
  startTime: string; // 'HH:mm'
  endTime: string;   // 'HH:mm'
  color: string;
}