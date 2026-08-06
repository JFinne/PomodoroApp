import type { ReactNode } from 'react';

interface CircularProgressProps {
  progress: number;
  viewBoxSize?: number;   // internal coordinate system size — affects stroke math only, NOT actual rendered size
  strokeWidth?: number;
  trackColor?: string;
  progressColor?: string;
  children?: ReactNode;
}

function CircularProgress({
  progress,
  viewBoxSize = 340,
  strokeWidth = 12,
  trackColor = '#1e293b',
  progressColor = '#10b981',
  children,
}: CircularProgressProps) {
  const radius = (viewBoxSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(1, Math.max(0, progress));
  const dashOffset = circumference * (1 - clampedProgress);

  return (
    // THE RESPONSIVE PART: actual rendered size is controlled
    // here, via Tailwind width classes that change per breakpoint,
    // combined with aspect-square to keep it a perfect circle at
    // any size. This div's real pixel size can be anything — the
    // SVG inside will scale to fill it because of viewBox (below),
    // without needing to touch any of the stroke-dashoffset math.
    <div className="relative w-[70vw] max-w-[220px] sm:max-w-[280px] lg:max-w-[340px] aspect-square mx-auto">
      {/* viewBox defines an internal coordinate system independent
          of the SVG's actual rendered pixel size. We draw the
          circle using viewBoxSize-based coordinates (same as
          before), and width="100%"/height="100%" tells the SVG to
          stretch that coordinate system to fill whatever size its
          parent div actually renders at — that's what makes the
          ring scale smoothly across breakpoints for free. */}
      <svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        width="100%"
        height="100%"
        className="-rotate-90"
      >
        <circle
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
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

      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export default CircularProgress;