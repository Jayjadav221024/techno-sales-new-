import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';
import Icon from './Icon';
import { CATEGORIES, productsInCategory } from '../data/site';

const FEEDBACK_LINKS = [
  { to: '/testimonials', label: 'Testimonial' },
  { to: '/faq', label: 'FAQ' }
];

const SIMPLE_LINKS = [
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' }
];

export default function Navbar({ onOpenRFQ }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);            // 'products' | 'feedback' | null
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].id);
  const [mobileSection, setMobileSection] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState({ x: 0, w: 0, visible: false });

  const shellRef = useRef(null);
  const listRef = useRef(null);
  const location = useLocation();

  const closeAll = useCallback(() => {
    setOpenMenu(null);
    setMobileMenuOpen(false);
    setMobileSection(null);
  }, []);

  /* ---- Liquid indicator ------------------------------------------------
     The pill glides to whichever item is hovered and settles back on the
     current route when the pointer leaves. Positions are measured from the
     list box so the maths survives any wrapping or resize. */
  const moveTo = useCallback((el) => {
    const list = listRef.current;
    if (!el || !list) return;
    const listBox = list.getBoundingClientRect();
    const itemBox = el.getBoundingClientRect();
    setPill({ x: itemBox.left - listBox.left, w: itemBox.width, visible: true });
  }, []);

  const settle = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const current = list.querySelector('.nav-link.is-current');
    if (current) moveTo(current.parentElement);
    else setPill((p) => ({ ...p, visible: false }));
  }, [moveTo]);

  useLayoutEffect(() => {
    settle();
  }, [location.pathname, settle]);

  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(settle);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, [settle]);

  /* ---- Condense the bar once the page moves ---- */
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Any completed navigation leaves the menus closed.
  useEffect(() => {
    closeAll();
  }, [location.pathname, closeAll]);

  // Dismiss on outside click or Escape
  useEffect(() => {
    if (!openMenu && !mobileMenuOpen) return;

    const handlePointerDown = (e) => {
      if (shellRef.current && !shellRef.current.contains(e.target)) closeAll();
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeAll();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openMenu, mobileMenuOpen, closeAll]);

  const navLinkClass = ({ isActive }) => `nav-link${isActive ? ' is-current' : ''}`;

  return (
    <header className={`site-nav${scrolled ? ' is-scrolled' : ''}`} ref={shellRef}>
      <div className="site-nav-shell">
        <Link to="/" className="nav-brand" title="Techno Sales Home">
          <Logo showText={true} />
        </Link>

        <nav className="nav-center" aria-label="Primary" onMouseLeave={settle}>
          <span
            className={`nav-pill${pill.visible ? ' is-visible' : ''}`}
            style={{ '--pill-x': `${pill.x}px`, '--pill-w': `${pill.w}px` }}
            aria-hidden="true"
          />

          <ul className="nav-list" ref={listRef}>
            <li className="nav-item" onMouseEnter={(e) => moveTo(e.currentTarget)}>
              <NavLink to="/" className={navLinkClass} end>Home</NavLink>
            </li>

            {/* Products — two-level mega menu */}
            <li
              className="nav-item nav-item--dropdown"
              onMouseEnter={(e) => { moveTo(e.currentTarget); setOpenMenu('products'); }}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                type="button"
                className={`nav-link nav-trigger${openMenu === 'products' ? ' is-open' : ''}`}
                onClick={() => setOpenMenu(openMenu === 'products' ? null : 'products')}
                aria-haspopup="true"
                aria-expanded={openMenu === 'products'}
              >
                Products
                <Icon name="chevronDown" size={14} className="nav-caret" />
              </button>

              {openMenu === 'products' && (
                <div className="nav-dropdown-wrap">
                  <div className="nav-dropdown nav-mega">
                    <ul className="nav-mega-col nav-mega-col--categories">
                      {CATEGORIES.map((cat) => (
                        <li key={cat.id}>
                          <Link
                            to={`/products/${cat.id}`}
                            className={`nav-menu-row${activeCat === cat.id ? ' is-active' : ''}`}
                            onMouseEnter={() => setActiveCat(cat.id)}
                            onFocus={() => setActiveCat(cat.id)}
                            onClick={closeAll}
                          >
                            <span>{cat.navLabel}</span>
                            <Icon name="chevronRight" size={14} />
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link to="/products" className="nav-menu-row nav-menu-row--all" onClick={closeAll}>
                          <span>All Products</span>
                          <Icon name="chevronRight" size={14} />
                        </Link>
                      </li>
                    </ul>

                    <ul className="nav-mega-col nav-mega-col--products">
                      {productsInCategory(activeCat).map((p) => (
                        <li key={p.id}>
                          <Link to={`/product/${p.id}`} className="nav-menu-row" onClick={closeAll}>
                            <span>{p.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>

            {/* Feedback — simple dropdown */}
            <li
              className="nav-item nav-item--dropdown"
              onMouseEnter={(e) => { moveTo(e.currentTarget); setOpenMenu('feedback'); }}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                type="button"
                className={`nav-link nav-trigger${openMenu === 'feedback' ? ' is-open' : ''}`}
                onClick={() => setOpenMenu(openMenu === 'feedback' ? null : 'feedback')}
                aria-haspopup="true"
                aria-expanded={openMenu === 'feedback'}
              >
                Feedback
                <Icon name="chevronDown" size={14} className="nav-caret" />
              </button>

              {openMenu === 'feedback' && (
                <div className="nav-dropdown-wrap">
                  <div className="nav-dropdown">
                    <ul className="nav-mega-col">
                      {FEEDBACK_LINKS.map((link) => (
                        <li key={link.to}>
                          <Link to={link.to} className="nav-menu-row" onClick={closeAll}>
                            <span>{link.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>

            {SIMPLE_LINKS.map((link) => (
              <li className="nav-item" key={link.to} onMouseEnter={(e) => moveTo(e.currentTarget)}>
                <NavLink to={link.to} className={navLinkClass}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <button className="nav-cta" onClick={() => onOpenRFQ()}>
            <span>Request Quote</span>
            <Icon name="arrowRight" size={15} />
          </button>
          <button
            className="nav-burger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {mobileMenuOpen && (
        <div className="nav-sheet">
          <Link to="/" className="nav-sheet-link" onClick={closeAll}>Home</Link>

          <button
            type="button"
            className={`nav-sheet-link nav-sheet-toggle${mobileSection === 'products' ? ' is-open' : ''}`}
            onClick={() => setMobileSection(mobileSection === 'products' ? null : 'products')}
            aria-expanded={mobileSection === 'products'}
          >
            Products
            <Icon name="chevronDown" size={16} className="nav-caret" />
          </button>
          {mobileSection === 'products' && (
            <div className="nav-sheet-sub">
              <Link to="/products" className="nav-sheet-sublink is-head" onClick={closeAll}>
                All Products
              </Link>
              {CATEGORIES.map((cat) => (
                <div key={cat.id}>
                  <Link
                    to={`/products/${cat.id}`}
                    className="nav-sheet-sublink is-head"
                    onClick={closeAll}
                  >
                    {cat.navLabel}
                  </Link>
                  {productsInCategory(cat.id).map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      className="nav-sheet-sublink"
                      onClick={closeAll}
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            className={`nav-sheet-link nav-sheet-toggle${mobileSection === 'feedback' ? ' is-open' : ''}`}
            onClick={() => setMobileSection(mobileSection === 'feedback' ? null : 'feedback')}
            aria-expanded={mobileSection === 'feedback'}
          >
            Feedback
            <Icon name="chevronDown" size={16} className="nav-caret" />
          </button>
          {mobileSection === 'feedback' && (
            <div className="nav-sheet-sub">
              {FEEDBACK_LINKS.map((link) => (
                <Link key={link.to} to={link.to} className="nav-sheet-sublink" onClick={closeAll}>
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {SIMPLE_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="nav-sheet-link" onClick={closeAll}>
              {link.label}
            </Link>
          ))}

          <button className="nav-cta nav-sheet-cta" onClick={() => { closeAll(); onOpenRFQ(); }}>
            <span>Request Quote</span>
            <Icon name="arrowRight" size={15} />
          </button>
        </div>
      )}
    </header>
  );
}
