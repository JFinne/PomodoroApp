/**
 * Converts raw seconds (e.g. 1499) into a "MM:SS" display
 * string (e.g. "24:59"). Kept as a standalone, pure function —
 * no state, no side effects — so it's trivially reusable and
 * easy to unit test on its own if you ever add tests.
 */
export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // padStart(2, '0') ensures single digits display as "05"
  // instead of "5" — keeps the display width consistent.
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  return `${paddedMinutes}:${paddedSeconds}`;
}