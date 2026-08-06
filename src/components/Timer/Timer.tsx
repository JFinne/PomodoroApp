import useTimer, { SESSION_TYPES } from '../../hooks/useTimer';
import { formatTime } from '../../utils/timeFormat';
import { PRESETS } from '../../utils/presets';
import CircularProgress from './CircularProgress';

const sessionLabels: Record<string, string> = {
  [SESSION_TYPES.WORK]: 'Focus Time',
  [SESSION_TYPES.SHORT_BREAK]: 'Short Break',
  [SESSION_TYPES.LONG_BREAK]: 'Long Break',
};

function Timer() {
  const {
    timeLeft,
    totalDuration,
    sessionType,
    isRunning,
    completedWorkSessions,
    start,
    pause,
    reset,
    switchSession,
    applyPreset,
  } = useTimer({
    initialPreset: PRESETS[0],
    onSessionComplete: (finishedType) => {
      console.log(`${finishedType} session complete!`);
    },
  });

  // The ring drains as time passes, so progress should shrink
  // as timeLeft shrinks — timeLeft / totalDuration gives exactly
  // that: 1 at the start of a session, 0 right at the end.
  const progress = timeLeft / totalDuration;

  function handlePresetChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selected = PRESETS.find((preset) => preset.id === event.target.value);
    if (selected) applyPreset(selected);
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Preset dropdown sits above the ring */}
      <select
        onChange={handlePresetChange}
        defaultValue={PRESETS[0].id}
        aria-label="Choose a timer preset"
        className="bg-slate-800 text-slate-300 text-sm rounded-lg px-3 py-2
                   outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
      >
        {PRESETS.map((preset) => (
          <option key={preset.id} value={preset.id}>
            {preset.label}
          </option>
        ))}
      </select>

      <CircularProgress progress={progress} size={340} strokeWidth={14}>
        <div className="flex flex-col items-center">
          <span className="text-slate-400 text-sm font-medium uppercase tracking-wide mb-2">
            {sessionLabels[sessionType]}
          </span>
          <span className="text-white text-6xl font-bold tabular-nums">
            {formatTime(timeLeft)}
          </span>
          <span className="text-slate-500 text-xs mt-3">
            Completed today: {completedWorkSessions}
          </span>
        </div>
      </CircularProgress>

      <div className="flex justify-center gap-3">
        {isRunning ? (
          <button
            onClick={pause}
            className="bg-amber-500 hover:bg-amber-400 text-white font-semibold
                       px-6 py-2 rounded-lg transition-colors"
          >
            Pause
          </button>
        ) : (
          <button
            onClick={start}
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold
                       px-6 py-2 rounded-lg transition-colors"
          >
            Start
          </button>
        )}

        <button
          onClick={reset}
          className="bg-slate-700 hover:bg-slate-600 text-white font-semibold
                     px-6 py-2 rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>

      <button
        onClick={() => switchSession(SESSION_TYPES.SHORT_BREAK)}
        className="text-slate-500 hover:text-slate-300 text-xs underline transition-colors"
      >
        Skip to Break
      </button>
    </div>
  );
}

export default Timer;