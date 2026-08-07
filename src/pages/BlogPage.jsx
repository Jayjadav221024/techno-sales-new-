import PageHeader from '../components/PageHeader';
import CtaBand from '../components/CtaBand';
import Icon from '../components/Icon';
import { BLOG_POSTS } from '../data/site';

export default function BlogPage({ onOpenRFQ }) {
  return (
    <>
      <PageHeader
        tag="KNOWLEDGE BASE"
        title="Blog"
        lead="Switchgear standards, motor efficiency benchmarks, cable selection and electrical safety guidance for 2026."
      />

      <section className="container blogs-section">
        <div className="blogs-grid">
          {BLOG_POSTS.map((post) => (
            <div className="glass-card blog-card reveal-on-scroll" key={post.url}>
              <div className="blog-img-placeholder">
                <Icon name={post.icon} size={60} strokeWidth={1.5} />
              </div>
              <div className="blog-content">
                <span className="blog-date">
                  {post.date}
                  <span className="blog-date-sep" aria-hidden="true" />
                  {post.topic}
                </span>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm blog-read-btn"
                >
                  Read Article
                  <Icon name="arrowRight" size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand onOpenRFQ={onOpenRFQ} />
    </>
  );
}
