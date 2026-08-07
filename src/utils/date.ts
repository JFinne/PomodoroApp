/**
 * All of these are pure functions — no state, no side effects —
 * which is exactly what you want for date math: same input
 * always produces the same output, easy to reason about and
 * (if you ever add tests) easy to test in isolation.
 */

/** Today's date as 'YYYY-MM-DD', in the LOCAL timezone. */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** 'HH:mm' → total minutes since midnight (e.g. '09:30' → 570). */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/** Total minutes since midnight → 'HH:mm' (e.g. 570 → '09:30'). */
export function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

/** Hour number (0–23) → a Google-Calendar-style label, e.g. 14 → '2 PM'. */
export function formatHourLabel(hour: number): string {
  const period = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour} ${period}`;
}