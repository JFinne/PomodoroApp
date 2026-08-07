import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-[var(--bg-card)] rounded-2xl shadow-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <span className="text-[var(--text-muted)] text-xs font-medium uppercase tracking-wide group-hover:text-[var(--text-secondary)] transition-colors">
          {title}
        </span>
        <ChevronDown
          size={16}
          className={`text-[var(--text-faint)] transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-6 pb-6 pt-1 border-t border-[var(--border)]">{children}</div>
      )}
    </div>
  );
}

export default CollapsibleSection;