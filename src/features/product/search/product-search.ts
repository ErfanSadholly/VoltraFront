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

    const brand = filters.find(
        (filter) => filter.id === "brandId"
    )?.value;

    const cretedBy = filters.find(
        (filter) => filter.id === "createdBy"
    )?.value;

    const modifiedBy = filters.find(
        (filter) => filter.id === "modifiedBy"
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

        brandId: typeof brand === "number"
            ? brand
            : undefined,

        createdBy: typeof cretedBy === "number"
            ? cretedBy
            : undefined,

        modifiedBy: typeof modifiedBy === "number"
            ? modifiedBy
            : undefined
    };
}