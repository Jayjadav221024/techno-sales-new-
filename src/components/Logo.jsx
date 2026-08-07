import { useId } from 'react';
import './Logo.css';

export default function Logo({ showText = true, className = "", style = {} }) {
  // Two Logos render per page (navbar + footer). Without unique ids both
  // <defs> collide and every url(#...) resolves to whichever mounted first.
  const gradientId = `logo-grad-${useId().replace(/:/g, '')}`;

  return (
    <div className={`brand-logo-container ${className}`} style={style}>
      {/* Animated SVG Symbol — decorative, the wordmark beside it carries the name */}
      <svg
        className="logo-symbol-svg"
        viewBox="0 0 100 100"
        width="42"
        height="42"
        fill="none"
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-400)" />
            <stop offset="100%" stopColor="var(--color-brand-500)" />
          </linearGradient>
        </defs>

        {/* Left Wing / Arrow. pathLength normalises the geometry to 100 units so
            the draw-in dash maths is exact regardless of the curve's real length. */}
        <path
          className="logo-arrow-left"
          pathLength="100"
          d="M 50 82
             C 32 82, 18 68, 18 50
             C 18 36, 26 24, 38 20
             L 36 28
             M 38 20
             L 28 18"
          stroke={`url(#${gradientId})`}
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Wing / Arrow */}
        <path
          className="logo-arrow-right"
          pathLength="100"
          d="M 50 82
             C 68 82, 82 68, 82 50
             C 82 36, 74 24, 62 20
             L 64 28
             M 62 20
             L 72 18"
          stroke={`url(#${gradientId})`}
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Center Tech Core (Small glowing dot in middle) */}
        <circle
          cx="50"
          cy="50"
          r="6"
          fill="var(--color-brand-400)"
          className="logo-core"
        />
      </svg>

      {showText && (
        <div className="logo-text-wrapper">
          <span className="logo-text-techno">TECHNO</span>
          <span className="logo-text-sales">SALES</span>
          <span className="logo-text-sub">INDUSTRIAL SOLUTIONS</span>
        </div>
      )}
    </div>
  );
}
