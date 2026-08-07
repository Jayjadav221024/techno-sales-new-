import PageHeader from '../components/PageHeader';
import CtaBand from '../components/CtaBand';
import StatsBand from '../components/StatsBand';
import Icon from '../components/Icon';
import { TESTIMONIALS } from '../data/site';

export default function TestimonialsPage({ onOpenRFQ }) {
  return (
    <>
      <PageHeader
        tag="CLIENT FEEDBACK"
        title="Testimonial"
        lead="How chemical, pharmaceutical and manufacturing plants across Ankleshwar GIDC rate our products, pricing and turnaround."
        trail={[{ label: 'Feedback' }]}
      />

      <section className="testimonial-list-section container">
        <div className="testimonial-grid">
          {TESTIMONIALS.map((t) => (
            <div className="glass-card testimonial-tile reveal-on-scroll" key={t.name}>
              <div className="quote-icon">
                <Icon name="quote" size={44} strokeWidth={1.5} />
              </div>
              <p className="testimonial-tile-text">"{t.text}"</p>
              <div className="client-info">
                <div className="client-avatar">{t.initials}</div>
                <div className="client-details">
                  <h4>{t.name}</h4>
                  <p>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <StatsBand />

      <CtaBand
        title="Want to be our next success story?"
        text="Tell us what your plant needs and we'll quote it — usually within two hours."
        onOpenRFQ={onOpenRFQ}
      />
    </>
  );
}
