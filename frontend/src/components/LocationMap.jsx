import { Link } from 'react-router-dom';
import Icon from './Icon';
import { MAPS } from '../data/site';
import { useCompany } from '../context/SiteContentContext';

/** Google Maps embed for the Ankleshwar GIDC counter, with directions links. */
export default function LocationMap({
  tag = 'FIND US',
  title = 'Our Ankleshwar GIDC Counter',
  lead = 'Walk-in collection for switchgear, motor spares and cut-to-length cable — five minutes off Old NH 8.'
}) {
  const COMPANY = useCompany();
  return (
    <section className="map-section container">
      <div className="section-header reveal-on-scroll">
        <span className="section-tag">{tag}</span>
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{lead}</p>
      </div>

      <div className="glass-card map-card reveal-on-scroll">
        <div className="map-details">
          <p className="map-address">
            <Icon name="mapPin" size={18} />
            <span>{COMPANY.address}</span>
          </p>
          <p className="map-line">
            <Icon name="clock" size={18} />
            <span>{COMPANY.hours}</span>
          </p>
          <p className="map-line">
            <Icon name="phone" size={18} />
            <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
          </p>

          <div className="map-actions">
            <a
              href={MAPS.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <Icon name="mapPin" size={16} />
              Get Directions
            </a>
            <a
              href={COMPANY.phoneHref}
              className="btn btn-secondary"
            >
              <Icon name="phone" size={16} />
              Call {COMPANY.phone}
            </a>
            <Link
              to="/contact"
              className="btn btn-secondary"
            >
              Contact Us
            </Link>
            <a
              href={MAPS.place}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Google Maps
              <Icon name="arrowRight" size={14} />
            </a>
          </div>
        </div>

        <iframe
          className="map-frame"
          title="Google Map showing the Techno Sales counter in Ankleshwar GIDC"
          src={MAPS.embed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
