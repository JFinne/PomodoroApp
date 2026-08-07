import { useState, useRef, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import type { CalendarEvent } from '../../types';
import { getTodayDateString, timeToMinutes, formatHourLabel } from '../../utils/date';
import EventPanel from './EventPanel';

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const HOUR_HEIGHT = 60;

interface PanelState {
  isOpen: boolean;
  editingEvent: CalendarEvent | null;
  initialStartMinutes?: number;
}

function DailyPlanner() {
  const today = getTodayDateString();
  const [events, setEvents] = useLocalStorage<CalendarEvent[]>('calendarEvents', []);
  const [panel, setPanel] = useState<PanelState>({ isOpen: false, editingEvent: null });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 7 * HOUR_HEIGHT;
    }
  }, []);

  const todaysEvents = events.filter((event) => event.date === today);

  function openCreatePanel(hour: number) {
    setPanel({ isOpen: true, editingEvent: null, initialStartMinutes: hour * 60 });
  }

  function openEditPanel(event: CalendarEvent) {
    setPanel({ isOpen: true, editingEvent: event });
  }

  function closePanel() {
    setPanel({ isOpen: false, editingEvent: null });
  }

  function saveEvent(eventData: Omit<CalendarEvent, 'id' | 'date'>) {
    if (panel.editingEvent) {
      const editingId = panel.editingEvent.id;
      setEvents(events.map((event) => (event.id === editingId ? { ...event, ...eventData } : event)));
    } else {
      setEvents([...events, { id: crypto.randomUUID(), date: today, ...eventData }]);
    }
    closePanel();
  }

  function deleteEvent(id: string) {
    setEvents(events.filter((event) => event.id !== id));
    closePanel();
  }

  return (
    <div className="bg-[var(--bg-card)] rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-[28rem]">
      <h2 className="text-[var(--text-muted)] text-sm font-medium uppercase tracking-wide mb-4">
        Today
      </h2>

      <div
        ref={scrollRef}
        className="relative max-h-[420px] overflow-y-auto rounded-lg border border-[var(--border)]"
      >
        <div className="relative" style={{ height: HOURS.length * HOUR_HEIGHT }}>
          {HOURS.map((hour) => (
            <button
              key={hour}
              onClick={() => openCreatePanel(hour)}
              aria-label={`Add event at ${formatHourLabel(hour)}`}
              className="absolute left-0 w-full flex items-start gap-2 text-left hover:bg-[var(--overlay)] transition-colors"
              style={{ top: hour * HOUR_HEIGHT, height: HOUR_HEIGHT }}
            >
              <span className="text-[var(--text-faint)] text-[10px] w-12 shrink-0 pt-0.5 pl-2">
                {formatHourLabel(hour)}
              </span>
              <span className="flex-1 border-t border-[var(--border)]" />
            </button>
          ))}

          {todaysEvents.map((event) => {
            const startMinutes = timeToMinutes(event.startTime);
            const endMinutes = timeToMinutes(event.endTime);

            return (
              <button
                key={event.id}
                onClick={(clickEvent) => {
                  clickEvent.stopPropagation();
                  openEditPanel(event);
                }}
                className="absolute left-14 right-2 rounded-md px-2 py-1 text-left text-xs
                           font-medium text-slate-900 overflow-hidden"
                style={{
                  top: startMinutes,
                  height: Math.max(endMinutes - startMinutes, 18),
                  backgroundColor: event.color,
                }}
              >
                {event.title}
              </button>
            );
          })}
        </div>
      </div>

      <EventPanel
        isOpen={panel.isOpen}
        editingEvent={panel.editingEvent}
        initialStartMinutes={panel.initialStartMinutes}
        onSave={saveEvent}
        onDelete={deleteEvent}
        onClose={closePanel}
      />
    </div>
  );
}

export default DailyPlanner;