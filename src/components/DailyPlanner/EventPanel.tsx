import { useState, useEffect } from 'react';
import { CATEGORY_COLORS } from '../../utils/categories';
import { minutesToTime } from '../../utils/date';
import type { CalendarEvent } from '../../types';

interface EventPanelProps {
  isOpen: boolean;
  editingEvent: CalendarEvent | null;
  initialStartMinutes?: number;
  onSave: (eventData: Omit<CalendarEvent, 'id' | 'date'>) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

function EventPanel({ isOpen, editingEvent, initialStartMinutes, onSave, onDelete, onClose }: EventPanelProps) {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [color, setColor] = useState(CATEGORY_COLORS[0]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    if (editingEvent) {
      setTitle(editingEvent.title);
      setStartTime(editingEvent.startTime);
      setEndTime(editingEvent.endTime);
      setColor(editingEvent.color);
    } else {
      const start = initialStartMinutes ?? 9 * 60;
      setTitle('');
      setStartTime(minutesToTime(start));
      setEndTime(minutesToTime(start + 60));
      setColor(CATEGORY_COLORS[0]);
    }
    setError(null);
  }, [isOpen, editingEvent, initialStartMinutes]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (title.trim() === '') {
      setError('Give your event a title.');
      return;
    }
    if (endTime <= startTime) {
      setError('End time must be after start time.');
      return;
    }
    onSave({ title: title.trim(), startTime, endTime, color });
  }

  return (
    <>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 z-40" aria-hidden="true" />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-xs bg-[var(--bg-card)] shadow-2xl z-50 p-6
                    overflow-y-auto transition-transform duration-300 ${
                      isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[var(--text-primary)] text-sm font-semibold">
            {editingEvent ? 'Edit Event' : 'New Event'}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close panel"
            className="text-[var(--text-faint)] hover:text-[var(--text-secondary)] text-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[var(--text-muted)] text-xs block mb-1" htmlFor="event-title">
              Title
            </label>
            <input
              id="event-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Event title..."
              className="w-full bg-[var(--bg-input)] text-[var(--text-primary)] text-sm rounded-lg px-3 py-2
                         outline-none focus:ring-2 focus:ring-[var(--accent)] border border-[var(--border)]"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-[var(--text-muted)] text-xs block mb-1" htmlFor="event-start">
                Start
              </label>
              <input
                id="event-start"
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className="w-full bg-[var(--bg-input)] text-[var(--text-primary)] text-sm rounded-lg px-3 py-2
                           outline-none focus:ring-2 focus:ring-[var(--accent)] border border-[var(--border)]"
              />
            </div>
            <div className="flex-1">
              <label className="text-[var(--text-muted)] text-xs block mb-1" htmlFor="event-end">
                End
              </label>
              <input
                id="event-end"
                type="time"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                className="w-full bg-[var(--bg-input)] text-[var(--text-primary)] text-sm rounded-lg px-3 py-2
                           outline-none focus:ring-2 focus:ring-[var(--accent)] border border-[var(--border)]"
              />
            </div>
          </div>

          <div>
            <label className="text-[var(--text-muted)] text-xs block mb-1">Color</label>
            <div className="flex gap-2 flex-wrap">
              {CATEGORY_COLORS.map((swatch) => (
                <button
                  key={swatch}
                  type="button"
                  onClick={() => setColor(swatch)}
                  aria-label={`Select color ${swatch}`}
                  aria-pressed={color === swatch}
                  className={`w-6 h-6 rounded-full transition-transform ${
                    color === swatch ? 'ring-2 ring-white ring-offset-2 ring-offset-[var(--bg-card)] scale-110' : ''
                  }`}
                  style={{ backgroundColor: swatch }}
                />
              ))}
            </div>
          </div>

          {error && (
            <p role="alert" className="text-red-400 text-xs">
              {error}
            </p>
          )}

          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="flex-1 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm
                         font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Save
            </button>
            {editingEvent && (
              <button
                type="button"
                onClick={() => onDelete(editingEvent.id)}
                className="text-red-400 hover:text-red-300 text-sm font-semibold px-4 py-2
                           rounded-lg transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default EventPanel;