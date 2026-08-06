import { createContext, useContext, type ReactNode } from 'react';
import useTimer from '../hooks/useTimer';
import { PRESETS } from '../utils/presets';

const TimerContext = createContext<ReturnType<typeof useTimer> | undefined>(undefined);

function TimerProvider({ children }: { children: ReactNode }) {
  // This is the ONLY place useTimer() gets called now — the
  // single source of truth, positioned high enough in the tree
  // to survive route changes.
  const timer = useTimer({
    initialPreset: PRESETS[0],
    onSessionComplete: (finishedType) => {
      console.log(`${finishedType} session complete!`);
    },
  });

  return <TimerContext.Provider value={timer}>{children}</TimerContext.Provider>;
}

function useTimerContext() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
}

export { TimerProvider, useTimerContext };