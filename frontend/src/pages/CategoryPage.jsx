import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import CtaBand from '../components/CtaBand';
import Icon from '../components/Icon';
import NotFoundPage from './NotFoundPage';
import { findCategory, productsInCategory, CATEGORIES } from '../data/site';

export default function CategoryPage({ onOpenRFQ }) {
  const { categoryId } = useParams();
  const category = findCategory(categoryId);
  const [faqOpenIndex, setFaqOpenIndex] = useState(-1);

  if (!category) return <NotFoundPage />;

  const products = productsInCategory(category.id);
  const others = CATEGORIES.filter((c) => c.id !== category.id);

  return (
    <>
      <PageHeader
        tag={category.tagline}
        title={category.title}
        lead={category.blurb}
        trail={[{ label: 'Products', to: '/products' }]}
      />

      <section className="products-section container">
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onOpenRFQ={onOpenRFQ} />
          ))}
        </div>

        {/* Category Page Extra Content: Intro, Subcategories, FAQs */}
        {category.longIntro && (
          <div className="category-details-extra reveal-on-scroll" style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div className="glass-card extra-intro-card" style={{ padding: '2.5rem', backdropFilter: 'blur(10px)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent-cyan)' }}>Boost Productivity with High-Performance Motors</h3>
              {category.longIntro.map((p, idx) => (
                <p key={idx} style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: idx === category.longIntro.length - 1 ? '0' : '1.5rem' }}>{p}</p>
              ))}
            </div>

            {category.subcategories && (
              <div className="glass-card extra-list-card" style={{ padding: '2.5rem', backdropFilter: 'blur(10px)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent-cyan)' }}>Product Categories</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {category.subcategories.map((sub, idx) => (
                    <div key={idx} style={{ borderLeft: '3px solid var(--accent-cyan)', paddingLeft: '1rem' }}>
                      <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{sub.title}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>{sub.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {category.faqs && (
              <div className="category-faq-accordion-section">
                <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--accent-cyan)', textAlign: 'center' }}>Frequently Asked Questions</h3>
                <div className="faq-accordion" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {category.faqs.map((faq, idx) => {
                    const isOpen = faqOpenIndex === idx;
                    return (
                      <div className={`glass-card faq-item${isOpen ? ' is-open' : ''}`} key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                        <h3>
                          <button
                            type="button"
                            className="faq-question"
                            onClick={() => setFaqOpenIndex(isOpen ? -1 : idx)}
                            aria-expanded={isOpen}
                            style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '1.1rem', cursor: 'pointer', textAlign: 'left' }}
                          >
                            <span>{faq.q}</span>
                            <Icon name="chevronDown" size={18} className="faq-caret" style={{ transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'none' }} />
                          </button>
                        </h3>
                        {isOpen && (
                          <p className="faq-answer" style={{ padding: '0 1.5rem 1.25rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1rem' }}>
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
        )}

        <div className="related-categories reveal-on-scroll" style={{ marginTop: '5rem' }}>
          <h3>Other Product Lines</h3>
          <div className="category-cards">
            {others.map((cat) => (
              <Link to={`/products/${cat.id}`} className="glass-card category-card" key={cat.id}>
                <h3>{cat.title}</h3>
                <p>{cat.tagline}</p>
                <span className="category-card-link">
                  Browse
                  <Icon name="arrowRight" size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand onOpenRFQ={onOpenRFQ} />
    </>
  );
}
