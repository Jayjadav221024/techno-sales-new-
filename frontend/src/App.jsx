import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import RFQModal from './components/RFQModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FaqPage from './pages/FaqPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LocationsPage from './pages/LocationsPage';
import CityDetailPage from './pages/CityDetailPage';
import CareersPage from './pages/CareersPage';
import LegalPage from './pages/LegalPage';
import NotFoundPage from './pages/NotFoundPage';
import { getSeoDefault } from './data/seoDefaults';
import { applySeo } from './utils/seo';

const AdminApp = lazy(() => import('./admin/App'));

/**
 * Routes whose SEO comes from a database record, so the page sets its own tags.
 * See the metadata effect below.
 */
const OWNS_OWN_SEO = [
  /^\/product\/[^/]+$/,
  /^\/products\/[^/]+$/,
  /^\/blog\/[^/]+$/,
  /^\/locations\/[^/]+$/,
];

function AdminLoading() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#101828', color: '#fff' }}>
      <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#F58220', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <p style={{ marginTop: '1rem', color: '#98A2B3', fontSize: '0.95rem' }}>Loading Techno Sales Admin Portal...</p>
    </div>
  );
}

export default function App() {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqProductName, setRfqProductName] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // SEO metadata for pages without a record of their own.
  //
  // The four detail routes below own their tags, because those come from the
  // record's SEO fields and only exist once it has loaded. Child effects run
  // before parent effects, so if this ran for those routes it would overwrite
  // whatever the page had just set.
  useEffect(() => {
    if (isAdminRoute) {
      document.title = 'Techno Sales - Admin Portal';
      return;
    }
    if (OWNS_OWN_SEO.some((re) => re.test(location.pathname))) return;

    applySeo(getSeoDefault(location.pathname));
  }, [location.pathname, isAdminRoute]);

  // Scroll reveal observer (Only on main website)
  useEffect(() => {
    if (isAdminRoute) return;

    const reveal = (el) => {
      el.classList.add('revealed');
      observer.unobserve(el);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '50px 0px 50px 0px' }
    );

    const scan = () => {
      document.querySelectorAll('.reveal-on-scroll:not(.revealed)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 50 && rect.bottom > -50) {
          reveal(el);
        } else {
          observer.observe(el);
        }
      });
    };

    let frame = 0;
    const scheduleScan = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        scan();
      });
    };

    const timer = setTimeout(scan, 100);

    const mutations = new MutationObserver(scheduleScan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      if (frame) cancelAnimationFrame(frame);
      mutations.disconnect();
      observer.disconnect();
    };
  }, [location.pathname, isAdminRoute]);

  const handleOpenRFQ = (productName = '') => {
    setRfqProductName(productName);
    setRfqModalOpen(true);
  };

  const handleShowToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 4000);
  };

  if (isAdminRoute) {
    return (
      <Suspense fallback={<AdminLoading />}>
        <AdminApp />
      </Suspense>
    );
  }

  return (
    <div className="app-root">
      <ScrollToTop />
      <Navbar onOpenRFQ={handleOpenRFQ} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage onOpenRFQ={handleOpenRFQ} />} />
          <Route path="/products" element={<ProductsPage onOpenRFQ={handleOpenRFQ} />} />
          <Route path="/products/:categoryId" element={<CategoryPage onOpenRFQ={handleOpenRFQ} />} />
          <Route path="/product/:productId" element={<ProductDetailPage onOpenRFQ={handleOpenRFQ} />} />
          <Route path="/testimonials" element={<TestimonialsPage onOpenRFQ={handleOpenRFQ} />} />
          <Route path="/faq" element={<FaqPage onOpenRFQ={handleOpenRFQ} />} />
          <Route path="/blog" element={<BlogPage onOpenRFQ={handleOpenRFQ} />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/about" element={<AboutPage onOpenRFQ={handleOpenRFQ} />} />
          <Route path="/contact" element={<ContactPage onShowToast={handleShowToast} />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/locations/:cityId" element={<CityDetailPage onOpenRFQ={handleOpenRFQ} />} />

          {/* Unlisted on purpose: reachable at /career by direct link only, so
              it stays out of the navbar and the footer. */}
          <Route path="/career" element={<CareersPage onOpenRFQ={handleOpenRFQ} />} />
          <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
          <Route path="/terms" element={<LegalPage type="terms" />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      <RFQModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        selectedProductName={rfqProductName}
        onShowToast={handleShowToast}
      />

      <Toast message={toastMessage} visible={toastVisible} />
    </div>
  );
}
