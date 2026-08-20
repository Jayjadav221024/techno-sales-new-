import api from "./index";

const BASE = "/site-content";

export const listSiteContent = () => api.get(BASE);
export const saveSectionDraft = (key, payload) => api.put(`${BASE}/${key}`, payload);
export const publishSection = (key) => api.post(`${BASE}/${key}/publish`);
export const discardSectionDraft = (key) => api.post(`${BASE}/${key}/discard`);
export const publishAllSections = () => api.post(`${BASE}/publish-all`);
export const resetSection = (key) => api.delete(`${BASE}/${key}`);
