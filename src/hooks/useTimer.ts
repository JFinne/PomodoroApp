import { useState, useRef, useEffect, useCallback } from 'react';

export type SessionType = 'work' | 'shortBreak' | 'longBreak';

export const SESSION_TYPES: Record<string, SessionType> = {
  WORK: 'work',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
};

export interface Durations {
  work: number;       // seconds
  shortBreak: number;
  longBreak: number;
}

interface UseTimerConfig {
  initialDurations: Durations;
  sessionsBeforeLongBreak?: number;
  onSessionComplete?: (sessionType: SessionType) => void;
}

interface UseTimerReturn {
  timeLeft: number;
  totalDuration: number;
  durations: Durations;         // current active durations, so a settings form can read starting values
  sessionType: SessionType;
  isRunning: boolean;
  completedWorkSessions: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  switchSession: (type: SessionType) => void;
  applyDurations: (durations: Durations) => void;
}

function useTimer({
  initialDurations,
  sessionsBeforeLongBreak = 4,
  onSessionComplete,
}: UseTimerConfig): UseTimerReturn {
  const [durations, setDurations] = useState<Durations>(initialDurations);
  const [sessionType, setSessionType] = useState<SessionType>(SESSION_TYPES.WORK);
  const [timeLeft, setTimeLeft] = useState<number>(initialDurations.work);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedWorkSessions, setCompletedWorkSessions] = useState<number>(0);

  const intervalRef = useRef<number | null>(null);

  const getDurationForSession = useCallback(
    (type: SessionType): number => {
      switch (type) {
        case SESSION_TYPES.SHORT_BREAK:
          return durations.shortBreak;
        case SESSION_TYPES.LONG_BREAK:
          return durations.longBreak;
        case SESSION_TYPES.WORK:
        default:
          return durations.work;
      }
    },
    [durations]
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

  // Renamed from applyPreset — this hook no longer has any
  // concept of "presets," just raw duration values. Whatever
  // decides what those values ARE (a named preset, a custom
  // form) is the caller's concern now, not this hook's.
  const applyDurations = useCallback((newDurations: Durations) => {
    setIsRunning(false);
    setDurations(newDurations);
    setSessionType(SESSION_TYPES.WORK);
    setTimeLeft(newDurations.work);
  }, []);

  const totalDuration = getDurationForSession(sessionType);

  return {
    timeLeft,
    totalDuration,
    durations,
    sessionType,
    isRunning,
    completedWorkSessions,
    start,
    pause,
    reset,
    switchSession,
    applyDurations,
  };
}

export default useTimer;