import { useState, useEffect } from 'react';

function useLocalStorage(key, defaultValue) {
  
  // STEP 1: Initialize state.
  //
  // We pass a FUNCTION to useState (not a value directly).
  // This is called "lazy initialization" — React only runs
  // this function ONCE, on the component's first render.
  //
  // Why does that matter? Reading from localStorage is
  // slightly "expensive" (it's I/O, not pure JS). If we didn't
  // use a function here, this read would happen on EVERY
  // re-render, which is wasteful.
  
  const [value, setValue] = useState(() => {
    try {
      // localStorage only stores strings, so anything we saved
      // was JSON.stringify'd first. We need to parse it back
      // into a real JS object/array/etc.
      const storedValue = window.localStorage.getItem(key);

      // If nothing was stored yet (first-ever visit), fall back
      // to whatever default the component asked for.
      return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      // This can fail if, e.g., localStorage is disabled
      // (some private browsing modes) or the stored data is
      // corrupted/not valid JSON. We fail safely by just
      // using the default instead of crashing the whole app.
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  // STEP 2: Keep localStorage in sync whenever `value` changes.
  //
  // useEffect runs AFTER React renders. By listing `value` and
  // `key` in the dependency array, this effect re-runs only
  // when one of those actually changes — not on every render.
  
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error);
    }
  }, [key, value]);

  // STEP 3: Return the same shape useState does.
  //
  // This is WHY components can use this hook as a drop-in
  // replacement for useState — same [value, setter] pattern.
  
  return [value, setValue];
}

export default useLocalStorage;