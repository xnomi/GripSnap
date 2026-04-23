import React from 'react';

type CharCounterProps = {
  current: number;
  max: number;
};

export default function CharCounter({ current, max }: CharCounterProps) {
  const percentage = Math.min(100, Math.round((current / max) * 100));
  const isOver = current > max;
  const isNear = percentage >= 90 && !isOver;

  // Circular progress math
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let colorClass = 'text-accent3';
  if (isOver) colorClass = 'text-red-500';
  else if (isNear) colorClass = 'text-accent2';

  return (
    <div className="flex items-center gap-3 bg-surface p-2 rounded-full border border-border">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <svg className="w-10 h-10 transform -rotate-90">
          <circle
            cx="20"
            cy="20"
            r={radius}
            className="stroke-surface2"
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="20"
            cy="20"
            r={radius}
            className={`stroke-current transition-all duration-300 ${colorClass}`}
            strokeWidth="3"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={isOver ? 0 : strokeDashoffset}
          />
        </svg>
      </div>
      <div className={`font-fira font-bold px-2 ${isOver ? 'text-red-500' : 'text-text'}`}>
        {current} <span className="text-muted font-normal">/ {max}</span>
      </div>
    </div>
  );
}
