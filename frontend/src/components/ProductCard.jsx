import { Link } from 'react-router-dom';
import Icon from './Icon';
import Img from './Img';

export default function ProductCard({ product, onOpenRFQ }) {
  const href = `/product/${product.id}`;

  return (
    <div className="glass-card product-card reveal-on-scroll">
      <Link to={href} className="product-image-container" aria-label={product.name}>
        <span className="product-brand-tag">{product.brand}</span>
        <span className="product-badge-spec">{product.specBadge}</span>
        {/* No objectFit override on the image — the stylesheet's `cover` is
            what makes the shot fill the taller tile. Contained, these 2.1:1
            product banners were width-bound and left a dead band below. */}
        {product.image ? (
          <Img src={product.image} alt={product.imageAlt || product.name} className="product-image" />
        ) : (
          <div
            className="product-svg-icon"
            style={{ color: 'var(--accent-cyan)' }}
            dangerouslySetInnerHTML={{ __html: product.icon }}
          />
        )}
      </Link>

      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">
          <Link to={href}>{product.name}</Link>
        </h3>
        <p className="product-desc">{product.desc}</p>

        <ul className="product-features">
          {product.specs.slice(0, product.category === 'cables' ? 5 : 4).map((spec, index) => (
            <li key={index}>
              <Icon name="check" size={14} strokeWidth={3} />
              {spec}
            </li>
          ))}
        </ul>

        <div className="product-footer">
          <Link to={href} className="btn btn-secondary btn-sm">
            <Icon name="eye" size={14} />
            View Details
          </Link>
          <button className="btn btn-primary btn-sm" onClick={() => onOpenRFQ(product.name)}>
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
}
