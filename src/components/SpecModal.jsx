import ThreeModalCanvas from './ThreeModalCanvas';
import Icon from './Icon';

export default function SpecModal({ isOpen, onClose, product, onOpenRFQ }) {
  if (!isOpen || !product) return null;

  return (
    <div className="modal-backdrop active" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close product details">
          <Icon name="close" size={18} />
        </button>

        {/* Interactive 3D Canvas inside modal */}
        <ThreeModalCanvas category={product.category} />
        <div className="modal-3d-hint">
          <Icon name="rotate3d" size={15} />
          Interactive 3D Model — drag to rotate 360°
        </div>

        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{product.name}</h3>
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ background: 'rgba(0, 229, 255, 0.1)', color: 'var(--accent-cyan)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.8rem', marginRight: '0.5rem' }}>
              {product.brand}
            </span>
            <span style={{ background: 'rgba(255, 159, 28, 0.15)', color: 'var(--accent-amber)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.8rem' }}>
              {product.specBadge}
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>{product.desc}</p>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Technical Specifications:</h4>
          <ul className="spec-list">
            {product.specs.map((s, index) => (
              <li key={index}>
                <Icon name="check" size={16} />
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                onClose();
                onOpenRFQ(product.name);
              }}
            >
              Request Formal Quotation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
