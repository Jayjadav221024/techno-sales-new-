import { Navigate } from "react-router-dom";
import { crudRoutes } from "@/components/crud";
import { UNIFORM_ENTITIES } from "@/entities/index.jsx";
import { ADVANCED_ENTITIES } from "@/entities/advanced";
import { adminPath } from "@/utils/admin-path";

import Login from "../pages/Authentication/Login";
import UserProfile from "../pages/Authentication/user-profile";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserRoles from "../pages/Setup/UserRoles";
import LoginAttemptLogs from "../pages/Master/LoginAttemptLogs";
import WebsiteEditor from "../pages/Website/WebsiteEditor";

const authProtectedRoutes = [
    { path: "/admin/dashboard", component: <Dashboard /> },
    { path: "/admin/profile", component: <UserProfile /> },

    // list / add / view / edit for every CRUD entity
    ...[...UNIFORM_ENTITIES, ...ADVANCED_ENTITIES].flatMap((entity) =>
        crudRoutes(entity).map((r) => ({ ...r, path: adminPath(r.path) })),
    ),

    // Not CRUD screens: a permission matrix, a read-only audit log, and the
    // click-to-edit website content editor.
    { path: "/admin/user-roles", component: <UserRoles /> },
    { path: "/admin/login-attempt-logs", component: <LoginAttemptLogs /> },
    { path: "/admin/website", component: <WebsiteEditor /> },

    { path: "/admin", exact: true, component: <Navigate to="/admin/dashboard" /> },
    { path: "/admin/*", component: <Navigate to="/admin/dashboard" /> },
];

const publicRoutes = [{ path: "/admin", component: <Login /> }, { path: "/admin/*", component: <Login /> }];

export { authProtectedRoutes, publicRoutes };
