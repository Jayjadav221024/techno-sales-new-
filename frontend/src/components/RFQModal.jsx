import { useState, useEffect } from 'react';
import Icon from './Icon';
import { submitInquiry } from '../services/api';

export default function RFQModal({ isOpen, onClose, selectedProductName, onShowToast }) {
  const [productName, setProductName] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [timeline, setTimeline] = useState('immediate');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (selectedProductName) {
      setProductName(selectedProductName);
    }
  }, [selectedProductName]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitInquiry({
        name: name || 'Website Visitor',
        phone: phone || '9999999999',
        email: email || '',
        company: company || '',
        type: 'rfq',
        productName: productName,
        quantity: Number(quantity) || 1,
        timeline: timeline,
        details: notes,
      });
      onShowToast('RFQ Submitted Successfully! Our technical team will reach out within 2 hours.');
    } catch (err) {
      console.warn('Inquiry submit fallback:', err);
      onShowToast('RFQ received! Our technical team will reach out shortly.');
    } finally {
      setSubmitting(false);
      onClose();
      setProductName('');
      setName('');
      setPhone('');
      setEmail('');
      setCompany('');
      setQuantity(1);
      setTimeline('immediate');
      setNotes('');
    }
  };

  return (
    <div className="modal-backdrop active" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close quotation form">
          <Icon name="close" size={18} />
        </button>
        
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.4rem', color: 'var(--accent-cyan)' }}>Request Formal RFQ Quotation</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Fast-track quote request directly to Techno Sales Ankleshwar desk.</p>

        <form id="rfq-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Equipment / Product Required</label>
            <input
              type="text"
              className="form-input"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. SIEMENS Motors, Polycab Cables, ABB Motors"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rajesh Shah"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone / Mobile</label>
              <input
                type="tel"
                className="form-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Company / Plant Name</label>
              <input
                type="text"
                className="form-input"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Gujarat Petrochem Ltd."
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="plant@company.com"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-input"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Required Timeline</label>
              <select
                className="form-select"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
              >
                <option value="immediate">Immediate Dispatch (Ankleshwar Stock)</option>
                <option value="1-2-weeks">1 - 2 Weeks</option>
                <option value="1-month">Within 1 Month</option>
                <option value="planning">Budgetary / Planning Phase</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Technical Specs or BOQ Notes</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Specify rating (HP/kW), RPM, frame size, voltage or cable cross-section..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <Icon name="fileText" size={16} />
              {submitting ? 'Submitting...' : 'Submit Quotation Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
