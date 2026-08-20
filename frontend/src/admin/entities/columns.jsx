import { Badge } from "@/components/base/badges/badges";

/**
 * Status column shared by every list screen.
 *
 * Some entities rendered this as bare "Active"/"Inactive" text, one hand-rolled
 * its own coloured pill, and the four in advanced.jsx omitted it entirely even
 * though they all carry `isActive` and all offer the Active filter. Same value,
 * four different presentations depending on which screen you were on.
 */
export const STATUS_COLUMN = {
    name: "STATUS",
    sortable: true,
    sortField: "isActive",
    minWidth: "120px",
    cell: (row) => (
        <Badge color={row.isActive !== false ? "success" : "gray"} size="sm">
            {row.isActive !== false ? "Active" : "Inactive"}
        </Badge>
    ),
};
