import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import Img from './Img';
import { useSection, useSectionProps } from '../context/SiteContentContext';

export default function Hero({ products, onSelectProduct, onOpenRFQ, searchQuery, setSearchQuery }) {
  const hero = useSection('home.hero');
  const sectionProps = useSectionProps('home.hero');
  const HERO_SLIDES = hero.slides;
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  // Every slide image is stacked in the same frame, so all four would sit in
  // the viewport and download on first paint — ~450 KB before the hero is even
  // readable. Only the shown slide and the one after it are mounted, so the
  // first paint costs one image and the rest arrive during the 6s rotation.
  const [mountedSlides, setMountedSlides] = useState([0, 1]);

  // Auto-slide effect every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [HERO_SLIDES.length]);

  useEffect(() => {
    const next = (activeSlideIndex + 1) % HERO_SLIDES.length;
    setMountedSlides((prev) => {
      const missing = [activeSlideIndex, next].filter((i) => !prev.includes(i));
      return missing.length ? [...prev, ...missing] : prev;
    });
  }, [activeSlideIndex]);

  const filteredMatches = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Someone editing the slides in the admin panel can delete the one currently
  // showing, so the index is clamped rather than trusted.
  const slide = HERO_SLIDES[activeSlideIndex] ?? HERO_SLIDES[0];
  if (!slide) return null;

  return (
    <section id="hero" className="hero" {...sectionProps}>
      <div className="container hero-content">
        <div className="hero-text reveal-on-scroll">
          <div className="hero-brand-logo">
            <img 
              src="/images/brand/logo-responsive.png" 
              alt="Techno Sales" 
              className="logo-light hero-logo-img" 
            />
            <img 
              src="/images/brand/logo-white.png" 
              alt="Techno Sales" 
              className="logo-dark hero-logo-img" 
            />
          </div>

          <h1 className="hero-title">
            {hero.headingPrefix} <span className="gradient-text-cyan">{slide.title}</span>
          </h1>

          {/* Live Product Instant Search Engine */}
          <div className="search-box-wrapper">
            <Icon name="search" size={20} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder={hero.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              autoComplete="off"
            />
            {showDropdown && filteredMatches.length > 0 && (
              <div className="search-results-dropdown" style={{ display: 'block' }}>
                {filteredMatches.slice(0, 5).map((m) => (
                  <div
                    key={m.id}
                    className="search-result-item"
                    onMouseDown={() => onSelectProduct(m.id)}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>{m.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.specs[0]}</div>
                    </div>
                    <span className="item-brand">{m.brand}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-primary">
              <Icon name="grid" size={18} />
              Explore Product Catalog
            </Link>
            <button className="btn btn-amber" onClick={() => onOpenRFQ()}>
              <Icon name="fileText" size={18} />
              Instant RFQ Quote
            </button>
          </div>

          {/* Dynamic Stats Row according to active slide */}
          <div className="hero-stats-row">
            {slide.stats.map((stat, i) => (
              <div key={i} className="hero-stat-item">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category showcase image — crossfades with the active slide */}
        <div className="hero-visual reveal-on-scroll">
          <div className="hero-visual-frame">
            {HERO_SLIDES.map((slideItem, idx) => (
              <div
                key={slideItem.category}
                className={`hero-visual-slide${activeSlideIndex === idx ? ' is-active' : ''}`}
                aria-hidden={activeSlideIndex !== idx}
              >
                {mountedSlides.includes(idx) && (
                  <Img
                    src={slideItem.image}
                    alt={slideItem.imageAlt}
                    className="hero-visual-img"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    fetchPriority={idx === 0 ? 'high' : 'auto'}
                  />
                )}
              </div>
            ))}
          </div>

          <p className="hero-visual-caption">{slide.caption}</p>

          <div className="hero-visual-dots">
            {HERO_SLIDES.map((slideItem, idx) => (
              <button
                key={slideItem.category}
                className={`hero-visual-dot${activeSlideIndex === idx ? ' is-active' : ''}`}
                onClick={() => setActiveSlideIndex(idx)}
                aria-label={`Show ${slideItem.category} slide`}
                aria-current={activeSlideIndex === idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
