import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import NotFoundPage from './NotFoundPage';
import Icon from '../components/Icon';
import Img from '../components/Img';
import { useSiteData } from '../context/SiteDataContext';
import { fetchBlogPostBySlug } from '../services/api';
import { seoFromRecord, useSeo } from '../utils/seo';

const WORDS_PER_MINUTE = 200;

/** Converts markdown text to clean structured HTML if content is in markdown format */
function formatBlogContent(content) {
  if (!content) return '';
  // If it already contains HTML tags like <p>, <h2>, <ul>, return as is
  if (/<(p|h[1-6]|ul|ol|div|blockquote|table)\b/i.test(content)) {
    return content;
  }

  // Pre-clean linebreaks & windows linebreaks
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const result = [];
  let inList = false;
  let listType = 'ul';
  let currentParagraph = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const pText = currentParagraph.join(' ').trim();
      if (pText) {
        result.push(`<p>${pText}</p>`);
      }
      currentParagraph = [];
    }
  };

  const closeList = () => {
    if (inList) {
      result.push(`</${listType}>`);
      inList = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      closeList();
      continue;
    }

    // Headings
    if (/^######\s+(.*)$/.test(line)) {
      flushParagraph();
      closeList();
      result.push(`<h6>${line.replace(/^######\s+/, '')}</h6>`);
    } else if (/^#####\s+(.*)$/.test(line)) {
      flushParagraph();
      closeList();
      result.push(`<h5>${line.replace(/^#####\s+/, '')}</h5>`);
    } else if (/^####\s+(.*)$/.test(line)) {
      flushParagraph();
      closeList();
      result.push(`<h4>${line.replace(/^####\s+/, '')}</h4>`);
    } else if (/^###\s+(.*)$/.test(line)) {
      flushParagraph();
      closeList();
      result.push(`<h3>${line.replace(/^###\s+/, '')}</h3>`);
    } else if (/^##\s+(.*)$/.test(line)) {
      flushParagraph();
      closeList();
      result.push(`<h2>${line.replace(/^##\s+/, '')}</h2>`);
    } else if (/^#\s+(.*)$/.test(line)) {
      flushParagraph();
      closeList();
      result.push(`<h1>${line.replace(/^#\s+/, '')}</h1>`);
    }
    // Unordered List item
    else if (/^(\*|-)\s+(.*)$/.test(line)) {
      flushParagraph();
      if (!inList || listType !== 'ul') {
        closeList();
        result.push('<ul>');
        inList = true;
        listType = 'ul';
      }
      const itemContent = line.replace(/^(\*|-)\s+/, '');
      result.push(`<li>${parseInlineMarkdown(itemContent)}</li>`);
    }
    // Ordered List item
    else if (/^\d+\.\s+(.*)$/.test(line)) {
      flushParagraph();
      if (!inList || listType !== 'ol') {
        closeList();
        result.push('<ol>');
        inList = true;
        listType = 'ol';
      }
      const itemContent = line.replace(/^\d+\.\s+/, '');
      result.push(`<li>${parseInlineMarkdown(itemContent)}</li>`);
    } else {
      closeList();
      currentParagraph.push(parseInlineMarkdown(line));
    }
  }

  flushParagraph();
  closeList();

  return result.join('\n');
}

/** Helper for inline formatting like bold, italic */
function parseInlineMarkdown(text) {
  return text
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

/** Minutes to read what is actually on the page, tags stripped. */
function readingMinutes(post) {
  const text = `${post.excerpt || ''} ${(post.content || post.body || '').replace(/<[^>]+>/g, ' ')}`;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const { blogs } = useSiteData();
  const [post, setPost] = useState(() => {
    return blogs.find((p) => p.slug === slug) || null;
  });

  useEffect(() => {
    const found = blogs.find((p) => p.slug === slug);
    if (found) {
      setPost(found);
    }
    // Also fetch direct from API to get latest edits immediately
    fetchBlogPostBySlug(slug).then((res) => {
      if (res) setPost(res);
    });
  }, [slug, blogs]);

  // Above the early return - hooks cannot run conditionally.
  useSeo(
    seoFromRecord(post, {
      title: post ? `${post.title} | Techno Sales Technical Hub` : undefined,
      description: post?.excerpt,
      type: 'article',
    }),
    [post, slug],
  );

  if (!post) return <NotFoundPage />;

  // Recent/Popular feeds: show 4 other recent posts so both sidebar cards fit comfortably
  const recentPosts = blogs.filter((p) => p.slug !== post.slug).slice(0, 4);

  return (
    <>
      {/* No `lead` here on purpose. PageHeader already ends the trail with the
          title, and the excerpt now opens the article itself — printing it in
          the banner too meant reading the same paragraph twice. */}
      <PageHeader tag={post.topic} title={post.title} trail={[{ label: 'Blogs', to: '/blog' }]} />

      <section className="container blog-detail-section">
        <div className="blog-layout">
          <article className="glass-card blog-post-card">
            {post.image && (
              <Img src={post.image} alt={post.imageAlt || post.title} className="blog-post-cover" loading="eager" />
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

              {/* Support content from admin panel (HTML or Markdown) or body from static dataset */}
              {(post.content || post.body) && (
                <div
                  className="blog-post-body"
                  dangerouslySetInnerHTML={{ __html: formatBlogContent(post.content || post.body) }}
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
