import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import CtaBand from '../components/CtaBand';
import Icon from '../components/Icon';
import Img from '../components/Img';
import { useSiteData } from '../context/SiteDataContext';

const POSTS_PER_PAGE = 10;

export default function BlogPage({ onOpenRFQ }) {
  const { blogs } = useSiteData();
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const selectedPosts = blogs.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Popular Feeds sidebar (show first 5 posts)
  const popularFeeds = blogs.slice(0, 5);

  return (
    <>
      <PageHeader
        tag="KNOWLEDGE BASE"
        title="Blog"
        lead="Switchgear standards, motor efficiency benchmarks, cable selection and electrical safety guidance for 2026."
      />

      <section className="container blogs-section">
        <div className="blog-layout">
          {/* Main Blog Posts Column */}
          <div>
            {/* The cards are deliberately not reveal-on-scroll. That class
                rests at opacity:0 until the observer marks it, and this list
                is the whole page — if it is ever missed, /blog is a blank
                column next to a sidebar. */}
            <div className="blog-list">
              {selectedPosts.map((post) => (
                <article className="glass-card blog-list-card" key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="blog-list-media"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    {post.image ? (
                      <Img src={post.image} alt="" />
                    ) : (
                      <span className="blog-list-media-fallback">
                        <Icon name={post.icon} size={48} strokeWidth={1.5} />
                      </span>
                    )}
                  </Link>

                  <div className="blog-list-body">
                    <span className="blog-date">
                      {post.date}
                      <span className="blog-date-sep" aria-hidden="true" />
                      {post.topic}
                    </span>

                    <h2 className="blog-title">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="blog-excerpt">{post.excerpt}</p>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="btn btn-secondary btn-sm blog-read-btn"
                    >
                      Read Article
                      <Icon name="arrowRight" size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="blog-pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`btn ${currentPage === page ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <aside className="blog-sidebar">
            <div className="glass-card blog-sidebar-card">
              <h2 className="blog-sidebar-title">Popular Feeds</h2>

              <ul className="blog-feed-list">
                {popularFeeds.map((rp) => (
                  <li key={rp.slug}>
                    <Link to={`/blog/${rp.slug}`}>{rp.title}</Link>
                    <span>{rp.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand onOpenRFQ={onOpenRFQ} />
    </>
  );
}
