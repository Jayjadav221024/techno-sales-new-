import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Icon from '../components/Icon';
import Img from '../components/Img';
import { useSiteData } from '../context/SiteDataContext';

const POSTS_PER_PAGE = 8;

export default function BlogPage() {
  const { blogs } = useSiteData();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Extract unique topics
  const topics = useMemo(() => {
    const list = ['All'];
    blogs.forEach((b) => {
      if (b.topic && !list.includes(b.topic)) {
        list.push(b.topic);
      }
    });
    return list;
  }, [blogs]);

  // Filter and Sort posts
  const filteredAndSortedPosts = useMemo(() => {
    return blogs
      .filter((post) => {
        const matchesTopic = selectedTopic === 'All' || post.topic === selectedTopic;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          post.title?.toLowerCase().includes(q) ||
          post.excerpt?.toLowerCase().includes(q) ||
          post.topic?.toLowerCase().includes(q) ||
          post.author?.toLowerCase().includes(q);

        return matchesTopic && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.date || 0) - new Date(a.date || 0);
        }
        if (sortBy === 'oldest') {
          return new Date(a.date || 0) - new Date(b.date || 0);
        }
        if (sortBy === 'title-asc') {
          return (a.title || '').localeCompare(b.title || '');
        }
        if (sortBy === 'title-desc') {
          return (b.title || '').localeCompare(a.title || '');
        }
        return 0;
      });
  }, [blogs, searchQuery, selectedTopic, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedPosts.length / POSTS_PER_PAGE) || 1;
  const currentSafePage = Math.min(currentPage, totalPages);
  const startIndex = (currentSafePage - 1) * POSTS_PER_PAGE;
  const selectedPosts = filteredAndSortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Popular Feeds sidebar (first 5 original posts)
  const popularFeeds = blogs.slice(0, 5);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTopic('All');
    setSortBy('newest');
    setCurrentPage(1);
  };

  return (
    <>
      <PageHeader
        tag="KNOWLEDGE BASE"
        title="Technical Blog & Articles"
        lead="Switchgear standards, motor efficiency benchmarks, cable selection and electrical safety guidance for 2026."
      />

      <section className="container blogs-section">
        {/* Filter and Search Bar Controls */}
        <div className="blog-controls-wrapper glass-card">
          <div className="blog-search-bar">
            <Icon name="search" size={18} className="blog-search-icon" />
            <input
              type="text"
              placeholder="Search articles by title, keyword, standard..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="blog-search-input"
              aria-label="Search blog articles"
            />
            {searchQuery && (
              <button
                type="button"
                className="blog-search-clear"
                onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
                aria-label="Clear search query"
              >
                <Icon name="close" size={16} />
              </button>
            )}
          </div>

          <div className="blog-sort-filter-row">
            {/* Topic Filter Pills */}
            <div className="blog-topic-pills" role="tablist" aria-label="Filter articles by topic">
              {topics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  className={`blog-topic-pill ${selectedTopic === topic ? 'is-active' : ''}`}
                  onClick={() => handleTopicChange(topic)}
                  role="tab"
                  aria-selected={selectedTopic === topic}
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="blog-sort-select-wrap">
              <label htmlFor="blog-sort-select" className="blog-sort-label">
                <Icon name="sliders" size={16} />
                <span>Sort by:</span>
              </label>
              <select
                id="blog-sort-select"
                value={sortBy}
                onChange={handleSortChange}
                className="blog-sort-select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title-asc">Title (A - Z)</option>
                <option value="title-desc">Title (Z - A)</option>
              </select>
            </div>
          </div>

          {/* Active Filter summary & reset */}
          {(searchQuery || selectedTopic !== 'All' || sortBy !== 'newest') && (
            <div className="blog-filter-status">
              <span>
                Found <strong>{filteredAndSortedPosts.length}</strong> {filteredAndSortedPosts.length === 1 ? 'article' : 'articles'}
                {searchQuery && <> matching &quot;<em>{searchQuery}</em>&quot;</>}
                {selectedTopic !== 'All' && <> in <strong>{selectedTopic}</strong></>}
              </span>
              <button type="button" onClick={clearFilters} className="blog-filter-reset">
                <Icon name="rotateCcw" size={13} />
                Reset filters
              </button>
            </div>
          )}
        </div>

        <div className="blog-layout" style={{ marginTop: '2.5rem' }}>
          {/* Main Blog Posts Column */}
          <div>
            {selectedPosts.length === 0 ? (
              <div className="glass-card blog-empty-card">
                <Icon name="search" size={38} className="blog-empty-icon" />
                <h3>No articles found</h3>
                <p>We could not find any articles matching your search query or selected topic filter.</p>
                <button type="button" onClick={clearFilters} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Clear All Filters
                </button>
              </div>
            ) : (
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
                          <Icon name={post.icon || 'bookOpen'} size={48} strokeWidth={1.5} />
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
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="blog-pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className={`btn ${currentSafePage === page ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    aria-current={currentSafePage === page ? 'page' : undefined}
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

            {/* Quick Topic Tags in Sidebar */}
            <div className="glass-card blog-sidebar-card" style={{ marginTop: '1.5rem' }}>
              <h2 className="blog-sidebar-title">Browse by Category</h2>
              <div className="blog-sidebar-tags">
                {topics.filter(t => t !== 'All').map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    className={`blog-topic-pill ${selectedTopic === topic ? 'is-active' : ''}`}
                    onClick={() => {
                      handleTopicChange(topic);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
