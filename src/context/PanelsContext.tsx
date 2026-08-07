import { createContext, useContext, type ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

/**
 * ============================================================
 * PanelsContext.tsx
 * ============================================================
 * THE BUG THIS FIXES:
 * AddonSettings and Settings.tsx were each calling
 * useLocalStorage('openPanels', ...) independently. Each call
 * creates its OWN React state — they both read the same
 * starting value from disk, but from then on they're two
 * separate copies living in two separate components. Checking
 * the box in AddonSettings updated ITS copy and wrote to disk,
 * but Settings.tsx's copy had no way of knowing that happened —
 * React only re-renders a component when ITS OWN state changes,
 * not when some unrelated component's state (or localStorage
 * itself) changes elsewhere. That's why the Timer Manager
 * section only appeared after navigating away and back — a
 * remount forces a fresh read from disk.
 *
 * THE FIX:
 * Exactly the same idea as TimerContext: call the hook ONCE, in
 * a Provider, and have every component that needs this data
 * read from that ONE shared copy via context instead of
 * creating independent copies of their own. Now there's only
 * ever one openPanels state in the whole app, so every consumer
 * re-renders together, instantly, when it changes.
 * ============================================================
 */

interface PanelsContextValue {
  openPanels: Record<string, boolean>;
  togglePanel: (key: string) => void;
}

const DEFAULT_OPEN_PANELS: Record<string, boolean> = {
  todo: true,
  timerManager: true,
  dailyPlanner: true,
};

const PanelsContext = createContext<PanelsContextValue | undefined>(undefined);

function PanelsProvider({ children }: { children: ReactNode }) {
  const [openPanels, setOpenPanels] = useLocalStorage<Record<string, boolean>>(
    'openPanels',
    DEFAULT_OPEN_PANELS
  );

  function togglePanel(key: string) {
    setOpenPanels({ ...openPanels, [key]: !openPanels[key] });
  }

  return (
    <PanelsContext.Provider value={{ openPanels, togglePanel }}>
      {children}
    </PanelsContext.Provider>
  );
}

function usePanelsContext() {
  const context = useContext(PanelsContext);
  if (context === undefined) {
    throw new Error('usePanelsContext must be used within a PanelsProvider');
  }
  return context;
}

export { PanelsProvider, usePanelsContext };