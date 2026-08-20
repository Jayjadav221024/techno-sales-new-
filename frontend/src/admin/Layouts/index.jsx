import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu02, Moon01, Sun, X as XClose } from "@untitledui/icons";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { cx } from "@/utils/cx";
import SidebarNav from "./SidebarNav";
import ProfileMenu from "./ProfileMenu";
import Footer from "./Footer";
import { useTheme } from "../hooks/useTheme";
import { MenuContext } from "../context/MenuContext";

const SidebarToggleIcon = ({ collapsed, className = "size-4" }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <rect width="18" height="18" x="3" y="3" rx="4" />
        <path d="M9 3v18" />
        {collapsed ? <path d="m13 9 3 3-3 3" /> : <path d="m15 9-3 3 3 3" />}
    </svg>
);

const BrandMark = ({ collapsed = false, onClick }) => (
    <Link
        to="/admin/dashboard"
        onClick={onClick}
        className="flex items-center gap-3 overflow-hidden rounded-lg outline-focus-ring transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-solid text-xs font-bold tracking-wider text-white shadow-xs">
            TS
        </span>
        {!collapsed && (
            <span className="flex flex-col whitespace-nowrap">
                <span className="text-sm leading-tight font-bold tracking-tight text-white">Techno Sales</span>
                <span className="text-[11px] leading-tight font-medium text-sidebar-heading">Admin console</span>
            </span>
        )}
    </Link>
);

/** Depth-first search for the menu entry whose url matches `path`. */
const findMenuName = (groups, path) => {
    const walk = (items) => {
        for (const item of items ?? []) {
            if (item.url === path && item.name) return item.name;
            const found = walk(item.children);
            if (found) return found;
        }
        return null;
    };

    for (const group of groups ?? []) {
        if (group.isLink && group.url === path) return group.groupName ?? null;
        const found = walk(group.menus);
        if (found) return found;
    }
    return null;
};

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const { isDark, toggleTheme } = useTheme();
    const { menuData } = useContext(MenuContext);
    const location = useLocation();

    // Prefer the menu's own label so the header reads "Products", not the
    // "Product" you get from title-casing the /admin/product slug.
    const segment = location.pathname.replace(/^\/admin\/?/, "").split("/")[0] || "dashboard";
    const basePath = `/admin/${segment}`;
    const formattedTitle =
        findMenuName(menuData, basePath) ??
        segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

    // The mobile drawer is a modal surface: Escape closes it, and the page
    // behind it must not scroll while it is open.
    useEffect(() => {
        if (!sidebarOpen) return;
        const onKeyDown = (event) => event.key === "Escape" && setSidebarOpen(false);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [sidebarOpen]);

    // Route changes should never leave the drawer covering the new page.
    useEffect(() => setSidebarOpen(false), [location.pathname]);

    return (
        <div className="flex h-dvh w-full overflow-hidden bg-secondary font-body text-primary antialiased">
            <a
                href="#admin-main"
                className="sr-only rounded-lg bg-brand-solid px-4 py-2 text-sm font-semibold text-white focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:not-sr-only"
            >
                Skip to content
            </a>

            {/* Mobile drawer */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <button
                        type="button"
                        aria-label="Close navigation"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-overlay/70 backdrop-blur-xs transition-opacity"
                    />

                    <aside
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation"
                        className="relative z-50 flex h-dvh w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar-surface shadow-2xl"
                    >
                        <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-sidebar-border px-4">
                            <BrandMark onClick={() => setSidebarOpen(false)} />
                            <button
                                type="button"
                                aria-label="Close navigation"
                                onClick={() => setSidebarOpen(false)}
                                className="cursor-pointer rounded-md p-1.5 text-sidebar-item outline-focus-ring transition hover:bg-sidebar-item-hover hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                <XClose className="size-5" />
                            </button>
                        </div>
                        <SidebarNav onNavigate={() => setSidebarOpen(false)} />
                    </aside>
                </div>
            )}

            {/* Desktop sidebar */}
            <aside
                className={cx(
                    "hidden h-dvh shrink-0 flex-col border-r border-sidebar-border bg-sidebar-surface transition-[width] duration-200 ease-out select-none md:flex",
                    collapsed ? "w-18" : "w-64",
                )}
            >
                <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border px-3.5">
                    <BrandMark collapsed={collapsed} />
                    {!collapsed && (
                        <button
                            type="button"
                            title="Collapse sidebar"
                            aria-label="Collapse sidebar"
                            onClick={() => setCollapsed(true)}
                            className="flex size-7.5 shrink-0 cursor-pointer items-center justify-center rounded-lg text-sidebar-item ring-1 ring-sidebar-border outline-focus-ring transition ring-inset hover:bg-sidebar-item-hover hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            <SidebarToggleIcon collapsed={false} />
                        </button>
                    )}
                </div>
                <SidebarNav collapsed={collapsed} />
            </aside>

            {/* Main column - the only vertically scrolling pane */}
            <div className="flex h-dvh min-w-0 flex-1 flex-col overflow-y-auto bg-secondary">
                <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-secondary bg-primary px-4 shadow-xs sm:px-6 lg:px-8">
                    <div className="flex min-w-0 items-center gap-3">
                        <ButtonUtility
                            size="sm"
                            color="tertiary"
                            icon={Menu02}
                            tooltip="Open menu"
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden"
                        />
                        {collapsed && (
                            <button
                                type="button"
                                title="Expand sidebar"
                                aria-label="Expand sidebar"
                                onClick={() => setCollapsed(false)}
                                className="hidden size-8 cursor-pointer items-center justify-center rounded-lg bg-primary text-fg-quaternary ring-1 ring-primary outline-focus-ring transition ring-inset hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2 md:flex"
                            >
                                <SidebarToggleIcon collapsed />
                            </button>
                        )}
                        <h2 className="truncate text-[15px] font-semibold text-primary">{formattedTitle}</h2>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                        <ButtonUtility
                            size="sm"
                            color="tertiary"
                            icon={isDark ? Sun : Moon01}
                            tooltip={isDark ? "Light mode" : "Dark mode"}
                            onClick={toggleTheme}
                        />
                        <span className="h-4 w-px bg-quaternary" />
                        <ProfileMenu />
                    </div>
                </header>

                <main id="admin-main" className="w-full min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
