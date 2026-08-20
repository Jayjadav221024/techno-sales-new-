import { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchProducts,
  fetchCategories,
  fetchBlogPosts,
  fetchTestimonials,
  fetchFaqs,
  fetchBrandPartners,
} from '../services/api';
import {
  PRODUCTS_DATA,
  CATEGORIES,
  BLOG_POSTS,
  TESTIMONIALS,
  FAQS,
  PARTNERS,
} from '../data/site';

const SiteDataContext = createContext({
  products: PRODUCTS_DATA,
  categories: CATEGORIES,
  blogs: BLOG_POSTS,
  testimonials: TESTIMONIALS,
  faqs: FAQS,
  partners: PARTNERS,
  loading: false,
  refreshData: () => {},
});

export function SiteDataProvider({ children }) {
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const [categories, setCategories] = useState(CATEGORIES);
  const [blogs, setBlogs] = useState(BLOG_POSTS);
  const [testimonials, setTestimonials] = useState(TESTIMONIALS);
  const [faqs, setFaqs] = useState(FAQS);
  const [partners, setPartners] = useState(PARTNERS);
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    try {
      const [prods, cats, blg, testm, faqList, partn] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
        fetchBlogPosts(),
        fetchTestimonials(),
        fetchFaqs(),
        fetchBrandPartners(),
      ]);

      if (prods?.length) setProducts(prods);
      if (cats?.length) setCategories(cats);
      if (blg?.length) setBlogs(blg);
      if (testm?.length) setTestimonials(testm);
      if (faqList?.length) setFaqs(faqList);
      if (partn?.length) setPartners(partn);
    } catch (err) {
      console.warn('Failed to load dynamic data, using local state:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <SiteDataContext.Provider
      value={{
        products,
        categories,
        blogs,
        testimonials,
        faqs,
        partners,
        loading,
        refreshData: loadAll,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
