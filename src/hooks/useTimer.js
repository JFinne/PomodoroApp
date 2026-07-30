import { useState, useRef, useEffect, useCallback } from 'react';

// Session types as constants, not raw strings scattered through
// the code. If you ever typo 'work' as 'wrok' somewhere, this
// approach catches it as an undefined variable instead of
// silently breaking your app.
export const SESSION_TYPES = {
  WORK: 'work',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
};

function useTimer({
  workDuration = 25 * 60,       // 25 minutes, stored in SECONDS
  shortBreakDuration = 5 * 60,  // 5 minutes
  longBreakDuration = 15 * 60,  // 15 minutes
  sessionsBeforeLongBreak = 4,  // classic Pomodoro: long break every 4th cycle
  onSessionComplete,            // optional callback, e.g. play a sound
} = {}) {
  
  // STATE: things that, when they change, should update the UI
  
  const [sessionType, setSessionType] = useState(SESSION_TYPES.WORK);
  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [completedWorkSessions, setCompletedWorkSessions] = useState(0);

  // REF: things that need to persist but should NOT trigger
  // a re-render when they change (see doc comment above)
  
  const intervalRef = useRef(null);

  // HELPER: how long should the CURRENT session type last?
  // Not stored in state because it's fully derived from
  // sessionType + the duration settings — no need to duplicate it.
  
  const getDurationForSession = useCallback(
    (type) => {
      switch (type) {
        case SESSION_TYPES.SHORT_BREAK:
          return shortBreakDuration;
        case SESSION_TYPES.LONG_BREAK:
          return longBreakDuration;
        case SESSION_TYPES.WORK:
        default:
          return workDuration;
      }
    },
    [workDuration, shortBreakDuration, longBreakDuration]
  );

  // THE TICKING LOGIC
  //
  // This effect starts/stops the interval whenever `isRunning`
  // changes. Note the CLEANUP FUNCTION (the `return () => ...`
  // at the bottom) — React runs this automatically before the
  // effect re-runs, or when the component unmounts. Without it,
  // you'd leak intervals every time this effect re-ran, and
  // you'd end up with multiple timers ticking at once. This
  // cleanup pattern is one of the most important things to
  // understand about useEffect.
  
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Time's up. Stop ticking down further this render;
          // handleSessionEnd (below) decides what happens next.
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup: runs when isRunning changes OR component unmounts
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // WHEN THE TIMER HITS ZERO
  //
  // Separate effect that WATCHES timeLeft, rather than trying
  // to cram this logic inside the interval callback above.
  // Keeping "what happens when time runs out" separate from
  // "how we count down" makes each effect do one clear job —
  // easier to read, easier to debug.
  
  useEffect(() => {
    if (timeLeft !== 0) return;

    setIsRunning(false); // stop the current session

    if (onSessionComplete) onSessionComplete(sessionType);

    if (sessionType === SESSION_TYPES.WORK) {
      const nextCompletedCount = completedWorkSessions + 1;
      setCompletedWorkSessions(nextCompletedCount);

      // Every 4th work session, take the LONG break instead of a short one
      const nextType =
        nextCompletedCount % sessionsBeforeLongBreak === 0
          ? SESSION_TYPES.LONG_BREAK
          : SESSION_TYPES.SHORT_BREAK;

      setSessionType(nextType);
      setTimeLeft(getDurationForSession(nextType));
    } else {
      // A break just ended — go back to a work session
      setSessionType(SESSION_TYPES.WORK);
      setTimeLeft(getDurationForSession(SESSION_TYPES.WORK));
    }
  }, [timeLeft]);

  // PUBLIC CONTROLS
  // These are the only things a component actually needs to
  // call. Everything above this is "private" implementation
  // detail the component never has to think about.

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(getDurationForSession(sessionType));
  }, [sessionType, getDurationForSession]);

  // Lets the user manually skip to a different session type
  // (e.g. a "skip break" button)
  const switchSession = useCallback(
    (type) => {
      setIsRunning(false);
      setSessionType(type);
      setTimeLeft(getDurationForSession(type));
    },
    [getDurationForSession]
  );

  // WHAT THE HOOK EXPOSES TO COMPONENTS

  return {
    timeLeft,               // seconds remaining, e.g. 1499
    sessionType,             // 'work' | 'shortBreak' | 'longBreak'
    isRunning,
    completedWorkSessions,
    start,
    pause,
    reset,
    switchSession,
  };
}

export default useTimer;