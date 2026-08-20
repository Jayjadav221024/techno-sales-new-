import api from "./index";
import { ENDPOINTS } from "./endpoints";

export const getAllBrandPartners = () => api.get(ENDPOINTS.BRAND_PARTNERS.BASE);
export const searchBrandPartners = (params) => api.post(ENDPOINTS.BRAND_PARTNERS.SEARCH, params);
export const getBrandPartnerById = (id) => api.get(ENDPOINTS.BRAND_PARTNERS.BY_ID(id));
export const createBrandPartner = (data) => api.post(ENDPOINTS.BRAND_PARTNERS.BASE, data);
export const updateBrandPartner = (id, data) => api.put(ENDPOINTS.BRAND_PARTNERS.BY_ID(id), data);
export const deleteBrandPartner = (id) => api.delete(ENDPOINTS.BRAND_PARTNERS.BY_ID(id));
