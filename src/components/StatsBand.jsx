import { useRef, useEffect, useCallback } from 'react';
import { MILESTONES } from '../data/site';

const MAX_TILT = 9;      // degrees
const COUNT_MS = 1600;   // count-up duration

/**
 * Split "8,000+" into { prefix: '', target: 8000, suffix: '+', grouped: true }
 * so the count-up can rebuild the label exactly as authored — the data mixes
 * grouped ("8,000+") and ungrouped ("1000+") values and both must round-trip.
 */
function parseValue(raw) {
  const match = String(raw).match(/^(\D*?)([\d,]+)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  return {
    prefix,
    suffix,
    target: Number(digits.replace(/,/g, '')),
    grouped: digits.includes(',')
  };
}

const format = (n, grouped) => (grouped ? n.toLocaleString('en-US') : String(n));

// Decelerating curve — fast off the mark, long settle.
const easeOut = (t) => 1 - Math.pow(1 - t, 4);

function StatCard({ stat }) {
  const cellRef = useRef(null);
  const cardRef = useRef(null);
  const numRef = useRef(null);
  const rectRef = useRef(null);
  const rafRef = useRef(0);
  const doneRef = useRef(false);

  /* ---- Count-up, triggered once when the tile scrolls into view ---- */
  useEffect(() => {
    const cell = cellRef.current;
    const el = numRef.current;
    const parsed = parseValue(stat.value);
    if (!cell || !el || !parsed) return undefined;

    // Reduced motion: leave the final value rendered, skip the animation.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let raf = 0;
    let startTs = 0;

    const step = (ts) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / COUNT_MS, 1);
      const n = Math.round(parsed.target * easeOut(p));
      el.textContent = parsed.prefix + format(n, parsed.grouped) + parsed.suffix;
      if (p < 1) raf = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || doneRef.current) return;
        doneRef.current = true;
        observer.disconnect();
        el.textContent = parsed.prefix + format(0, parsed.grouped) + parsed.suffix;
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.35 }
    );

    observer.observe(cell);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [stat.value]);

  /* ---- 3D tilt. Same approach as PartnerCard: measure once on enter, write
     CSS custom properties, never re-render React. ---- */
  const handleEnter = useCallback(() => {
    rectRef.current = cardRef.current?.getBoundingClientRect() ?? null;
  }, []);

  const handleMove = useCallback((e) => {
    const el = cardRef.current;
    const rect = rectRef.current;
    if (!el || !rect) return;

    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty('--rx', `${(0.5 - py) * MAX_TILT}deg`);
      el.style.setProperty('--ry', `${(px - 0.5) * MAX_TILT}deg`);
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
    });
  }, []);

  const handleLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }, []);

  return (
    // Reveal lives on the wrapper and the tilt on the card — both drive
    // `transform`, so on one element the later rule silently wins.
    <div className="stat-cell reveal-on-scroll" ref={cellRef}>
      <div
        className="glass-card stat-card"
        ref={cardRef}
        onMouseEnter={handleEnter}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="stat-inner">
          {/* Rendered at its final value so it stays correct without JS */}
          <div className="counter-value" ref={numRef}>{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      </div>
    </div>
  );
}

export default function StatsBand() {
  return (
    <section className="milestones-section">
      <div className="container stats-grid">
        {MILESTONES.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}
