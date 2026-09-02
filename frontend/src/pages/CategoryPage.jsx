import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import CtaBand from '../components/CtaBand';
import Icon from '../components/Icon';
import Img from '../components/Img';
import NotFoundPage from './NotFoundPage';
import { useSiteData } from '../context/SiteDataContext';
import { SEO_DEFAULTS } from '../data/seoDefaults';
import { seoFromRecord, useSeo } from '../utils/seo';

export default function CategoryPage({ onOpenRFQ }) {
  const { categoryId } = useParams();
  const { categories, products } = useSiteData();
  const [faqOpenIndex, setFaqOpenIndex] = useState(-1);

  const category = categories.find((c) => c.slug === categoryId || c.id === categoryId);

  // Above the early return - hooks cannot run conditionally.
  useSeo(
    seoFromRecord(category, {
      ...(SEO_DEFAULTS[`/products/${categoryId}`] ?? {
        title: category ? `${category.title || category.name} | Techno Sales` : undefined,
        description: category?.blurb,
      }),
    }),
    [category, categoryId],
  );

  if (!category) return <NotFoundPage />;

  const categoryProducts = products.filter(
    (p) => (p.category === (category.slug || category.id) || p.categorySlug === (category.slug || category.id))
  );
  const others = categories.filter((c) => (c.slug || c.id) !== (category.slug || category.id));

  return (
    <>
      <PageHeader
        tag="PRODUCT LINE"
        title={category.title}
        lead={category.blurb}
      />

      <section className="category-detail-section container">
        {category.longIntro && category.longIntro.length > 0 && (
          <div className="category-details-extra reveal-on-scroll" style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div className="glass-card extra-intro-card">
              <h3 className="section-subheading accent-color">Boost Productivity with High-Performance Motors</h3>
              {category.longIntro.map((p, idx) => (
                <p key={idx} className="content-paragraph">{p}</p>
              ))}
            </div>

            {category.subcategories && category.subcategories.length > 0 && (
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

            {category.faqs && category.faqs.length > 0 && (
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
                        {isOpen && <p className="faq-answer">{faq.a}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="category-products-grid" style={{ marginTop: '3.5rem' }}>
          <h2 style={{ marginBottom: '1.75rem' }}>Available in {category.title}</h2>
          <div className="products-grid">
            {categoryProducts.map((product) => (
              <ProductCard key={product.slug || product.id} product={product} onOpenRFQ={onOpenRFQ} />
            ))}
          </div>
        </div>

        {others.length > 0 && (
          <div className="other-categories reveal-on-scroll" style={{ marginTop: '4rem' }}>
            <h2 style={{ marginBottom: '1.75rem' }}>Explore Other Product Lines</h2>
            <div className="category-cards">
              {others.map((cat) => (
                <Link to={`/products/${cat.slug || cat.id}`} className="glass-card category-card" key={cat.slug || cat.id}>
                  <div className="category-card-image-wrapper">
                    <Img
                      src={cat.image}
                      alt={cat.imageAlt || `${cat.title} category`}
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
        )}

        <div className="section-actions" style={{ marginTop: '2.5rem' }}>
          <Link to="/products" className="btn btn-secondary">
            <Icon name="chevronLeft" size={16} />
            Back to All Products
          </Link>
        </div>
      </section>

      <CtaBand onOpenRFQ={onOpenRFQ} />
    </>
  );
}
