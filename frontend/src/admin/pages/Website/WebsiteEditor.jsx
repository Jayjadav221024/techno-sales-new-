import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AlertTriangle, Monitor01, Phone01, RefreshCw01, Tablet01, Trash01 } from "@untitledui/icons";
// The admin and the public site are one Vite app, so the editor reads the same
// section registry the website renders from - no duplicated schema.
import { SECTIONS, SECTION_PAGES, SECTIONS_BY_KEY, getSectionDefaults } from "../../../data/sections";
import {
    discardSectionDraft,
    listSiteContent,
    publishAllSections,
    publishSection,
    resetSection,
    saveSectionDraft,
} from "@/api/siteContent.api";
import { Card, PageHeader } from "@/components/ui/page";
import { Field, TextAreaField } from "@/components/ui/field";
import { ConfirmModal } from "@/components/ui/modal";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Badge } from "@/components/base/badges/badges";
import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";
import { cx } from "@/utils/cx";

const DEVICE_WIDTHS = { desktop: "100%", tablet: "820px", mobile: "420px" };

/** Deep-ish clone so editing a draft never mutates the shared defaults object. */
const cloneContent = (value) => JSON.parse(JSON.stringify(value ?? {}));

/** One editable field, or a repeating list of them. */
const SectionField = ({ field, value, onChange }) => {
    if (field.type === "list") {
        const items = Array.isArray(value) ? value : [];
        const blank = Object.fromEntries(field.itemFields.map((f) => [f.name, ""]));

        const update = (index, name, next) =>
            onChange(items.map((item, i) => (i === index ? { ...item, [name]: next } : item)));

        return (
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">{field.label}</span>
                    <Button size="sm" color="secondary" onClick={() => onChange([...items, blank])}>
                        Add {field.itemLabel?.toLowerCase() ?? "item"}
                    </Button>
                </div>

                {items.length === 0 && (
                    <p className="rounded-lg bg-secondary px-3 py-4 text-center text-sm text-tertiary">
                        Nothing here yet.
                    </p>
                )}

                {items.map((item, index) => (
                    <div key={index} className="flex flex-col gap-3 rounded-lg bg-secondary p-3 ring-1 ring-secondary">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold tracking-wider text-quaternary uppercase">
                                {field.itemLabel ?? "Item"} {index + 1}
                            </span>
                            <div className="flex items-center gap-0.5">
                                <ButtonUtility
                                    size="xs"
                                    color="tertiary"
                                    icon={RefreshCw01}
                                    tooltip="Move up"
                                    aria-label="Move up"
                                    isDisabled={index === 0}
                                    onClick={() => {
                                        const next = [...items];
                                        [next[index - 1], next[index]] = [next[index], next[index - 1]];
                                        onChange(next);
                                    }}
                                    className="rotate-90"
                                />
                                <ButtonUtility
                                    size="xs"
                                    color="tertiary-destructive"
                                    icon={Trash01}
                                    tooltip="Remove"
                                    aria-label={`Remove ${field.itemLabel ?? "item"} ${index + 1}`}
                                    onClick={() => onChange(items.filter((_, i) => i !== index))}
                                />
                            </div>
                        </div>

                        {field.itemFields.map((sub) =>
                            sub.type === "textarea" ? (
                                <TextAreaField
                                    key={sub.name}
                                    label={sub.label}
                                    name={sub.name}
                                    rows={2}
                                    hint={sub.hint}
                                    value={item[sub.name] ?? ""}
                                    onChange={(e) => update(index, sub.name, e.target.value)}
                                />
                            ) : (
                                <Field
                                    key={sub.name}
                                    label={sub.label}
                                    name={sub.name}
                                    hint={sub.hint}
                                    value={item[sub.name] ?? ""}
                                    onChange={(e) => update(index, sub.name, e.target.value)}
                                />
                            ),
                        )}
                    </div>
                ))}
            </div>
        );
    }

    const Component = field.type === "textarea" ? TextAreaField : Field;
    return (
        <Component
            label={field.label}
            name={field.name}
            hint={field.hint}
            rows={field.type === "textarea" ? 3 : undefined}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

const WebsiteEditor = () => {
    const frameRef = useRef(null);
    const [page, setPage] = useState("home");
    const [device, setDevice] = useState("desktop");
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeKey, setActiveKey] = useState(null);
    const [values, setValues] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [resetKey, setResetKey] = useState(null);

    const rowsByKey = useMemo(
        () => rows.reduce((acc, r) => ({ ...acc, [r.key]: r }), {}),
        [rows],
    );
    const pageSections = useMemo(() => SECTIONS.filter((s) => s.page === page), [page]);
    const activeSection = activeKey ? SECTIONS_BY_KEY[activeKey] : null;
    const pendingCount = rows.filter((r) => r.hasDraft).length;

    const previewPath = SECTION_PAGES.find((p) => p.id === page)?.path ?? "/";
    // preview=1 serves draft content; edit=1 turns on the click-to-select overlay.
    const previewSrc = `${previewPath}?preview=1&edit=1`;

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await listSiteContent();
            setRows(res.data?.data ?? []);
        } catch (err) {
            console.error(err);
            toast.error("Could not load website content");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    /** Loads a section into the form: its saved draft, else live, else built-in. */
    const openSection = useCallback(
        (key) => {
            const section = SECTIONS_BY_KEY[key];
            if (!section) return;
            const row = rowsByKey[key];
            const stored = row?.hasDraft ? row.draft : row?.published;
            setActiveKey(key);
            setValues({ ...cloneContent(getSectionDefaults(key)), ...cloneContent(stored) });
            frameRef.current?.contentWindow?.postMessage(
                { type: "techno:select-section", key },
                window.location.origin,
            );
        },
        [rowsByKey],
    );

    // Clicking a section in the preview opens it here.
    useEffect(() => {
        const onMessage = (event) => {
            if (event.origin !== window.location.origin) return;
            if (event.data?.type === "techno:section-clicked") openSection(event.data.key);
        };
        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
    }, [openSection]);

    const refreshPreview = () =>
        frameRef.current?.contentWindow?.postMessage(
            { type: "techno:refresh-content" },
            window.location.origin,
        );

    const handleSave = async () => {
        if (!activeSection) return;
        setIsSaving(true);
        try {
            await saveSectionDraft(activeSection.key, { page: activeSection.page, content: values });
            toast.success("Draft saved. Press Publish to make it live.");
            await load();
            refreshPreview();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Could not save this section");
        } finally {
            setIsSaving(false);
        }
    };

    const runAction = async (fn, successMessage) => {
        setIsPublishing(true);
        try {
            const res = await fn();
            toast.success(res.data?.message || successMessage);
            await load();
            refreshPreview();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "That did not work. Please try again.");
        } finally {
            setIsPublishing(false);
        }
    };

    const handleReset = async () => {
        const key = resetKey;
        setResetKey(null);
        await runAction(() => resetSection(key), "Section reset");
        if (activeKey === key) {
            setValues(cloneContent(getSectionDefaults(key)));
        }
    };

    const statusOf = (key) => {
        const row = rowsByKey[key];
        if (row?.hasDraft) return { color: "warning", label: "Unpublished changes" };
        if (row?.published) return { color: "success", label: "Published" };
        return { color: "gray", label: "Original" };
    };

    document.title = "Website | Techno Sales Admin";

    return (
        <>
            <PageHeader
                title="Website"
                pageTitle="Content"
                description="Click any section of the site below to edit its wording. Changes are saved as a draft until you publish them."
                actions={
                    <>
                        {pendingCount > 0 && (
                            <Badge color="warning" size="sm">
                                {pendingCount} unpublished
                            </Badge>
                        )}
                        <Button
                            color="secondary"
                            iconLeading={RefreshCw01}
                            onClick={() => {
                                load();
                                refreshPreview();
                            }}
                        >
                            Refresh
                        </Button>
                        <Button
                            isDisabled={pendingCount === 0 || isPublishing}
                            isLoading={isPublishing}
                            onClick={() => runAction(publishAllSections, "Published")}
                        >
                            Publish all
                        </Button>
                    </>
                }
            />

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                {/* Live preview */}
                <Card className="flex flex-col xl:col-span-8">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-secondary p-4">
                        <div className="flex flex-wrap items-center gap-2">
                            {SECTION_PAGES.filter((p) => p.id !== "global").map((p) => (
                                <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => setPage(p.id)}
                                    className={cx(
                                        "cursor-pointer rounded-lg px-3 py-1.5 text-sm font-semibold transition",
                                        page === p.id
                                            ? "bg-brand-solid text-white"
                                            : "text-secondary hover:bg-primary_hover",
                                    )}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-1">
                            {[
                                { id: "desktop", icon: Monitor01, label: "Desktop" },
                                { id: "tablet", icon: Tablet01, label: "Tablet" },
                                { id: "mobile", icon: Phone01, label: "Mobile" },
                            ].map((d) => (
                                <ButtonUtility
                                    key={d.id}
                                    size="sm"
                                    color={device === d.id ? "secondary" : "tertiary"}
                                    icon={d.icon}
                                    tooltip={d.label}
                                    aria-label={d.label}
                                    onClick={() => setDevice(d.id)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center bg-secondary p-4">
                        <iframe
                            ref={frameRef}
                            title="Website preview"
                            src={previewSrc}
                            style={{ width: DEVICE_WIDTHS[device] }}
                            className="h-[70vh] rounded-lg border-0 bg-white shadow-lg ring-1 ring-secondary transition-[width] duration-200"
                        />
                    </div>
                </Card>

                {/* Section list + form */}
                <div className="flex flex-col gap-5 xl:col-span-4">
                    <Card className="p-4">
                        <h3 className="mb-3 text-sm font-semibold text-primary">Sections on this page</h3>
                        {loading ? (
                            <div className="flex justify-center py-6">
                                <LoadingIndicator type="dot-circle" size="sm" />
                            </div>
                        ) : (
                            <ul className="flex flex-col gap-1">
                                {pageSections.map((section) => {
                                    const status = statusOf(section.key);
                                    return (
                                        <li key={section.key}>
                                            <button
                                                type="button"
                                                onClick={() => openSection(section.key)}
                                                className={cx(
                                                    "flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-left transition",
                                                    activeKey === section.key
                                                        ? "bg-brand-primary ring-1 ring-brand"
                                                        : "hover:bg-primary_hover",
                                                )}
                                            >
                                                <span className="truncate text-sm font-medium text-primary">
                                                    {section.label}
                                                </span>
                                                <Badge color={status.color} size="sm">
                                                    {status.label}
                                                </Badge>
                                            </button>
                                        </li>
                                    );
                                })}
                                {pageSections.length === 0 && (
                                    <p className="py-4 text-center text-sm text-tertiary">
                                        No editable sections on this page yet.
                                    </p>
                                )}
                            </ul>
                        )}

                        {page !== "global" && (
                            <div className="mt-3 border-t border-secondary pt-3">
                                <button
                                    type="button"
                                    onClick={() => setPage("global")}
                                    className="cursor-pointer text-sm font-semibold text-brand-secondary hover:underline"
                                >
                                    Edit site-wide details (phone, email, address) →
                                </button>
                            </div>
                        )}
                    </Card>

                    <Card className="flex flex-col p-4">
                        {!activeSection ? (
                            <div className="flex flex-col items-center gap-2 py-10 text-center">
                                <p className="text-sm font-medium text-secondary">Nothing selected</p>
                                <p className="text-sm text-tertiary">
                                    Click a section in the preview, or pick one from the list above.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-4 flex flex-col gap-1 border-b border-secondary pb-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="text-sm font-semibold text-primary">{activeSection.label}</h3>
                                        <Badge color={statusOf(activeSection.key).color} size="sm">
                                            {statusOf(activeSection.key).label}
                                        </Badge>
                                    </div>
                                    {activeSection.description && (
                                        <p className="text-sm text-tertiary">{activeSection.description}</p>
                                    )}
                                </div>

                                <div className="flex max-h-[45vh] flex-col gap-4 overflow-y-auto pr-1">
                                    {activeSection.fields.map((field) => (
                                        <SectionField
                                            key={field.name}
                                            field={field}
                                            value={values[field.name]}
                                            onChange={(next) =>
                                                setValues((prev) => ({ ...prev, [field.name]: next }))
                                            }
                                        />
                                    ))}
                                </div>

                                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-secondary pt-4">
                                    <Button onClick={handleSave} isLoading={isSaving} isDisabled={isSaving}>
                                        Save draft
                                    </Button>
                                    <Button
                                        color="secondary"
                                        isDisabled={!rowsByKey[activeSection.key]?.hasDraft || isPublishing}
                                        onClick={() =>
                                            runAction(() => publishSection(activeSection.key), "Published")
                                        }
                                    >
                                        Publish
                                    </Button>
                                    {rowsByKey[activeSection.key]?.hasDraft && (
                                        <Button
                                            color="tertiary"
                                            isDisabled={isPublishing}
                                            onClick={async () => {
                                                await runAction(
                                                    () => discardSectionDraft(activeSection.key),
                                                    "Draft discarded",
                                                );
                                                openSection(activeSection.key);
                                            }}
                                        >
                                            Discard draft
                                        </Button>
                                    )}
                                    <Button
                                        color="tertiary-destructive"
                                        className="ml-auto"
                                        isDisabled={!rowsByKey[activeSection.key] || isPublishing}
                                        onClick={() => setResetKey(activeSection.key)}
                                    >
                                        Reset to original
                                    </Button>
                                </div>
                            </>
                        )}
                    </Card>
                </div>
            </div>

            <ConfirmModal
                isOpen={Boolean(resetKey)}
                onClose={() => setResetKey(null)}
                onConfirm={handleReset}
                icon={AlertTriangle}
                title="Reset this section?"
                description="This throws away every change made here and puts back the wording the site shipped with. It cannot be undone."
                confirmLabel="Reset section"
                loadingLabel="Resetting..."
            />
        </>
    );
};

export default WebsiteEditor;
