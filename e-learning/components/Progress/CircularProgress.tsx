import React from 'react'

function CircularProgress({ percentage }: { percentage: number }) {
  return (
    <div className="relative md:size-16 size-12"> {/* Reduce the size from size-40 */}
      <svg className="rotate-[118deg] size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        {/* Background Circle (Gauge) */}
        <circle
          cx="18"
          cy="18"
          r="14"
          fill="none"
          className="stroke-current text-gray-200 dark:text-neutral-700"
          strokeWidth="2"
          strokeDasharray="75 100"
          strokeLinecap="round"
        />
        {/* Gauge Progress */}
        <circle
          cx="18"
          cy="18"
          r="14"
          fill="none"
          className="stroke-current text-purple-500 dark:text-purple-500"
          strokeWidth="2"
          strokeDasharray={`${percentage} 100`}
          strokeLinecap="round"
        />
      </svg>

      {/* Value Text */}
      <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="max-sm:text-xs font-bold text-purple-500 dark:text-purple-500">{percentage}%</span> {/* Reduce text size */}
      </div>
    </div>
  );
}

export default CircularProgress;
