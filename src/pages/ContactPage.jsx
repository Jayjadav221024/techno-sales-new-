import PageHeader from '../components/PageHeader';
import Contact from '../components/Contact';

export default function ContactPage({ onShowToast }) {
  return (
    <>
      <PageHeader
        tag="GET IN TOUCH"
        title="Contact Us"
        lead="Visit our Ankleshwar GIDC counter or send a technical inquiry — our sales engineering team replies within two working hours."
      />

      <Contact onShowToast={onShowToast} />
    </>
  );
}
