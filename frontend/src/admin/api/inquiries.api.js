import api from "./index";
import { ENDPOINTS } from "./endpoints";

export const searchInquiries = (params) => api.post(ENDPOINTS.INQUIRIES.SEARCH, params);
export const getInquiryById = (id) => api.get(ENDPOINTS.INQUIRIES.BY_ID(id));
export const createInquiry = (data) => api.post(ENDPOINTS.INQUIRIES.BASE, data);
export const updateInquiry = (id, data) => api.put(ENDPOINTS.INQUIRIES.BY_ID(id), data);
export const deleteInquiry = (id) => api.delete(ENDPOINTS.INQUIRIES.BY_ID(id));
