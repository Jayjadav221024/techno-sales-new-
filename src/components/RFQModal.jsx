import { useState, useEffect } from 'react';
import Icon from './Icon';

export default function RFQModal({ isOpen, onClose, selectedProductName, onShowToast }) {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [timeline, setTimeline] = useState('immediate');
  const [contact, setContact] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (selectedProductName) {
      setProductName(selectedProductName);
    }
  }, [selectedProductName]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    onShowToast('RFQ Submitted Successfully! Our technical team will reach out within 2 hours.');
    setProductName('');
    setQuantity(1);
    setTimeline('immediate');
    setContact('');
    setNotes('');
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
            <label className="form-label">Select Equipment Required</label>
            <select
              id="rfq-product-select"
              className="form-select"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            >
              <option value="" disabled>-- Choose a Product --</option>
              <option value="SIEMENS Motors">SIEMENS Motors</option>
              <option value="CG Motors">CG Motors</option>
              <option value="ABB Motors">ABB Motors</option>
              <option value="SIEMENS Switchgears">SIEMENS Switchgears</option>
              <option value="Polycab Cables & Wires">Polycab Cables & Wires</option>
              <option value="FRP Products">FRP Products</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-input"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Required Delivery Timeline</label>
              <select
                className="form-select"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
              >
                <option value="immediate">Immediate Dispatch (Ankleshwar Stock)</option>
                <option value="1week">Within 1 Week</option>
                <option value="project">Project Schedule</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Contact Person & Phone Number</label>
            <input
              type="text"
              className="form-input"
              placeholder="Your Name & Mobile Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Additional Specification / BOQ Notes</label>
            <textarea
              className="form-textarea"
              placeholder="Enter voltage rating, HP, frame type, or chemical resistance requirements..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-amber" style={{ width: '100%' }}>
            Submit RFQ Quotation Request
          </button>
        </form>
      </div>
    </div>
  );
}
