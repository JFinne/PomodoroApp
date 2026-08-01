import useLocalStorage from '../../hooks/useLocalStorage';

function Notes() {
  const [notes, setNotes] = useLocalStorage<string>('notes', '');

  return (
    <div className="bg-slate-800 rounded-2xl shadow-xl p-8 w-80">
      <h2 className="text-slate-400 text-sm font-medium uppercase tracking-wide mb-4">
        Notes
      </h2>

      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Jot down anything on your mind..."
        aria-label="Notes"
        rows={8}
        className="w-full bg-slate-900 text-white text-sm rounded-lg p-3
                   placeholder:text-slate-600 outline-none resize-none
                   focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
}

export default Notes;