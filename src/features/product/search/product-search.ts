import type { ColumnFiltersState } from "@tanstack/react-table";
import type { ProductGetAllRequest } from "../view-models/requests/product-getAll-request";
import { formatDateForApi } from "@/lib/date/format-date-api";

export function ProductSearch(
    filters: ColumnFiltersState
): Omit<ProductGetAllRequest, "pageNo" | "pageSize"> {
    const name = filters.find(
        (filter) => filter.id === "name"
    )?.value;

    const createdOn = filters.find(
        (filter) => filter.id === "createdOn"
    )?.value;

    const modifiedOn = filters.find(
        (filter) => filter.id === "modifiedOn"
    )?.value;

    return {
        name: typeof name === "string"
            ? name
            : undefined,

        createdOn: createdOn instanceof Date
            ? formatDateForApi(createdOn)
            : undefined,

        modifiedOn: modifiedOn instanceof Date
            ? formatDateForApi(modifiedOn)
            : undefined,
    };
}