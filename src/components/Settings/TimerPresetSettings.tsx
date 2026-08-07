import { useState } from 'react';
import { useTimerContext } from '../../context/TimerContext';
import { PRESETS } from '../../utils/presets';
import type { Durations } from '../../hooks/useTimer';

const SECONDS_PER_MINUTE = 60;
const MAX_MINUTES = 180;

function TimerPresetSettings() {
  const { durations, applyDurations } = useTimerContext();

  const [work, setWork] = useState(String(durations.work / SECONDS_PER_MINUTE));
  const [shortBreak, setShortBreak] = useState(String(durations.shortBreak / SECONDS_PER_MINUTE));
  const [longBreak, setLongBreak] = useState(String(durations.longBreak / SECONDS_PER_MINUTE));
  const [error, setError] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState(false);

  function handlePresetFill(event: React.ChangeEvent<HTMLSelectElement>) {
    const preset = PRESETS.find((p) => p.id === event.target.value);
    if (!preset) return;

    setWork(String(preset.workDuration / SECONDS_PER_MINUTE));
    setShortBreak(String(preset.shortBreakDuration / SECONDS_PER_MINUTE));
    setLongBreak(String(preset.longBreakDuration / SECONDS_PER_MINUTE));
    setError(null);
    setSavedMessage(false);
  }

  function validate(workMin: number, shortMin: number, longMin: number): string | null {
    if ([workMin, shortMin, longMin].some((n) => Number.isNaN(n))) {
      return 'All fields must be valid numbers.';
    }
    if ([workMin, shortMin, longMin].some((n) => n < 1)) {
      return 'Durations must be at least 1 minute.';
    }
    if ([workMin, shortMin, longMin].some((n) => n > MAX_MINUTES)) {
      return `Durations can't exceed ${MAX_MINUTES} minutes.`;
    }
    if (shortMin >= workMin) {
      return 'Short break must be shorter than your work session.';
    }
    if (longMin >= workMin) {
      return 'Long break must be shorter than your work session.';
    }
    if (longMin <= shortMin) {
      return 'Long break must be longer than your short break.';
    }
    return null;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const workMin = parseFloat(work);
    const shortMin = parseFloat(shortBreak);
    const longMin = parseFloat(longBreak);

    const validationError = validate(workMin, shortMin, longMin);
    if (validationError) {
      setError(validationError);
      setSavedMessage(false);
      return;
    }

    const newDurations: Durations = {
      work: workMin * SECONDS_PER_MINUTE,
      shortBreak: shortMin * SECONDS_PER_MINUTE,
      longBreak: longMin * SECONDS_PER_MINUTE,
    };

    applyDurations(newDurations);
    setError(null);
    setSavedMessage(true);
  }

  return (
    <div>
      <h3 className="text-white text-sm font-semibold mb-1">Timer Manager</h3>
      <p className="text-slate-500 text-xs mb-4">
        Set your own work and break durations, or start from a preset.
      </p>

      <div className="mb-4">
        <label className="text-slate-400 text-xs block mb-1">
          Not sure? Try some presets.
        </label>
        <select
          onChange={handlePresetFill}
          defaultValue=""
          aria-label="Fill fields from a preset"
          className="w-full bg-slate-900 text-slate-300 text-sm rounded-lg px-3 py-2
                     outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
        >
          <option value="" disabled>
            Choose a preset to fill in the fields below...
          </option>
          {PRESETS.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.label}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="text-slate-400 text-xs block mb-1" htmlFor="work-minutes">
            Work (minutes)
          </label>
          <input
            id="work-minutes"
            type="number"
            min={1}
            value={work}
            onChange={(event) => {
              setWork(event.target.value);
              setSavedMessage(false);
            }}
            className="w-full bg-slate-900 text-white text-sm rounded-lg px-3 py-2
                       outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="text-slate-400 text-xs block mb-1" htmlFor="short-break-minutes">
            Short Break (minutes)
          </label>
          <input
            id="short-break-minutes"
            type="number"
            min={1}
            value={shortBreak}
            onChange={(event) => {
              setShortBreak(event.target.value);
              setSavedMessage(false);
            }}
            className="w-full bg-slate-900 text-white text-sm rounded-lg px-3 py-2
                       outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="text-slate-400 text-xs block mb-1" htmlFor="long-break-minutes">
            Long Break (minutes)
          </label>
          <input
            id="long-break-minutes"
            type="number"
            min={1}
            value={longBreak}
            onChange={(event) => {
              setLongBreak(event.target.value);
              setSavedMessage(false);
            }}
            className="w-full bg-slate-900 text-white text-sm rounded-lg px-3 py-2
                       outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {error && (
          <p role="alert" className="text-red-400 text-xs">
            {error}
          </p>
        )}

        {savedMessage && !error && (
          <p className="text-emerald-400 text-xs">Saved! Your timer has been updated.</p>
        )}

        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm
                     font-semibold px-4 py-2 rounded-lg transition-colors self-start"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default TimerPresetSettings;