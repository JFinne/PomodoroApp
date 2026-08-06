import { useState, useRef, useEffect, useCallback } from 'react';
import type { Preset } from '../types';

export type SessionType = 'work' | 'shortBreak' | 'longBreak';

export const SESSION_TYPES: Record<string, SessionType> = {
  WORK: 'work',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
};

/**
 * Durations now live in their OWN state object, separate from
 * everything else. This is the change that makes preset
 * switching possible: in the previous version, workDuration
 * etc. were just parameters captured once when the hook first
 * ran — there was no way to change them afterward. Now they're
 * real state, so applyPreset() can update them at any time, and
 * every calculation that depends on them (getDurationForSession)
 * automatically picks up the new values on the next render.
 */
interface Durations {
  work: number;
  shortBreak: number;
  longBreak: number;
}

interface UseTimerConfig {
  initialPreset: Preset;
  sessionsBeforeLongBreak?: number;
  onSessionComplete?: (sessionType: SessionType) => void;
}

interface UseTimerReturn {
  timeLeft: number;
  totalDuration: number;      // duration of the CURRENT session type — needed for the progress ring's math
  sessionType: SessionType;
  isRunning: boolean;
  completedWorkSessions: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  switchSession: (type: SessionType) => void;
  applyPreset: (preset: Preset) => void;
}

function useTimer({
  initialPreset,
  sessionsBeforeLongBreak = 4,
  onSessionComplete,
}: UseTimerConfig): UseTimerReturn {
  const [durations, setDurations] = useState<Durations>({
    work: initialPreset.workDuration,
    shortBreak: initialPreset.shortBreakDuration,
    longBreak: initialPreset.longBreakDuration,
  });

  const [sessionType, setSessionType] = useState<SessionType>(SESSION_TYPES.WORK);
  const [timeLeft, setTimeLeft] = useState<number>(initialPreset.workDuration);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedWorkSessions, setCompletedWorkSessions] = useState<number>(0);

  const intervalRef = useRef<number | null>(null);

  // Now reads from `durations` STATE instead of fixed params,
  // so it always reflects whatever preset is currently active.
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

  /**
   * Switching presets always resets to a fresh WORK session
   * rather than trying to preserve progress in whatever session
   * was active — mixing "3 minutes left of a 25-minute session"
   * with a switch to the 50-minute preset doesn't have a
   * sensible meaning, so we just start clean.
   */
  const applyPreset = useCallback((preset: Preset) => {
    setIsRunning(false);
    setDurations({
      work: preset.workDuration,
      shortBreak: preset.shortBreakDuration,
      longBreak: preset.longBreakDuration,
    });
    setSessionType(SESSION_TYPES.WORK);
    setTimeLeft(preset.workDuration);
  }, []);

  const totalDuration = getDurationForSession(sessionType);

  return {
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
  };
}

export default useTimer;