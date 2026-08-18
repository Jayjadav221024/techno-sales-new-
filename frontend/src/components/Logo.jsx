export default function Logo({ className = "", style = {} }) {
  return (
    <div className={`brand-logo-container ${className}`} style={{ ...style, display: 'flex', alignItems: 'center', height: '32px' }}>
      {/* Official Responsive Brand Logo (Vibrant Orange & Grey Arrows for Light Theme) */}
      <img 
        src="/images/brand/logo-responsive.png" 
        alt="Techno Sales Logo" 
        className="brand-logo-img logo-light" 
        style={{ height: '100%', width: 'auto', display: 'block' }} 
      />
      {/* Official White Brand Logo (Solid White Arrows & Text for Dark Theme) */}
      <img 
        src="/images/brand/logo-white.png" 
        alt="Techno Sales Logo" 
        className="brand-logo-img logo-dark" 
        style={{ height: '100%', width: 'auto', display: 'block' }} 
      />
    </div>
  );
}
