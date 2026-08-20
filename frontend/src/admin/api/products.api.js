import api from "./index";
import { ENDPOINTS } from "./endpoints";

export const getAllProducts = () => api.get(ENDPOINTS.PRODUCTS.BASE);
export const searchProducts = (params) => api.post(ENDPOINTS.PRODUCTS.SEARCH, params);
export const getProductById = (id) => api.get(ENDPOINTS.PRODUCTS.BY_ID(id));
export const createProduct = (data) => api.post(ENDPOINTS.PRODUCTS.BASE, data);
export const updateProduct = (id, data) => api.put(ENDPOINTS.PRODUCTS.BY_ID(id), data);
export const deleteProduct = (id) => api.delete(ENDPOINTS.PRODUCTS.BY_ID(id));
