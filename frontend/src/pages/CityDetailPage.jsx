import { useParams, Link } from 'react-router-dom';
import { COMPANY, PRODUCTS_DATA } from '../data/site';
import Icon from '../components/Icon';
import PageHeader from '../components/PageHeader';

const CITY_DATA = {
  vadodara: {
    name: 'Vadodara',
    district: 'Vadodara District',
    title: 'Industrial Motors, Cables & FRP Gratings in Vadodara',
    desc: "Vadodara's heavy engineering, chemical manufacturing, and power transmission clusters require high-performance, certified components built to withstand intense production environments.",
    distance: '~85 KM',
    zones: '5',
    phone: COMPANY.phone,
    phoneHref: COMPANY.phoneHref
  },
  ahmedabad: {
    name: 'Ahmedabad',
    district: 'Ahmedabad District',
    title: 'FRP Gratings, Cable Trays & Industrial Drives in Ahmedabad',
    desc: "Ahmedabad's pharmaceutical, textile-processing and engineering clusters run on corrosion-prone plant floors — exactly where non-conductive FRP replaces galvanised steel.",
    distance: '~180 KM',
    zones: '6',
    phone: '+91 98255 07517', // Match the custom number from the screenshot if specified, else company phone
    phoneHref: 'tel:+919825507517'
  },
  anand: {
    name: 'Anand',
    district: 'Anand District',
    title: 'Power Cables, Switchgears & Motors in Anand',
    desc: "Supporting the dairy processing, packaging, and agro-engineering units of Anand with high-efficiency IE3/IE4 motors and reliable electrical switchgear panels.",
    distance: '~140 KM',
    zones: '4',
    phone: COMPANY.phone,
    phoneHref: COMPANY.phoneHref
  },
  ankleshwar: {
    name: 'Ankleshwar',
    district: 'Bharuch District',
    title: 'Authorized Industrial Motors, Cables & Switchgears in Ankleshwar',
    desc: "Located directly in Ankleshwar GIDC, we support Asia's largest chemical processing hub with immediate off-the-shelf dispatch, technical sizing, and certified warranty support.",
    distance: '0 KM',
    zones: '8',
    phone: COMPANY.phone,
    phoneHref: COMPANY.phoneHref
  },
  bharuch: {
    name: 'Bharuch',
    district: 'Bharuch District',
    title: 'Heavy-Duty Cables, Motors & FRP Structures in Bharuch & Dahej',
    desc: "Serving Dahej SEZ and Vilayat GIDC's massive chemical, fertilizer, and petrochemical infrastructure with heavy-duty LT power cables and flameproof motors.",
    distance: '~15 KM',
    zones: '6',
    phone: COMPANY.phone,
    phoneHref: COMPANY.phoneHref
  },
  surat: {
    name: 'Surat',
    district: 'Surat District',
    title: 'Industrial Panel Wires, Switchgears & Motors in Surat',
    desc: "Powering Sachin GIDC, Pandesara, and Hazira's textiles, diamond, and heavy industrial facilities with certified cables, circuit breakers, and mechanical drives.",
    distance: '~80 KM',
    zones: '7',
    phone: COMPANY.phone,
    phoneHref: COMPANY.phoneHref
  },
  rajkot: {
    name: 'Rajkot',
    district: 'Rajkot District',
    title: 'Electric Motors, Machine Tool Drives & Switchgear in Rajkot',
    desc: "Supporting Rajkot's metal casting, forging, auto parts, and machine tools manufacturing sectors with high-torque gearboxes, motors, and robust control panels.",
    distance: '~280 KM',
    zones: '5',
    phone: COMPANY.phone,
    phoneHref: COMPANY.phoneHref
  },
  godhra: {
    name: 'Godhra',
    district: 'Panchmahal District',
    title: 'Agro-processing Machinery Drives & Cables in Godhra',
    desc: "Providing reliable motor starters, LT power cables, and mineral processing drive systems to factories across Godhra and Halol industrial zones.",
    distance: '~190 KM',
    zones: '3',
    phone: COMPANY.phone,
    phoneHref: COMPANY.phoneHref
  },
  navsari: {
    name: 'Navsari',
    district: 'Navsari District',
    title: 'Agro Industry Cables & Light Duty Motors in Navsari',
    desc: "Sourcing certified cables and energy-saving low voltage motors for paper mills, textiles, and floricultural processing plants in Navsari GIDC.",
    distance: '~120 KM',
    zones: '3',
    phone: COMPANY.phone,
    phoneHref: COMPANY.phoneHref
  },
  vapi: {
    name: 'Vapi',
    district: 'Valsad District',
    title: 'Corrosion-Proof FRP Gratings & Industrial Wires in Vapi',
    desc: "Equipping chemical processing, paper packaging, and plastic manufacturing plants of Vapi GIDC with chemical-resistant FRP materials and certified switchgear.",
    distance: '~140 KM',
    zones: '6',
    phone: COMPANY.phone,
    phoneHref: COMPANY.phoneHref
  },
  bhuj: {
    name: 'Bhuj',
    district: 'Kutch District',
    title: 'Port-Based Industrial Cables & Heavy Motors in Bhuj & Mundra',
    desc: "Supplying metallurgy facilities, power plants, and maritime logistics operators in Mundra and Gandhidham with heavy-duty LT power cables and high-efficiency induction motors.",
    distance: '~390 KM',
    zones: '5',
    phone: COMPANY.phone,
    phoneHref: COMPANY.phoneHref
  },
  amreli: {
    name: 'Amreli',
    district: 'Amreli District',
    title: 'Maritime Logistics Drives & Cables in Amreli & Pipavav',
    desc: "Supporting cement manufacturing and maritime trade hubs near Pipavav with robust motors, protective switchgear, and marine-grade distribution wiring.",
    distance: '~340 KM',
    zones: '3',
    phone: COMPANY.phone,
    phoneHref: COMPANY.phoneHref
  },
  dahod: {
    name: 'Dahod',
    district: 'Dahod District',
    title: 'Agro Equipment Motors & Panel Wires in Dahod',
    desc: "Supplying local mineral-processing workshops, railway engineering units, and agricultural mills with certified electric motors and circuit breakers.",
    distance: '~240 KM',
    zones: '3',
    phone: COMPANY.phone,
    phoneHref: COMPANY.phoneHref
  }
};

export default function CityDetailPage({ onOpenRFQ }) {
  const { cityId } = useParams();
  const city = CITY_DATA[cityId.toLowerCase()];

  if (!city) {
    return (
      <div className="container" style={{ padding: '8rem 2rem 4rem', textAlign: 'center' }}>
        <h2>City Not Found</h2>
        <p>The requested service location does not exist.</p>
        <Link to="/locations" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Back to Locations</Link>
      </div>
    );
  }

  return (
    <>
      {/* City Header Breadcrumbs & Banner */}
      <section className="page-header">
        <div className="container">
          <div className="breadcrumbs" style={{ marginTop: 0, marginBottom: '2rem' }}>
            <ol>
              <li><Link to="/">Home</Link> <Icon name="chevronRight" size={12} /></li>
              <li><Link to="/locations">Locations</Link> <Icon name="chevronRight" size={12} /></li>
              <li aria-current="page">{city.name}</li>
            </ol>
          </div>

          <span className="page-header-tag">SERVING {city.district.toUpperCase()}</span>
          <h1 className="page-header-title" style={{ maxWidth: '28ch', margin: '0.5rem 0' }}>
            {city.title.split(city.name)[0]}
            <span style={{ color: 'var(--accent-cyan)' }}>{city.name}</span>
          </h1>
          <p className="page-header-lead" style={{ maxWidth: '75ch' }}>
            {city.desc}
          </p>

          <div style={{ display: 'flex', gap: '3rem', margin: '2.5rem 0 2rem 0', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>4</div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>Product Lines Supplied</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>{city.distance}</div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>From Ankleshwar GIDC</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>{city.zones}</div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>Industrial Zones Covered</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => onOpenRFQ(`Inquiry from ${city.name} City Page`)}
            >
              Get a {city.name} Quote
            </button>
            <a 
              href={city.phoneHref}
              className="btn" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(255, 255, 255, 0.4)', background: 'transparent', color: '#fff', borderRadius: '30px', padding: '0.75rem 1.5rem', transition: 'var(--transition-smooth)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'; e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon name="phone" size={16} />
              Call {city.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Products Available Grid */}
      <section className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="section-title" style={{ fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Products Available in {city.name}
          </h2>
          <div style={{ width: '60px', height: '3px', background: 'var(--accent-cyan)', margin: '1rem auto 0 auto', borderRadius: '2px' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {PRODUCTS_DATA.map((product) => {
            // Customize product name and description for this city
            const localizedName = `${product.name} in ${city.name}`;
            const localizedDesc = `${product.desc.split('.')[0]}. Engineered and certified for plants in ${city.name} and surrounding estates.`;

            return (
              <div key={product.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ height: '200px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={product.image} 
                    alt={localizedName} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(10, 8, 20, 0.75)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {product.brand}
                  </div>
                </div>

                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-cyan)' }}>
                    {product.category.toUpperCase()}
                  </span>
                  
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                    {localizedName}
                  </h3>
                  
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0, flexGrow: 1 }}>
                    {localizedDesc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0.5rem 0' }}>
                    {product.specs.slice(0, 3).map((spec) => (
                      <div key={spec} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <Icon name="check" size={14} style={{ color: 'var(--color-success)' }} />
                        {spec}
                      </div>
                    ))}
                  </div>

                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => onOpenRFQ(`Inquiry for ${localizedName}`)}
                    style={{ marginTop: 'auto', alignSelf: 'flex-start' }}
                  >
                    View Specifications &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
