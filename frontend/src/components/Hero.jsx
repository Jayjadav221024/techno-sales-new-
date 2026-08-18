import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import Img from './Img';

const HERO_SLIDES = [
  {
    category: 'motors',
    title: 'High-Efficiency Industrial Motors',
    desc: 'Authorized distributor for Siemens motors, and trusted supplier of CG and ABB heavy-duty induction motors built for continuous operation.',
    badge: 'Authorized Distributor for Siemens Motors',
    image: '/images/hero/motors.jpg',
    imageAlt: 'Siemens, ABB and CG three-phase industrial induction motors',
    caption: 'Siemens · ABB · CG induction motors — IE2 to IE4',
    stats: [
      { value: '10+ Years', label: 'Experience' },
      { value: 'IE2–IE4', label: 'Efficiency Classes' },
      { value: '1000+', label: 'Clients in Gujarat' },
      { value: 'Ready Stock', label: 'in Ankleshwar' }
    ]
  },
  {
    category: 'switchgears',
    title: 'Siemens Certified Switchgear Protection',
    desc: 'Advanced circuit protection featuring Siemens MCCBs, modular electronic trip units, and contactors for automated factory operations.',
    badge: 'Siemens Authorized Distributor — Smart Protection Solutions',
    image: '/images/hero/siemens-switchgear.jpg',
    imageAlt: 'Siemens MCB, MCCB panel and contactor range',
    caption: 'Siemens MCBs, MCCBs, contactors & LT panels',
    stats: [
      { value: '10+ Years', label: 'Experience' },
      { value: 'IE2–IE4', label: 'Efficiency Classes' },
      { value: '1000+', label: 'Clients in Gujarat' },
      { value: 'Ready Stock', label: 'in Ankleshwar' }
    ]
  },
  {
    category: 'cables',
    title: 'Polycab LT Armoured & Flexible Cables',
    desc: 'Heavy-duty Polycab XLPE LT Aluminium power cables and high-conductivity flexible copper control wires for switchboards and panel wiring.',
    badge: 'Polycab Authorized Distributor — Heavy-Duty Power',
    image: '/images/hero/polycab-cables.jpg',
    imageAlt: 'Polycab LT armoured power cables and flexible copper wires',
    caption: 'Polycab XLPE LT armoured cables & flexible wires',
    stats: [
      { value: '10+ Years', label: 'Experience' },
      { value: 'IE2–IE4', label: 'Efficiency Classes' },
      { value: '1000+', label: 'Clients in Gujarat' },
      { value: 'Ready Stock', label: 'in Ankleshwar' }
    ]
  },
  {
    category: 'frp',
    title: 'FRP Molded Gratings & Cable Trays',
    desc: 'Lightweight, anti-corrosive, non-conductive FRP pultruded cable trays and molded floor grating mesh designed for chemical processing plants.',
    badge: 'FRP Supplier — Chemical & Corrosion Resistant',
    image: '/images/hero/frp-products.jpg',
    imageAlt: 'FRP molded gratings, pultruded cable trays and structural profiles',
    caption: 'FRP molded gratings, cable trays & profiles',
    stats: [
      { value: '10+ Years', label: 'Experience' },
      { value: 'IE2–IE4', label: 'Efficiency Classes' },
      { value: '1000+', label: 'Clients in Gujarat' },
      { value: 'Ready Stock', label: 'in Ankleshwar' }
    ]
  }
];

export default function Hero({ products, onSelectProduct, onOpenRFQ, searchQuery, setSearchQuery }) {
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
  }, []);

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

  const slide = HERO_SLIDES[activeSlideIndex];

  return (
    <section id="hero" className="hero">
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
