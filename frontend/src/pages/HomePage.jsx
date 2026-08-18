import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Icon from '../components/Icon';
import Img from '../components/Img';
import ProductCard from '../components/ProductCard';
import PartnerCard from '../components/PartnerCard';
import PartnerCarousel from '../components/PartnerCarousel';
import CtaBand from '../components/CtaBand';
import StatsBand from '../components/StatsBand';
import EasierBand from '../components/EasierBand';
import {
  BRAND_MARQUEE,
  PRODUCTS_DATA,
  CATEGORIES,
  FEATURES,
  INDUSTRIES,
  PROCESS_STEPS,
  PARTNERS,
  TESTIMONIALS,
  BLOG_POSTS,
  FAQS,
  COMPANY,
  MAPS
} from '../data/site';

export default function HomePage({ onOpenRFQ }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const featured = PRODUCTS_DATA.slice(0, 3);
  const quote = TESTIMONIALS[0];
  const latestPosts = BLOG_POSTS.slice(0, 3);
  const topFaqs = FAQS.slice(0, 4);

  return (
    <>
      <Hero
        products={PRODUCTS_DATA}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectProduct={(id) => navigate(`/product/${id}`)}
        onOpenRFQ={() => onOpenRFQ()}
      />

      {/* Authorized Brands Infinite Marquee */}
      <section id="brands" className="brands-section">
        <p className="brands-eyebrow">Authorized Brands</p>

        <div className="marquee-container">
          {/* Four passes, not two: the animation translates the track by -50%,
              so half of it has to be at least as wide as the widest viewport
              or a bare stretch scrolls into view at the loop point. */}
          <div className="marquee-content">
            {[0, 1, 2, 3].map((pass) =>
              BRAND_MARQUEE.map((brand, i) => (
                <div
                  className="brand-logo-tile"
                  key={`${pass}-${brand.name}`}
                  aria-hidden={pass > 0 ? 'true' : undefined}
                >
                  {/* --i is the tile's slot in the flip rota: only one tile
                      turns at a time and they take it in turns. Passes 0 and 2
                      share a slot (as do 1 and 3) because the track loops by
                      translating -50% — its two halves have to stay identical
                      or the loop point shows a jump. Two tiles do share each
                      slot, but they sit a half-track apart, which is wider
                      than any viewport, so only one is ever on screen. */}
                  <div
                    className="brand-tile-inner"
                    style={{ '--i': (pass % 2) * BRAND_MARQUEE.length + i }}
                  >
                    <div className="brand-tile-face">
                      <Img
                        src={brand.logo}
                        alt={pass === 0 ? `${brand.name} logo` : ''}
                        loading="lazy"
                        width={158}
                        height={70}
                      />
                    </div>
                    <div className="brand-tile-face is-back" aria-hidden="true">
                      <Img src={brand.logo} alt="" loading="lazy" width={158} height={70} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* What we supply — category entry points */}
      <section className="categories-section container">
        <div className="section-header reveal-on-scroll">
          <span className="section-tag">WHAT WE SUPPLY</span>
          <h2 className="section-title">Four Product Lines, One Supplier</h2>
          <p className="section-subtitle">
            Everything an Ankleshwar plant needs for power, protection and structure — stocked
            locally and backed by genuine manufacturer warranty.
          </p>
        </div>

        <div className="category-cards reveal-on-scroll">
          {CATEGORIES.map((cat) => (
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
      </section>

      {/* Featured products */}
      <section className="products-section container section-alt">
        <div className="section-header reveal-on-scroll">
          <span className="section-tag">ENGINEERED FOR INDUSTRY</span>
          <h2 className="section-title">Popular Right Now</h2>
          <p className="section-subtitle">
            The lines our customers reorder most, each with full specifications and an interactive
            3D view.
          </p>
        </div>

        <div className="products-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} onOpenRFQ={onOpenRFQ} />
          ))}
        </div>

        <div className="section-actions reveal-on-scroll">
          <Link to="/products" className="btn btn-primary">
            View the Full Catalog
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </section>

      {/* Why choose us */}
      <section className="why-us-section">
        <div className="container">
          <div className="section-header reveal-on-scroll">
            <span className="section-tag">THE TECHNO SALES ADVANTAGE</span>
            <h2 className="section-title">Why Ankleshwar Industries Trust Us</h2>
            <p className="section-subtitle">
              We don't just supply components — we deliver end-to-end technical expertise, reliable
              inventory, and post-installation support.
            </p>
          </div>

          <div className="features-grid">
            {FEATURES.map((feature) => (
              <div className="glass-card feature-card reveal-on-scroll" key={feature.title}>
                <div className="feature-icon-wrapper">
                  <Icon name={feature.icon} size={28} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What the integrated supply model actually buys you. Sits between two
          card grids on purpose — it breaks up the run of tiles. */}
      <EasierBand />

      {/* Industries served */}
      <section className="industries-section container section-alt">
        <div className="section-header reveal-on-scroll">
          <span className="section-tag">WHO WE SERVE</span>
          <h2 className="section-title">Built for the Plants Around Us</h2>
          <p className="section-subtitle">
            Ankleshwar GIDC runs on chemicals, pharma and processing. We stock for those duties
            specifically, not for a generic catalog.
          </p>
        </div>

        <div className="industry-grid">
          {INDUSTRIES.map((industry) => (
            <div className="glass-card industry-card reveal-on-scroll" key={industry.name}>
              <Icon name={industry.icon} size={26} />
              <div>
                <h3>{industry.name}</h3>
                <p>{industry.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="process-section">
        <div className="container">
          <div className="section-header reveal-on-scroll">
            <span className="section-tag">HOW IT WORKS</span>
            <h2 className="section-title">From Enquiry to Plant Floor</h2>
            <p className="section-subtitle">
              No call centre, no guesswork — you talk to the people who actually size and supply
              the equipment.
            </p>
          </div>

          <ol className="process-steps">
            {PROCESS_STEPS.map((step, index) => (
              <li className="process-step reveal-on-scroll" key={step.title}>
                <span className="process-step-num">{String(index + 1).padStart(2, '0')}</span>
                <Icon name={step.icon} size={24} />
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Milestones */}
      <StatsBand />

      {/* Brand partnerships */}
      <section className="partner-brands-section container section-alt">
        <div className="section-header reveal-on-scroll">
          <span className="section-tag">AUTHORIZED INDUSTRIAL DISTRIBUTOR</span>
          <h2 className="section-title">Official Brand Partnerships</h2>
          <p className="section-subtitle">
            Authorized channel partners for India's leading electrical, motor, cable and structural
            brands — so every item ships with genuine factory warranty.
          </p>
        </div>

        <PartnerCarousel />
      </section>

      {/* Testimonial teaser */}
      <section className="testimonials-section container">
        <div className="section-header reveal-on-scroll">
          <span className="section-tag">CLIENT FEEDBACK</span>
          <h2 className="section-title">What Industrial Leaders Say</h2>
        </div>

        <div className="glass-card testimonial-card reveal-on-scroll">
          <div className="quote-icon">
            <Icon name="quote" size={56} strokeWidth={1.5} />
          </div>
          <p className="testimonial-text">"{quote.text}"</p>
          <div className="client-info">
            <div className="client-avatar">{quote.initials}</div>
            <div className="client-details">
              <h4>{quote.name}</h4>
              <p>{quote.role}</p>
            </div>
          </div>
        </div>

        <div className="section-actions reveal-on-scroll">
          <Link to="/testimonials" className="btn btn-secondary">
            Read All Testimonials
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </section>

      {/* Latest guides */}
      <section className="blogs-section container section-alt">
        <div className="section-header reveal-on-scroll">
          <span className="section-tag">KNOWLEDGE BASE</span>
          <h2 className="section-title">Latest Industrial Guides</h2>
          <p className="section-subtitle">
            Selection guides and standards explainers written for engineers doing the specifying.
          </p>
        </div>

        <div className="blogs-grid">
          {latestPosts.map((post) => (
            <div className="glass-card blog-card reveal-on-scroll" key={post.url}>
              {post.image ? (
                <div className="blog-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                  <Img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ) : (
                <div className="blog-img-placeholder">
                  <Icon name={post.icon} size={60} strokeWidth={1.5} />
                </div>
              )}
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

        <div className="section-actions reveal-on-scroll">
          <Link to="/blog" className="btn btn-secondary">
            All Articles &amp; Guides
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </section>

      {/* FAQ preview + location */}
      <section className="home-faq-section container">
        <div className="home-faq-grid">
          <div className="reveal-on-scroll">
            <span className="section-tag">COMMON INQUIRIES</span>
            <h2 className="section-title home-faq-title">Questions We Hear Often</h2>
            <div className="home-faq-list">
              {topFaqs.map((item) => (
                <div className="home-faq-item" key={item.q}>
                  <Icon name="check" size={16} />
                  <div>
                    <h3>{item.q}</h3>
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/faq" className="btn btn-secondary btn-sm home-faq-more">
              See All FAQs
              <Icon name="arrowRight" size={15} />
            </Link>
          </div>

          <aside className="glass-card home-visit-card reveal-on-scroll" style={{ overflow: 'hidden', padding: 0 }}>
            {/* Live map instead of a stock warehouse photo — the card is about
                getting people to the counter, and it is lazy so it costs the
                homepage nothing until it scrolls into view. */}
            <iframe
              className="home-visit-map"
              title="Google Map showing the Techno Sales counter in Ankleshwar GIDC"
              src={MAPS.embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div style={{ padding: '2rem' }}>
              <h3>Visit the Counter</h3>
              <p className="home-visit-address">
                <Icon name="mapPin" size={18} />
                {COMPANY.address}
              </p>
              <p className="home-visit-line">
                <Icon name="clock" size={18} />
                {COMPANY.hours}
              </p>
              <p className="home-visit-line">
                <Icon name="phone" size={18} />
                <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
              </p>
              <p className="home-visit-line">
                <Icon name="mail" size={18} />
                <a href={COMPANY.emailHref}>{COMPANY.email}</a>
              </p>
              {/* "Get Directions" now actually gets directions, rather than
                  routing to a page that has a second copy of this address. */}
              <a
                href={MAPS.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary home-visit-cta"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Icon name="mapPin" size={16} />
                Get Directions
              </a>
              <Link
                to="/contact"
                className="btn btn-secondary home-visit-cta"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Send an Enquiry
                <Icon name="arrowRight" size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand onOpenRFQ={onOpenRFQ} />
    </>
  );
}
