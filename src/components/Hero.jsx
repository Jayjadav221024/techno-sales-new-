import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThreeHeroCanvas from './ThreeHeroCanvas';
import Icon from './Icon';

const HERO_SLIDES = [
  {
    category: 'motors',
    title: 'High-Efficiency Industrial Motors',
    desc: 'Authorized distributor for Siemens motors, and trusted supplier of CG and ABB heavy-duty induction motors built for continuous operation.',
    badge: 'Authorized Distributor for Siemens Motors',
    stats: [
      { value: '10+ Years', label: 'Experience' },
      { value: 'IE2 / IE3 / IE4', label: 'Efficiency Classes' },
      { value: '1000+', label: 'Clients in Gujarat' },
      { value: 'Ready Stock', label: 'in Ankleshwar' }
    ]
  },
  {
    category: 'switchgears',
    title: 'Siemens Certified Switchgear Protection',
    desc: 'Advanced circuit protection featuring Siemens MCCBs, modular electronic trip units, and contactors for automated factory operations.',
    badge: 'Siemens Authorized Distributor — Smart Protection Solutions',
    stats: [
      { value: '10+ Years', label: 'Experience' },
      { value: 'IE2 / IE3 / IE4', label: 'Efficiency Classes' },
      { value: '1000+', label: 'Clients in Gujarat' },
      { value: 'Ready Stock', label: 'in Ankleshwar' }
    ]
  },
  {
    category: 'cables',
    title: 'Polycab LT Armoured & Flexible Cables',
    desc: 'Heavy-duty Polycab XLPE LT Aluminium power cables and high-conductivity flexible copper control wires for switchboards and panel wiring.',
    badge: 'Polycab Authorized Distributor — Heavy-Duty Power',
    stats: [
      { value: '10+ Years', label: 'Experience' },
      { value: 'IE2 / IE3 / IE4', label: 'Efficiency Classes' },
      { value: '1000+', label: 'Clients in Gujarat' },
      { value: 'Ready Stock', label: 'in Ankleshwar' }
    ]
  },
  {
    category: 'frp',
    title: 'FRP Molded Gratings & Cable Trays',
    desc: 'Lightweight, anti-corrosive, non-conductive FRP pultruded cable trays and molded floor grating mesh designed for chemical processing plants.',
    badge: 'FRP Supplier — Chemical & Corrosion Resistant',
    stats: [
      { value: '10+ Years', label: 'Experience' },
      { value: 'IE2 / IE3 / IE4', label: 'Efficiency Classes' },
      { value: '1000+', label: 'Clients in Gujarat' },
      { value: 'Ready Stock', label: 'in Ankleshwar' }
    ]
  }
];

export default function Hero({ products, onSelectProduct, onOpenRFQ, searchQuery, setSearchQuery }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Auto-slide effect every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const filteredMatches = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const slide = HERO_SLIDES[activeSlideIndex];

  return (
    <section id="hero" className="hero">
      <ThreeHeroCanvas category={slide.category} />
      <div className="hero-overlay"></div>
      
      <div className="container hero-content">
        <div className="hero-text reveal-on-scroll">
          <div className="hero-badge">
            <div className="pulse-dot"></div>
            {slide.badge}
          </div>
          
          <h1 className="hero-title">
            Powering Industry with <span className="gradient-text-cyan">{slide.title}</span>
          </h1>
          
          <p className="hero-description">
            {slide.desc}
          </p>

          {/* Live Product Instant Search Engine */}
          <div className="search-box-wrapper">
            <Icon name="search" size={20} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search Products (e.g. Siemens, Polycab, FRP)..."
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

        {/* 3D Scene Controls Hint Card */}
        <div className="hero-3d-card reveal-on-scroll">
          <h4 className="hero-3d-card-title">Interactive 3D Engineering Canvas</h4>
          <p className="hero-3d-card-text">
            Real-time WebGL {slide.category.toUpperCase()} geometry details. Slide transitions
            automatically. Rotate model inside modal cards.
          </p>
          <div className="hero-3d-dots">
            {HERO_SLIDES.map((slideItem, idx) => (
              <button
                key={slideItem.category}
                className={`hero-3d-dot${activeSlideIndex === idx ? ' is-active' : ''}`}
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
