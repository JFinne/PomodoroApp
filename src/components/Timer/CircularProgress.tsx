import type { ReactNode } from 'react';

interface CircularProgressProps {
  progress: number;    // 0 (empty) to 1 (full)
  size?: number;        // diameter in pixels
  strokeWidth?: number;
  trackColor?: string;
  progressColor?: string;
  children?: ReactNode;  // content rendered in the center (the time text)
}

function CircularProgress({
  progress,
  size = 320,
  strokeWidth = 12,
  trackColor = '#1e293b',   // slate-800
  progressColor = '#10b981', // emerald-500
  children,
}: CircularProgressProps) {
  // Radius has to account for stroke width, or the ring's edge
  // gets clipped by the SVG's own boundary.
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Clamp progress to [0, 1] defensively — a stray negative or
  // >1 value (e.g. from a bug elsewhere) would otherwise draw a
  // visually broken ring instead of just capping sensibly.
  const clampedProgress = Math.min(1, Math.max(0, progress));
  const dashOffset = circumference * (1 - clampedProgress);

  return (
    // relative positioning lets us absolutely-center the
    // children (time text) directly on top of the SVG ring.
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track: the full, dim background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress: drawn on top, animates via dashoffset */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>

      {/* Centered content sits in a separate absolutely-positioned
          div, layered on top of the SVG via the parent's `relative`. */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export default CircularProgress;