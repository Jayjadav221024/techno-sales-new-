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

        <div className="related-categories reveal-on-scroll">
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
