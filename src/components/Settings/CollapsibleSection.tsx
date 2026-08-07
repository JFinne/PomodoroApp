import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

/**
 * Header label styling now matches the small uppercase,
 * tracked-out labels already used elsewhere in the app (e.g.
 * "TODAY" in DailyPlanner, "TO-DO" in TodoList) — Settings was
 * the one place still using a plain bold white heading, which
 * is what made it feel visually inconsistent with everything else.
 */
function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <span className="text-slate-400 text-xs font-medium uppercase tracking-wide group-hover:text-slate-300 transition-colors">
          {title}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-500 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-6 pb-6 pt-1 border-t border-slate-700/60">{children}</div>
      )}
    </div>
  );
}

export default CollapsibleSection;