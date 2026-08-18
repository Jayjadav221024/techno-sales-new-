import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';
import Icon from './Icon';
import { CATEGORIES, productsInCategory, PRODUCTS_DATA, BLOG_POSTS } from '../data/site';

const FEEDBACK_LINKS = [
  { to: '/testimonials', label: 'Testimonial' },
  { to: '/faq', label: 'FAQ' }
];

const SIMPLE_LINKS = [
  { to: '/blog', label: 'Blog' },
  { to: '/locations', label: 'Locations' },
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const shellRef = useRef(null);
  const listRef = useRef(null);
  const location = useLocation();

  const closeAll = useCallback(() => {
    setOpenMenu(null);
    setMobileMenuOpen(false);
    setMobileSection(null);
  }, []);

  const getCategoryDest = useCallback((catId) => {
    if (catId === 'motors') return '/products/motors';
    if (catId === 'cables') return '/product/polycab-cables-wires';
    if (catId === 'switchgears') return '/product/siemens-switchgears';
    if (catId === 'frp') return '/product/frp-products';
    return `/products/${catId}`;
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
                            to={getCategoryDest(cat.id)}
                            className={`nav-menu-row${activeCat === cat.id ? ' is-active' : ''}`}
                            onMouseEnter={() => setActiveCat(cat.id)}
                            onFocus={() => setActiveCat(cat.id)}
                            onClick={closeAll}
                          >
                            <span>{cat.navLabel}</span>
                            {cat.id === 'motors' && <Icon name="chevronRight" size={14} />}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link to="/products" className="nav-menu-row nav-menu-row--all" onClick={closeAll}>
                          <span>All Products</span>
                        </Link>
                      </li>
                    </ul>

                    {activeCat === 'motors' && productsInCategory(activeCat).length > 0 && (
                      <ul className="nav-mega-col nav-mega-col--products">
                        {productsInCategory(activeCat).map((p) => (
                          <li key={p.id}>
                            <Link to={`/product/${p.id}`} className="nav-menu-row" onClick={closeAll}>
                              <span>{p.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
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

        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

          
          <button className="nav-cta" onClick={() => onOpenRFQ()}>
            <span>Request Quote</span>
            <Icon name="arrowRight" size={15} />
          </button>
          <button
            className="nav-burger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            style={{ gap: '0.25rem', fontSize: '0.8rem', fontWeight: 'bold' }}
          >
            <span>Menu</span>
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
                    to={getCategoryDest(cat.id)}
                    className="nav-sheet-sublink is-head"
                    onClick={closeAll}
                  >
                    {cat.navLabel}
                  </Link>
                  {cat.id === 'motors' && productsInCategory('motors').map((p) => (
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

      {/* Site-wide Search Modal Overlay */}
      {isSearchOpen && (
        <div 
          className="search-overlay" 
          onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(10, 8, 20, 0.95)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', flexDirection: 'column', padding: '2rem', alignItems: 'center' }}
        >
          <div 
            className="search-modal-container" 
            onClick={e => e.stopPropagation()} 
            style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '5vh' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <h2 style={{ color: '#fff', fontSize: '1.5rem' }}>Search Techno Sales</h2>
              <button 
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} 
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-cyan)'}
                onMouseLeave={e => e.currentTarget.style.color = '#fff'}
              >
                Close <Icon name="close" size={20} />
              </button>
            </div>

            <div style={{ position: 'relative', width: '100%' }}>
              <Icon name="search" size={24} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
              <input 
                type="text" 
                placeholder="Search products, brands, or articles..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                style={{ width: '100%', padding: '1.25rem 1.5rem 1.25rem 3.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '1.25rem', color: '#fff', outline: 'none', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }}
              />
            </div>

            {searchQuery.trim() && (
              <div className="search-results-wrapper" style={{ maxHeight: '60vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem', paddingRight: '0.5rem' }}>
                
                {/* Product Matches */}
                <div>
                  <h3 style={{ color: 'var(--accent-cyan)', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Products</h3>
                  {PRODUCTS_DATA.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem' }}>No matching products found.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {PRODUCTS_DATA.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                        <Link 
                          key={p.id} 
                          to={`/product/${p.id}`} 
                          onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                          style={{ display: 'block', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', textDecoration: 'none', transition: 'background 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                        >
                          <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '0.25rem' }}>{p.name}</h4>
                          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.desc}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Article Matches */}
                <div>
                  <h3 style={{ color: 'var(--accent-cyan)', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Knowledge Base Articles</h3>
                  {BLOG_POSTS.filter(bp => bp.title.toLowerCase().includes(searchQuery.toLowerCase()) || bp.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || bp.body.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem' }}>No matching articles found.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {BLOG_POSTS.filter(bp => bp.title.toLowerCase().includes(searchQuery.toLowerCase()) || bp.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || bp.body.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 10).map(bp => (
                        <Link 
                          key={bp.slug} 
                          to={`/blog/${bp.slug}`} 
                          onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                          style={{ display: 'block', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', textDecoration: 'none', transition: 'background 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                        >
                          <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '0.25rem' }}>{bp.title}</h4>
                          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{bp.excerpt}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
