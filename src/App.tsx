import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TimerProvider } from './context/TimerContext';
import { PanelsProvider } from './context/PanelsContext';
import { ThemeProvider } from './context/ThemesContext';
import Dashboard from './components/Layout/Dashboard';
import Settings from './components/Settings/Settings';

function App() {
  return (
    // ThemeProvider sits outermost — it manages document-level
    // CSS variables, not anything route-specific, so it doesn't
    // matter that it's above BrowserRouter; it just needs to be
    // a permanent ancestor of everything that renders themed colors.
    <ThemeProvider>
      <BrowserRouter>
        <TimerProvider>
          <PanelsProvider>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </PanelsProvider>
        </TimerProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;