import { Link } from 'react-router-dom';
import Logo from './Logo';
import Icon from './Icon';
import { CATEGORIES, COMPANY } from '../data/site';

const QUICK_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Industrial Products' },
  { to: '/about', label: 'Why Choose Us' },
  { to: '/testimonials', label: 'Client Testimonials' },
  { to: '/blog', label: 'Blog & Guides' },
  { to: '/faq', label: 'FAQ' },
  { to: '/locations', label: 'Service Locations' },
  { to: '/contact', label: 'Contact & Map' }
];

export default function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Logo style={{ marginBottom: '1rem' }} />
          <p className="footer-about">
            Trusted supplier of industrial motors, cable &amp; wires, switchgear, &amp; FRP product
            solutions in Ankleshwar.
          </p>
          <p className="footer-contact-line">
            <Icon name="phone" size={16} />
            <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
          </p>
          <p className="footer-contact-line footer-contact-line--sm">
            <Icon name="mail" size={16} />
            <a href={COMPANY.emailHref}>{COMPANY.email}</a>
          </p>
          <div className="footer-socials" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <a href="https://www.facebook.com/profile.php?id=61577383764183" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-cyan)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'} aria-label="Facebook">
              <Icon name="facebook" size={20} />
            </a>
            <a href="https://www.linkedin.com/company/technosalesagency/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-cyan)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'} aria-label="LinkedIn">
              <Icon name="linkedin" size={20} />
            </a>
          </div>

        </div>

        <div>
          <h4>Quick Navigation</h4>
          <ul className="footer-links">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Product Categories</h4>
          <ul className="footer-links">
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link to={`/products/${cat.id}`}>{cat.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Industrial Location</h4>
          <p className="footer-address">{COMPANY.address}</p>
          <p className="footer-hours">{COMPANY.hours}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 Techno Sales. All rights reserved. www.technosales.in</p>
        </div>
      </div>
    </footer>
  );
}
