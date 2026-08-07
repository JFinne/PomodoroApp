import { useTimerContext } from '../../context/TimerContext';
import { SESSION_TYPES } from '../../hooks/useTimer';
import { formatTime } from '../../utils/timeFormat';
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
  } = useTimerContext();

  const progress = timeLeft / totalDuration;

  // The preset dropdown that used to live here is gone — preset
  // selection now happens in Settings via TimerPresetSettings.tsx,
  // which calls selectPreset() from the same TimerContext this
  // component reads from. Both stay in sync automatically since
  // they share one source of truth.
  return (
    <div className="flex flex-col items-center gap-6">
      <CircularProgress progress={progress} viewBoxSize={340} strokeWidth={14}>
        <div className="flex flex-col items-center px-2">
          <span className="text-slate-400 text-xs sm:text-sm font-medium uppercase tracking-wide mb-1 sm:mb-2 text-center">
            {sessionLabels[sessionType]}
          </span>
          <span className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold tabular-nums">
            {formatTime(timeLeft)}
          </span>
          <span className="text-slate-500 text-[10px] sm:text-xs mt-2 sm:mt-3 text-center">
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