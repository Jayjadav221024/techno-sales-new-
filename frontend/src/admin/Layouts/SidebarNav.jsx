import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut01 } from "@untitledui/icons";
import { MenuContext } from "../context/MenuContext";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../api/auth.api";
import { cx } from "@/utils/cx";

const iconMap = {
    Dashboard: "ri-dashboard-line",
    Products: "ri-shopping-bag-3-line",
    Categories: "ri-folder-3-line",
    "Brand Partners": "ri-medal-line",
    "Inquiries & RFQs": "ri-mail-star-line",
    "Blog Posts": "ri-article-line",
    Testimonials: "ri-chat-smile-2-line",
    FAQs: "ri-question-line",
    "Service Locations": "ri-map-pin-line",
    "Admin Users": "ri-shield-user-line",
    Users: "ri-user-line",
    Department: "ri-building-4-line",
    "User Roles": "ri-lock-password-line",
    Country: "ri-earth-line",
    State: "ri-map-2-line",
    City: "ri-building-line",
    Currency: "ri-money-dollar-circle-line",
    "Role Master": "ri-shield-check-line",
    "Menu Group": "ri-menu-line",
    "Menu Master": "ri-layout-grid-line",
    "Login Attempt Logs": "ri-history-line",
    "Email Setup": "ri-mail-settings-line",
    "Email For": "ri-mail-send-line",
    "Email Template": "ri-file-text-line",
};

const MenuIcon = ({ icon, name, className }) => {
    const iconClass = icon || iconMap[name] || "ri-checkbox-blank-circle-line";
    return (
        <span className="flex size-5 shrink-0 items-center justify-center">
            <i className={cx(iconClass, "text-[18px] leading-none", className)} />
        </span>
    );
};

/** Shared shape for nav rows with comfortable height and touch targets */
const getRowBase = (collapsed) =>
    cx(
        "group flex items-center rounded-lg font-medium outline-focus-ring transition duration-150 focus-visible:outline-2 focus-visible:outline-offset-2",
        collapsed
            ? "mx-auto size-10 justify-center text-[14px]"
            : "min-h-[42px] w-full gap-3.5 px-3.5 py-2.5 text-[13.5px]",
    );

/** A menu group or expandable branch */
const NavBranch = ({ name, icon, isOpen, onToggle, depth, hasActiveChild, collapsed, children }) => (
    <li className="my-0.5">
        <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            title={name}
            className={cx(
                getRowBase(collapsed),
                "cursor-pointer text-left",
                hasActiveChild
                    ? "bg-sidebar-item-hover font-semibold text-white"
                    : "text-sidebar-item hover:bg-sidebar-item-hover hover:text-white",
                isOpen && !hasActiveChild && "bg-sidebar-item-hover text-white",
            )}
        >
            <MenuIcon
                icon={icon}
                name={name}
                className={cx("transition-colors", hasActiveChild ? "text-brand-400" : "text-sidebar-heading group-hover:text-white")}
            />
            {!collapsed && <span className="flex-1 truncate tracking-normal">{name}</span>}
            {!collapsed && (
                <ChevronDown
                    className={cx(
                        "size-3.5 shrink-0 text-sidebar-heading transition-transform duration-200 group-hover:text-white",
                        isOpen && "rotate-180 text-white",
                    )}
                />
            )}
        </button>

        {/* Nested Sub-Menu Rail */}
        {!collapsed && (
            <div
                className={cx(
                    "grid transition-[grid-template-rows] duration-200 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
            >
                <ul className={cx("overflow-hidden border-l border-sidebar-border pl-2", depth === 0 ? "mt-1.5 ml-4" : "ml-3")}>
                    <div className="flex flex-col gap-1 py-1">{children}</div>
                </ul>
            </div>
        )}
    </li>
);

/** Nav Leaf with prominent active state matching reference */
const NavLeaf = ({ to, name, icon, isActive, collapsed, onClick }) => (
    <li className="my-0.5">
        <Link
            to={to}
            onClick={onClick}
            title={name}
            aria-current={isActive ? "page" : undefined}
            className={cx(
                getRowBase(collapsed),
                "relative",
                isActive
                    ? "bg-sidebar-item-active font-semibold text-white shadow-sm"
                    : "text-sidebar-item hover:bg-sidebar-item-hover hover:text-white",
            )}
        >
            <MenuIcon
                icon={icon}
                name={name}
                className={cx("transition-colors", isActive ? "text-white" : "text-sidebar-heading group-hover:text-white")}
            />
            {!collapsed && <span className="truncate tracking-normal">{name}</span>}
        </Link>
    </li>
);

/** Walks the tree to find which group/menu ids contain the current path */
const findAncestors = (nodes, path, trail = []) => {
    for (const node of nodes ?? []) {
        const id = node.groupId ?? node.id;
        if (node.url === path) return trail;
        const kids = node.menus ?? node.children;
        if (kids?.length) {
            const found = findAncestors(kids, path, [...trail, id]);
            if (found) return found;
        }
    }
    return null;
};

const containsPath = (node, path) => {
    if (node?.url === path) return true;
    const kids = node?.menus ?? node?.children;
    return Boolean(kids?.some((kid) => containsPath(kid, path)));
};

const SidebarNav = ({ collapsed = false, onNavigate }) => {
    const { menuData, loading, updateCurrentPagePermissions } = useContext(MenuContext);
    const { adminData, setAdminData, role } = useContext(AuthContext);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState({});

    const userName = adminData?.adminName || adminData?.userName || "Super Admin";
    const userInitials = (userName || "SA")
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const handleLogout = async () => {
        setAdminData(null);
        await logout();
        navigate("/admin");
    };

    const isOpen = (id) => Boolean(expanded[id]);

    useEffect(() => {
        const trail = findAncestors(menuData, pathname);
        if (trail?.length) {
            setExpanded((prev) => ({ ...prev, ...Object.fromEntries(trail.map((id) => [id, true])) }));
        }
    }, [pathname, menuData]);

    const toggle = (id, siblingIds = []) =>
        setExpanded((prev) => {
            if (prev[id]) return { ...prev, [id]: false };
            const next = { ...prev };
            siblingIds.forEach((sibling) => sibling !== id && (next[sibling] = false));
            next[id] = true;
            return next;
        });

    const renderItem = (item, siblingIds = [], depth = 1) => {
        if (!item?.name) return null;

        if (item.isParent && item.children?.length) {
            const childSiblings = item.children.filter((c) => c.isParent && c.children?.length).map((c) => c.id);
            return (
                <NavBranch
                    key={item.id}
                    name={item.name}
                    icon={item.icon}
                    depth={depth}
                    collapsed={collapsed}
                    hasActiveChild={containsPath(item, pathname)}
                    isOpen={isOpen(item.id)}
                    onToggle={() => toggle(item.id, siblingIds)}
                >
                    {item.children.map((child) => renderItem(child, childSiblings, depth + 1))}
                </NavBranch>
            );
        }

        return (
            <NavLeaf
                key={item.id}
                to={item.url}
                name={item.name}
                icon={item.icon}
                collapsed={collapsed}
                isActive={pathname === item.url}
                onClick={() => {
                    if (item.id) updateCurrentPagePermissions(item.id);
                    onNavigate?.();
                }}
            />
        );
    };

    const renderGroup = (group) => {
        if (group?.isLink) {
            if (!group.groupName || !group.url) return null;
            return (
                <NavLeaf
                    key={group.groupId}
                    to={group.url}
                    name={group.groupName}
                    icon={group.icon}
                    collapsed={collapsed}
                    isActive={pathname === group.url}
                    onClick={() => {
                        if (group.groupId) updateCurrentPagePermissions(group.groupId);
                        onNavigate?.();
                    }}
                />
            );
        }

        if (!group?.groupName || !group.menus) return null;
        const menuSiblings = group.menus.filter((m) => m.isParent && m.children?.length).map((m) => m.id);

        if (collapsed) {
            return (
                <div key={group.groupId} className="my-2">
                    <div className="mx-2 my-1.5 h-px bg-sidebar-border" />
                    <div className="flex flex-col gap-1">
                        {group.menus.map((menu) => renderItem(menu, menuSiblings))}
                    </div>
                </div>
            );
        }

        return (
            <div key={group.groupId} className="mt-4 mb-2 first:mt-1">
                <div className="px-3.5 pt-2 pb-1.5">
                    <p className="text-[11px] font-semibold tracking-wider text-sidebar-heading uppercase">
                        {group.groupName}
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    {group.menus.map((menu) => renderItem(menu, menuSiblings))}
                </div>
            </div>
        );
    };

    const groups = Array.isArray(menuData) ? menuData : [];

    return (
        <div className="flex flex-1 flex-col justify-between overflow-hidden">
            {/* Scrollable Navigation Items with Smooth Custom Scrollbar */}
            <nav aria-label="Main" className={cx("scrollbar-thin flex-1 overflow-y-auto pt-3.5 pb-6", collapsed ? "px-2" : "px-3.5")}>
                <div className="flex flex-col gap-1">
                    {loading &&
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className={cx("flex items-center gap-3 py-3", collapsed ? "justify-center px-0" : "px-3")}>
                                <span className="size-5 shrink-0 animate-pulse rounded-lg bg-sidebar-item-hover" />
                                {!collapsed && (
                                    <span
                                        className="h-4 animate-pulse rounded bg-sidebar-item-hover"
                                        style={{ width: `${55 + ((i * 13) % 30)}%` }}
                                    />
                                )}
                            </div>
                        ))}

                    {!loading && groups.map((group) => renderGroup(group))}
                </div>
            </nav>

            {/* Bottom User Profile & Utility Drawer */}
            {/* Theme switching lives in the header only - having it here too
                gave the shell two controls for one piece of state. */}
            <div className={cx("shrink-0 border-t border-sidebar-border bg-sidebar-surface-footer", collapsed ? "flex flex-col items-center p-2" : "p-3.5")}>
                <Link
                    to="/admin/profile"
                    title={userName}
                    onClick={() => onNavigate?.()}
                    className={cx(
                        "group flex items-center rounded-lg p-1.5 outline-focus-ring transition hover:bg-sidebar-item-hover focus-visible:outline-2 focus-visible:outline-offset-2",
                        collapsed ? "size-10 justify-center" : "gap-3",
                    )}
                >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-solid text-xs font-bold text-white shadow-xs">
                        {userInitials}
                    </span>
                    {!collapsed && (
                        <span className="flex min-w-0 flex-1 flex-col">
                            <span className="truncate text-[13.5px] font-semibold text-white">{userName}</span>
                            <span className="truncate text-xs text-sidebar-heading capitalize">{role || "Super Admin"}</span>
                        </span>
                    )}
                </Link>

                <div className={cx("mt-2 flex border-t border-sidebar-border pt-2", collapsed ? "w-full flex-col items-center gap-1" : "flex-col gap-0.5")}>
                    <button
                        type="button"
                        onClick={handleLogout}
                        title="Sign out"
                        aria-label="Sign out"
                        className={cx(
                            "flex cursor-pointer items-center rounded-lg text-[13px] font-medium text-sidebar-item outline-focus-ring transition hover:bg-error-solid/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2",
                            collapsed ? "size-9 justify-center" : "w-full gap-3.5 px-2.5 py-2",
                        )}
                    >
                        <LogOut01 className="size-4" />
                        {!collapsed && <span>Sign out</span>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SidebarNav;
