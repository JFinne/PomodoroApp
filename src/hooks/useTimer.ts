import { useState, useRef, useEffect, useCallback } from 'react';

// A union type: sessionType can ONLY ever be one of these three
// exact strings. If you typo 'WROK' anywhere, TypeScript flags
// it immediately, at write-time, instead of you discovering the
// bug at runtime when the timer silently doesn't switch modes.
export type SessionType = 'work' | 'shortBreak' | 'longBreak';

export const SESSION_TYPES: Record<string, SessionType> = {
  WORK: 'work',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
};

// The shape of the config object useTimer accepts. Every field
// is optional (the `?`) because we provide defaults below —
// TypeScript enforces that if you DO pass a value, it has to be
// the right type (e.g. workDuration must be a number, not a string).
interface UseTimerConfig {
  workDuration?: number;
  shortBreakDuration?: number;
  longBreakDuration?: number;
  sessionsBeforeLongBreak?: number;
  onSessionComplete?: (sessionType: SessionType) => void;
}

// The shape of what the hook returns. Writing this out explicitly
// means any component using this hook gets autocomplete AND
// type-checking on timeLeft, start, pause, etc. — your editor
// will warn you if you try to call start() with an argument, for
// instance, since start takes none.
interface UseTimerReturn {
  timeLeft: number;
  sessionType: SessionType;
  isRunning: boolean;
  completedWorkSessions: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  switchSession: (type: SessionType) => void;
}

function useTimer({
  workDuration = 25 * 60,
  shortBreakDuration = 5 * 60,
  longBreakDuration = 15 * 60,
  sessionsBeforeLongBreak = 4,
  onSessionComplete,
}: UseTimerConfig = {}): UseTimerReturn {
  const [sessionType, setSessionType] = useState<SessionType>(SESSION_TYPES.WORK);
  const [timeLeft, setTimeLeft] = useState<number>(workDuration);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedWorkSessions, setCompletedWorkSessions] = useState<number>(0);

  // useRef needs a type argument for what it'll hold. Since
  // setInterval in the browser returns a `number` (a numeric
  // timer ID), and the ref starts out holding nothing, we type
  // it as number | null and initialize with null.
  const intervalRef = useRef<number | null>(null);

  const getDurationForSession = useCallback(
    (type: SessionType): number => {
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

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prevTime) => (prevTime <= 1 ? 0 : prevTime - 1));
    }, 1000);

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft !== 0) return;

    setIsRunning(false);

    if (onSessionComplete) onSessionComplete(sessionType);

    if (sessionType === SESSION_TYPES.WORK) {
      const nextCompletedCount = completedWorkSessions + 1;
      setCompletedWorkSessions(nextCompletedCount);

      const nextType: SessionType =
        nextCompletedCount % sessionsBeforeLongBreak === 0
          ? SESSION_TYPES.LONG_BREAK
          : SESSION_TYPES.SHORT_BREAK;

      setSessionType(nextType);
      setTimeLeft(getDurationForSession(nextType));
    } else {
      setSessionType(SESSION_TYPES.WORK);
      setTimeLeft(getDurationForSession(SESSION_TYPES.WORK));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(getDurationForSession(sessionType));
  }, [sessionType, getDurationForSession]);

  const switchSession = useCallback(
    (type: SessionType) => {
      setIsRunning(false);
      setSessionType(type);
      setTimeLeft(getDurationForSession(type));
    },
    [getDurationForSession]
  );

  return {
    timeLeft,
    sessionType,
    isRunning,
    completedWorkSessions,
    start,
    pause,
    reset,
    switchSession,
  };
}

export default useTimer;