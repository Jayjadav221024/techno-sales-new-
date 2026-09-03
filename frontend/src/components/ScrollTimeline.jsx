import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const MILESTONES = [
  {
    year: '2014',
    title: 'Foundation in Ankleshwar',
    desc: 'Established operations in Ankleshwar GIDC to supply genuine industrial electric motors and switchgear components to regional chemical & pharma plants.',
    badge: 'Establishment',
    icon: 'award',
    stats: 'Founded in GIDC'
  },
  {
    year: '2017',
    title: 'Siemens & CG Alliances',
    desc: 'Formed authorized channel partnerships with Siemens and Crompton Greaves to deliver high-efficiency IE2/IE3/IE4 motors and SIRIUS switchgear.',
    badge: 'Authorized Partner',
    icon: 'shieldCheck',
    stats: 'Authorized Distributor'
  },
  {
    year: '2020',
    title: 'Polycab Cables & FRP Addition',
    desc: 'Expanded inventory with authorized Polycab LT/HT cables, control wires, and anti-corrosive FRP structural gratings for heavy chemical & marine zones.',
    badge: 'Portfolio Expansion',
    icon: 'layers',
    stats: '5,000+ SKUs'
  },
  {
    year: '2026',
    title: '1,000+ Industrial Clients',
    desc: 'Supplying 10,000+ SKUs across 13+ industrial districts with a 99% client retention rate, ready stock dispatch, and 2-hour SLA response support.',
    badge: 'Scale & Leadership',
    icon: 'checkCircle',
    stats: '1,000+ Active Clients'
  }
];

export default function ScrollTimeline() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress from 0% when entering viewport to 100% when passing through
      const totalHeight = rect.height;
      const progress = Math.min(
        Math.max((windowHeight * 0.7 - rect.top) / totalHeight, 0),
        1
      );

      setScrollProgress(progress);

      // Determine which node is currently active based on progress
      const nodeIndex = Math.min(
        Math.floor(progress * MILESTONES.length),
        MILESTONES.length - 1
      );
      setActiveNode(Math.max(0, nodeIndex));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="scroll-timeline-section container" ref={containerRef}>
      <div className="section-header reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span className="section-tag">OUR EVOLUTION</span>
        <h2 className="section-title">Milestone Journey & Industrial Heritage</h2>
        <p className="section-subtitle">
          Over a decade of trusted electro-mechanical supply excellence across Ankleshwar and Gujarat industrial estates.
        </p>
      </div>

      <div className="scroll-timeline-wrapper">
        {/* Animated Central Progress Line */}
        <div className="scroll-timeline-line-bg">
          <div
            className="scroll-timeline-line-fill"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Timeline Items */}
        <div className="scroll-timeline-list">
          {MILESTONES.map((item, index) => {
            const isReached = scrollProgress >= (index + 0.1) / MILESTONES.length;
            const isCurrent = activeNode === index;
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.year}
                className={`scroll-timeline-item ${isEven ? 'is-left' : 'is-right'} ${
                  isReached ? 'is-active' : ''
                } ${isCurrent ? 'is-current' : ''}`}
              >
                {/* Node Center Pin */}
                <div className="scroll-timeline-pin">
                  <span className="scroll-timeline-pin-core">
                    <Icon name={item.icon} size={16} />
                  </span>
                  <span className="scroll-timeline-pin-pulse" />
                </div>

                {/* Timeline Card */}
                <div className="glass-card scroll-timeline-card">
                  <div className="scroll-timeline-header">
                    <span className="scroll-timeline-year">{item.year}</span>
                  </div>

                  <h3 className="scroll-timeline-title">{item.title}</h3>
                  <p className="scroll-timeline-desc">{item.desc}</p>

                  <div className="scroll-timeline-meta">
                    <Icon name="checkCircle" size={15} />
                    <span>{item.stats}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
