import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import NotFoundPage from './NotFoundPage';
import Icon from '../components/Icon';
import Img from '../components/Img';
import { BLOG_POSTS } from '../data/site';

const WORDS_PER_MINUTE = 200;

/** Minutes to read what is actually on the page, tags stripped. */
function readingMinutes(post) {
  const text = `${post.excerpt || ''} ${(post.body || '').replace(/<[^>]+>/g, ' ')}`;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return <NotFoundPage />;

  // Recent/Popular feeds: show 5 other recent posts
  const recentPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 5);

  return (
    <>
      {/* No `lead` here on purpose. PageHeader already ends the trail with the
          title, and the excerpt now opens the article itself — printing it in
          the banner too meant reading the same paragraph twice. */}
      <PageHeader tag={post.topic} title={post.title} trail={[{ label: 'Blog', to: '/blog' }]} />

      <section className="container blog-detail-section">
        <div className="blog-layout">
          <article className="glass-card blog-post-card">
            {post.image && (
              <Img src={post.image} alt="" className="blog-post-cover" loading="eager" />
            )}

            <div className="blog-post-inner">
              <div className="blog-post-meta">
                <span>
                  <Icon name="zap" size={14} />
                  {post.topic}
                </span>
                <span className="blog-date-sep" aria-hidden="true" />
                <span>{post.date}</span>
                <span className="blog-date-sep" aria-hidden="true" />
                <span>
                  <Icon name="clock" size={14} />
                  {readingMinutes(post)} min read
                </span>
              </div>

              <p className="blog-post-standfirst">{post.excerpt}</p>

              {/* Every entry in blogPosts.js stops at the excerpt — none carry
                  a `body`, which is why this card rendered as an empty box.
                  The markup only mounts once there is something to put in it. */}
              {post.body && (
                <div
                  className="blog-post-body"
                  dangerouslySetInnerHTML={{ __html: post.body }}
                />
              )}

              <Link to="/blog" className="btn btn-secondary btn-sm blog-post-back">
                <Icon name="chevronLeft" size={16} />
                All Articles
              </Link>
            </div>
          </article>

          <aside className="blog-sidebar">
            <div className="glass-card blog-sidebar-card">
              <h2 className="blog-sidebar-title">Popular Feeds</h2>

              <ul className="blog-feed-list">
                {recentPosts.map((rp) => (
                  <li key={rp.slug}>
                    <Link to={`/blog/${rp.slug}`}>{rp.title}</Link>
                    <span>{rp.date}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card blog-sidebar-card blog-sidebar-cta">
              <h2 className="blog-sidebar-title">Need Technical Advice?</h2>
              <p>
                Get expert sizing and genuine-brand supply info for your industrial setups
                directly from our engineers.
              </p>
              <Link to="/contact" className="btn btn-primary btn-sm">
                Contact Our Team
                <Icon name="arrowRight" size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
