import { useState, useEffect } from 'react';
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
import AdminBuilderPage from './pages/AdminBuilderPage';
import NotFoundPage from './pages/NotFoundPage';
import { BLOG_POSTS } from './data/site';

export default function App() {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqProductName, setRfqProductName] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const location = useLocation();

  // Dynamic SEO Metadata Updater
  useEffect(() => {
    let title = 'Techno Sales';
    let description = 'Authorized distributor for Siemens and Polycab, and a trusted supplier of ABB and CG products in Ankleshwar.';

    const path = location.pathname;
    if (path === '/') {
      title = 'Leading Industrial Motors, Cables & wires, Switchgears & FRP Product Suppliers in Ankleshwar';
      description = 'Techno Sales is the leading supplier of industrial motors, cables & wires, switchgears, and FRP products in Ankleshwar GIDC.';
    } else if (path === '/about') {
      title = 'Trusted Partner for Industrial Solutions in Ankleshwar | Techno Sales';
      description = 'Learn about Techno Sales, a premier industrial supplier in Gujarat with over 10 years of electro-mechanical expertise.';
    } else if (path === '/products/motors') {
      title = 'Industrial Motors Supplier in Ankleshwar – Best Prices, Top Brands';
      description = 'Authorized Siemens, CG, and ABB industrial motors supplier in Ankleshwar. Best prices and ready GIDC stock.';
    } else if (path === '/product/siemens-motors') {
      title = 'Siemens Motors Supplier in Ankleshwar | Techno Sales';
      description = 'Get high-efficiency Siemens AC low voltage motors from authorized distributor Techno Sales in Ankleshwar.';
    } else if (path === '/product/cg-motors') {
      title = 'CG Motors Suppliers in Ankleshwar | Techno Sales';
      description = 'Looking for Crompton Greaves (CG) heavy-duty induction motors? Techno Sales in Ankleshwar GIDC has ready stock.';
    } else if (path === '/product/polycab-cables-wires') {
      title = 'Authorized Polycab Cables & Wires Supplier in Ankleshwar – Techno Sales';
      description = 'Get genuine Polycab power cables, panel wires, and multi-core control cables from authorized distributor in Ankleshwar.';
    } else if (path === '/product/siemens-switchgears') {
      title = 'Ankleshwar Siemens Switchgear Experts – Power Distribution Solutions by TechnoSales';
      description = 'Authorized distributor of Siemens switchgears, circuit breakers, MCBs, MCCBs, and ACBs in Ankleshwar.';
    } else if (path === '/product/frp-products') {
      title = 'Industrial FRP Products Supplier in Ankleshwar | Techno Sales';
      description = 'Buy anti-corrosive fiberglass reinforced plastic gratings and lightweight, chemical-resistant pultruded cable trays.';
    } else if (path === '/contact') {
      title = 'Contact Us - Techno Sales';
      description = 'Get in touch with Techno Sales in Ankleshwar GIDC. Get quick responses and same-day quotations from our team.';
    } else if (path === '/locations') {
      title = 'Service Locations Covered in Gujarat | Techno Sales';
      description = 'Techno Sales supplies and supports electric motors, switchgears, cables, and FRP products across major industrial estates and cities in Gujarat.';
    } else if (path === '/blog') {
      title = 'Blog - Techno Sales';
      description = 'Stay updated with switchgear standards, motor efficiency benchmarks, cable selection guides, and electrical safety.';
    } else if (path === '/faq') {
      title = 'FAQ - Techno Sales';
      description = 'Find quick answers about our industrial motors, Siemens switchgear, Polycab cables, and FRP products.';
    } else if (path === '/testimonials') {
      title = 'Testimonial - Techno Sales';
      description = 'Read what chemical, pharmaceutical, and manufacturing plants across Ankleshwar GIDC say about Techno Sales.';
    } else if (path.startsWith('/locations/')) {
      const cityId = path.split('/')[2];
      const cityName = cityId.charAt(0).toUpperCase() + cityId.slice(1);
      title = `Industrial Motors, Cables & FRP Gratings in ${cityName} | Techno Sales`;
      description = `Find FRP Gratings, Cable Trays, Wires & Cables, Switchgears, and Industrial Motors in ${cityName} and surrounding industrial zones.`;
    } else if (path.startsWith('/blog/')) {
      const slug = path.split('/')[2];
      const post = BLOG_POSTS.find(p => p.slug === slug);
      if (post) {
        title = `${post.title} | Techno Sales`;
        description = post.excerpt;
      }
    }

    document.title = title;
    let descEl = document.querySelector('meta[name="description"]');
    if (!descEl) {
      descEl = document.createElement('meta');
      descEl.setAttribute('name', 'description');
      document.head.appendChild(descEl);
    }
    descEl.setAttribute('content', description);
  }, [location.pathname]);

  // Scroll reveal. Re-runs per route so freshly mounted pages get observed.
  // The reveal is decoration; the content underneath it is not. Every branch
  // here has to end with the element visible, because the resting state of
  // .reveal-on-scroll is opacity:0 — anything the observer misses is a blank
  // hole on the page rather than a missing animation.
  useEffect(() => {
    const hidden = () => document.querySelectorAll('.reveal-on-scroll:not(.active)');
    const reveal = (el) => el.classList.add('active');

    if (typeof IntersectionObserver === 'undefined') {
      hidden().forEach(reveal);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      // No threshold. A 5% threshold is measured against the element's own
      // area, so anything measuring zero-high when the observer picks it up
      // can never reach it and stays hidden for good. Any overlap counts.
      { rootMargin: '0px 0px -40px 0px' }
    );

    const scan = () => {
      hidden().forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Already on screen: show it now rather than waiting on the observer's
        // first async callback.
        if (rect.top < window.innerHeight && rect.bottom > 0) {
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

    // Lists that re-render after mount — catalogue filters, blog pagination —
    // mount fresh nodes the initial scan never saw. Without this they sit at
    // opacity:0 for good, which reads as a section that failed to load.
    // childList only, so adding .active cannot retrigger this.
    const mutations = new MutationObserver(scheduleScan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      if (frame) cancelAnimationFrame(frame);
      mutations.disconnect();
      observer.disconnect();
    };
  }, [location.pathname]);

  const handleOpenRFQ = (productName = '') => {
    setRfqProductName(productName);
    setRfqModalOpen(true);
  };

  const handleShowToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 4000);
  };

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
          <Route path="/admin" element={<AdminBuilderPage />} />
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
