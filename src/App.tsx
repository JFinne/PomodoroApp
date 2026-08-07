import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TimerProvider } from './context/TimerContext';
import { PanelsProvider } from './context/PanelsContext';
import Dashboard from './components/Layout/Dashboard';
import Settings from './components/Settings/Settings';

function App() {
  return (
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
  );
}

export default App;