import PageHeader from '../components/PageHeader';
import PartnerCard from '../components/PartnerCard';
import CtaBand from '../components/CtaBand';
import StatsBand from '../components/StatsBand';
import EasierBand from '../components/EasierBand';
import Icon from '../components/Icon';
import Img from '../components/Img';
import { COMPANY, FEATURES, PARTNERS, TEAM } from '../data/site';

export default function AboutPage({ onOpenRFQ }) {
  return (
    <>
      <PageHeader
        tag="THE TECHNO SALES ADVANTAGE"
        title="About Us"
        lead="A decade of supplying industrial motors, switchgear, cables and FRP structures to the plants of Ankleshwar GIDC — with the engineering support to match."
      />

      {/* Advantages */}
      <section className="about-features-section container">
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
      </section>

      {/* What the integrated supply model actually buys you */}
      <EasierBand />

      {/* Mission and vision */}
      <section className="about-values-section container">
        <div className="about-grid">
          <div className="glass-card about-card reveal-on-scroll">
            <h3>Our Mission</h3>
            <p>
              To deliver trusted industrial and electrical solutions through quality products,
              expert service, and strong partnerships — empowering industries to perform better.
            </p>
          </div>

          <div className="glass-card about-card reveal-on-scroll">
            <h3>Our Vision</h3>
            <p>
              To be the most reliable and preferred distributor of industrial products across
              India, known for integrity, innovation, and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <StatsBand />

      {/* Warehouse & Facility Section */}
      <section className="about-facility-section container reveal-on-scroll">
        <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', overflow: 'hidden', padding: 0 }}>
          <Img 
            src="/images/sections/about.jpg" 
            alt="Techno Sales Warehouse Facility" 
            style={{ width: '100%', height: '100%', minHeight: '300px', objectFit: 'cover', display: 'block' }} 
          />
          <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="section-tag" style={{ color: 'var(--color-brand-400)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>OUR FACILITY</span>
            <h3 style={{ fontSize: '1.75rem', margin: '0.5rem 0 1rem 0', fontWeight: 800 }}>Ankleshwar GIDC Warehouse</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
              Our central warehouse is strategically located in Ankleshwar GIDC. Stocked with high-efficiency AC motors, industrial switchgears, heavy-duty power cables, and flexible wires, it enables us to ensure fast delivery times and support local processing and manufacturing plants.
            </p>
          </div>
        </div>
      </section>

      {/* The people behind the counter */}
      <section className="about-team-section container">
        <div className="section-header reveal-on-scroll">
          <span className="section-tag">THE PEOPLE BEHIND IT</span>
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">
            You deal with the same two people every time — the ones who size the equipment and
            answer for the delivery date.
          </p>
        </div>

        <div className="team-grid">
          {TEAM.map((member) => (
            <article className="team-card reveal-on-scroll" key={member.name}>
              <Img src={member.photo} alt={member.name} className="team-card-photo" />

              <div className="team-card-meta">
                <div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>

                <a
                  className="team-card-action"
                  href={`${COMPANY.emailHref}?subject=${encodeURIComponent(
                    `Enquiry for ${member.name}, ${member.role}`
                  )}`}
                  aria-label={`Email ${member.name}, ${member.role}`}
                >
                  <Icon name="mail" size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Brand partnerships */}
      <section className="partner-brands-section container">
        <div className="section-header reveal-on-scroll">
          <span className="section-tag">AUTHORIZED INDUSTRIAL DISTRIBUTOR</span>
          <h2 className="section-title">Official Brand Partnerships</h2>
          <p className="section-subtitle">
            We are authorized channel partners for India's leading industrial electrical, motor,
            cable, and structural reinforcement brands, ensuring 100% genuine factory warranty.
          </p>
        </div>

        <div className="partner-brands-grid">
          {PARTNERS.map((partner) => (
            <PartnerCard partner={partner} key={partner.name} />
          ))}
        </div>
      </section>

      <CtaBand onOpenRFQ={onOpenRFQ} />
    </>
  );
}
