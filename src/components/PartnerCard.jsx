import { useRef, useCallback } from 'react';

const MAX_TILT = 10; // degrees

/**
 * Brand partnership card with a cursor-tracking 3D tilt.
 *
 * The pointer position is written straight to CSS custom properties on the
 * element and everything else is done in CSS, so React never re-renders on
 * mouse move. Reads and writes are split across a rAF to avoid forcing layout
 * mid-event, and the listener only exists while the pointer is over the card.
 */
export default function PartnerCard({ partner }) {
  const cardRef = useRef(null);
  const frameRef = useRef(0);
  const rectRef = useRef(null);

  const handleEnter = useCallback(() => {
    // Measure once per hover rather than on every move.
    rectRef.current = cardRef.current?.getBoundingClientRect() ?? null;
  }, []);

  const handleMove = useCallback((e) => {
    const el = cardRef.current;
    const rect = rectRef.current;
    if (!el || !rect) return;

    const px = (e.clientX - rect.left) / rect.width;   // 0 → 1
    const py = (e.clientY - rect.top) / rect.height;

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      el.style.setProperty('--rx', `${(0.5 - py) * MAX_TILT}deg`);
      el.style.setProperty('--ry', `${(px - 0.5) * MAX_TILT}deg`);
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
    });
  }, []);

  const handleLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    cancelAnimationFrame(frameRef.current);
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }, []);

  return (
    // The reveal animation and the tilt both drive `transform`, so they must
    // live on separate elements — on one element the later rule silently wins
    // and one of the two effects stops working.
    <div className="partner-card-wrap reveal-on-scroll">
      <div
        ref={cardRef}
        className="glass-card partner-brand-card"
        onMouseEnter={handleEnter}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="partner-brand-body">
          <span className={`partner-badge ${partner.badgeType}`}>{partner.badge}</span>
          <h3 className="partner-brand-name">{partner.name}</h3>
          <p className="partner-brand-desc">{partner.desc}</p>
          <div className="partner-lines">
            {partner.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
