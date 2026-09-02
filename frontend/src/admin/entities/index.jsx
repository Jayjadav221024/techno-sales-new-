import {
    Building07, CurrencyDollar, Flag01, Globe01, Hash02, Link01,
    Mail01, Map01, MarkerPin01, Phone, Server01, Shield01, Tag01, User01,
} from "@untitledui/icons";
import { isValidEmail } from "@demo-panel/shared/validation";
import { STATUS_COLUMN } from "./columns";
import { SEO_FIELDS, SEO_SECTION, imageAltField } from "./seo";
import {
    getAllCountries, getAllStates,
    createCountry, updateCountry, getCountryById, deleteCountry, searchCountries,
    createState, updateState, getStateById, deleteState, searchStates,
    createCity, updateCity, getCityById, deleteCity, searchCities,
} from "../api/locations.api";
import { createCurrency, deleteCurrency, getCurrencyById, updateCurrency, searchCurrencies } from "../api/currencies.api";
import { createRole, getRoleById, deleteRole, updateRole, searchRoles } from "../api/roles.api";
import { createDepartment, deleteDepartment, getDepartmentById, updateDepartment, searchDepartments } from "../api/departments.api";
import {
    createEmailFor, deleteEmailFor, getEmailForById, updateEmailFor, searchEmailFor,
    createEmailSetup, deleteEmailSetup, getEmailSetupById, updateEmailSetup, searchEmailSetups,
} from "../api/emails.api";
import { createMenuGroup, deleteMenuGroup, getMenuGroupById, updateMenuGroup, searchMenuGroups } from "../api/menus.api";

/** Maps an API list response to the { value, label } shape SelectField wants. */
const asOptions = (loader, labelKey) => () =>
    loader().then((res) => (res.data?.data ?? []).map((x) => ({ value: x._id, label: x[labelKey] })));

const ACTIVE = { name: "isActive", label: "Is Active", type: "checkbox", section: "status", default: false };

export const countryConfig = {
    filterFields: [
        { name: "countryName", label: "Country Name", type: "string" },
        { name: "countryCode", label: "Country Code", type: "string" },
        { name: "isActive", label: "Active", type: "boolean" },
        { name: "createdAt", label: "Created", type: "date" },
    ],
    key: "country",
    path: "/country",
    section: "Master",
    singular: "Country",
    plural: "Countries",
    description: "Countries available across the application.",
    api: { search: searchCountries, getById: getCountryById, create: createCountry, update: updateCountry, remove: deleteCountry },
    sections: [
        { id: "details", title: "Country details", description: "Name and ISO code for this country." },
        { id: "status", title: "Status", description: "Controls whether this record is selectable elsewhere." },
    ],
    fields: [
        { name: "countryName", icon: Globe01, label: "Country Name", required: true, section: "details", error: "Country Name is required!" , placeholder: "Enter country name" },
        { name: "countryCode", icon: Hash02, label: "Country Code", required: true, section: "details", error: "Country Code is required!" , placeholder: "Enter country code" },
        ACTIVE,
    ],
    columns: [
        { name: "Country Name", selector: (row) => row.countryName, minWidth: "160px" },
        { name: "Country Code", selector: (row) => row.countryCode, minWidth: "140px" },
    ],
    recordTitle: (r) => r.countryName,
};

export const stateConfig = {
    filterFields: [
        { name: "stateName", label: "State Name", type: "string" },
        { name: "stateCode", label: "State Code", type: "string" },
        { name: "countryName", label: "Country Name", type: "string" },
        { name: "countryId", label: "Country", type: "objectId", optionsFrom: "countries" },
        { name: "isActive", label: "Active", type: "boolean" },
        { name: "createdAt", label: "Created", type: "date" },
    ],
    filterLookups: { countries: asOptions(getAllCountries, "countryName") },
    key: "state",
    path: "/state",
    section: "Master",
    singular: "State",
    plural: "States",
    description: "States and provinces, grouped by country.",
    api: { search: searchStates, getById: getStateById, create: createState, update: updateState, remove: deleteState },
    lookups: { countries: asOptions(getAllCountries, "countryName") },
    sections: [
        { id: "details", title: "State details", description: "Which country this state belongs to, and its name and code." },
        { id: "status", title: "Status" },
    ],
    fields: [
        { name: "countryId", icon: Globe01, label: "Country", type: "select", optionsFrom: "countries", required: true, section: "details", error: "Country is required!" , placeholder: "Search country..." },
        { name: "stateName", icon: Map01, label: "State Name", required: true, section: "details", error: "State Name is required!" , placeholder: "Enter state name" },
        { name: "stateCode", icon: Hash02, label: "State Code", required: true, section: "details", error: "State Code is required!" , placeholder: "Enter state code" },
        ACTIVE,
    ],
    columns: [
        { name: "Country", selector: (row) => row.countryName, minWidth: "150px" },
        { name: "State Name", selector: (row) => row.stateName, minWidth: "150px" },
        { name: "State Code", selector: (row) => row.stateCode, minWidth: "130px" },
    ],
    recordTitle: (r) => r.stateName,
};

export const cityConfig = {
    filterFields: [
        { name: "cityName", label: "City Name", type: "string" },
        { name: "cityCode", label: "City Code", type: "string" },
        { name: "stateName", label: "State Name", type: "string" },
        { name: "countryName", label: "Country Name", type: "string" },
        { name: "countryId", label: "Country", type: "objectId", optionsFrom: "countries" },
        { name: "stateId", label: "State", type: "objectId", optionsFrom: "states" },
        { name: "isActive", label: "Active", type: "boolean" },
        { name: "createdAt", label: "Created", type: "date" },
    ],
    filterLookups: { countries: asOptions(getAllCountries, "countryName"), states: asOptions(getAllStates, "stateName") },
    key: "city",
    path: "/city",
    section: "Master",
    singular: "City",
    plural: "Cities",
    description: "Cities, grouped by state.",
    api: { search: searchCities, getById: getCityById, create: createCity, update: updateCity, remove: deleteCity },
    lookups: { countries: asOptions(getAllCountries, "countryName"), states: asOptions(getAllStates, "stateName") },
    sections: [
        { id: "details", title: "City details", description: "Where this city sits, and its name and code." },
        { id: "status", title: "Status" },
    ],
    fields: [
        { name: "countryId", icon: Globe01, label: "Country", type: "select", optionsFrom: "countries", required: true, section: "details", error: "Country is required!", clears: ["stateId"] , placeholder: "Search country..." },
        { name: "stateId", icon: Map01, label: "State", type: "select", optionsFrom: "states", required: true, section: "details", error: "State is required!" , placeholder: "Search state..." },
        { name: "cityName", icon: MarkerPin01, label: "City Name", required: true, section: "details", error: "City Name is required!" , placeholder: "Enter city name" },
        { name: "cityCode", icon: Hash02, label: "City Code", required: true, section: "details", error: "City Code is required!" , placeholder: "Enter city code" },
        ACTIVE,
    ],
    columns: [
        { name: "Country", selector: (row) => row.countryName, minWidth: "140px" },
        { name: "State", selector: (row) => row.stateName, minWidth: "140px" },
        { name: "City Name", selector: (row) => row.cityName, minWidth: "140px" },
        { name: "City Code", selector: (row) => row.cityCode, minWidth: "120px" },
    ],
    recordTitle: (r) => r.cityName,
};

export const currencyConfig = {
    filterFields: [
        { name: "currencyName", label: "Currency Name", type: "string" },
        { name: "currencyCode", label: "Currency Code", type: "string" },
        { name: "currencySymbol", label: "Symbol", type: "string" },
        { name: "isActive", label: "Active", type: "boolean" },
        { name: "createdAt", label: "Created", type: "date" },
    ],
    key: "currency",
    path: "/currency-master",
    section: "Master",
    singular: "Currency",
    plural: "Currencies",
    description: "Currencies available for pricing and reporting.",
    api: { search: searchCurrencies, getById: getCurrencyById, create: createCurrency, update: updateCurrency, remove: deleteCurrency },
    sections: [
        { id: "details", title: "Currency details", description: "Name, ISO code and the symbol shown to users." },
        { id: "status", title: "Status" },
    ],
    fields: [
        { name: "currencyName", icon: CurrencyDollar, label: "Currency Name", required: true, section: "details", error: "Currency Name is required!" , placeholder: "Enter currency name" },
        { name: "currencyCode", icon: Hash02, label: "Currency Code", required: true, section: "details", error: "Currency Code is required!" , placeholder: "Enter currency code" },
        { name: "currencySymbol", icon: Tag01, label: "Currency Symbol", required: true, section: "details", error: "Currency Symbol is required!" , placeholder: "Enter currency symbol" },
        ACTIVE,
    ],
    columns: [
        { name: "Currency Name", selector: (row) => row.currencyName, minWidth: "160px" },
        { name: "Code", selector: (row) => row.currencyCode, minWidth: "110px" },
        { name: "Symbol", selector: (row) => row.currencySymbol, minWidth: "110px" },
    ],
    recordTitle: (r) => r.currencyName,
};

export const roleConfig = {
    filterFields: [
        { name: "roleName", label: "Role Name", type: "string" },
        { name: "isActive", label: "Active", type: "boolean" },
        { name: "createdAt", label: "Created", type: "date" },
    ],
    key: "role",
    path: "/role-master",
    section: "Master",
    singular: "Role",
    plural: "Roles",
    description: "Roles that permissions are assigned to on the User Roles screen.",
    api: { search: searchRoles, getById: getRoleById, create: createRole, update: updateRole, remove: deleteRole },
    sections: [
        { id: "details", title: "Role details" },
        { id: "status", title: "Status" },
    ],
    fields: [
        { name: "roleName", icon: Shield01, label: "Role Name", required: true, section: "details", full: true, error: "Role Name is required!" , placeholder: "Enter role name" },
        { ...ACTIVE, default: true },
    ],
    columns: [
        { name: "Role Name", selector: (row) => row.roleName, sortable: true, sortField: "roleName", minWidth: "200px" },
        STATUS_COLUMN,
    ],
    recordTitle: (r) => r.roleName,
};

export const departmentConfig = {
    filterFields: [
        { name: "departmentName", label: "Department Name", type: "string" },
        { name: "departmentCode", label: "Department Code", type: "string" },
        { name: "isActive", label: "Active", type: "boolean" },
        { name: "createdAt", label: "Created", type: "date" },
    ],
    key: "department",
    path: "/department",
    section: "Setup",
    singular: "Department",
    plural: "Departments",
    description: "Departments users can be assigned to.",
    api: { search: searchDepartments, getById: getDepartmentById, create: createDepartment, update: updateDepartment, remove: deleteDepartment },
    sections: [
        { id: "details", title: "Department details" },
        { id: "status", title: "Status" },
    ],
    fields: [
        { name: "departmentName", icon: Building07, label: "Department Name", required: true, section: "details", error: "Department Name is required!" , placeholder: "Enter department name" },
        { name: "departmentCode", icon: Hash02, label: "Department Code", required: true, section: "details", error: "Department Code is required!" , placeholder: "Enter department code" },
        ACTIVE,
    ],
    columns: [
        { name: "Department Name", selector: (row) => row.departmentName, minWidth: "180px" },
        { name: "Code", selector: (row) => row.departmentCode, minWidth: "130px" },
        STATUS_COLUMN,
    ],
    recordTitle: (r) => r.departmentName,
};

export const emailForConfig = {
    filterFields: [
        { name: "emailFor", label: "Email For", type: "string" },
        { name: "isActive", label: "Active", type: "boolean" },
        { name: "createdAt", label: "Created", type: "date" },
    ],
    key: "email-for",
    path: "/email-for",
    section: "CMS",
    singular: "Email For",
    plural: "Email For",
    description: "The events an email template can be attached to.",
    api: { search: searchEmailFor, getById: getEmailForById, create: createEmailFor, update: updateEmailFor, remove: deleteEmailFor },
    sections: [
        { id: "details", title: "Details" },
        { id: "status", title: "Status" },
    ],
    fields: [
        { name: "emailFor", icon: Flag01, label: "Email For", required: true, section: "details", full: true, error: "Email For is required!" , placeholder: "Enter email for" },
        ACTIVE,
    ],
    columns: [{ name: "Email For", selector: (row) => row.emailFor, minWidth: "220px" }],
    recordTitle: (r) => r.emailFor,
};

export const emailSetupConfig = {
    filterFields: [
        { name: "email", label: "Email", type: "string" },
        { name: "host", label: "Host", type: "string" },
        { name: "port", label: "Port", type: "string" },
        { name: "SSL", label: "Uses SSL", type: "boolean" },
        { name: "isActive", label: "Active", type: "boolean" },
        { name: "createdAt", label: "Created", type: "date" },
    ],
    key: "email-setup",
    path: "/email-setup",
    section: "CMS",
    singular: "Email Setup",
    plural: "Email Setups",
    description: "SMTP accounts outgoing mail is sent from.",
    api: { search: searchEmailSetups, getById: getEmailSetupById, create: createEmailSetup, update: updateEmailSetup, remove: deleteEmailSetup },
    sections: [
        { id: "account", title: "Account", description: "The mailbox messages are sent from." },
        { id: "server", title: "Server", description: "SMTP host and port for this account." },
        { id: "status", title: "Status" },
    ],
    fields: [
        {
            name: "email", label: "Email", type: "email", required: true, section: "account", error: "Email is required!", placeholder: "name@company.com",
            validate: (v) => (v && !isValidEmail(v) ? "Invalid email address" : undefined),
        },
        { name: "appPassword", label: "App Password", type: "password", required: true, section: "account", error: "App Password is required!", placeholder: "Enter app password",
          hint: "An app-specific password, not the account password." },
        { name: "host", icon: Server01, label: "Host", required: true, section: "server", placeholder: "smtp.example.com", error: "Host is required!" },
        { name: "port", icon: Hash02, label: "Port", required: true, section: "server", placeholder: "587", error: "Port is required!" },
        { name: "SSL", label: "Use SSL", type: "checkbox", section: "server", default: false },
        ACTIVE,
    ],
    columns: [
        { name: "Email", selector: (row) => row.email, minWidth: "220px" },
        { name: "Host", selector: (row) => row.host, minWidth: "170px" },
        { name: "Port", selector: (row) => row.port, minWidth: "100px" },
    ],
    recordTitle: (r) => r.email,
};

export const menuGroupConfig = {
    filterFields: [
        { name: "menuGroupName", label: "Menu Group Name", type: "string" },
        { name: "sequence", label: "Sequence", type: "number" },
        { name: "isLink", label: "Direct Link", type: "boolean" },
        { name: "isActive", label: "Active", type: "boolean" },
        { name: "createdAt", label: "Created", type: "date" },
    ],
    key: "menu-group",
    path: "/menu-group",
    section: "Master",
    singular: "Menu Group",
    plural: "Menu Groups",
    description: "Top-level groupings in the sidebar navigation.",
    api: { search: searchMenuGroups, getById: getMenuGroupById, create: createMenuGroup, update: updateMenuGroup, remove: deleteMenuGroup },
    sections: [
        { id: "details", title: "Group details", description: "Name, ordering and the icon shown in the sidebar." },
        { id: "link", title: "Navigation", description: "A direct-link group has no submenus and navigates straight to a URL." },
        { id: "status", title: "Status" },
    ],
    fields: [
        { name: "menuGroupName", icon: Tag01, label: "Menu Group Name", required: true, section: "details", error: "Menu Group Name is required!" , placeholder: "Enter menu group name" },
        { name: "sequence", icon: Hash02, label: "Sequence", type: "number", min: 1, required: true, section: "details", error: "Sequence is required!" , placeholder: "Enter sequence" },
        { name: "icon", label: "Menu Group Icon", type: "icon", section: "details", full: true },
        { name: "isLink", label: "Is Direct Link (no submenus)", type: "checkbox", section: "link", default: false },
        {
            name: "menuUrl", label: "Menu URL", section: "link", full: true,
            disabled: (values) => !values.isLink,
            validate: (v, values) => (values.isLink && !v ? "Menu URL is required for direct link menu groups!" : undefined),
        },
        ACTIVE,
    ],
    columns: [
        { name: "Menu Group Name", selector: (row) => row.menuGroupName, sortable: true, sortField: "menuGroupName", minWidth: "180px" },
        { name: "Sequence", selector: (row) => row.sequence, sortable: true, sortField: "sequence", minWidth: "120px" },
        STATUS_COLUMN,
    ],
    recordTitle: (r) => r.menuGroupName,
};

// ==========================================
// TECHNO SALES DYNAMIC MODULE ENTITIES
// ==========================================
import { getAllCategories, searchCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "../api/categories.api";
import { searchProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../api/products.api";
import { searchBlogPosts, getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost } from "../api/blogPosts.api";
import { searchInquiries, getInquiryById, createInquiry, updateInquiry, deleteInquiry } from "../api/inquiries.api";
import { searchTestimonials, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial } from "../api/testimonials.api";
import { searchLocationCities, getLocationCityById, createLocationCity, updateLocationCity, deleteLocationCity } from "../api/locationCities.api";
import { searchFaqs, getFaqById, createFaq, updateFaq, deleteFaq } from "../api/faqs.api";
import { searchBrandPartners, getBrandPartnerById, createBrandPartner, updateBrandPartner, deleteBrandPartner } from "../api/brandPartners.api";

export const categoryConfig = {
    filterFields: [
        { name: "name", label: "Category Name", type: "string" },
        { name: "slug", label: "Slug", type: "string" },
        { name: "isActive", label: "Active", type: "boolean" },
        { name: "createdAt", label: "Created", type: "date" },
    ],
    key: "category",
    path: "/category",
    section: "Catalog",
    singular: "Category",
    plural: "Categories",
    description: "Product categories displayed across the website catalog and navigation.",
    api: { search: searchCategories, getById: getCategoryById, create: createCategory, update: updateCategory, remove: deleteCategory },
    sections: [
        { id: "details", title: "Category Details", description: "Name, URL slug and header information." },
        { id: "media", title: "Media & Tagline", description: "Banner image path and descriptive blurb." },
        { id: "status", title: "Status & Order" },
        SEO_SECTION,
    ],
    fields: [
        { name: "name", icon: Tag01, label: "Category Name", required: true, section: "details", placeholder: "e.g. Motors, Cables & Wires", error: "Category Name is required" },
        { name: "slug", icon: Hash02, label: "URL Slug", required: true, section: "details", placeholder: "e.g. motors, cables, switchgears, frp", error: "Slug is required" },
        { name: "title", label: "Page Title", section: "details", placeholder: "e.g. Industrial Motors" },
        { name: "tagline", label: "Tagline", section: "media", placeholder: "e.g. Siemens, CG & ABB induction motors" },
        { name: "image", icon: Link01, label: "Banner Image URL", section: "media", placeholder: "/images/categories/industrial-motors.jpg" },
        imageAltField("media", "Banner Image Alt Text"),
        { name: "blurb", type: "textarea", label: "Short Blurb", section: "media", full: true, placeholder: "Brief summary describing this product line" },
        { name: "sequence", icon: Hash02, label: "Display Order", type: "number", section: "status" },
        ACTIVE,
        ...SEO_FIELDS,
    ],
    columns: [
        { name: "Category Name", selector: (row) => row.name, sortable: true, sortField: "name", minWidth: "180px" },
        { name: "Slug", selector: (row) => row.slug, sortable: true, sortField: "slug", minWidth: "140px" },
        { name: "Page Title", selector: (row) => row.title, minWidth: "200px" },
        { name: "Order", selector: (row) => row.sequence, minWidth: "90px" },
    ],
    recordTitle: (r) => r.name,
};

export const productConfig = {
    filterFields: [
        { name: "name", label: "Product Name", type: "string" },
        { name: "brand", label: "Brand", type: "string" },
        { name: "categorySlug", label: "Category Slug", type: "string" },
        { name: "isActive", label: "Active", type: "boolean" },
        { name: "createdAt", label: "Created", type: "date" },
    ],
    filterLookups: { categories: asOptions(getAllCategories, "name") },
    key: "product",
    path: "/product",
    section: "Catalog",
    singular: "Product",
    plural: "Products",
    description: "Industrial equipment catalog (Motors, Switchgears, Cables, FRP).",
    api: { search: searchProducts, getById: getProductById, create: createProduct, update: updateProduct, remove: deleteProduct },
    lookups: { categories: asOptions(getAllCategories, "name") },
    sections: [
        { id: "details", title: "Product Information", description: "Equipment name, slug, brand and distributorship badge." },
        { id: "classification", title: "Category & Media", description: "Category alignment, thumbnail image and SVG icon." },
        { id: "content", title: "Descriptions & Specs", description: "Overview description and technical specifications." },
        { id: "status", title: "Status & Ordering" },
        SEO_SECTION,
    ],
    fields: [
        { name: "name", icon: Tag01, label: "Product Name", required: true, section: "details", placeholder: "e.g. SIEMENS Motors, CG Motors", error: "Product Name is required" },
        { name: "slug", icon: Hash02, label: "URL Slug", required: true, section: "details", placeholder: "e.g. siemens-motors", error: "Slug is required" },
        { name: "brand", icon: Shield01, label: "Brand / Manufacturer", required: true, section: "details", placeholder: "e.g. SIEMENS, CG (Crompton), ABB, POLYCAB, FRP", error: "Brand is required" },
        { name: "specBadge", label: "Badge Text", section: "details", placeholder: "e.g. Authorized Distributor, Trusted Supplier" },
        { name: "categorySlug", label: "Category Slug", required: true, section: "classification", placeholder: "e.g. motors, cables, switchgears, frp", error: "Category slug is required" },
        { name: "image", icon: Link01, label: "Image URL", section: "classification", placeholder: "/images/products/siemens-motors.jpg" },
        imageAltField("classification", "Product Image Alt Text"),
        { name: "desc", type: "textarea", label: "Brief Description", required: true, section: "content", full: true, placeholder: "Industrial description of the equipment...", error: "Description is required" },
        { name: "specs", type: "textarea", label: "Technical Specs (comma separated)", section: "content", full: true, placeholder: "Low Voltage AC Motors, High-Efficiency Motors (IE2/IE3/IE4), HVAC Motors" },
        { name: "applications", type: "textarea", label: "Target Applications (comma separated)", section: "content", full: true, placeholder: "Chemical & Pharma Units, Oil & Gas Plants, Water Treatment" },
        { name: "whyChoose", type: "textarea", label: "Why Choose Us Points (comma separated)", section: "content", full: true, placeholder: "10+ years experience, verified product quality, ready stock in Ankleshwar" },
        { name: "sequence", icon: Hash02, label: "Display Order", type: "number", section: "status" },
        ACTIVE,
        ...SEO_FIELDS,
    ],
    columns: [
        {
            name: "IMAGE",
            minWidth: "80px",
            maxWidth: "90px",
            sortable: false,
            cell: (row) => (
                <div className="flex items-center justify-center">
                    <div className="flex size-11 items-center justify-center rounded-full bg-secondary p-1 shadow-xs ring-1 ring-secondary">
                        {row.image ? (
                            <img
                                src={row.image}
                                alt={row.name}
                                className="size-full rounded-full object-contain"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/44x44?text=TS";
                                }}
                            />
                        ) : (
                            <span className="text-[11px] font-bold text-quaternary">TS</span>
                        )}
                    </div>
                </div>
            ),
        },
        {
            name: "PRODUCT NAME",
            sortable: true,
            sortField: "name",
            minWidth: "200px",
            cell: (row) => (
                <span className="text-[13.5px] font-semibold text-primary">{row.name}</span>
            ),
        },
        {
            name: "BRAND NAME",
            sortable: true,
            sortField: "brand",
            minWidth: "140px",
            cell: (row) => (
                <span className="text-[13.5px] text-secondary">{row.brand || "—"}</span>
            ),
        },
        {
            name: "CATEGORY KEY",
            sortable: true,
            sortField: "categorySlug",
            minWidth: "140px",
            cell: (row) => (
                <span className="text-[13.5px] text-secondary">{row.categorySlug || "—"}</span>
            ),
        },
        {
            name: "SLUG URL",
            sortable: true,
            sortField: "slug",
            minWidth: "180px",
            cell: (row) => (
                <span className="font-mono text-[13px] text-tertiary">{row.slug || "—"}</span>
            ),
        },
        STATUS_COLUMN,
    ],
    recordTitle: (r) => r.name,
};

export const inquiryConfig = {
    filterFields: [
        { name: "name", label: "Contact Name", type: "string" },
        { name: "phone", label: "Phone", type: "string" },
        { name: "email", label: "Email", type: "string" },
        { name: "status", label: "Status", type: "string" },
        { name: "type", label: "Type", type: "string" },
        { name: "createdAt", label: "Received Date", type: "date" },
    ],
    key: "inquiry",
    path: "/inquiry",
    section: "Leads & RFQs",
    singular: "Inquiry / RFQ",
    plural: "Inquiries & RFQs",
    description: "Customer quotation requests and website inquiries submitted via contact and RFQ forms.",
    api: { search: searchInquiries, getById: getInquiryById, create: createInquiry, update: updateInquiry, remove: deleteInquiry },
    sections: [
        { id: "customer", title: "Customer Information", description: "Name, phone, email and organization." },
        { id: "request", title: "Quotation / Requirement Details", description: "Target product, quantities, timeline and requirements." },
        { id: "crm", title: "Lead Status & Processing", description: "Follow-up notes and current pipeline status." },
    ],
    fields: [
        { name: "name", icon: User01, label: "Customer Name", required: true, section: "customer", placeholder: "e.g. Rajesh Shah", error: "Name is required" },
        { name: "company", icon: Building07, label: "Company / Plant Name", section: "customer", placeholder: "e.g. Gujarat Chemicals Ltd." },
        { name: "phone", icon: Phone, label: "Phone Number", required: true, section: "customer", placeholder: "10-digit mobile or phone", error: "Phone is required" },
        { name: "email", icon: Mail01, label: "Email Address", section: "customer", placeholder: "contact@company.com" },
        { name: "type", label: "Inquiry Type", type: "select", options: [{ value: "contact_inquiry", label: "Contact Inquiry" }, { value: "rfq", label: "RFQ Formal Quote" }, { value: "quote_request", label: "Quick Quote" }], section: "request" },
        { name: "productName", label: "Equipment / Product", section: "request", placeholder: "e.g. SIEMENS Motors, Polycab Cables" },
        { name: "quantity", icon: Hash02, label: "Quantity", type: "number", section: "request" },
        { name: "timeline", label: "Required Timeline", section: "request", placeholder: "e.g. immediate, 1-2 weeks, tender" },
        { name: "details", type: "textarea", label: "Requirement Details / BOQ Notes", section: "request", full: true, placeholder: "Customer requirements or specific motor/switchgear ratings..." },
        { name: "status", label: "Lead Status", type: "select", options: [{ value: "New", label: "New Lead" }, { value: "In Review", label: "In Review / Sizing" }, { value: "Quoted", label: "Quoted" }, { value: "Closed", label: "Closed / Won" }, { value: "Rejected", label: "Rejected / Lost" }], section: "crm" },
        { name: "notes", type: "textarea", label: "Internal Sales Notes", section: "crm", full: true, placeholder: "Internal dispatch notes, follow up dates..." },
        ACTIVE,
    ],
    columns: [
        { name: "Customer Name", selector: (row) => row.name, sortable: true, sortField: "name", minWidth: "170px" },
        { name: "Company", selector: (row) => row.company || "-", minWidth: "170px" },
        { name: "Phone", selector: (row) => row.phone, minWidth: "140px" },
        { name: "Product / Equipment", selector: (row) => row.productName || row.category || "General", minWidth: "180px" },
        { name: "Type", selector: (row) => (row.type === "rfq" ? "RFQ" : "Inquiry"), minWidth: "100px" },
        { name: "Status", selector: (row) => row.status || "New", minWidth: "120px" },
    ],
    recordTitle: (r) => `${r.name} (${r.productName || "Inquiry"})`,
};

export const blogPostConfig = {
    filterFields: [
        { name: "title", label: "Article Title", type: "string" },
        { name: "topic", label: "Topic", type: "string" },
        { name: "slug", label: "Slug", type: "string" },
        { name: "isActive", label: "Active", type: "boolean" },
        { name: "createdAt", label: "Created", type: "date" },
    ],
    key: "blog-post",
    path: "/blog-post",
    section: "Content (CMS)",
    singular: "Blog Post",
    plural: "Blog Posts",
    description: "Industry news, technical articles, and guides published on the website.",
    api: { search: searchBlogPosts, getById: getBlogPostById, create: createBlogPost, update: updateBlogPost, remove: deleteBlogPost },
    sections: [
        { id: "details", title: "Article Information", description: "Title, slug, topic category and publication date." },
        { id: "content", title: "Article Content", description: "Summary excerpt and media thumbnail." },
        { id: "status", title: "Publishing Status" },
        SEO_SECTION,
    ],
    fields: [
        { name: "title", label: "Article Title", required: true, section: "details", full: true, placeholder: "e.g. CG Motors vs Siemens Motors: Which Is Better?", error: "Title is required" },
        { name: "slug", icon: Hash02, label: "URL Slug", required: true, section: "details", placeholder: "e.g. cg-motors-vs-siemens-motors", error: "Slug is required" },
        { name: "topic", label: "Topic / Category", section: "details", placeholder: "e.g. Motors, Switchgears, Cables, FRP" },
        { name: "publishDate", label: "Publish Date (Display)", section: "details", placeholder: "e.g. 10 August, 2026" },
        { name: "image", icon: Link01, label: "Featured Image URL", section: "content", placeholder: "/images/blog/cg-vs-siemens-motors.jpg" },
        imageAltField("content", "Featured Image Alt Text"),
        { name: "excerpt", type: "textarea", label: "Summary Excerpt", required: true, section: "content", full: true, placeholder: "Short 2-3 sentence overview for the card list...", error: "Excerpt is required" },
        { name: "content", type: "richtext", label: "Full Article Body / Content (Rich Text)", section: "content", full: true, placeholder: "Detailed article paragraphs, headings, lists, tables, links..." },
        ACTIVE,
        ...SEO_FIELDS,
    ],
    columns: [
        { name: "Article Title", selector: (row) => row.title, sortable: true, sortField: "title", minWidth: "260px" },
        { name: "Topic", selector: (row) => row.topic, sortable: true, sortField: "topic", minWidth: "130px" },
        { name: "Date", selector: (row) => row.publishDate || "-", minWidth: "140px" },
    ],
    recordTitle: (r) => r.title,
};

export const testimonialConfig = {
    filterFields: [
        { name: "name", label: "Client Name", type: "string" },
        { name: "role", label: "Company / Role", type: "string" },
        { name: "isActive", label: "Active", type: "boolean" },
        { name: "createdAt", label: "Created", type: "date" },
    ],
    key: "testimonial",
    path: "/testimonial",
    section: "Content (CMS)",
    singular: "Testimonial",
    plural: "Testimonials",
    description: "Client reviews and feedback displayed on the homepage and testimonials page.",
    api: { search: searchTestimonials, getById: getTestimonialById, create: createTestimonial, update: updateTestimonial, remove: deleteTestimonial },
    sections: [
        { id: "details", title: "Client Details", description: "Person name, organization role and initials avatar." },
        { id: "feedback", title: "Review Content", description: "Client review text and rating." },
        { id: "status", title: "Status & Order" },
    ],
    fields: [
        { name: "name", icon: User01, label: "Client Name", required: true, section: "details", placeholder: "e.g. Atul Panchal", error: "Name is required" },
        { name: "role", icon: Building07, label: "Company / Plant", required: true, section: "details", placeholder: "e.g. Shiva Pharma, Spectom", error: "Company is required" },
        { name: "initials", label: "Avatar Initials", section: "details", placeholder: "e.g. AP" },
        { name: "rating", icon: Hash02, label: "Star Rating (1-5)", type: "number", section: "feedback", default: 5 },
        { name: "text", type: "textarea", label: "Testimonial Text", required: true, section: "feedback", full: true, placeholder: "Client feedback statement...", error: "Text is required" },
        { name: "sequence", icon: Hash02, label: "Display Order", type: "number", section: "status" },
        ACTIVE,
    ],
    columns: [
        { name: "Client Name", selector: (row) => row.name, sortable: true, sortField: "name", minWidth: "170px" },
        { name: "Company", selector: (row) => row.role, minWidth: "180px" },
        { name: "Rating", selector: (row) => `${row.rating || 5} ★`, minWidth: "90px" },
    ],
    recordTitle: (r) => `${r.name} - ${r.role}`,
};

export const locationCityConfig = {
    filterFields: [
        { name: "name", label: "City Name", type: "string" },
        { name: "district", label: "District", type: "string" },
        { name: "slug", label: "Slug", type: "string" },
        { name: "isActive", label: "Active", type: "boolean" },
        { name: "createdAt", label: "Created", type: "date" },
    ],
    key: "location-city",
    path: "/location-city",
    section: "Content (CMS)",
    singular: "Service Location",
    plural: "Service Locations",
    description: "Coverage areas and regional city pages across Gujarat.",
    api: { search: searchLocationCities, getById: getLocationCityById, create: createLocationCity, update: updateLocationCity, remove: deleteLocationCity },
    sections: [
        { id: "details", title: "City & District", description: "City name, slug, district and headline title." },
        { id: "logistics", title: "Logistics Info", description: "Distance from Ankleshwar hub, industrial zones count and contact phone." },
        { id: "content", title: "Local Market Content", description: "Specific industrial summary for this location." },
        { id: "status", title: "Status & Order" },
        SEO_SECTION,
    ],
    fields: [
        { name: "name", icon: MarkerPin01, label: "City Name", required: true, section: "details", placeholder: "e.g. Ankleshwar, Vadodara, Surat", error: "City Name is required" },
        { name: "slug", icon: Hash02, label: "URL Slug", required: true, section: "details", placeholder: "e.g. ankleshwar, vadodara", error: "Slug is required" },
        { name: "district", label: "District", required: true, section: "details", placeholder: "e.g. Bharuch District, Vadodara District", error: "District is required" },
        { name: "title", label: "Page Headline Title", section: "details", placeholder: "e.g. Industrial Motors & Cables in Vadodara" },
        { name: "distance", label: "Distance from Hub", section: "logistics", placeholder: "e.g. 0 KM, ~85 KM" },
        { name: "zones", label: "Industrial Zones Count", section: "logistics", placeholder: "e.g. 8, 5, 6" },
        { name: "phone", icon: Phone, label: "Dedicated Contact Phone", section: "logistics", placeholder: "+91 98980 78247" },
        { name: "desc", type: "textarea", label: "Regional Industrial Overview", section: "content", full: true, placeholder: "Description of local GIDC estates, chemical/pharma clusters served..." },
        { name: "sequence", icon: Hash02, label: "Display Order", type: "number", section: "status" },
        ACTIVE,
        ...SEO_FIELDS,
    ],
    columns: [
        { name: "City Name", selector: (row) => row.name, sortable: true, sortField: "name", minWidth: "160px" },
        { name: "District", selector: (row) => row.district, minWidth: "160px" },
        { name: "Distance", selector: (row) => row.distance || "-", minWidth: "120px" },
        { name: "Zones", selector: (row) => row.zones || "-", minWidth: "90px" },
    ],
    recordTitle: (r) => r.name,
};

export const faqConfig = {
    filterFields: [
        { name: "question", label: "Question", type: "string" },
        { name: "category", label: "Category", type: "string" },
        { name: "isActive", label: "Active", type: "boolean" },
        { name: "createdAt", label: "Created", type: "date" },
    ],
    key: "faq",
    path: "/faq",
    section: "Content (CMS)",
    singular: "FAQ",
    plural: "FAQs",
    description: "Frequently Asked Questions for general visitors and product categories.",
    api: { search: searchFaqs, getById: getFaqById, create: createFaq, update: updateFaq, remove: deleteFaq },
    sections: [
        { id: "details", title: "FAQ Content", description: "Question inquiry and detailed answer." },
        { id: "status", title: "Categorization & Order" },
    ],
    fields: [
        { name: "question", label: "Question", required: true, section: "details", full: true, placeholder: "e.g. What are Siemens Switchgears used for?", error: "Question is required" },
        { name: "answer", type: "textarea", label: "Answer", required: true, section: "details", full: true, rows: 4, placeholder: "Comprehensive explanation...", error: "Answer is required" },
        { name: "category", label: "Category", section: "status", placeholder: "e.g. General, Motors, Switchgears, Cables, FRP" },
        { name: "sequence", icon: Hash02, label: "Display Order", type: "number", section: "status" },
        ACTIVE,
    ],
    columns: [
        { name: "Question", selector: (row) => row.question, sortable: true, sortField: "question", minWidth: "300px" },
        { name: "Category", selector: (row) => row.category || "General", minWidth: "140px" },
        { name: "Order", selector: (row) => row.sequence, minWidth: "90px" },
    ],
    recordTitle: (r) => r.question,
};

export const brandPartnerConfig = {
    filterFields: [
        { name: "name", label: "Brand Partner Name", type: "string" },
        { name: "badge", label: "Badge", type: "string" },
        { name: "badgeType", label: "Badge Type", type: "string" },
        { name: "isActive", label: "Active", type: "boolean" },
        { name: "createdAt", label: "Created", type: "date" },
    ],
    key: "brand-partner",
    path: "/brand-partner",
    section: "Catalog",
    singular: "Brand Partner",
    plural: "Brand Partners",
    description: "Authorized brand distributor and supplier partnerships (Siemens, Polycab, CG, ABB, FRP).",
    api: { search: searchBrandPartners, getById: getBrandPartnerById, create: createBrandPartner, update: updateBrandPartner, remove: deleteBrandPartner },
    sections: [
        { id: "details", title: "Partner Details", description: "Brand name, official badge and distinction." },
        { id: "content", title: "Product Lines & Description", description: "Key lines and capability highlights." },
        { id: "status", title: "Status & Order" },
    ],
    fields: [
        { name: "name", icon: Shield01, label: "Brand Partner Name", required: true, section: "details", placeholder: "e.g. SIEMENS SWITCHGEARS, POLYCAB CABLES", error: "Name is required" },
        { name: "badge", label: "Badge Title", section: "details", placeholder: "e.g. AUTHORIZED DISTRIBUTOR, TRUSTED SUPPLIER" },
        { name: "badgeType", label: "Badge Type", type: "select", options: [{ value: "official", label: "Official (Orange)" }, { value: "certified", label: "Certified (Blue/Dark)" }, { value: "supplier", label: "Direct Supplier" }], section: "details" },
        { name: "logo", icon: Link01, label: "Logo URL", section: "details", placeholder: "/images/brands/siemens.png" },
        { name: "desc", type: "textarea", label: "Partnership Description", section: "content", full: true, placeholder: "Details regarding authorized distributorship status..." },
        { name: "lines", type: "textarea", label: "Product Lines (comma separated)", section: "content", full: true, placeholder: "Low Voltage Motors, Switchgears, IE2/IE3/IE4 Motors" },
        { name: "sequence", icon: Hash02, label: "Display Order", type: "number", section: "status" },
        ACTIVE,
    ],
    columns: [
        { name: "Brand Partner Name", selector: (row) => row.name, sortable: true, sortField: "name", minWidth: "220px" },
        { name: "Badge", selector: (row) => row.badge || "-", minWidth: "190px" },
        { name: "Type", selector: (row) => row.badgeType || "-", minWidth: "120px" },
    ],
    recordTitle: (r) => r.name,
};

export const UNIFORM_ENTITIES = [
    // Techno Sales Modules
    categoryConfig,
    productConfig,
    inquiryConfig,
    blogPostConfig,
    testimonialConfig,
    locationCityConfig,
    faqConfig,
    brandPartnerConfig,

    // Base Masters
    countryConfig,
    stateConfig,
    cityConfig,
    currencyConfig,
    roleConfig,
    departmentConfig,
    emailForConfig,
    emailSetupConfig,
    menuGroupConfig,
];
