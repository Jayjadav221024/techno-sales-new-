import api from "./index";
import { ENDPOINTS } from "./endpoints";

export const getAllFaqs = () => api.get(ENDPOINTS.FAQS.BASE);
export const searchFaqs = (params) => api.post(ENDPOINTS.FAQS.SEARCH, params);
export const getFaqById = (id) => api.get(ENDPOINTS.FAQS.BY_ID(id));
export const createFaq = (data) => api.post(ENDPOINTS.FAQS.BASE, data);
export const updateFaq = (id, data) => api.put(ENDPOINTS.FAQS.BY_ID(id), data);
export const deleteFaq = (id) => api.delete(ENDPOINTS.FAQS.BY_ID(id));
