import { useState } from 'react';
import Icon from './Icon';

export default function Contact({ onShowToast }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('motors');
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onShowToast('Thank you! Your inquiry has been dispatched to Techno Sales Ankleshwar.');
    setName('');
    setPhone('');
    setEmail('');
    setCategory('motors');
    setDetails('');
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

        {/* Interactive Contact Form */}
        <div className="glass-card contact-form-card reveal-on-scroll">
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Send Technical Inquiry</h3>
          <form id="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name / Company Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Ramesh Patel (Gujarat Chemicals)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="+91 98000 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Product Category Needed</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="motors">Industrial Motors (Siemens, CG, ABB)</option>
                <option value="switchgears">Siemens Switchgears & Circuit Breakers</option>
                <option value="cables">Polycab Armoured & Flexible Cables</option>
                <option value="frp">FRP Gratings & Cable Trays</option>
                <option value="other">General Turnkey Inquiry</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Message / Requirement Details</label>
              <textarea
                className="form-textarea"
                placeholder="Specify frame sizes, HP rating, quantity, or BOQ details..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Send Inquiry to Sales Engineering Team
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
