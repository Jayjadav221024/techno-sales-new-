import { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const MAX_TILT = 10; // degrees

const BRAND_LINKS = {
  'SIEMENS SWITCHGEARS': '/product/siemens-motors',
  'CG MOTORS': '/product/cg-motors',
  'ABB MOTORS': '/product/abb-motors',
  'POLYCAB CABLES': '/product/polycab-cables-wires',
  'FRP PRODUCTS': '/product/frp-products'
};

/**
 * Brand partnership card with a cursor-tracking 3D tilt.
 *
 * The pointer position is written straight to CSS custom properties on the
 * element and everything else is done in CSS, so React never re-renders on
 * mouse move. Reads and writes are split across a rAF to avoid forcing layout
 * mid-event, and the listener only exists while the pointer is over the card.
 */
const BRAND_LOGOS = {
  'SIEMENS': (
    <svg viewBox="0 0 150 30" style={{ height: '32px', width: 'auto' }}>
      <text x="0" y="24" fontFamily="'Sora', 'Plus Jakarta Sans', sans-serif" fontWeight="900" fontSize="24" letterSpacing="0.06em" fill="#00828a">SIEMENS</text>
    </svg>
  ),
  'CROMPTON GREAVES (CG)': (
    <svg viewBox="0 0 180 30" style={{ height: '32px', width: 'auto' }}>
      <circle cx="16" cy="15" r="11" stroke="#00549f" strokeWidth="2.5" fill="none" />
      <path d="M12 15 A 4 4 0 1 1 20 18" stroke="#00549f" strokeWidth="2.5" fill="none" />
      <path d="M16 12 L16 15 L18 15" stroke="#00549f" strokeWidth="2" fill="none" />
      <text x="38" y="23" fontFamily="'Sora', 'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="18" letterSpacing="0.02em" fill="#00549f">CROMPTON</text>
    </svg>
  ),
  'ABB': (
    <svg viewBox="0 0 120 30" style={{ height: '32px', width: 'auto' }}>
      <text x="0" y="24" fontFamily="'Sora', 'Plus Jakarta Sans', sans-serif" fontWeight="900" fontSize="28" letterSpacing="-0.04em" fill="#E0001B">ABB</text>
    </svg>
  ),
  'POLYCAB': (
    <svg viewBox="0 0 160 30" style={{ height: '32px', width: 'auto' }}>
      <path d="M5 15 L15 5 L25 15 L15 25 Z" stroke="#E31E24" strokeWidth="2.5" fill="none" />
      <path d="M10 15 L15 10 L20 15 L15 20 Z" fill="#F58220" />
      <text x="34" y="23" fontFamily="'Sora', 'Plus Jakarta Sans', sans-serif" fontWeight="900" fontSize="20" letterSpacing="0.05em" fill="#E31E24">POLYCAB</text>
    </svg>
  ),
  'FRP PRODUCTS': (
    <svg viewBox="0 0 180 30" style={{ height: '32px', width: 'auto' }}>
      <rect x="2" y="2" width="26" height="26" rx="4" stroke="var(--color-success)" strokeWidth="2" fill="none" />
      <path d="M10 2 V28 M18 2 V28 M2 10 H28 M2 18 H28" stroke="var(--color-success)" strokeWidth="1.5" opacity="0.6" />
      <text x="36" y="22" fontFamily="'Sora', 'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="16" letterSpacing="0.03em" fill="var(--text-main)">FRP STRUCT</text>
    </svg>
  )
};

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
    <div className="partner-card-wrap" style={{ height: '100%' }}>
      <Link
        ref={cardRef}
        to={BRAND_LINKS[partner.name] || '/products'}
        className="glass-card partner-brand-card"
        style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
        onMouseEnter={handleEnter}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="partner-brand-body">
          <h3 className="partner-brand-name">{partner.name}</h3>
          <span className={`partner-badge ${partner.badgeType}`}>{partner.badge}</span>
          <p className="partner-brand-desc" style={{ marginTop: '0.5rem' }}>{partner.desc}</p>
          <div className="partner-lines">
            {partner.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
