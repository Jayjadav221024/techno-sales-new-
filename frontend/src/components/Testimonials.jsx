import { useState } from 'react';
import Icon from './Icon';

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const testimonials = [
    {
      name: 'Atul Panchal',
      role: 'Shiva Pharma',
      initials: 'AP',
      text: 'Techno Sales provided top-quality FRP gratings that made our factory floor safe and durable. Their quick service and expert support ensured a smooth experience. Highly recommended for reliable industrial-grade solutions.'
    },
    {
      name: 'Abhay',
      role: 'Spectom',
      initials: 'AB',
      text: 'Techno Sales impressed us with unmatched switchgear expertise. Their quality products and expert guidance helped us choose the right components. Their professionalism and prompt service truly contributed to our project\'s success.'
    },
    {
      name: 'Mukesh Dobariya',
      role: 'Hi-Make',
      initials: 'MD',
      text: 'Always on time and competitively priced, Techno Sales is our trusted go-to partner. Their consistent support, product quality, and reliability have made them an essential part of our industrial supply chain.'
    },
    {
      name: 'Priya Desai',
      role: 'Aryan Manufacturing Co.',
      initials: 'PD',
      text: 'Techno Sales consistently delivers high-quality products with quick, dependable service. Their team is responsive and professional, making them a truly reliable partner for all our industrial procurement and support needs.'
    },
    {
      name: 'Ankit Tiwari',
      role: 'Delta Machinery Works',
      initials: 'AT',
      text: 'We\'ve been sourcing from Techno Sales for years. Their genuine products, expert advice, and quick response have consistently simplified our procurement process, making operations smoother and more efficient for our entire team.'
    },
    {
      name: 'Sneha Joshi',
      role: 'Ridhhi Engineering Pvt. Ltd.',
      initials: 'SJ',
      text: 'Techno Sales provides reliable service, genuine products, and quick response. Their consistent performance and support make them our trusted and preferred supplier for all industrial equipment and electrical component needs.'
    }
  ];

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const t = testimonials[index];

  return (
    <section id="testimonials" className="testimonials-section container">
      <div className="section-header reveal-on-scroll">
        <span className="section-tag">CLIENT FEEDBACK</span>
        <h2 className="section-title">What Industrial Leaders Say</h2>
        <p className="section-subtitle">Read how Techno Sales has helped chemical, pharmaceutical, and manufacturing plants across Ankleshwar GIDC.</p>
      </div>

      <div className="testimonial-slider reveal-on-scroll">
        <div className="glass-card testimonial-card">
          <div className="quote-icon"><Icon name="quote" size={56} strokeWidth={1.5} /></div>
          <p className="testimonial-text">"{t.text}"</p>
          <div className="client-info" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
            <div className="client-avatar" style={{ background: 'linear-gradient(135deg, var(--color-brand-400), var(--color-brand-600))', color: '#fff', fontWeight: 800 }}>
              {t.initials}
            </div>
            <div className="client-details">
              <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-main)' }}>{t.name}</h4>
              <p style={{ margin: 0, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 600 }}>
                <Icon name="shieldCheck" size={14} />
                <span>{t.role} · Verified Industrial Client</span>
              </p>
            </div>
          </div>
        </div>
        <div className="slider-controls">
          <button className="slider-btn" onClick={handlePrev} title="Previous" aria-label="Previous testimonial">
            <Icon name="chevronLeft" size={20} />
          </button>
          <button className="slider-btn" onClick={handleNext} title="Next" aria-label="Next testimonial">
            <Icon name="chevronRight" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
