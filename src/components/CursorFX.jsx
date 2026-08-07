import { useEffect, useRef } from 'react';

/** Elements that should make the ring open up. */
const INTERACTIVE =
  'a, button, input, select, textarea, label, [role="button"], .nav-menu-row, .tab-btn, .glass-card';

const EASE = 0.18; // how hard the ring chases the pointer

/**
 * Custom cursor: a dot pinned to the pointer and a ring that trails behind it.
 *
 * Deliberately kept off React's render path — positions are written straight
 * to element.style, so this never triggers a re-render. The rAF loop also
 * stops itself once the ring has caught up, so an idle pointer costs nothing.
 */
export default function CursorFX() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const target = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);
  const runningRef = useRef(false);

  useEffect(() => {
    // Pointer-driven flourish: skip on touch, and skip when motion is reduced.
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const place = (el, x, y) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const loop = () => {
      const t = target.current;
      const r = ringPos.current;

      r.x += (t.x - r.x) * EASE;
      r.y += (t.y - r.y) * EASE;
      place(ring, r.x, r.y);

      // Settle and stop rather than spinning a permanent animation frame.
      if (Math.abs(t.x - r.x) < 0.1 && Math.abs(t.y - r.y) < 0.1) {
        runningRef.current = false;
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    const start = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      // The dot is pinned, so it can be written directly — no easing needed.
      place(dot, e.clientX, e.clientY);
      root.classList.remove('cursor-away');
      start();
    };

    // pointerover fires only when crossing an element boundary, which is far
    // cheaper than testing the hit target on every pointermove.
    const onOver = (e) => {
      const hit = e.target?.closest?.(INTERACTIVE);
      root.classList.toggle('cursor-hover', Boolean(hit));
    };

    const onDown = () => root.classList.add('cursor-down');
    const onUp = () => root.classList.remove('cursor-down');
    const onLeave = () => root.classList.add('cursor-away');

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
      root.classList.remove('has-custom-cursor', 'cursor-hover', 'cursor-down', 'cursor-away');
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true">
        <span />
      </div>
    </>
  );
}
