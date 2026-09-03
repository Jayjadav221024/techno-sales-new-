import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Icon from '../components/Icon';
import Img from '../components/Img';
import ProductCard from '../components/ProductCard';
import PartnerCarousel from '../components/PartnerCarousel';
import FeaturesAccordion from '../components/FeaturesAccordion';
import LocationMap from '../components/LocationMap';
import CtaBand from '../components/CtaBand';
import StatsBand from '../components/StatsBand';
import EasierBand from '../components/EasierBand';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { useSiteData } from '../context/SiteDataContext';
import { useSection, useSectionProps } from '../context/SiteContentContext';
import { BRAND_MARQUEE } from '../data/site';

export default function HomePage({ onOpenRFQ }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const navigate = useNavigate();
  const { products, testimonials, blogs, faqs, partners } = useSiteData();

  // Editable copy. Each returns the saved wording, or the built-in text
  // from data/sections.js when nobody has changed it.
  const brands = useSection('home.brands');
  const productsCopy = useSection('home.products');
  const features = useSection('home.features');
  const industries = useSection('home.industries');
  const process = useSection('home.process');
  const partnerships = useSection('home.partnerships');
  const testimonialsCopy = useSection('home.testimonials');
  const blogCopy = useSection('home.blog');
  const faqCopy = useSection('home.faq');

  // Hooks cannot run inside the conditionals some sections sit in,
  // so every section's editor props are resolved up here.
  const spBrands = useSectionProps('home.brands');
  const spProducts = useSectionProps('home.products');
  const spFeatures = useSectionProps('home.features');
  const spIndustries = useSectionProps('home.industries');
  const spProcess = useSectionProps('home.process');
  const spPartnerships = useSectionProps('home.partnerships');
  const spTestimonials = useSectionProps('home.testimonials');
  const spBlog = useSectionProps('home.blog');
  const spFaq = useSectionProps('home.faq');

  const featured = products.slice(0, 3);
  const quote = testimonials[0];
  const latestPosts = blogs.slice(0, 3);
  const topFaqs = faqs.slice(0, 4);

  return (
    <>
      <Hero
        products={products}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectProduct={(id) => navigate(`/product/${id}`)}
        onOpenRFQ={() => onOpenRFQ()}
      />

      {/* Authorized Brands Infinite Marquee */}
      <section id="brands" className="brands-section" {...spBrands}>
        <p className="brands-eyebrow">{brands.eyebrow}</p>

        <div className="marquee-container">
          <div className="marquee-content">
            {[0, 1, 2, 3].map((pass) =>
              BRAND_MARQUEE.map((brand) => (
                <div
                  className="brand-logo-tile"
                  key={`${pass}-${brand.name}`}
                  aria-hidden={pass > 0 ? 'true' : undefined}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="brand-logo-img"
                    loading="lazy"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="products-section container" {...spProducts}>
        <div className="section-header reveal-on-scroll">
          <span className="section-tag">{productsCopy.tag}</span>
          <h2 className="section-title">{productsCopy.title}</h2>
          <p className="section-desc">{productsCopy.desc}</p>
        </div>

        <div className="products-grid">
          {featured.map((product) => (
            <ProductCard key={product.slug || product.id} product={product} onOpenRFQ={onOpenRFQ} />
          ))}
        </div>

        <div className="section-actions reveal-on-scroll">
          <Link to="/products" className="btn btn-secondary">
            <span>Explore All Industrial Products</span>
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </section>

      {/* Why Choose Techno Sales - Horizontal Accordion with rich imagery */}
      <section id="about" className="features-section container" {...spFeatures}>
        <div className="section-header reveal-on-scroll">
          <span className="section-tag">{features.tag}</span>
          <h2 className="section-title">{features.title}</h2>
          <p className="section-desc">{features.desc}</p>
        </div>

        <FeaturesAccordion items={features.items ?? []} />
      </section>

      {/* Industries We Serve - Infinite Horizontal Marquee */}
      <section className="industries-section" {...spIndustries}>
        <div className="container">
          <div className="section-header reveal-on-scroll">
            <span className="section-tag">{industries.tag}</span>
            <h2 className="section-title">{industries.title}</h2>
            <p className="section-desc">{industries.desc}</p>
          </div>
        </div>

        <div className="industries-marquee-container">
          <div className="industries-marquee-track">
            {[0, 1].map((pass) =>
              (industries.items ?? []).map((ind, i) => (
                <div
                  className="glass-card industry-marquee-card"
                  key={`${pass}-${i}`}
                  aria-hidden={pass > 0 ? 'true' : undefined}
                >
                  <div className="industry-icon">
                    <Icon name={ind.icon} size={24} />
                  </div>
                  <h3 className="industry-name">{ind.name}</h3>
                  <p className="industry-desc">{ind.desc}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* How We Work - Process Steps */}
      <section className="process-section" {...spProcess}>
        <div className="container">
          <div className="section-header reveal-on-scroll">
            <span className="section-tag">{process.tag}</span>
            <h2 className="section-title">{process.title}</h2>
            <p className="section-desc">{process.desc}</p>
          </div>

          <div className="process-steps">
            {(process.items ?? []).map((step, i) => (
              <div className="glass-card process-step reveal-on-scroll" key={i}>
                <div className="step-number">0{i + 1}</div>
                <div className="step-icon">
                  <Icon name={step.icon} size={22} />
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Partnerships — the spotlight carousel covers every partner, so
          there is no separate static grid above it. */}
      <section className="partnerships-section container" {...spPartnerships}>
        <div className="section-header reveal-on-scroll">
          <span className="section-tag">{partnerships.tag}</span>
          <h2 className="section-title">{partnerships.title}</h2>
          <p className="section-desc">{partnerships.desc}</p>
        </div>

        <PartnerCarousel partners={partners} />
      </section>

      {/* Interactive 3D Product Sizing Tool banner */}
      <EasierBand onOpenRFQ={onOpenRFQ} />

      {/* Testimonials Auto-Changing Carousel */}
      {testimonials && testimonials.length > 0 && (
        <section className="testimonials-section container" {...spTestimonials}>
          <div className="section-header reveal-on-scroll">
            <span className="section-tag">{testimonialsCopy.tag}</span>
            <h2 className="section-title">{testimonialsCopy.title}</h2>
          </div>

          <TestimonialCarousel testimonials={testimonials} interval={4500} />
        </section>
      )}

      {/* Stats Band */}
      <StatsBand />

      {/* Latest from Blog */}
      {latestPosts.length > 0 && (
        <section className="blog-section container" {...spBlog}>
          <div className="section-header reveal-on-scroll">
            <span className="section-tag">{blogCopy.tag}</span>
            <h2 className="section-title">{blogCopy.title}</h2>
            <p className="section-desc">{blogCopy.desc}</p>
          </div>

          <div className="blog-grid">
            {latestPosts.map((post) => (
              <article className="glass-card blog-card reveal-on-scroll" key={post.slug || post.id}>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span className="blog-topic">{post.topic}</span>
                    <span className="blog-date">{post.date}</span>
                  </div>
                  <h3 className="blog-card-title">
                    <Link to={`/blog/${post.slug || post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug || post.id}`} className="blog-card-link">
                    Read Article
                    <Icon name="arrowRight" size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="section-actions reveal-on-scroll">
            <Link to="/blog" className="btn btn-secondary">
              <span>View All Articles</span>
              <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {topFaqs.length > 0 && (
        <section className="faq-section container" {...spFaq}>
          <div className="section-header reveal-on-scroll">
            <span className="section-tag">{faqCopy.tag}</span>
            <h2 className="section-title">{faqCopy.title}</h2>
          </div>

          <div className="faq-accordion reveal-on-scroll">
            {topFaqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div className={`glass-card faq-item${isOpen ? ' is-open' : ''}`} key={i}>
                  <h3>
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <Icon name="chevronDown" size={18} className="faq-caret" />
                    </button>
                  </h3>
                  {isOpen && <p className="faq-answer">{faq.a}</p>}
                </div>
              );
            })}
          </div>

          <div className="section-actions reveal-on-scroll">
            <Link to="/faq" className="btn btn-secondary">
              <span>View All FAQs</span>
              <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </section>
      )}

      {/* Google Map Section with integrated CTA band */}
      <LocationMap
        tag="VISIT US"
        title="Find Our Ankleshwar Office"
        lead="Walk in for switchgear, motor spares and cut-to-length cable — our GIDC counter is five minutes off Old NH 8, with stock on the shelf and a technical team on the floor."
      />
    </>
  );
}
