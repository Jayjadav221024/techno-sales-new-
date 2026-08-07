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
      </section>

      <CtaBand
        title="Still have a question?"
        text="Our sales engineers answer technical sizing questions directly — no call centre in between."
        onOpenRFQ={onOpenRFQ}
      />
    </>
  );
}
