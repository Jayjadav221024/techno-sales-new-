import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import CtaBand from '../components/CtaBand';
import Icon from '../components/Icon';
import Img from '../components/Img';
import NotFoundPage from './NotFoundPage';
import { findCategory, productsInCategory, CATEGORIES } from '../data/site';

export default function CategoryPage({ onOpenRFQ }) {
  const { categoryId } = useParams();
  const category = findCategory(categoryId);
  const [faqOpenIndex, setFaqOpenIndex] = useState(-1);

  if (!category) return <NotFoundPage />;

  const products = productsInCategory(categoryId);
  const others = CATEGORIES.filter((c) => c.id !== categoryId);

  return (
    <>
      <PageHeader
        tag="PRODUCT LINE"
        title={category.title}
        lead={category.blurb}
      />

      <section className="category-detail-section container">
        {category.longIntro && (
          <div className="category-details-extra reveal-on-scroll" style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div className="glass-card extra-intro-card">
              <h3 className="section-subheading accent-color">Boost Productivity with High-Performance Motors</h3>
              {category.longIntro.map((p, idx) => (
                <p key={idx} className="content-paragraph">{p}</p>
              ))}
            </div>

            {category.subcategories && (
              <div className="glass-card extra-list-card">
                <h3 className="section-subheading accent-color">Product Categories</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {category.subcategories.map((sub, idx) => (
                    <div key={idx} style={{ borderLeft: '3px solid var(--accent-cyan)', paddingLeft: '1rem' }}>
                      <h4 className="subcategory-title">{sub.title}</h4>
                      <p className="subcategory-desc">{sub.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {category.faqs && (
              <div className="category-faq-accordion-section">
                <h3 className="faq-section-title">Frequently Asked Questions</h3>
                <div className="faq-accordion" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {category.faqs.map((faq, idx) => {
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
        )}

        <div className="related-categories reveal-on-scroll" style={{ marginTop: '5rem' }}>
          <h3>Other Product Lines</h3>
          <div className="category-cards">
            {others.map((cat) => (
              <Link to={`/products/${cat.id}`} className="glass-card category-card" key={cat.id}>
                <div className="category-card-image-wrapper">
                  <Img
                    src={cat.image}
                    alt={`${cat.title} category`}
                    className="category-card-image"
                    loading="lazy"
                  />
                </div>
                <div className="category-card-content">
                  <h3>{cat.title}</h3>
                  <p>{cat.tagline}</p>
                  <span className="category-card-link">
                    Browse
                    <Icon name="arrowRight" size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand onOpenRFQ={onOpenRFQ} />
    </>
  );
}
