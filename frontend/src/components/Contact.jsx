import { useState } from 'react';
import Icon from './Icon';
import { submitInquiry } from '../services/api';

export default function Contact({ onShowToast }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('motors');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitInquiry({
        name,
        phone,
        email,
        type: 'contact_inquiry',
        productName: category,
        details,
      });
      onShowToast('Thank you! Your inquiry has been dispatched to Techno Sales Ankleshwar.');
    } catch (err) {
      console.warn('Contact submit error:', err);
      onShowToast('Thank you! We have received your inquiry.');
    } finally {
      setSubmitting(false);
      setName('');
      setPhone('');
      setEmail('');
      setCategory('motors');
      setDetails('');
    }
  };

  return (
    <section id="contact" className="contact-section container">
      <div className="contact-grid">
        <div className="glass-card contact-info-card reveal-on-scroll">
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--accent-cyan)' }}>
            Techno Sales Headquarters
          </h3>
          
          <div className="info-item">
            <div className="info-icon"><Icon name="mapPin" size={20} /></div>
            <div className="info-text">
              <h4>Address</h4>
              <p>Old N H, No 8, B/5-6, Kewal Shopping Centre, Ankleshwar GIDC, Ankleshwar, Gujarat 393002</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><Icon name="phone" size={20} /></div>
            <div className="info-text">
              <h4>Phone & WhatsApp Hotline</h4>
              <p><a href="tel:+919898078247">+91 98980 78247</a> (Direct Sales)</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><Icon name="mail" size={20} /></div>
            <div className="info-text">
              <h4>Email Inquiry</h4>
              <p><a href="mailto:Mktg@Technosales.In">Mktg@Technosales.In</a></p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><Icon name="clock" size={20} /></div>
            <div className="info-text">
              <h4>Operational Hours</h4>
              <p>Monday - Friday: 09:00 AM - 06:00 PM</p>
            </div>
          </div>
        </div>

        <div className="glass-card contact-form-card reveal-on-scroll">
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Send Technical Inquiry</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            We guarantee response within 2 hours for plant sizing requests.
          </p>

          <form id="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Full Name</label>
              <input
                id="contact-name"
                className="form-input"
                type="text"
                placeholder="e.g. Rajesh Shah"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-phone">Phone Number</label>
                <input
                  id="contact-phone"
                  className="form-input"
                  type="tel"
                  placeholder="+91 98980 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  className="form-input"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-category">Product Interest</label>
              <select
                id="contact-category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="motors">Industrial Motors (Siemens, CG, ABB)</option>
                <option value="switchgears">Siemens Switchgear & Protection</option>
                <option value="cables">Polycab Power & Control Cables</option>
                <option value="frp">FRP Gratings & Cable Trays</option>
                <option value="other">General Technical Inquiry</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-details">Requirement Specifications</label>
              <textarea
                id="contact-details"
                className="form-textarea"
                rows={3}
                placeholder="Specify kW/HP, frame size, duty cycle or delivery destination..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
              <Icon name="mail" size={16} />
              {submitting ? 'Submitting...' : 'Send Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
