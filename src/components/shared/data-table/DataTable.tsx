"use client";

import { tableFeatures, useTable, type ColumnDef, } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";

const features = tableFeatures({});

type DataTableProps<TData extends object> = {
    columns: ColumnDef<typeof features, TData>[];
    data: TData[];
};

export function DataTable<TData extends object>({
    columns,
    data,
}: DataTableProps<TData>) {

    const table = useTable({
        features,
        columns,
        data,
    });

    return (
        <Table dir="rtl">
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id} className="border-1">
                                {header.isPlaceholder
                                    ? null
                                    : <table.FlexRender header={header} />
                                }
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>

            <TableBody>
                {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getAllCells().map((cell) => (
                            <TableCell key={cell.id} className="border-1">
                                <table.FlexRender cell={cell} />
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}