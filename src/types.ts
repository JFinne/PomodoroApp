export interface Task {
  id: number;
  text: string;
  done: boolean;
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