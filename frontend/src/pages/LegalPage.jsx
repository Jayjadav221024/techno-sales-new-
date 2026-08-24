import PageHeader from '../components/PageHeader';
import { Link } from 'react-router-dom';

export default function LegalPage({ type = 'privacy' }) {
  const isPrivacy = type === 'privacy';

  return (
    <>
      <PageHeader
        tag="LEGAL & COMPLIANCE"
        title={isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
        lead={
          isPrivacy
            ? 'How Techno Sales collects, utilizes, and protects information submitted via our B2B procurement platform.'
            : 'Commercial terms and procurement conditions governing quotations, supply, and services from Techno Sales Ankleshwar.'
        }
      />

      <section className="container" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '5rem' }}>
        <div className="glass-card" style={{ padding: '2.5rem', lineHeight: '1.7', color: 'var(--text-main)' }}>
          {isPrivacy ? (
            <>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
                1. Information Collection and Industrial Enquiries
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                Techno Sales collects business contact details (name, corporate email, mobile number, plant/company name, and equipment specifications) strictly for preparing formal commercial quotations, sizing electro-mechanical hardware, and fulfilling procurement orders.
              </p>

              <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
                2. Use of Information
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                Information provided through our Request for Quotation (RFQ) and technical inquiry forms is routed directly to our sales engineering desk in Ankleshwar GIDC. We do not sell, rent, or trade client commercial data to third-party advertisers.
              </p>

              <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
                3. Data Security & Storage
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                We maintain appropriate administrative and technical safeguards to secure commercial records, BOQ submissions, and communication logs against unauthorized access or disclosure.
              </p>

              <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
                4. Contact for Compliance
              </h2>
              <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
                For questions regarding our privacy practices or data retention, reach us directly at <a href="mailto:Mktg@Technosales.In">Mktg@Technosales.In</a> or call +91 98980 78247.
              </p>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
                1. Commercial Quotations & Pricing
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                All formal quotations issued by Techno Sales are valid for the timeframe stated on the official proforma or quote sheet, subject to raw material variations and manufacturer price revisions.
              </p>

              <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
                2. Genuine Equipment & Manufacturer Warranty
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                All products supplied (Siemens Motors & Switchgears, Crompton Greaves Motors, ABB Motors, Polycab Cables & Wires, and Industrial FRP Products) are 100% genuine and covered by respective OEM warranty terms against manufacturing defects.
              </p>

              <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
                3. Dispatch & Inspection
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                Ready stock dispatch occurs from our Ankleshwar GIDC warehouse. Commercial buyers are encouraged to verify goods upon receipt with test certificates and delivery challans.
              </p>

              <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
                4. Jurisdiction
              </h2>
              <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
                Commercial transactions and contracts are subject to the jurisdiction of courts in Ankleshwar / Bharuch, Gujarat, India.
              </p>
            </>
          )}

          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Last Updated: August 2026 · Techno Sales Ankleshwar
            </span>
            <Link to="/contact" className="btn btn-secondary btn-sm">
              Contact Compliance Desk
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
