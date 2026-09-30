"use client";

import { useTable, type ColumnDef, type ColumnFiltersState, } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { tableFeaturesConfig } from "./table-features";
import { useState } from "react";


type DataTableProps<TData extends object> = {
    columns: ColumnDef<typeof tableFeaturesConfig, TData>[];
    data: TData[];
    onFilter?: (filters: ColumnFiltersState) => void;
};

export function DataTable<TData extends object>({ columns, data, onFilter }: DataTableProps<TData>) {
    const [columnFilters, setColumnFilters] =
        useState<ColumnFiltersState>([]);

    const table = useTable({
        features: tableFeaturesConfig,
        columns,
        data,
        manualFiltering: true,
        state: {
            columnFilters,
        },
        onColumnFiltersChange: (updater) => {
            const nextFilters =
                typeof updater === "function"
                    ? updater(columnFilters)
                    : updater;

            setColumnFilters(nextFilters);
            onFilter?.(nextFilters);
        },
    });

    return (
        <div className="overflow-hidden rounded-md border">
            <Table dir="rtl">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="h-12">
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="h-10">
                                    {header.isPlaceholder
                                        ? null
                                        : <table.FlexRender header={header} />}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getAllCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    <table.FlexRender cell={cell} />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}