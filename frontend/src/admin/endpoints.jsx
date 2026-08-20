/**
 * API Endpoint Constants
 * All API endpoints defined in one place for easy maintenance
 */

// API Version prefix
const V1 = "/api/v1";

export const ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        LOGIN: `${V1}/auth/login`,
        ME: `${V1}/auth/me`,
        LOGOUT: `${V1}/auth/logout`,
        OTP_SEND: `${V1}/otp/send`,
        OTP_VERIFY: `${V1}/otp/verify`,
        PASSWORD_RESET: `${V1}/otp/reset-password`,
        LOGIN_STATUS_BY_EMAIL: `${V1}/auth/login-status-by-email`,
        LOGIN_STATUS: (userId) => `${V1}/auth/login-status/${userId}`,
        VERIFY_SESSION: `${V1}/auth/verify-session`
    },

    // Admin user endpoints
    ADMIN_USERS: {
        BASE: `${V1}/admin-users`,
        BY_ID: (id) => `${V1}/admin-users/${id}`,
        SEARCH: `${V1}/admin-users/search`,
        RESET_PASSWORD: (id) => `${V1}/admin-users/${id}/reset-password`,
    },

    // Department endpoints
    DEPARTMENTS: {
        BASE: `${V1}/departments`,
        BY_ID: (id) => `${V1}/departments/${id}`,
        SEARCH: `${V1}/departments/search`,
    },

    // User endpoints
    USERS: {
        BASE: `${V1}/users`,
        BY_ID: (id) => `${V1}/users/${id}`,
        SEARCH: `${V1}/users/search`,
        RESET_PASSWORD: (id) => `${V1}/users/${id}/reset-password`,
    },

    // Location endpoints
    COUNTRIES: {
        BASE: `${V1}/countries`,
        BY_ID: (id) => `${V1}/countries/${id}`,
        SEARCH: `${V1}/countries/search`,
        STATES: (countryId) => `${V1}/countries/${countryId}/states`,
    },

    STATES: {
        BASE: `${V1}/states`,
        BY_ID: (id) => `${V1}/states/${id}`,
        SEARCH: `${V1}/states/search`,
        CITIES: (stateId) => `${V1}/states/${stateId}/cities`,
    },

    CITIES: {
        BASE: `${V1}/cities`,
        BY_ID: (id) => `${V1}/cities/${id}`,
        SEARCH: `${V1}/cities/search`,
    },

    LOCATIONS: {
        BASE: `${V1}/locations`,
    },

    // Menu endpoints
    MENU_GROUPS: {
        BASE: `${V1}/menu-groups`,
        BY_ID: (id) => `${V1}/menu-groups/${id}`,
        SEARCH: `${V1}/menu-groups/search`,
    },

    MENUS: {
        BASE: `${V1}/menus`,
        BY_ID: (id) => `${V1}/menus/${id}`,
        SEARCH: `${V1}/menus/search`,
        BY_GROUPS: `${V1}/menus/by-groups`,
    },

    // Role endpoints
    ROLES: {
        BASE: `${V1}/roles`,
        BY_ID: (id) => `${V1}/roles/${id}`,
        SEARCH: `${V1}/roles/search`,
    },

    // Currency endpoints
    CURRENCIES: {
        BASE: `${V1}/currencies`,
        BY_ID: (id) => `${V1}/currencies/${id}`,
        SEARCH: `${V1}/currencies/search`,
    },

    // Email endpoints
    EMAIL_SETUPS: {
        BASE: `${V1}/email-setups`,
        BY_ID: (id) => `${V1}/email-setups/${id}`,
        SEARCH: `${V1}/email-setups/search`,
    },

    EMAIL_FOR: {
        BASE: `${V1}/email-for`,
        BY_ID: (id) => `${V1}/email-for/${id}`,
        SEARCH: `${V1}/email-for/search`,
    },

    EMAIL_TEMPLATES: {
        BASE: `${V1}/email-templates`,
        BY_ID: (id) => `${V1}/email-templates/${id}`,
        SEARCH: `${V1}/email-templates/search`,
        UPLOAD_SIGNATURE: `${V1}/email-templates/upload-signature`,
    },

    // User Roles endpoints (role -> menu permissions)
    USER_ROLES: {
        BASE: `${V1}/user-roles`,
        BY_ID: (id) => `${V1}/user-roles/${id}`,
    },

    // Techno Sales Dynamic Modules
    CATEGORIES: {
        BASE: `${V1}/categories`,
        BY_ID: (id) => `${V1}/categories/${id}`,
        SEARCH: `${V1}/categories/search`,
    },

    PRODUCTS: {
        BASE: `${V1}/products`,
        BY_ID: (id) => `${V1}/products/${id}`,
        SEARCH: `${V1}/products/search`,
    },

    BLOG_POSTS: {
        BASE: `${V1}/blogs`,
        BY_ID: (id) => `${V1}/blogs/${id}`,
        SEARCH: `${V1}/blogs/search`,
    },

    INQUIRIES: {
        BASE: `${V1}/inquiries`,
        BY_ID: (id) => `${V1}/inquiries/${id}`,
        SEARCH: `${V1}/inquiries/search`,
    },

    TESTIMONIALS: {
        BASE: `${V1}/testimonials`,
        BY_ID: (id) => `${V1}/testimonials/${id}`,
        SEARCH: `${V1}/testimonials/search`,
    },

    LOCATION_CITIES: {
        BASE: `${V1}/locations`,
        BY_ID: (id) => `${V1}/locations/${id}`,
        SEARCH: `${V1}/locations/search`,
    },

    FAQS: {
        BASE: `${V1}/faqs`,
        BY_ID: (id) => `${V1}/faqs/${id}`,
        SEARCH: `${V1}/faqs/search`,
    },

    BRAND_PARTNERS: {
        BASE: `${V1}/brands`,
        BY_ID: (id) => `${V1}/brands/${id}`,
        SEARCH: `${V1}/brands/search`,
    },
};

export default ENDPOINTS;
