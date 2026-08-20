import api from "./index";
import { ENDPOINTS } from "./endpoints";

export const getAllCategories = () => api.get(ENDPOINTS.CATEGORIES.BASE);
export const searchCategories = (params) => api.post(ENDPOINTS.CATEGORIES.SEARCH, params);
export const getCategoryById = (id) => api.get(ENDPOINTS.CATEGORIES.BY_ID(id));
export const createCategory = (data) => api.post(ENDPOINTS.CATEGORIES.BASE, data);
export const updateCategory = (id, data) => api.put(ENDPOINTS.CATEGORIES.BY_ID(id), data);
export const deleteCategory = (id) => api.delete(ENDPOINTS.CATEGORIES.BY_ID(id));
