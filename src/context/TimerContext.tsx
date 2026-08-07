import { createContext, useContext, type ReactNode } from 'react';
import useTimer, { type Durations } from '../hooks/useTimer';
import useLocalStorage from '../hooks/useLocalStorage';
import { PRESETS } from '../utils/presets';

type TimerContextValue = ReturnType<typeof useTimer>;

const TimerContext = createContext<TimerContextValue | undefined>(undefined);

function TimerProvider({ children }: { children: ReactNode }) {
  // The persisted source of truth is now the raw durations
  // themselves (in seconds), not a preset ID. This is simpler
  // than before: there's no lookup-by-ID step, and it naturally
  // supports fully custom values that don't match any named
  // preset at all.
  const [storedDurations, setStoredDurations] = useLocalStorage<Durations>(
    'timerDurations',
    {
      work: PRESETS[0].workDuration,
      shortBreak: PRESETS[0].shortBreakDuration,
      longBreak: PRESETS[0].longBreakDuration,
    }
  );

  const timer = useTimer({
    initialDurations: storedDurations,
    onSessionComplete: (finishedType) => {
      console.log(`${finishedType} session complete!`);
    },
  });

  // Wraps the hook's applyDurations so that changing durations
  // ALSO persists them — same two-step pattern as before
  // (update live state + save to storage), just simplified since
  // there's no preset ID to track alongside it anymore.
  function applyDurations(newDurations: Durations) {
    timer.applyDurations(newDurations);
    setStoredDurations(newDurations);
  }

  return (
    <TimerContext.Provider value={{ ...timer, applyDurations }}>
      {children}
    </TimerContext.Provider>
  );
}

function useTimerContext() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
}

export { TimerProvider, useTimerContext };