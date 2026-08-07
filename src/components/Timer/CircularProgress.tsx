import type { ReactNode } from 'react';

interface CircularProgressProps {
  progress: number;
  viewBoxSize?: number;
  strokeWidth?: number;
  trackColor?: string;
  progressColor?: string;
  children?: ReactNode;
}

function CircularProgress({
  progress,
  viewBoxSize = 340,
  strokeWidth = 12,
  trackColor = 'var(--border)',
  progressColor = 'var(--accent)',
  children,
}: CircularProgressProps) {
  const radius = (viewBoxSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(1, Math.max(0, progress));
  const dashOffset = circumference * (1 - clampedProgress);

  return (
    <div className="relative w-[70vw] max-w-[220px] sm:max-w-[280px] lg:max-w-[340px] aspect-square mx-auto">
      <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} width="100%" height="100%" className="-rotate-90">
        {/* Colors set via the `style` prop rather than the raw
            `stroke` attribute — CSS custom properties (var())
            resolve reliably through inline styles, which isn't
            guaranteed for SVG presentation attributes in every
            browser. This is the one place in the app where that
            distinction actually matters. */}
        <circle
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          style={{ stroke: trackColor }}
        />
        <circle
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ stroke: progressColor, transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export default CircularProgress;