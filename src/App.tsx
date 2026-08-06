import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Layout/Dashboard';
import Settings from './components/Settings/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;