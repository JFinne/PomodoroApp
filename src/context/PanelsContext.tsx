import { createContext, useContext, type ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface PanelsContextValue {
  openPanels: Record<string, boolean>;
  togglePanel: (key: string) => void;
}

const DEFAULT_OPEN_PANELS: Record<string, boolean> = {
  todo: true,
  timerManager: true,
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