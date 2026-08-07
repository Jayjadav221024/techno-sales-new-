import PageHeader from '../components/PageHeader';
import PartnerCard from '../components/PartnerCard';
import CtaBand from '../components/CtaBand';
import StatsBand from '../components/StatsBand';
import Icon from '../components/Icon';
import { FEATURES, PARTNERS, TEAM } from '../data/site';

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

      {/* Mission, vision, values, team */}
      <section className="about-values-section container">
        <div className="about-grid">
          <div className="glass-card about-card reveal-on-scroll">
            <h3>Our Core Value Points</h3>
            <h4>One-Stop Solution &amp; End-to-End Support</h4>
            <p>
              We know your time is valuable — that's why we focus on efficiency. Our integrated
              supply model means fewer delays, fewer vendors, and more reliability. We provide not
              just products, but peace of mind.
            </p>
          </div>

          <div className="glass-card about-card reveal-on-scroll">
            <h3>Mission &amp; Vision</h3>
            <p>
              <strong>Mission:</strong> To deliver trusted industrial and electrical solutions
              through quality products, expert service, and strong partnerships — empowering
              industries to perform better.
            </p>
            <p>
              <strong>Vision:</strong> To be the most reliable and preferred distributor of
              industrial products across India, known for integrity, innovation, and customer
              satisfaction.
            </p>
          </div>

          <div className="glass-card about-card reveal-on-scroll">
            <h3>Our Leadership Team</h3>
            {TEAM.map((member) => (
              <div className="team-member" key={member.name}>
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <StatsBand />

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
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </div>
      </section>

      <CtaBand onOpenRFQ={onOpenRFQ} />
    </>
  );
}
