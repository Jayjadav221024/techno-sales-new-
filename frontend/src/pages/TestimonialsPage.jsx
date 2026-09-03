import PageHeader from '../components/PageHeader';
import CtaBand from '../components/CtaBand';
import StatsBand from '../components/StatsBand';
import Icon from '../components/Icon';
import { useSiteData } from '../context/SiteDataContext';

export default function TestimonialsPage({ onOpenRFQ }) {
  const { testimonials } = useSiteData();
  return (
    <>
      <PageHeader
        tag="CLIENT FEEDBACK"
        title="Testimonials"
        lead="How chemical, pharmaceutical and manufacturing plants across Ankleshwar GIDC rate our products, pricing and turnaround."
        trail={[{ label: 'Feedback' }]}
      />

      <section className="testimonial-list-section container">
        <div className="testimonial-grid">
          {testimonials.map((t, idx) => (
            <div className="glass-card testimonial-tile reveal-on-scroll" key={t._id || t.name || idx}>
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
    </>
  );
}
