import api from "./index";
import { ENDPOINTS } from "./endpoints";

export const getAllJobOpenings = () => api.get(ENDPOINTS.CAREERS.BASE);
export const searchJobOpenings = (params) => api.post(ENDPOINTS.CAREERS.SEARCH, params);
export const getJobOpeningById = (id) => api.get(ENDPOINTS.CAREERS.BY_ID(id));
export const createJobOpening = (data) => api.post(ENDPOINTS.CAREERS.BASE, data);
export const updateJobOpening = (id, data) => api.put(ENDPOINTS.CAREERS.BY_ID(id), data);
export const deleteJobOpening = (id) => api.delete(ENDPOINTS.CAREERS.BY_ID(id));
