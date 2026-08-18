import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import CtaBand from '../components/CtaBand';
import Icon from '../components/Icon';
import Img from '../components/Img';
import { PRODUCTS_DATA, CATEGORIES } from '../data/site';

export default function ProductsPage({ onOpenRFQ }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');

  const tabs = [{ id: 'all', label: 'All Products' }, ...CATEGORIES];

  let filtered = PRODUCTS_DATA;
  if (activeCategory !== 'all') {
    filtered = filtered.filter((p) => p.category === activeCategory);
  }
  if (query.trim()) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)
    );
  }

  return (
    <>
      <PageHeader
        tag="ENGINEERED FOR INDUSTRY"
        title="Industrial Products"
        lead="Certified motors, switchgear, cables and FRP structures — with instant 3D specification view and same-day quotations from our Ankleshwar GIDC stock."
      />

      <section className="products-section container">
        {/* Category landing cards */}
        <div className="category-cards">
          {CATEGORIES.map((cat) => (
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

        <div className="products-toolbar">
          <div className="category-tabs">
            {tabs.map((cat) => (
              <button
                key={cat.id}
                className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="products-search">
            <Icon name="search" size={18} />
            <input
              type="text"
              placeholder="Search products or brands..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search products"
            />
          </div>
        </div>

        <div className="products-grid">
          {filtered.length === 0 ? (
            <div className="products-empty">
              <p>No industrial products matched your query.</p>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setActiveCategory('all');
                  setQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filtered.map((product) => (
              <ProductCard key={product.id} product={product} onOpenRFQ={onOpenRFQ} />
            ))
          )}
        </div>
      </section>

      <CtaBand onOpenRFQ={onOpenRFQ} />
    </>
  );
}
