import api from "./index";
import { ENDPOINTS } from "./endpoints";

export const getAllLocationCities = () => api.get(ENDPOINTS.LOCATION_CITIES.BASE);
export const searchLocationCities = (params) => api.post(ENDPOINTS.LOCATION_CITIES.SEARCH, params);
export const getLocationCityById = (id) => api.get(ENDPOINTS.LOCATION_CITIES.BY_ID(id));
export const createLocationCity = (data) => api.post(ENDPOINTS.LOCATION_CITIES.BASE, data);
export const updateLocationCity = (id, data) => api.put(ENDPOINTS.LOCATION_CITIES.BY_ID(id), data);
export const deleteLocationCity = (id) => api.delete(ENDPOINTS.LOCATION_CITIES.BY_ID(id));
