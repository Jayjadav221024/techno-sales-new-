import PageHeader from '../components/PageHeader';
import PartnerCard from '../components/PartnerCard';
import CtaBand from '../components/CtaBand';
import StatsBand from '../components/StatsBand';
import EasierBand from '../components/EasierBand';
import Icon from '../components/Icon';
import Img from '../components/Img';
import { FEATURES, PARTNERS, TEAM } from '../data/site';
import { useSection, useSectionProps } from '../context/SiteContentContext';
import { useCompany } from '../context/SiteContentContext';

export default function AboutPage({ onOpenRFQ }) {
  const COMPANY = useCompany();
  const aboutCopy = useSection('about.intro');
  const aboutCopyProps = useSectionProps('about.intro');
  return (
    <>
      <PageHeader
        {...aboutCopyProps}
        tag={aboutCopy.tag}
        title={aboutCopy.title}
        lead={aboutCopy.lead}
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
            <div style={{ display: 'inline-flex', padding: '0.6rem', borderRadius: '10px', background: 'var(--icon-tile)', color: 'var(--accent-cyan)', marginBottom: '1rem' }}>
              <Icon name="shieldCheck" size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>Our Mission</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              To deliver trusted industrial electro-mechanical solutions through certified products,
              rapid Ankleshwar dispatch, and application-specific engineering consultation — empowering Gujarat plants to achieve zero unplanned downtime.
            </p>
          </div>

          <div className="glass-card about-card reveal-on-scroll">
            <div style={{ display: 'inline-flex', padding: '0.6rem', borderRadius: '10px', background: 'var(--icon-tile)', color: 'var(--accent-cyan)', marginBottom: '1rem' }}>
              <Icon name="award" size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>Our Vision</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              To be the most reliable and preferred industrial distribution partner across Western India,
              celebrated for technical integrity, ready stock availability, and long-term client partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Industrial Growth & Milestone Journey Timeline */}
      <section className="container reveal-on-scroll" style={{ padding: '3rem 1.5rem' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag">OUR EVOLUTION</span>
          <h2 className="section-title">Milestone Journey & Industrial Heritage</h2>
          <p className="section-subtitle">Over a decade of trusted electro-mechanical supply excellence across Ankleshwar and Gujarat industrial estates.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.75rem', position: 'relative', borderTop: '3px solid var(--accent-cyan)' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)', display: 'block', marginBottom: '0.5rem' }}>2014</span>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Foundation in Ankleshwar</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Established operations in Ankleshwar GIDC to supply genuine industrial electric motors and switchgear components to regional chemical plants.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem', position: 'relative', borderTop: '3px solid var(--accent-cyan)' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)', display: 'block', marginBottom: '0.5rem' }}>2017</span>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Siemens & CG Alliances</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Formed authorized channel partnerships with Siemens and Crompton Greaves to deliver high-efficiency IE2/IE3/IE4 motors and SIRIUS switchgear.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem', position: 'relative', borderTop: '3px solid var(--accent-cyan)' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)', display: 'block', marginBottom: '0.5rem' }}>2020</span>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Polycab Cables & FRP Addition</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Expanded inventory with authorized Polycab LT/HT cables and anti-corrosive FRP structural gratings for heavy chemical & marine zones.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem', position: 'relative', borderTop: '3px solid var(--accent-cyan)' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)', display: 'block', marginBottom: '0.5rem' }}>2026</span>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>1,000+ Industrial Clients</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Supplying 10,000+ SKUs across 13+ industrial districts with a 99% client retention rate and 2-hour SLA response support.
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
          <div className="facility-details-card">
            <span className="section-tag">OUR FACILITY</span>
            <h3>Ankleshwar GIDC Warehouse</h3>
            <p>
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
