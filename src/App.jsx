import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CursorFX from './components/CursorFX';
import RFQModal from './components/RFQModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FaqPage from './pages/FaqPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqProductName, setRfqProductName] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const location = useLocation();

  // Scroll reveal. Re-runs per route so freshly mounted pages get observed.
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
      <CursorFX />
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
          <Route path="/about" element={<AboutPage onOpenRFQ={handleOpenRFQ} />} />
          <Route path="/contact" element={<ContactPage onShowToast={handleShowToast} />} />
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
