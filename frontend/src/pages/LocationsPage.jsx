import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Icon from '../components/Icon';
import { CITY_LANDMARKS } from '../components/CityLandmarks';
import { useSection, useSectionProps } from '../context/SiteContentContext';

const LOCATIONS = [
  { name: 'Vadodara', district: 'Vadodara District', type: 'Engineering & Power' },
  { name: 'Ahmedabad', district: 'Ahmedabad District', type: 'Textile & Heavy Ind.' },
  { name: 'Anand', district: 'Anand District', type: 'Manufacturing & Agri' },
  { name: 'Ankleshwar', district: 'Bharuch District', type: 'Chemical Hub (HQ)' },
  { name: 'Bharuch', district: 'Bharuch District', type: 'Petrochem & Port' },
  { name: 'Surat', district: 'Surat District', type: 'Textile & Diamond' },
  { name: 'Rajkot', district: 'Rajkot District', type: 'Auto & Casting' },
  { name: 'Godhra', district: 'Panchmahal District', type: 'Industrial GIDC' },
  { name: 'Navsari', district: 'Navsari District', type: 'Processing Units' },
  { name: 'Vapi', district: 'Valsad District', type: 'Chemical & Paper' },
  { name: 'Bhuj', district: 'Kutch District', type: 'Port & Heavy Duty' },
  { name: 'Amreli', district: 'Amreli District', type: 'Fabrication & Power' },
  { name: 'Dahod', district: 'Dahod District', type: 'Logistics Corridor' }
];

export default function LocationsPage() {
  const locationsCopy = useSection('locations.intro');
  const locationsCopyProps = useSectionProps('locations.intro');
  return (
    <>
      <PageHeader
        {...locationsCopyProps}
        tag={locationsCopy.tag}
        title={locationsCopy.title}
        lead={locationsCopy.lead}
      />

      <section className="container">
        {/* Logistics & Stocking Strategy (Adds real details & meets word count requirements) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '3rem', marginBottom: '5rem' }}>
          <div>
            <h3 className="section-subheading">
              Industrial Distribution Across Gujarat
            </h3>
            <p className="content-paragraph">
              Techno Sales provides comprehensive industrial distribution and product logistics across all major industrial estates, manufacturing zones, and cities in Gujarat. With our central distribution hub in Ankleshwar GIDC, we support critical power distribution systems, chemical processing facilities, pharmaceutical plants, and manufacturing units in Vadodara, Ahmedabad, Surat, and Anand.
            </p>
            <p className="content-paragraph">
              Our sales engineering network regularly visits plant sites in Vapi, Rajkot, and Navsari to provide on-site technical sizing, product alignment, and emergency spares dispatch. This direct coverage allows us to maintain strict standards of supply chain reliability for switchgears, cables, and high-efficiency AC motors.
            </p>
          </div>

          <div>
            <h3 className="section-subheading">
              Logistics & Same-Day Spares Dispatch
            </h3>
            <p className="content-paragraph">
              We understand that downtime at a GIDC plant is incredibly costly. To minimize delays, we maintain dedicated inventory stocks for core product categories, allowing us to coordinate same-day dispatches and fast deliveries to nearby GIDC zones in Bharuch, Panoli, and Jhagadia.
            </p>
            <p className="content-paragraph">
              All shipments are packed according to industrial standards, protecting motors, cables, and switchgears from moisture and mechanical damage during transit. For larger projects in remote areas like Bhuj, Dahod, and Godhra, we offer consolidated shipping and coordinated deliveries directly to the project site.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: '1.75rem' }}>
          {LOCATIONS.map((loc) => (
            <Link 
              key={loc.name}
              to={`/locations/${loc.name.toLowerCase()}`}
              className="glass-card location-city-card reveal-on-scroll"
            >
              <div className="location-card-header">
                <div>
                  <h3 className="location-card-title">{loc.name}</h3>
                  <p className="location-card-desc">{loc.district}</p>
                </div>
                
                {/* Right side prominent city landmark line illustration */}
                <div className="location-landmark-badge" title={`${loc.name} Landmark`}>
                  {CITY_LANDMARKS[loc.name] || <Icon name="factory" size={36} />}
                </div>
              </div>

              <div className="location-card-footer">
                <span className="category-card-link">
                  View details
                  <Icon name="arrowRight" size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
