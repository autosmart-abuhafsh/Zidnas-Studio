import React from 'react';

interface BatikOrnamentProps {
  className?: string;
  variant?: 'kawung-divider' | 'kawung-corner' | 'gold-emblem';
}

/**
 * Subtle, contemporary Javanese Kawung geometric filigree ornament.
 * Designed as a measured editorial accent — never overwhelming the layout.
 */
export const BatikOrnament: React.FC<BatikOrnamentProps> = ({
  className = '',
  variant = 'kawung-divider',
}) => {
  if (variant === 'gold-emblem') {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className={`w-8 h-8 text-[#C5A15A] ${className}`}
      >
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.45"
        />
        <path
          d="M32 8 C38 20, 38 26, 32 32 C26 26, 26 20, 32 8 Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M32 56 C38 44, 38 38, 32 32 C26 38, 26 44, 32 56 Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M8 32 C20 26, 26 26, 32 32 C26 38, 20 38, 8 32 Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M56 32 C44 26, 38 26, 32 32 C38 38, 44 38, 56 32 Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="32" cy="32" r="3" fill="currentColor" />
      </svg>
    );
  }

  if (variant === 'kawung-corner') {
    return (
      <svg
        viewBox="0 0 120 120"
        fill="none"
        aria-hidden="true"
        className={`pointer-events-none select-none text-[#C5A15A] ${className}`}
      >
        <g stroke="currentColor" strokeWidth="1" opacity="0.28">
          <circle cx="30" cy="30" r="24" />
          <circle cx="30" cy="15" r="12" />
          <circle cx="30" cy="45" r="12" />
          <circle cx="15" cy="30" r="12" />
          <circle cx="45" cy="30" r="12" />
          <path d="M0 68 H68 V0" strokeDasharray="3 3" />
        </g>
      </svg>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-4 select-none ${className}`}
    >
      <span className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent to-[#C5A15A]/50" />
      <svg
        viewBox="0 0 36 36"
        fill="none"
        className="w-5 h-5 text-[#C5A15A] shrink-0"
      >
        <path
          d="M18 3 C22 10, 22 14, 18 18 C14 14, 14 10, 18 3 Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M18 33 C22 26, 22 22, 18 18 C14 22, 14 26, 18 33 Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M3 18 C10 14, 14 14, 18 18 C14 22, 10 22, 3 18 Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M33 18 C26 14, 22 14, 18 18 C22 22, 26 22, 33 18 Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="18" cy="18" r="2" fill="currentColor" />
      </svg>
      <span className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent to-[#C5A15A]/50" />
    </div>
  );
};
