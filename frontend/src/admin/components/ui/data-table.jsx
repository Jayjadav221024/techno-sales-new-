import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SearchLg } from "@untitledui/icons";
import { Table } from "@/components/application/table/table";
import { PaginationCardMinimal } from "@/components/application/pagination/pagination";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

// React Aria keys rows by id, so the placeholders need stable ones of their own.
const SKELETON_ROWS = Array.from({ length: 8 }, (_, i) => `skeleton-${i}`);

/**
 * Keeps react-data-table-component's prop shape but renders Untitled UI's
 * Table + Pagination, so the 14 CRUD pages only changed their import.
 *
 * Deliberately preserves two quirks of the old table rather than "fixing" them,
 * because the server query is built from them:
 *   - a column with `sortable: true` and no `sortField` still reports an
 *     undefined sort field (see Country's "Sr No" column);
 *   - onChangeRowsPerPage is called with (perPage, page) even though every
 *     caller ignores the second argument.
 */
const DataTable = ({
    columns = [],
    data = [],
    progressPending = false,
    onSort,
    paginationTotalRows = 0,
    paginationPerPage = 100,
    paginationRowsPerPageOptions = [50, 100, 200, 300],
    onChangeRowsPerPage,
    onChangePage,
    noDataComponent = "There are no records to display",
    ariaLabel = "Data table",
    widths = {},
    onResize,
}) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(paginationPerPage);
    const [sortDescriptor, setSortDescriptor] = useState(undefined);

    // React Aria needs a stable, unique, defined id per column. `sortField` is
    // the server's sort key and is genuinely absent on some columns, so fall
    // back to the index for identity while still reporting the original
    // (possibly undefined) sortField back to the caller.
    const cols = useMemo(
        () => columns.map((c, i) => ({ ...c, _id: c.sortField ? `f:${c.sortField}` : `c:${i}` })),
        [columns],
    );

    const dragging = useRef(null);

    const startResize = useCallback(
        (event, colName, currentWidth) => {
            event.preventDefault();
            event.stopPropagation();
            dragging.current = { colName, startX: event.clientX, startWidth: currentWidth };
        },
        [],
    );

    useEffect(() => {
        if (!onResize) return;

        const onMove = (event) => {
            if (!dragging.current) return;
            const { colName, startX, startWidth } = dragging.current;
            const next = Math.max(80, Math.round(startWidth + (event.clientX - startX)));
            onResize(colName, next);
        };
        const onUp = () => {
            dragging.current = null;
        };

        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
        };
    }, [onResize]);

    const handleSortChange = (descriptor) => {
        setSortDescriptor(descriptor);
        const col = cols.find((c) => c._id === descriptor.column);
        onSort?.(
            { sortField: col?.sortField, name: col?.name },
            descriptor.direction === "ascending" ? "asc" : "desc",
        );
    };

    const totalPages = Math.max(1, Math.ceil((paginationTotalRows || 0) / (perPage || 1)));
    const options = paginationRowsPerPageOptions.filter((n) => Number.isFinite(n) && n > 0);

    return (
        <div className="relative overflow-x-auto">
            <Table
                aria-label={ariaLabel}
                sortDescriptor={sortDescriptor}
                onSortChange={handleSortChange}
                className="min-w-full"
            >
                <Table.Header>
                    {cols.map((col, i) => {
                        const width = widths[col.name] ?? col.width;
                        return (
                            <Table.Head
                                key={col._id}
                                id={col._id}
                                label={col.name}
                                isRowHeader={i === 0}
                                allowsSorting={Boolean(col.sortable)}
                                className="relative"
                                style={
                                    width
                                        ? { width, minWidth: width, maxWidth: width }
                                        : { minWidth: col.minWidth, maxWidth: col.maxWidth }
                                }
                            >
                                {onResize && i < cols.length - 1 && (
                                    <span
                                        role="separator"
                                        aria-label={`Resize ${col.name}`}
                                        onPointerDown={(e) =>
                                            startResize(e, col.name, e.currentTarget.parentElement?.offsetWidth ?? 160)
                                        }
                                        className="absolute inset-y-0 -right-px z-10 w-1.5 cursor-col-resize touch-none hover:bg-brand-solid/40"
                                    />
                                )}
                            </Table.Head>
                        );
                    })}
                </Table.Header>
                <Table.Body
                    renderEmptyState={() => (
                        <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
                            <FeaturedIcon color="gray" theme="light" size="md" icon={SearchLg} />
                            <p className="text-sm font-medium text-secondary">{noDataComponent}</p>
                            <p className="text-sm text-tertiary">Try adjusting your search or filters.</p>
                        </div>
                    )}
                >
                    {/* Skeleton rows keep the table at its real height while
                        loading. The old spinner sat below an empty table, so
                        every fetch shifted the whole page. */}
                    {progressPending
                        ? SKELETON_ROWS.map((skeletonId) => (
                              <Table.Row key={skeletonId} id={skeletonId}>
                                  {cols.map((col) => (
                                      <Table.Cell key={col._id}>
                                          <span className="block h-3.5 animate-pulse rounded bg-quaternary" />
                                      </Table.Cell>
                                  ))}
                              </Table.Row>
                          ))
                        : data.map((row, index) => (
                              <Table.Row key={row?._id ?? index} id={String(row?._id ?? index)}>
                                  {cols.map((col, colIndex) => (
                                      <Table.Cell
                                          key={col._id}
                                          className={colIndex === 1 ? "font-medium text-primary" : undefined}
                                      >
                                          {col.cell ? col.cell(row, index) : col.selector?.(row, index)}
                                      </Table.Cell>
                                  ))}
                              </Table.Row>
                          ))}
                </Table.Body>
            </Table>

            {paginationTotalRows > 0 && (
                <PaginationCardMinimal
                    page={page}
                    total={totalPages}
                    pageSize={perPage}
                    pageSizeOptions={options}
                    onPageChange={(p) => {
                        setPage(p);
                        onChangePage?.(p);
                    }}
                    onPageSizeChange={(n) => {
                        setPerPage(n);
                        setPage(1);
                        onChangeRowsPerPage?.(n, 1);
                    }}
                />
            )}
        </div>
    );
};

export default DataTable;
