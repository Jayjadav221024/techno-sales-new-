import Icon from './Icon';

export default function Products({
  products,
  onSelectProduct,
  onOpenRFQ,
  searchQuery,
  onResetFilters,
  activeCategory,
  onCategoryChange
}) {
  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'motors', label: 'Industrial Motors (Siemens, CG, ABB)' },
    { id: 'switchgears', label: 'Siemens Switchgears' },
    { id: 'cables', label: 'Polycab Cables & Wires' },
    { id: 'frp', label: 'FRP Gratings & Trays' }
  ];

  // Filter products
  let filtered = products;
  if (activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q)
    );
  }

  const handleReset = () => {
    onResetFilters();
  };

  return (
    <section id="products" className="products-section container">
      <div className="section-header reveal-on-scroll">
        <span className="section-tag">ENGINEERED FOR INDUSTRY</span>
        <h2 className="section-title">Certified Industrial Product Solutions</h2>
        <p className="section-subtitle">Browse through our comprehensive range of high-efficiency motors, switchgears, cables, and structural FRP products with instant 3D specification view.</p>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div id="products-grid" className="products-grid">
        {filtered.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No industrial products matched your query.</p>
            <button className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }} onClick={handleReset}>
              Reset Filters
            </button>
          </div>
        ) : (
          filtered.map((product) => (
            <div key={product.id} className="glass-card product-card reveal-on-scroll">
              <div className="product-image-container">
                <span className="product-brand-tag">{product.brand}</span>
                <span className="product-badge-spec">{product.specBadge}</span>
                {product.image ? (
                  <img src={product.image} alt={product.name} className="product-image" />
                ) : (
                  <div
                    className="product-svg-icon"
                    style={{ color: 'var(--accent-cyan)' }}
                    dangerouslySetInnerHTML={{ __html: product.icon }}
                  />
                )}
              </div>
              <div className="product-body">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{product.desc}</p>
                <ul className="product-features">
                  {product.specs.map((spec, index) => (
                    <li key={index}>
                      <Icon name="check" size={14} strokeWidth={3} />
                      {spec}
                    </li>
                  ))}
                </ul>
                <div className="product-footer">
                  <button className="btn btn-secondary btn-sm" onClick={() => onSelectProduct(product.id)}>
                    <Icon name="eye" size={14} />
                    3D View & Specs
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => onOpenRFQ(product.name)}>
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
