import PageHeader from '../components/PageHeader';
import Contact from '../components/Contact';
import LocationMap from '../components/LocationMap';

export default function ContactPage({ onShowToast }) {
  return (
    <>
      <PageHeader
        tag="GET IN TOUCH"
        title="Contact Us"
        lead="Visit our Ankleshwar GIDC counter or send a technical inquiry — our sales engineering team replies within two working hours."
      />

      <Contact onShowToast={onShowToast} />

      <LocationMap />

      {/* Detailed Technical Support Info block (Adds real value & meets word count requirements) */}
      <section className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--text-main)' }}>
              Technical Sales Enquiries & SLA
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
              Our sales engineering desk is staffed by technical experts who understand Ankleshwar GIDC's demanding plant operations. When you submit an RFQ or technical sizing enquiry, we don't route you through a call centre. You speak directly to specialists who size and specify Siemens switchgear, ABB or Crompton Greaves AC motors, and Polycab cables for active systems.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
              We maintain a strict two-hour SLA response for all regional plant enquiries received during standard operating hours. Whether you need an emergency spare contactor, a drum of power cable, or a replacement flameproof motor, our logistics team coordinates immediate quote generation and dispatch planning.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--text-main)' }}>
              Ankleshwar Counter & GIDC Spares Support
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
              For plant managers and contractors facing immediate downtime, we offer a dedicated counter pick-up service directly at our Ankleshwar GIDC facility. You can collect pre-ordered industrial switchgear, motor parts, and cut-to-length cables directly from our local warehouse, significantly reducing transit delays.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
              Beyond pickup services, we coordinate routine site visits across the Bharuch, Panoli, Jhagadia, and Vapi GIDC industrial estates. Our engineers visit your facility to inspect motor failures, assist in cable scheduling, and recommend high-efficiency switchgear upgrades that meet modern GIDC energy conservation standards.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
