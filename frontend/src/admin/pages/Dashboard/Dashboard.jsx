import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LayersThree01, ShieldTick, UserCheck01, Terminal } from "@untitledui/icons";
import { AuthContext } from "../../context/AuthContext";
import { MenuContext } from "../../context/MenuContext";
import { Breadcrumbs, Card } from "@/components/ui/page";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";

/** Flattens the menu tree into the leaf screens the current role can open. */
const collectScreens = (groups) => {
    const screens = [];
    const walk = (items) =>
        (items ?? []).forEach((item) => {
            if (item.children?.length) return walk(item.children);
            if (item.url && item.name) screens.push({ name: item.name, url: item.url, icon: item.icon });
        });

    (groups ?? []).forEach((group) => {
        if (group.isLink) {
            if (group.url && group.groupName) {
                screens.push({ name: group.groupName, url: group.url, icon: group.icon });
            }
            return;
        }
        walk(group.menus);
    });

    return screens;
};

const StatCard = ({ label, value, hint, icon, isLoading }) => (
    <Card className="flex flex-col justify-between p-6 lg:col-span-3">
        <div className="flex items-start justify-between gap-3">
            <span className="text-xs font-semibold tracking-wider text-quaternary uppercase">{label}</span>
            <FeaturedIcon color="brand" theme="light" size="md" icon={icon} />
        </div>
        <div className="mt-4 flex flex-col">
            {isLoading ? (
                <span className="h-9 w-12 animate-pulse rounded bg-quaternary" />
            ) : (
                <span className="text-display-sm font-semibold text-primary">{value}</span>
            )}
            <span className="mt-1 text-sm text-tertiary">{hint}</span>
        </div>
    </Card>
);

const QuickAccessItem = ({ title, to }) => (
    <Link
        to={to}
        className="group flex items-center justify-between gap-3 rounded-xl bg-primary px-4 py-3.5 ring-1 ring-secondary outline-focus-ring transition hover:bg-primary_hover hover:ring-brand focus-visible:outline-2 focus-visible:outline-offset-2"
    >
        <span className="truncate text-sm font-semibold text-secondary transition group-hover:text-primary">
            {title}
        </span>
        <ArrowRight className="size-4 shrink-0 text-fg-quaternary transition-transform group-hover:translate-x-0.5 group-hover:text-fg-brand-primary" />
    </Link>
);

const SecurityNote = ({ icon: Icon, title, children }) => (
    <div className="flex items-start gap-3.5">
        <FeaturedIcon color="gray" theme="light" size="sm" icon={Icon} />
        <div className="flex flex-col">
            <span className="text-sm font-semibold text-primary">{title}</span>
            <span className="mt-0.5 text-sm leading-relaxed text-tertiary">{children}</span>
        </div>
    </div>
);

const Dashboard = () => {
    const { adminData, role } = useContext(AuthContext);
    const { menuData, loading } = useContext(MenuContext);

    const userName = adminData?.adminName || adminData?.userName || "Super Admin";
    const firstName = userName.split(" ")[0] || "there";

    // These were hardcoded as 11 and 3, so they were wrong for every role that
    // wasn't the one they had been read off. Derive them from the live menu.
    const screens = useMemo(() => collectScreens(menuData), [menuData]);
    const groupCount = useMemo(
        () => (Array.isArray(menuData) ? menuData.filter((g) => g.isLink || g.menus?.length).length : 0),
        [menuData],
    );
    const quickAccess = screens.slice(0, 6);

    document.title = "Dashboard | Techno Sales Admin";

    return (
        <div className="flex max-w-full flex-col gap-6">
            <div className="flex flex-col gap-2">
                <Breadcrumbs title="Dashboard" />
                <h1 className="text-display-xs font-semibold text-primary">Dashboard</h1>
                <p className="text-sm text-tertiary">
                    Manage master data, roles and permissions, transactional email and audit logs from one place.
                </p>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
                {/* Welcome panel. Keeps the dark brand surface the sidebar uses
                    so the two read as one system in both themes. */}
                <div className="relative flex min-h-[165px] flex-col justify-between overflow-hidden rounded-2xl bg-sidebar-surface p-6 text-white shadow-xs lg:col-span-6">
                    <div aria-hidden="true" className="pointer-events-none absolute -right-4 -bottom-8 text-white opacity-[0.07]">
                        <ShieldTick className="size-52 stroke-[1px]" />
                    </div>

                    <div className="relative z-10 flex flex-col">
                        <h2 className="text-xl font-semibold tracking-tight text-white">Welcome back, {firstName}</h2>
                        <div className="mt-1.5 flex flex-wrap items-center gap-2">
                            <span className="text-sm text-sidebar-item">Signed in as</span>
                            <span className="inline-flex items-center rounded-md bg-sidebar-item-hover px-2 py-0.5 text-xs font-semibold text-white ring-1 ring-sidebar-border-strong">
                                {role || "Super Admin"}
                            </span>
                        </div>
                    </div>

                    <span className="relative z-10 mt-5 text-[10px] font-bold tracking-widest text-sidebar-heading uppercase">
                        Techno Sales · Admin console
                    </span>
                </div>

                <StatCard
                    label="Access scope"
                    value={screens.length}
                    hint="Screens you are authorised to open"
                    icon={LayersThree01}
                    isLoading={loading}
                />
                <StatCard
                    label="Modules"
                    value={groupCount}
                    hint="Configured menu groups"
                    icon={ShieldTick}
                    isLoading={loading}
                />
            </div>

            <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
                <Card className="p-6 lg:col-span-8">
                    <h3 className="mb-5 text-base font-semibold text-primary">Quick access</h3>

                    {loading ? (
                        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <span key={i} className="h-12 animate-pulse rounded-xl bg-quaternary" />
                            ))}
                        </div>
                    ) : quickAccess.length === 0 ? (
                        <p className="py-8 text-center text-sm text-tertiary">
                            No screens have been granted to your role yet.
                        </p>
                    ) : (
                        <div className={cx("grid grid-cols-1 gap-3.5", quickAccess.length > 1 && "sm:grid-cols-2")}>
                            {quickAccess.map((screen) => (
                                <QuickAccessItem key={screen.url} title={screen.name} to={screen.url} />
                            ))}
                        </div>
                    )}
                </Card>

                <Card className="flex flex-col justify-between p-6 lg:col-span-4">
                    <div>
                        <h3 className="mb-5 text-base font-semibold text-primary">Security</h3>
                        <div className="flex flex-col gap-4">
                            <SecurityNote icon={UserCheck01} title="Role-based access">
                                Every screen is checked against your role permissions.
                            </SecurityNote>
                            <SecurityNote icon={Terminal} title="Sign-in auditing">
                                Successful and failed attempts are recorded server-side.
                            </SecurityNote>
                        </div>
                    </div>

                    <Link
                        to="/admin/login-attempt-logs"
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-secondary shadow-xs ring-1 ring-primary outline-focus-ring transition ring-inset hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        <span>Inspect sign-in logs</span>
                        <ArrowRight className="size-4" />
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
