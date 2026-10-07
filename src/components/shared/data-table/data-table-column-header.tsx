"use client";

import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import type { Column } from "@tanstack/react-table";
import { tableFeaturesConfig } from "./table-features";

type DataTableColumnHeaderProps<TData extends object, TValue> = {
    column: Column<typeof tableFeaturesConfig, TData, TValue>;
    title: string;
};

export function DataTableColumnHeader<TData extends object, TValue>({
    column,
    title,
}: DataTableColumnHeaderProps<TData, TValue>) {
    return (
        <button
            type="button"
            onClick={column.getToggleSortingHandler()}
            className="flex items-center gap-1"
        >
            <span>{title}</span>

            {column.getIsSorted() === "asc" && (
                <ArrowUp className="size-4" />
            )}

            {column.getIsSorted() === "desc" && (
                <ArrowDown className="size-4" />
            )}

            {!column.getIsSorted() && (
                <ChevronsUpDown className="size-4 opacity-50" />
            )}
        </button>
    );
}