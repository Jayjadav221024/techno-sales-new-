import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import CtaBand from '../components/CtaBand';
import Icon from '../components/Icon';
import { fetchJobOpenings } from '../services/api';
import { useCompany } from '../context/SiteContentContext';

const TYPE_LABELS = {
  'full-time': 'Full Time',
  'part-time': 'Part Time',
  contract: 'Contract',
  internship: 'Internship'
};

/** Why someone would join, rather than a wall of vacancies with no context. */
const PERKS = [
  {
    icon: 'shieldCheck',
    title: 'Authorized brand exposure',
    desc: 'Work day to day with Siemens, Polycab, ABB and CG product lines — the technical grounding is real and it travels with you.'
  },
  {
    icon: 'factory',
    title: 'Plants, not cubicles',
    desc: 'Our customers are the chemical, pharma and engineering plants across Ankleshwar, Panoli, Jhagadia and Dahej. You will be on those floors.'
  },
  {
    icon: 'layers',
    title: 'A small team that decides fast',
    desc: 'No layers between you and the directors. Good suggestions get tried the same week instead of waiting on a committee.'
  },
  {
    icon: 'zap',
    title: 'Learn the whole counter',
    desc: 'Motors, switchgear, cable and FRP under one roof, so nobody stays boxed into a single product line.'
  }
];

/**
 * Careers page, served at /career.
 *
 * Deliberately absent from the navbar and footer — it is shared as a direct
 * link on job posts and in replies to candidates. Vacancies come from the
 * Careers screen in the admin panel, with the static list in data/site.js as
 * the fallback.
 */
export default function CareersPage({ onOpenRFQ }) {
  const COMPANY = useCompany();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchJobOpenings()
      .then((list) => {
        if (cancelled) return;
        setJobs(list);
        // Open the first role, so the page never lands as a row of closed bars.
        setOpenId(list[0] ? (list[0]._id ?? list[0].title) : null);
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, []);

  const applyHref = (job) => {
    const to = job.applyEmail || COMPANY.email;
    const subject = `Application for ${job.title} - Techno Sales`;
    const body = `Hello Techno Sales team,\n\nI would like to apply for the ${job.title} role${
      job.location ? ` at ${job.location}` : ''
    }. My CV is attached.\n\nName:\nPhone:\nCurrent location:\nTotal experience:\n\nThank you,`;

    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <PageHeader
        tag="WORK WITH US"
        title="Careers at Techno Sales"
        lead="We supply the motors, switchgear, cables and FRP that keep Ankleshwar GIDC running. If you would rather learn industrial electricals on a live counter than from a manual, talk to us."
        trail={[{ label: 'Company' }]}
      />

      <section className="container careers-section">
        <div className="section-header reveal-on-scroll">
          <span className="section-tag">WHY TECHNO SALES</span>
          <h2 className="section-title">What the job actually looks like</h2>
          <p className="section-desc">
            A distribution counter with technical depth: sizing enquiries in the morning, plant visits in
            the afternoon, and material out of the door the same day.
          </p>
        </div>

        <div className="careers-perks">
          {PERKS.map((perk) => (
            <div className="glass-card careers-perk reveal-on-scroll" key={perk.title}>
              <div className="careers-perk-icon">
                <Icon name={perk.icon} size={22} />
              </div>
              <h3>{perk.title}</h3>
              <p>{perk.desc}</p>
            </div>
          ))}
        </div>

        <div className="section-header reveal-on-scroll" style={{ marginTop: '4.5rem' }}>
          <span className="section-tag">CURRENT OPENINGS</span>
          <h2 className="section-title">Open positions</h2>
          <p className="section-desc">
            Every role below is based at our Ankleshwar GIDC counter. Click a role to see what it involves.
          </p>
        </div>

        {loading ? (
          <p className="careers-empty-text">Loading current openings…</p>
        ) : jobs.length === 0 ? (
          <div className="glass-card careers-empty reveal-on-scroll">
            <Icon name="mail" size={26} />
            <h3>No open positions right now</h3>
            <p>
              We still read every CV that reaches us. Send yours to{' '}
              <a href={COMPANY.emailHref}>{COMPANY.email}</a> and we will get in touch when a matching role
              opens.
            </p>
          </div>
        ) : (
          <div className="careers-list">
            {jobs.map((job) => {
              const id = job._id ?? job.title;
              const isOpen = openId === id;

              return (
                <article className={`glass-card career-card${isOpen ? ' is-open' : ''}`} key={id}>
                  <button
                    type="button"
                    className="career-card-head"
                    onClick={() => setOpenId(isOpen ? null : id)}
                    aria-expanded={isOpen}
                  >
                    <div className="career-card-title">
                      <h3>{job.title}</h3>
                      <div className="career-meta">
                        {job.department && (
                          <span>
                            <Icon name="layers" size={15} />
                            {job.department}
                          </span>
                        )}
                        {job.location && (
                          <span>
                            <Icon name="mapPin" size={15} />
                            {job.location}
                          </span>
                        )}
                        <span>
                          <Icon name="clock" size={15} />
                          {TYPE_LABELS[job.employmentType] ?? job.employmentType}
                        </span>
                        {job.experience && (
                          <span>
                            <Icon name="shieldCheck" size={15} />
                            {job.experience}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="career-card-aside">
                      <span className="career-openings">
                        {job.openings > 1 ? `${job.openings} vacancies` : '1 vacancy'}
                      </span>
                      <Icon name="chevronDown" size={18} className="career-caret" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="career-card-body">
                      {job.desc && <p className="career-desc">{job.desc}</p>}

                      <div className="career-columns">
                        {job.responsibilities.length > 0 && (
                          <div>
                            <h4>Key responsibilities</h4>
                            <ul className="career-bullets">
                              {job.responsibilities.map((line) => (
                                <li key={line}>
                                  <Icon name="check" size={16} />
                                  <span>{line}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {job.requirements.length > 0 && (
                          <div>
                            <h4>What we are looking for</h4>
                            <ul className="career-bullets">
                              {job.requirements.map((line) => (
                                <li key={line}>
                                  <Icon name="check" size={16} />
                                  <span>{line}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="career-actions">
                        <span className="career-salary">
                          <Icon name="fileText" size={16} />
                          {job.salaryRange || 'Salary negotiable, based on experience'}
                        </span>

                        <div className="career-action-buttons">
                          <a href={applyHref(job)} className="btn btn-primary">
                            <Icon name="mail" size={16} />
                            Apply Now
                          </a>
                          <a href={COMPANY.phoneHref} className="btn btn-secondary">
                            <Icon name="phone" size={16} />
                            {COMPANY.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        <p className="careers-note reveal-on-scroll">
          Do not see your role? Send your CV to <a href={COMPANY.emailHref}>{COMPANY.email}</a> with the kind
          of work you are after. We keep applications on file and reach out when something fits.
        </p>
      </section>
    </>
  );
}
