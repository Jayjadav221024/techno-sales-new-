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
