/**
 * The admin app is mounted under /admin inside the public site's router, but
 * entity configs and the menu API both store paths without that prefix
 * ("/product", not "/admin/product").
 *
 * Adding the prefix was previously open-coded in the route table and again in
 * MenuContext, and not at all in the CRUD screens - so every View/Edit/Add
 * button navigated to "/product/:id/edit", which the public router answered
 * with its 404 page. Everything that turns a stored path into a real URL now
 * goes through here.
 */
export const ADMIN_BASE = "/admin";

export const adminPath = (path) => {
    if (!path) return ADMIN_BASE;
    if (path === ADMIN_BASE || path.startsWith(`${ADMIN_BASE}/`)) return path;
    return `${ADMIN_BASE}${path.startsWith("/") ? path : `/${path}`}`;
};
