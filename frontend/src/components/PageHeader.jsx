import { Link } from 'react-router-dom';
import Icon from './Icon';

/**
 * Dark banner at the top of every inner page: title, optional lead paragraph,
 * and a breadcrumb trail back to Home.
 *
 * `trail` is the chain between Home and the current page, e.g.
 *   [{ label: 'Products', to: '/products' }]
 */
export default function PageHeader({ tag, title, lead, trail = [], ...rest }) {
  return (
    // `rest` carries the Website editor's data-section attributes when the page
    // passes them; on the live site it is empty.
    <header className="page-header" {...rest}>
      <div className="container">
        {tag && <span className="page-header-tag">{tag}</span>}
        <h1 className="page-header-title">{title}</h1>
        {lead && <p className="page-header-lead">{lead}</p>}

        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link to="/">
                <Icon name="home" size={15} />
                Home
              </Link>
            </li>
            {trail.map((crumb) => (
              <li key={crumb.label}>
                <Icon name="chevronRight" size={14} aria-hidden="true" />
                {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span>{crumb.label}</span>}
              </li>
            ))}
            <li>
              <Icon name="chevronRight" size={14} aria-hidden="true" />
              <span aria-current="page">{title}</span>
            </li>
          </ol>
        </nav>
      </div>
    </header>
  );
}
