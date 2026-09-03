import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import CtaBand from '../components/CtaBand';
import Icon from '../components/Icon';
import NotFoundPage from './NotFoundPage';

import { useSiteData } from '../context/SiteDataContext';
import { fetchProductBySlug } from '../services/api';
import { SEO_DEFAULTS } from '../data/seoDefaults';
import { seoFromRecord, useSeo } from '../utils/seo';
import { useCompany } from '../context/SiteContentContext';

export default function ProductDetailPage({ onOpenRFQ }) {
  const COMPANY = useCompany();
  const [faqOpenIndex, setFaqOpenIndex] = useState(-1);
  const { productId } = useParams();
  const { products, categories } = useSiteData();

  const [product, setProduct] = useState(() => {
    return products.find((p) => p.slug === productId || p.id === productId) || null;
  });

  useEffect(() => {
    // If not found in memory context or we want latest DB edits
    const found = products.find((p) => p.slug === productId || p.id === productId);
    if (found) {
      setProduct(found);
    } else {
      fetchProductBySlug(productId).then((res) => {
        if (res) setProduct(res);
      });
    }
  }, [productId, products]);

  // Kept above the early return below - hooks cannot run conditionally.
  // Order of preference: the record's SEO fields, then the hand-written entry
  // for this exact URL, then something built from the product itself.
  useSeo(
    seoFromRecord(product, {
      ...(SEO_DEFAULTS[`/product/${productId}`] ?? {
        title: product ? `${product.name} Supplier in Ankleshwar | Techno Sales` : undefined,
        description: product?.desc,
      }),
      type: 'product',
    }),
    [product, productId],
  );

  if (!product) return <NotFoundPage />;

  const category = categories.find((c) => c.slug === product.category || c.id === product.category);
  const siblings = products.filter(
    (p) => (p.category === product.category || p.categorySlug === product.category) && (p.slug !== product.slug && p.id !== product.id)
  );

  return (
    <>
      <PageHeader
        tag={product.brand}
        title={product.name}
        lead={product.desc}
        trail={[
          { label: 'Products', to: '/products' },
          { label: category?.title ?? product.category, to: `/products/${category?.slug || product.category}` }
        ]}
      />

      <section className="container product-detail">
        <div className="product-detail-grid">
          {/* Visual column */}
          <div>
            <div className="glass-card product-detail-media">
              {product.image ? (
                <img src={product.image} alt={product.imageAlt || product.name} />
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

            <h3 className="product-detail-subhead">Technical Specifications & Scope</h3>
            <ul className="spec-list">
              {(product.specs || []).map((spec, index) => (
                <li key={index}>
                  <Icon name="check" size={16} />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>

            {/* Structured Quick Technical Specs Matrix */}
            <div className="glass-card" style={{ marginTop: '1.5rem', marginBottom: '1.5rem', padding: '1.25rem', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.8rem', color: 'var(--accent-cyan)' }}>
                Technical Parameters
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.8rem', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Availability</span>
                  <strong>Ankleshwar GIDC Stock</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Standard Warranty</span>
                  <strong>12 - 24 Months</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Compliance</span>
                  <strong>IS / IEC Certified</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Documentation</span>
                  <strong>Test Certificate & Manual</strong>
                </div>
              </div>
            </div>

            <div className="product-detail-actions" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
              <button className="btn btn-primary" onClick={() => onOpenRFQ(product.name)}>
                <Icon name="fileText" size={16} />
                Request Formal Quotation
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => onOpenRFQ(`${product.name} - Technical Datasheet Request`)}
                title="Request official manufacturer PDF datasheet"
              >
                <Icon name="fileText" size={16} />
                Request Datasheet (PDF)
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
          {product.intro && product.intro.length > 0 && (
            <div className="glass-card extra-intro-card">
              <h3 className="section-subheading accent-color">Overview</h3>
              {product.intro.map((p, idx) => (
                <p key={idx} className="content-paragraph">{p}</p>
              ))}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '2rem' }}>
            {product.applications && product.applications.length > 0 && (
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

            {product.whyChoose && product.whyChoose.length > 0 && (
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

          {product.faqs && product.faqs.length > 0 && (
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
                <ProductCard key={p.slug || p.id} product={p} onOpenRFQ={onOpenRFQ} />
              ))}
            </div>
          </div>
        )}

        <div className="section-actions">
          <Link to={`/products/${category?.slug || product.category}`} className="btn btn-secondary">
            <Icon name="chevronLeft" size={16} />
            Back to {category?.title ?? 'Products'}
          </Link>
        </div>
      </section>
    </>
  );
}
