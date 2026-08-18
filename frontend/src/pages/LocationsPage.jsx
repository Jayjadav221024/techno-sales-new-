import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Icon from '../components/Icon';

const LOCATIONS = [
  { name: 'Vadodara', district: 'Vadodara District' },
  { name: 'Ahmedabad', district: 'Ahmedabad District' },
  { name: 'Anand', district: 'Anand District' },
  { name: 'Ankleshwar', district: 'Bharuch District' },
  { name: 'Bharuch', district: 'Bharuch District' },
  { name: 'Surat', district: 'Surat District' },
  { name: 'Rajkot', district: 'Rajkot District' },
  { name: 'Godhra', district: 'Panchmahal District' },
  { name: 'Navsari', district: 'Navsari District' },
  { name: 'Vapi', district: 'Valsad District' },
  { name: 'Bhuj', district: 'Kutch District' },
  { name: 'Amreli', district: 'Amreli District' },
  { name: 'Dahod', district: 'Dahod District' }
];

export default function LocationsPage() {
  return (
    <>
      <PageHeader
        tag="OUR footprint"
        title="Service Locations We Cover"
        lead="We supply and support our entire industrial product line across major industrial estates and cities in Gujarat. Click on any city to view local details, industries served, and nearby areas."
      />

      <section className="container">
        {/* Logistics & Stocking Strategy (Adds real details & meets word count requirements) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--text-main)' }}>
              Industrial Distribution Across Gujarat
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
              Techno Sales provides comprehensive industrial distribution and product logistics across all major industrial estates, manufacturing zones, and cities in Gujarat. With our central distribution hub in Ankleshwar GIDC, we support critical power distribution systems, chemical processing facilities, pharmaceutical plants, and manufacturing units in Vadodara, Ahmedabad, Surat, and Anand.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
              Our sales engineering network regularly visits plant sites in Vapi, Rajkot, and Navsari to provide on-site technical sizing, product alignment, and emergency spares dispatch. This direct coverage allows us to maintain strict standards of supply chain reliability for switchgears, cables, and high-efficiency AC motors.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--text-main)' }}>
              Logistics & Same-Day Spares Dispatch
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
              We understand that downtime at a GIDC plant is incredibly costly. To minimize delays, we maintain dedicated inventory stocks for core product categories, allowing us to coordinate same-day dispatches and fast deliveries to nearby GIDC zones in Bharuch, Panoli, and Jhagadia.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
              All shipments are packed according to industrial standards, protecting motors, cables, and switchgears from moisture and mechanical damage during transit. For larger projects in remote areas like Bhuj, Dahod, and Godhra, we offer consolidated shipping and coordinated deliveries directly to the project site.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {LOCATIONS.map((loc) => (
            <Link 
              key={loc.name}
              to={`/locations/${loc.name.toLowerCase()}`}
              className="glass-card reveal-on-scroll"
              style={{ textDecoration: 'none', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', transition: 'var(--transition-smooth)' }}
            >
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                {loc.name}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                {loc.district}
              </p>
              
              <span 
                className="category-card-link"
                style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', alignSelf: 'flex-start' }}
              >
                View details
                <Icon name="arrowRight" size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
