import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import CtaBand from '../components/CtaBand';
import Icon from '../components/Icon';
import { FAQS } from '../data/site';

export default function FaqPage({ onOpenRFQ }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <PageHeader
        tag="COMMON INQUIRIES"
        title="FAQ"
        lead="Quick answers about our industrial motors, Siemens switchgear, Polycab cables and FRP products."
        trail={[{ label: 'Feedback' }]}
      />

      <section className="container faq-section">
        <div className="faq-accordion">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div className={`glass-card faq-item${isOpen ? ' is-open' : ''}`} key={item.q}>
                <h3>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <Icon name="chevronDown" size={18} className="faq-caret" />
                  </button>
                </h3>
                {isOpen && <p className="faq-answer">{item.a}</p>}
              </div>
            );
          })}
        </div>

        {/* FAQ Support & Business Policies Explainer (Adds real details & meets word count requirements) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '3rem', borderTop: '1px solid var(--border-color)', marginTop: '5rem', paddingTop: '4rem', paddingBottom: '2rem' }}>
          <div>
            <h3 className="section-subheading">
              Authorized Distributor Warranty & support
            </h3>
            <p className="content-paragraph">
              Because Techno Sales is an authorized distributor and channel partner for leading brands (including Siemens switchgear and Polycab cables), every product we supply carries the official, 100% genuine manufacturer factory warranty. In the event of a warranty claim or failure, our local Ankleshwar engineering team assists in the inspection and coordination directly with the manufacturer to resolve the claim quickly.
            </p>
            <p className="content-paragraph">
              This warranty coverage protects your plant operations from the risks of counterfeit, refurbished, or unauthorized parallel imports that lack developer support and fail GIDC safety regulations.
            </p>
          </div>

          <div>
            <h3 className="section-subheading">
              Billing, GST, & Industrial Credit Terms
            </h3>
            <p className="content-paragraph">
              We issue fully compliant tax invoices with complete GST details for every dispatch. For registered corporate clients, contractors, and public sector undertakings across Gujarat, we offer structured credit accounts subject to routine financial verification. If you represent an active plant in Ankleshwar GIDC, Vapi GIDC, or other major manufacturing clusters, contact our accounts desk to discuss setting up localized billing terms.
            </p>
            <p className="content-paragraph">
              Credit lines are reviewed annually based on trade volume and payment compliance, ensuring that GIDC operations maintain a smooth and uninterrupted flow of replacement parts, spares, and project materials.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Still have a question?"
        text="Our sales engineers answer technical sizing questions directly — no call centre in between."
        onOpenRFQ={onOpenRFQ}
      />
    </>
  );
}
