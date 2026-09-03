import { Link } from 'react-router-dom';
import Icon from './Icon';
import Img from './Img';

/* The two halves of the integrated supply pitch, as separate claims rather
   than one run-on sentence. */
const POINTS = [
  { icon: 'layers', title: 'One-Stop Solution' },
  { icon: 'shieldCheck', title: 'End-To-End Support' }
];

/** Image-left / pitch-right band on what the integrated supply model buys you.
 *  Runs on both the home and about pages. */
export default function EasierBand() {
  return (
    <section className="easier-section container">
      <div className="easier-grid">
        <div className="easier-media reveal-on-scroll">
          <Img
            src="/images/sections/why-choose-us.jpg"
            alt="Techno Sales and a client plant team shaking hands on a supply partnership"
          />
        </div>

        <div className="easier-body reveal-on-scroll">
          <span className="section-tag">STREAMLINED INDUSTRIAL PROCUREMENT</span>

          <h2 className="section-title easier-title">
            We Made Things Easier
            <br />
            For Your Business
          </h2>

          <p className="easier-lead">
            We know your time is valuable — that's why we focus on efficiency. Our integrated
            supply model means fewer delays, fewer vendors, and more reliability. We provide not
            just products, but peace of mind.
          </p>

          <div className="easier-points">
            {POINTS.map((point) => (
              <div className="easier-point" key={point.title}>
                <div className="feature-icon-wrapper">
                  <Icon name={point.icon} size={24} />
                </div>
                <h3>{point.title}</h3>
              </div>
            ))}
          </div>

          <p className="easier-tagline">
            We're committed to delivering high-quality, productive service.
          </p>

          <Link to="/contact" className="btn btn-primary">
            Contact Us
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
