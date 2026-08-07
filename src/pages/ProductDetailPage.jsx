import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ThreeModalCanvas from '../components/ThreeModalCanvas';
import ProductCard from '../components/ProductCard';
import CtaBand from '../components/CtaBand';
import Icon from '../components/Icon';
import NotFoundPage from './NotFoundPage';
import { findProduct, findCategory, productsInCategory, COMPANY } from '../data/site';

export default function ProductDetailPage({ onOpenRFQ }) {
  const { productId } = useParams();
  const product = findProduct(productId);

  if (!product) return <NotFoundPage />;

  const category = findCategory(product.category);
  const siblings = productsInCategory(product.category).filter((p) => p.id !== product.id);

  return (
    <>
      <PageHeader
        tag={product.brand}
        title={product.name}
        lead={product.desc}
        trail={[
          { label: 'Products', to: '/products' },
          { label: category?.title ?? product.category, to: `/products/${product.category}` }
        ]}
      />

      <section className="container product-detail">
        <div className="product-detail-grid">
          {/* Visual column */}
          <div>
            <div className="glass-card product-detail-media">
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <div
                  className="product-svg-icon"
                  dangerouslySetInnerHTML={{ __html: product.icon }}
                />
              )}
            </div>

            <div className="glass-card product-detail-3d">
              <h3>Interactive 3D Model</h3>
              <ThreeModalCanvas category={product.category} />
              <p className="modal-3d-hint">
                <Icon name="rotate3d" size={15} />
                Drag to rotate 360°
              </p>
            </div>
          </div>

          {/* Info column */}
          <div>
            <div className="product-detail-badges">
              <span className="product-brand-tag static">{product.brand}</span>
              <span className="product-badge-spec static">{product.specBadge}</span>
            </div>

            <h2 className="product-detail-title">{product.name}</h2>
            <p className="product-detail-desc">{product.desc}</p>

            <h3 className="product-detail-subhead">Technical Specifications</h3>
            <ul className="spec-list">
              {product.specs.map((spec, index) => (
                <li key={index}>
                  <Icon name="check" size={16} />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>

            <div className="product-detail-actions">
              <button className="btn btn-primary" onClick={() => onOpenRFQ(product.name)}>
                <Icon name="fileText" size={16} />
                Request Formal Quotation
              </button>
              <a href={COMPANY.phoneHref} className="btn btn-secondary">
                <Icon name="phone" size={16} />
                {COMPANY.phone}
              </a>
            </div>

            <div className="glass-card product-detail-note">
              <Icon name="truck" size={20} />
              <p>
                Ready stock in Ankleshwar GIDC for quick dispatch. Need a specific frame size, HP
                rating or breaking capacity? Our engineers will confirm availability the same day.
              </p>
            </div>
          </div>
        </div>

        {siblings.length > 0 && (
          <div className="related-categories reveal-on-scroll">
            <h3>More in {category?.title ?? 'this range'}</h3>
            <div className="products-grid">
              {siblings.map((p) => (
                <ProductCard key={p.id} product={p} onOpenRFQ={onOpenRFQ} />
              ))}
            </div>
          </div>
        )}

        <div className="section-actions">
          <Link to={`/products/${product.category}`} className="btn btn-secondary">
            <Icon name="chevronLeft" size={16} />
            Back to {category?.title ?? 'Products'}
          </Link>
        </div>
      </section>

      <CtaBand onOpenRFQ={onOpenRFQ} />
    </>
  );
}
