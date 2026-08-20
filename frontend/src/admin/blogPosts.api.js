import api from "./index";
import { ENDPOINTS } from "./endpoints";

export const getAllBlogPosts = () => api.get(ENDPOINTS.BLOG_POSTS.BASE);
export const searchBlogPosts = (params) => api.post(ENDPOINTS.BLOG_POSTS.SEARCH, params);
export const getBlogPostById = (id) => api.get(ENDPOINTS.BLOG_POSTS.BY_ID(id));
export const createBlogPost = (data) => api.post(ENDPOINTS.BLOG_POSTS.BASE, data);
export const updateBlogPost = (id, data) => api.put(ENDPOINTS.BLOG_POSTS.BY_ID(id), data);
export const deleteBlogPost = (id) => api.delete(ENDPOINTS.BLOG_POSTS.BY_ID(id));
