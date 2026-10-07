"use client";

import { ColumnPinningState, useTable, type ColumnDef, type ColumnFiltersState, } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { tableFeaturesConfig } from "./table-features";
import { useState, type CSSProperties } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


type DataTableProps<TData extends object> = {
    columns: ColumnDef<typeof tableFeaturesConfig, TData>[];
    data: TData[];
    totalCount: number;
    pageNo: number;
    pageSize: number;
    onPageChange: (pageNo: number) => void;
    onFilter?: (filters: ColumnFiltersState) => void;
    onPageSizeChange: (pageSize: number) => void;
    pinnedColumns?: ColumnPinningState;
};

export function DataTable<TData extends object>({ columns, data, totalCount, pageNo, pageSize, onPageChange, onPageSizeChange, onFilter, pinnedColumns }: DataTableProps<TData>) {
    const [columnFilters, setColumnFilters] =
        useState<ColumnFiltersState>([]);

    const getCommonPinningStyles = (column: any): CSSProperties => {
        const isPinned = column.getIsPinned();

        return {
            position: isPinned ? "sticky" : "relative",
            insetInlineStart:
                isPinned === "start"
                    ? `${column.getStart("start")}px`
                    : undefined,
            insetInlineEnd:
                isPinned === "end"
                    ? `${column.getAfter("end")}px`
                    : undefined,
            width: column.getSize(),
            zIndex: isPinned ? 1 : 0,
            background: isPinned ? "var(--background)" : undefined,
        };
    };

    const table = useTable({
        features: tableFeaturesConfig,
        columns,
        data,
        manualFiltering: true,
        state: {
            columnFilters,
        },
        initialState: {
            columnPinning: pinnedColumns ?? {
                start: [],
                end: [],
            },
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
                                <TableHead key={header.id} className="h-10" style={getCommonPinningStyles(header.column)}>
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
                                <TableCell key={cell.id} style={getCommonPinningStyles(cell.column)}>
                                    <table.FlexRender cell={cell} />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination className="py-3">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            text="قبلی"
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();

                                if (pageNo > 1) {
                                    onPageChange(pageNo - 1);
                                }
                            }}
                        />
                    </PaginationItem>

                    {Array.from(
                        { length: Math.ceil(totalCount / pageSize) },
                        (_, index) => {
                            const page = index + 1;

                            return (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        href="#"
                                        isActive={page === pageNo}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            onPageChange(page);
                                        }}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        }
                    )}

                    <PaginationItem>
                        <PaginationNext
                            text="بعدی"
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();

                                if (pageNo < Math.ceil(totalCount / pageSize)) {
                                    onPageChange(pageNo + 1);
                                }
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>



            <div className="flex items-center gap-2 px-4 py-3">
                <span className="text-sm text-muted-foreground">
                    نمایش
                </span>

                <Select
                    value={String(pageSize)}
                    onValueChange={(value) => {
                        onPageChange(1);
                        onPageSizeChange(Number(value))
                    }}
                >
                    <SelectTrigger className="w-[80px]">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>

                <span className="text-sm text-muted-foreground">
                    مورد در صفحه
                </span>
            </div>
        </div>
    );
}