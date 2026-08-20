import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MenuContext } from "../../context/MenuContext";
import DataTable from "@/components/ui/data-table";
import ReferenceErrorModal from "@/components/ui/reference-error-modal";
import DeleteBlockedModal from "@/components/ui/delete-blocked-modal";
import { ConfirmModal } from "@/components/ui/modal";
import { ActiveFilterToggle, Card, PageHeader, RowActions, SearchInput, ToolbarButton } from "@/components/ui/page";
import FilterPanel from "@/components/ui/filter-panel";
import ColumnMenu from "@/components/ui/column-menu";
import { useTablePrefs } from "@/components/ui/table-prefs";
import { Button } from "@/components/base/buttons/button";
import { FilterLines, Plus } from "@untitledui/icons";
import { adminPath } from "@/utils/admin-path";

/**
 * The list screen for a CRUD entity. Add/edit/view are separate routes now, so
 * this only lists, searches, filters and deletes.
 */
const CrudList = ({ config }) => {
    const { currentPagePermissions } = useContext(MenuContext);
    const navigate = useNavigate();
    const basePath = adminPath(config.path);

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(100);
    const [pageNo, setPageNo] = useState(0);
    const [column, setColumn] = useState();
    const [sortDirection, setSortDirection] = useState();
    // `search` is what the box shows; `query` is what the server has been asked
    // for. Without the gap between them every keystroke fired a request, since
    // the fetch effect below lists `query` as a dependency.
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState(true);

    // Skipped on mount: the initial fetch below already covers the empty query,
    // and letting this run would bump pageNo and fire a second identical request.
    const isFirstSearch = useRef(true);
    useEffect(() => {
        if (isFirstSearch.current) {
            isFirstSearch.current = false;
            return;
        }
        const timer = setTimeout(() => {
            setQuery(search);
            setPageNo(1);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    // Column layout and the last-used filters persist per entity.
    const [prefs, setPrefs, resetPrefs] = useTablePrefs(config.key, {
        hidden: [], order: [], widths: {}, filters: [], matchType: "all",
    });
    const [showFilters, setShowFilters] = useState(false);
    const [draft, setDraft] = useState({ rows: prefs.filters ?? [], matchType: prefs.matchType ?? "all" });
    const [lookups, setLookups] = useState({});

    const filterFields = config.filterFields ?? [];
    const appliedFilters = prefs.filters ?? [];

    const [removeId, setRemoveId] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Two different "you can't delete this" flows exist in this API: a 409 with
    // reference details, and a 200 with isOk:false plus a list of dependents.
    const [referenceData, setReferenceData] = useState(null);
    const [blocked, setBlocked] = useState(null);

    const fetchRows = async () => {
        setLoading(true);
        let skip = (pageNo - 1) * perPage;
        if (skip < 0) skip = 0;

        try {
            const response = await config.api.search({
                skip,
                per_page: perPage,
                sorton: column,
                sortdir: sortDirection,
                match: query,
                isActive: filter,
                ...(appliedFilters.length ? { filters: appliedFilters, matchType: prefs.matchType ?? "all" } : {}),
            });
            let dataList = [];
            let countTotal = 0;
            const resData = response.data?.data;
            if (Array.isArray(resData)) {
                if (resData.length > 0 && resData[0] && ("data" in resData[0] || "count" in resData[0])) {
                    dataList = resData[0]?.data ?? [];
                    countTotal = resData[0]?.count ?? 0;
                } else {
                    dataList = resData;
                    countTotal = response.data?.total ?? resData.length;
                }
            } else if (resData && typeof resData === "object") {
                dataList = resData.data ?? [];
                countTotal = resData.count ?? resData.total ?? dataList.length;
            }
            setRows(dataList);
            setTotalRows(countTotal);
        } catch (err) {
            console.log(err);
            setRows([]);
            setTotalRows(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRows();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNo, perPage, column, sortDirection, query, filter, appliedFilters, prefs.matchType]);

    // Option lists for filter rows that pick a related record.
    useEffect(() => {
        Object.entries(config.filterLookups ?? {}).forEach(([key, loader]) => {
            loader()
                .then((options) => setLookups((prev) => ({ ...prev, [key]: options })))
                .catch((err) => console.log(err));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();
        setIsDeleting(true);
        try {
            const res = await config.api.remove(removeId);
            if (res?.data && res.data.isOk === false) {
                setConfirmOpen(false);
                setBlocked({ message: res.data.message, services: res.data.data });
                return;
            }
            setConfirmOpen(false);
            toast.success(`${config.singular} removed successfully`);
            fetchRows();
        } catch (err) {
            console.log(err);
            setConfirmOpen(false);
            if (err.response?.status === 409) {
                setReferenceData(err.response.data);
            } else {
                toast.error(`Failed to delete ${config.singular.toLowerCase()}. Please try again.`);
            }
        } finally {
            setIsDeleting(false);
        }
    };

    const allColumns = [
        { name: "SR NO", selector: (row, index) => index + 1, sortable: true, maxWidth: "80px" },
        ...config.columns,
        {
            name: "ACTIONS",
            minWidth: "120px",
            selector: (row) => (
                <RowActions
                    canEdit={currentPagePermissions.edit}
                    canDelete={currentPagePermissions.delete}
                    onView={() => navigate(`${basePath}/${row._id}`)}
                    onEdit={() => navigate(`${basePath}/${row._id}/edit`)}
                    onRemove={() => {
                        setRemoveId(row._id);
                        setConfirmOpen(true);
                    }}
                />
            ),
        },
    ];

    // Hidden and reordered columns. The action column always stays last.
    const orderable = allColumns.filter((c) => c.name !== "ACTIONS");
    const actionColumn = allColumns.find((c) => c.name === "ACTIONS");
    const ordered = prefs.order?.length
        ? [...orderable].sort((a, b) => {
              const ai = prefs.order.indexOf(a.name);
              const bi = prefs.order.indexOf(b.name);
              return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
          })
        : orderable;
    const columns = [...ordered.filter((c) => !(prefs.hidden ?? []).includes(c.name)), actionColumn].filter(Boolean);

    document.title = `${config.plural} | Techno Sales Admin`;

    return (
        <>
            <PageHeader
                title={config.plural}
                pageTitle={config.section}
                description={config.description}
                actions={
                    currentPagePermissions.write ? (
                        <Button iconLeading={Plus} onClick={() => navigate(`${basePath}/add`)}>
                            Add {config.singular}
                        </Button>
                    ) : null
                }
            />

            <Card>
                {/* Table-scoped controls stay inside the card - they act on the
                    table below them, not on the page. */}
                <div className="flex flex-col gap-4 border-b border-secondary p-5 lg:flex-row lg:items-center lg:justify-between">
                    <SearchInput value={search} onChange={setSearch} placeholder="Search records..." />

                    <div className="flex shrink-0 flex-wrap items-center gap-3 lg:justify-end">
                        <ActiveFilterToggle
                            isSelected={filter}
                            onChange={(checked) => {
                                setPageNo(1);
                                setFilter(checked);
                            }}
                        />

                        {filterFields.length > 0 && (
                            <ToolbarButton
                                icon={FilterLines}
                                isActive={showFilters || appliedFilters.length > 0}
                                count={appliedFilters.length}
                                onClick={() => setShowFilters((open) => !open)}
                            >
                                Filters
                            </ToolbarButton>
                        )}

                        <ColumnMenu
                            columns={orderable}
                            hidden={prefs.hidden ?? []}
                            order={prefs.order ?? []}
                            onChange={setPrefs}
                            onReset={resetPrefs}
                        />
                    </div>
                </div>

                {showFilters && (
                    <FilterPanel
                        fields={filterFields}
                        rows={draft.rows}
                        matchType={draft.matchType}
                        lookups={lookups}
                        onChange={(rows, matchType) => setDraft({ rows, matchType: matchType ?? draft.matchType })}
                        onApply={() => {
                            setPageNo(1);
                            setPrefs({ filters: draft.rows, matchType: draft.matchType });
                        }}
                        onReset={() => {
                            setDraft({ rows: [], matchType: "all" });
                            setPageNo(1);
                            setPrefs({ filters: [], matchType: "all" });
                        }}
                        onClose={() => setShowFilters(false)}
                    />
                )}

                <DataTable
                    ariaLabel={config.plural}
                    columns={columns}
                    data={rows}
                    progressPending={loading}
                    onSort={(col, direction) => {
                        setColumn(col.sortField);
                        setSortDirection(direction);
                    }}
                    paginationTotalRows={totalRows}
                    paginationPerPage={100}
                    paginationRowsPerPageOptions={[50, 100, 200, 300]}
                    onChangeRowsPerPage={setPerPage}
                    onChangePage={setPageNo}
                    widths={prefs.widths ?? {}}
                    onResize={(name, width) => setPrefs((prev) => ({ widths: { ...prev.widths, [name]: width } }))}
                />
            </Card>

            <ConfirmModal
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDelete}
                isLoading={isDeleting}
                description={`Are you sure you want to remove this ${config.singular.toLowerCase()}?`}
            />

            <ReferenceErrorModal
                isOpen={Boolean(referenceData)}
                toggle={() => setReferenceData(null)}
                title={`Cannot Delete ${config.singular}`}
                referenceData={referenceData}
            />

            <DeleteBlockedModal
                isOpen={Boolean(blocked)}
                toggle={() => setBlocked(null)}
                title={`Unable to Delete ${config.singular}`}
                message={blocked?.message}
                services={blocked?.services}
            />
        </>
    );
};

export default CrudList;
