import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Browsers restore scroll position on client-side navigation, which lands you
 * mid-page on a route you've never seen. Reset on every pathname change.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
