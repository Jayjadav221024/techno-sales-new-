import { Link } from 'react-router-dom';
import { COMPANY } from '../data/site';

/** Shared "talk to us" band that closes most inner pages. */
export default function CtaBand({
  title = 'Need help choosing industrial products?',
  text = 'Our sales engineers size motors, breakers and cable runs for you — no obligation.',
  onOpenRFQ
}) {
  return (
    <section className="cta-section container">
      <div className="cta-band reveal-on-scroll">
        <div>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
        <div className="cta-band-actions">
          {onOpenRFQ && (
            <button className="btn btn-primary" onClick={() => onOpenRFQ()}>
              Request a Quote
            </button>
          )}
          <a href={COMPANY.phoneHref} className="btn btn-secondary">
            Call {COMPANY.phone}
          </a>
          <Link to="/contact" className="btn btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
