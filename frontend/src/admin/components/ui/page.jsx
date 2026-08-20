import { Link } from "react-router-dom";
import { ChevronRight, Edit01, Eye, HomeLine, Plus, SearchLg, Trash01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { cx } from "@/utils/cx";

/** Home > Section > Current breadcrumbs */
export const Breadcrumbs = ({ pageTitle, pageHref, title }) => (
    <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-tertiary">
            <li className="flex items-center">
                <Link
                    to="/admin/dashboard"
                    aria-label="Dashboard"
                    className="rounded p-0.5 text-fg-quaternary outline-focus-ring transition hover:text-fg-secondary focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                    <HomeLine className="size-3.5" />
                </Link>
            </li>
            {pageTitle && (
                <>
                    <ChevronRight className="size-3.5 shrink-0 text-fg-quaternary" />
                    <li>
                        {pageHref ? (
                            <Link
                                to={pageHref}
                                className="rounded font-medium text-tertiary outline-focus-ring transition hover:text-brand-secondary focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                {pageTitle}
                            </Link>
                        ) : (
                            <span className="font-medium text-tertiary">{pageTitle}</span>
                        )}
                    </li>
                </>
            )}
            <ChevronRight className="size-3.5 shrink-0 text-fg-quaternary" />
            <li aria-current="page" className="font-medium text-secondary">
                {title}
            </li>
        </ol>
    </nav>
);

/**
 * Search box shared by the page header and the table toolbar, so the two can't
 * drift apart in height, radius or focus treatment the way they had.
 */
export const SearchInput = ({ value, onChange, placeholder = "Search...", className, ...rest }) => (
    <div className={cx("relative h-10 w-full min-w-0 sm:w-72", className)}>
        <SearchLg className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-fg-quaternary" />
        <input
            type="search"
            aria-label={placeholder}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            // Matches the ring convention in components/base/input/input.tsx so
            // the toolbar search and the form inputs focus identically.
            className="h-10 w-full rounded-lg bg-primary pr-3.5 pl-10 text-sm text-primary shadow-xs ring-1 ring-primary transition duration-100 ring-inset outline-hidden placeholder:text-placeholder focus:ring-2 focus:ring-brand"
            {...rest}
        />
    </div>
);

/**
 * Trigger for the Filters and Columns popovers. They are toggles rather than
 * actions, so they keep the outlined "secondary" weight instead of Button's.
 */
export const ToolbarButton = ({ icon: Icon, children, isActive = false, count, ...rest }) => (
    <button
        type="button"
        aria-pressed={isActive}
        className={cx(
            "flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-lg px-3.5 text-sm font-semibold whitespace-nowrap shadow-xs ring-1 transition ring-inset outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2",
            isActive
                ? "bg-brand-primary text-brand-secondary ring-brand"
                : "bg-primary text-secondary ring-primary hover:bg-primary_hover",
        )}
        {...rest}
    >
        {Icon && <Icon className={cx("size-4", isActive ? "text-fg-brand-primary" : "text-fg-quaternary")} />}
        <span>{children}</span>
        {count > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-brand-solid text-xs font-bold text-white">
                {count}
            </span>
        )}
    </button>
);

/** The "Active only" switch that every list screen carries. */
export const ActiveFilterToggle = ({ isSelected, onChange }) => (
    <div className="flex h-10 shrink-0 items-center rounded-lg bg-primary px-3.5 shadow-xs ring-1 ring-primary ring-inset">
        <Checkbox label="Active" isSelected={Boolean(isSelected)} onChange={onChange} />
    </div>
);

/** Title, breadcrumbs and the page-level control cluster. */
export const PageHeader = ({
    title,
    pageTitle,
    pageHref,
    description,
    filter,
    handleFilter,
    query,
    setQuery,
    tog_list,
    showAddButton = false,
    addLabel = "Add",
    searchPlaceholder = "Search...",
    actions,
}) => {
    const hasControls = Boolean(setQuery || handleFilter || showAddButton || actions);

    return (
        <div className="flex flex-col gap-4 pb-6">
            <Breadcrumbs pageTitle={pageTitle} pageHref={pageHref} title={title} />

            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex min-w-0 flex-col gap-1">
                    <h1 className="text-display-xs font-semibold text-primary">{title}</h1>
                    {description && <p className="text-sm text-tertiary">{description}</p>}
                </div>

                {hasControls && (
                    <div className="flex shrink-0 flex-wrap items-center gap-3 lg:justify-end">
                        {handleFilter && (
                            <ActiveFilterToggle
                                isSelected={filter}
                                onChange={(checked) => handleFilter({ target: { checked, type: "checkbox" } })}
                            />
                        )}
                        {setQuery && (
                            <SearchInput
                                value={query}
                                onChange={setQuery}
                                placeholder={searchPlaceholder}
                                className="sm:w-64"
                            />
                        )}
                        {actions && <div className="flex shrink-0 items-center gap-2.5">{actions}</div>}
                        {showAddButton && (
                            <Button iconLeading={Plus} onClick={() => tog_list?.()}>
                                {addLabel}
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

/** Surface container for tables, forms and detail panes. */
export const Card = ({ children, className = "" }) => (
    <div className={cx("overflow-hidden rounded-2xl bg-primary shadow-xs ring-1 ring-secondary", className)}>
        {children}
    </div>
);

/**
 * Row actions as icons rather than text. Tooltips carry the label, and each
 * button keeps an aria-label so the action is still announced.
 */
export const RowActions = ({ onView, onEdit, onRemove, canView = true, canEdit = true, canDelete = true }) => {
    const anything = (onView && canView) || (onEdit && canEdit) || (onRemove && canDelete);
    if (!anything) return <span className="text-sm text-quaternary">No actions</span>;

    return (
        <div className="flex items-center gap-0.5">
            {onView && canView && (
                <ButtonUtility size="sm" color="tertiary" icon={Eye} tooltip="View" aria-label="View" onClick={onView} />
            )}
            {onEdit && canEdit && (
                <ButtonUtility size="sm" color="tertiary" icon={Edit01} tooltip="Edit" aria-label="Edit" onClick={onEdit} />
            )}
            {onRemove && canDelete && (
                <ButtonUtility
                    size="sm"
                    color="tertiary-destructive"
                    icon={Trash01}
                    tooltip="Delete"
                    aria-label="Delete"
                    onClick={onRemove}
                />
            )}
        </div>
    );
};
