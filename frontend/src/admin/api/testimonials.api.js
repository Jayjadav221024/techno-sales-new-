import api from "./index";
import { ENDPOINTS } from "./endpoints";

export const getAllTestimonials = () => api.get(ENDPOINTS.TESTIMONIALS.BASE);
export const searchTestimonials = (params) => api.post(ENDPOINTS.TESTIMONIALS.SEARCH, params);
export const getTestimonialById = (id) => api.get(ENDPOINTS.TESTIMONIALS.BY_ID(id));
export const createTestimonial = (data) => api.post(ENDPOINTS.TESTIMONIALS.BASE, data);
export const updateTestimonial = (id, data) => api.put(ENDPOINTS.TESTIMONIALS.BY_ID(id), data);
export const deleteTestimonial = (id) => api.delete(ENDPOINTS.TESTIMONIALS.BY_ID(id));
