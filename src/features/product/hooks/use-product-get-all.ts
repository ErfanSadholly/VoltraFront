"use client";

import { useQuery } from "@tanstack/react-query";
import type { ColumnFiltersState } from "@tanstack/react-table";

import { GetAll } from "../api/get-all";
import { ProductSearch } from "../search/product-search";

export function useProductGetAll(
    filters: ColumnFiltersState = []
) {
    const request = {
        pageNo: 1,
        pageSize: 25,
        ...ProductSearch(filters),
    };

    return useQuery({
        queryKey: ["products", request],
        queryFn: () => GetAll(request),
    });
}