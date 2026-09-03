import { useState } from 'react';
import Icon from './Icon';

export default function FeaturesAccordion({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) return null;

  return (
    <div className="features-accordion reveal-on-scroll">
      {items.map((feature, i) => {
        const isActive = activeIndex === i;
        const bgImage = feature.image || '/images/sections/why-choose-us.jpg';

        return (
          <div
            key={i}
            className={`accordion-panel ${isActive ? 'is-active' : ''}`}
            onMouseEnter={() => setActiveIndex(i)}
            onClick={() => setActiveIndex(i)}
            tabIndex={0}
            role="button"
            aria-expanded={isActive}
            aria-label={feature.title}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActiveIndex(i);
              }
            }}
          >
            {/* Background Image with Parallax / Zoom styling */}
            <div
              className="accordion-bg"
              style={{ backgroundImage: `url(${bgImage})` }}
            />
            <div className="accordion-overlay" />

            {/* Panel Content */}
            <div className="accordion-content">
              {/* Header / Number Badge */}
              <div className="accordion-top">
                <span className="accordion-num">0{i + 1}</span>
                <div className="accordion-icon-box">
                  <Icon name={feature.icon || 'shieldCheck'} size={22} />
                </div>
              </div>

              {/* Text Info */}
              <div className="accordion-body">
                <h3 className="accordion-title">{feature.title}</h3>
                <p className="accordion-desc">{feature.desc}</p>
              </div>

              {/* Vertical Title Indicator for Inactive Panels */}
              <div className="accordion-collapsed-title">
                <span className="collapsed-num">0{i + 1}</span>
                <span className="collapsed-text">{feature.title}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
