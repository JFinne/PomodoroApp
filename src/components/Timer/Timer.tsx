import useTimer, { SESSION_TYPES } from '../../hooks/useTimer';
import { formatTime } from '../../utils/timeFormat';

function Timer() {
  const {
    timeLeft,
    sessionType,
    isRunning,
    completedWorkSessions,
    start,
    pause,
    reset,
    switchSession,
  } = useTimer({
    workDuration: 25 * 60,
    shortBreakDuration: 5 * 60,
    longBreakDuration: 15 * 60,
    onSessionComplete: (finishedType) => {
      console.log(`${finishedType} session complete!`);
    },
  });

  // Small derived lookup so the JSX below stays clean — maps
  // the internal sessionType value to what's actually displayed.
  const sessionLabels: Record<string, string> = {
    [SESSION_TYPES.WORK]: 'Focus Time',
    [SESSION_TYPES.SHORT_BREAK]: 'Short Break',
    [SESSION_TYPES.LONG_BREAK]: 'Long Break',
  };

  return (
    <div>
      <div className="bg-slate-800 rounded-2xl shadow-xl p-10 w-80 text-center">

        <h2 className="text-slate-400 text-sm font-medium uppercase tracking-wide mb-2">
          {sessionLabels[sessionType]}
        </h2>

        {/* This is the key swap: formatTime(timeLeft) instead of
            the hardcoded "25:00" string. */}
        <p className="text-white text-6xl font-bold tabular-nums mb-8">
          {formatTime(timeLeft)}
        </p>

        <p className="text-slate-500 text-xs mb-6">
          Completed today: {completedWorkSessions}
        </p>

        <div className="flex justify-center gap-3">
          {/* Swap Start/Pause based on isRunning, same pattern
              we discussed for TimerControls earlier. */}
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
          className="text-slate-500 hover:text-slate-300 text-xs mt-6 underline
                     transition-colors"
        >
          Skip to Break
        </button>
      </div>
    </div>
  );
}

export default Timer;