import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Icon from '../components/Icon';

export default function NotFoundPage() {
  return (
    <>
      <PageHeader
        tag="404"
        title="Page Not Found"
        lead="The page you were looking for has moved or never existed."
      />

      <section className="notfound-section container">
        <div className="section-actions">
          <Link to="/" className="btn btn-primary">
            <Icon name="home" size={16} />
            Back to Home
          </Link>
          <Link to="/products" className="btn btn-secondary">
            Browse Products
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
