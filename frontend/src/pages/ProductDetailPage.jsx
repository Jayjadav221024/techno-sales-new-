import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import CtaBand from '../components/CtaBand';
import Icon from '../components/Icon';
import NotFoundPage from './NotFoundPage';
import { findProduct, findCategory, productsInCategory, COMPANY } from '../data/site';

export default function ProductDetailPage({ onOpenRFQ }) {
  const [faqOpenIndex, setFaqOpenIndex] = useState(-1);
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

        {/* Detailed Sections: Intro, Applications, Why Choose, FAQs */}
        <div className="product-details-extra reveal-on-scroll" style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {product.intro && (
            <div className="glass-card extra-intro-card">
              <h3 className="section-subheading accent-color">Overview</h3>
              {product.intro.map((p, idx) => (
                <p key={idx} className="content-paragraph">{p}</p>
              ))}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '2rem' }}>
            {product.applications && (
              <div className="glass-card extra-list-card">
                <h3 className="section-subheading accent-color">Key Applications</h3>
                <ul className="detail-spec-list">
                  {product.applications.map((app, idx) => (
                    <li key={idx}>
                      <Icon name="check" size={16} style={{ color: 'var(--accent-cyan)' }} />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.whyChoose && (
              <div className="glass-card extra-list-card">
                <h3 className="section-subheading accent-color">Why Choose Techno Sales?</h3>
                <ul className="detail-spec-list">
                  {product.whyChoose.map((item, idx) => (
                    <li key={idx}>
                      <Icon name="check" size={16} style={{ color: 'var(--accent-cyan)' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {product.faqs && (
            <div className="product-faq-accordion-section">
              <h3 className="faq-section-title">Frequently Asked Questions</h3>
              <div className="faq-accordion" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {product.faqs.map((faq, idx) => {
                  const isOpen = faqOpenIndex === idx;
                  return (
                    <div className={`glass-card faq-item${isOpen ? ' is-open' : ''}`} key={idx}>
                      <h3>
                          <button
                            type="button"
                            className="faq-question"
                            onClick={() => setFaqOpenIndex(isOpen ? -1 : idx)}
                            aria-expanded={isOpen}
                          >
                            <span>{faq.q}</span>
                            <Icon name="chevronDown" size={18} className="faq-caret" />
                          </button>
                      </h3>
                      {isOpen && (
                        <p className="faq-answer">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {siblings.length > 0 && (
          <div className="related-categories reveal-on-scroll" style={{ marginTop: '5rem' }}>
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
