import { useState, useEffect, useRef } from 'react';
import PartnerCard from './PartnerCard';
import Icon from './Icon';
import { PARTNERS } from '../data/site';

export default function PartnerCarousel() {
  const [activeIndex, setActiveIndex] = useState(2); // Start with the center card (ABB)
  const autoPlayRef = useRef(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PARTNERS.length);
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const handlePrev = () => {
    stopAutoPlay();
    setActiveIndex((prev) => (prev === 0 ? PARTNERS.length - 1 : prev - 1));
    startAutoPlay();
  };

  const handleNext = () => {
    stopAutoPlay();
    setActiveIndex((prev) => (prev + 1) % PARTNERS.length);
    startAutoPlay();
  };

  const handleCardClick = (index) => {
    stopAutoPlay();
    setActiveIndex(index);
    startAutoPlay();
  };

  /* No top margin and only a little bottom padding: the section header above
     already contributes 2.75rem, and the 4rem margin + 2rem padding this used
     to add on top of that left a gulf between the subtitle and the cards. */
  return (
    <div
      className="partner-carousel-container"
      style={{ position: 'relative', width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 0 1rem 0', overflow: 'hidden' }}
    >
      {/* 3D Scene viewport */}
      <div 
        className="partner-carousel-viewport" 
        style={{ position: 'relative', height: '420px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        {PARTNERS.map((partner, index) => {
          // Calculate 3D offsets relative to activeIndex
          let offset = index - activeIndex;
          
          // Handle wrapping for circular loop behavior
          const total = PARTNERS.length;
          if (offset < -total / 2) offset += total;
          if (offset > total / 2) offset -= total;

          const absOffset = Math.abs(offset);
          const isActive = index === activeIndex;

          // 3D positioning parameters matching the video motion path
          const rotateY = offset * -28; // Rotate slightly towards center
          const translateZ = absOffset * -120; // Push inactive cards backwards in Z-space
          const translateX = offset * 260; // Spread cards horizontally
          const scale = 1 - absOffset * 0.12; // Shrink inactive cards
          const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.35; // Fade distant cards
          const zIndex = 10 - absOffset; // Layer active card on top

          return (
            <div
              key={partner.name}
              onClick={() => handleCardClick(index)}
              style={{
                position: 'absolute',
                width: '320px',
                height: '360px',
                transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease, zindex 0.8s ease',
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
                cursor: isActive ? 'default' : 'pointer',
                pointerEvents: absOffset > 2 ? 'none' : 'auto'
              }}
            >
              {/* Force card styles to fill our slide wrapper */}
              <div style={{ height: '100%', pointerEvents: isActive ? 'auto' : 'none' }}>
                <PartnerCard partner={partner} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div 
        className="carousel-controls" 
        style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', position: 'relative', zIndex: 15 }}
      >
        <button 
          onClick={handlePrev}
          className="slider-btn"
          aria-label="Previous Partner"
          style={{ width: '46px', height: '46px', border: '1px solid var(--card-border)', background: 'var(--bg-card)', borderRadius: '50%', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition-smooth)' }}
        >
          <Icon name="chevronLeft" size={20} />
        </button>
        
        {/* Pagination Dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {PARTNERS.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{
                width: index === activeIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: index === activeIndex ? 'var(--accent-cyan)' : 'var(--border-color)',
                border: 'none',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="slider-btn"
          aria-label="Next Partner"
          style={{ width: '46px', height: '46px', border: '1px solid var(--card-border)', background: 'var(--bg-card)', borderRadius: '50%', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition-smooth)' }}
        >
          <Icon name="chevronRight" size={20} />
        </button>
      </div>
    </div>
  );
}
