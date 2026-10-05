"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { tableFeaturesConfig } from "./table-features";
import type { Column, RowData } from "@tanstack/react-table";

type ColumnSearchProps<TData extends RowData, TValue = unknown> = {
    column: Column<
        typeof tableFeaturesConfig,
        TData,
        TValue
    >;
    placeholder?: string;
};

export function ColumnSearch<
    TData extends RowData,
    TValue = unknown
>({
    column,
    placeholder = "جستجو...",
}: ColumnSearchProps<TData, TValue>) {
    const [value, setValue] = useState(
        (column.getFilterValue() ?? "") as string
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            column.setFilterValue(value);
        }, 400);

        return () => clearTimeout(timer);
    }, [value, column]);

    return (
        <Popover>
            <PopoverTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                    />
                }
            >
                <Search className="size-4" />

                <span className="sr-only">
                    جستجو
                </span>
            </PopoverTrigger>

            <PopoverContent
                align="start"
                className="w-64"
            >
                <Input
                    autoFocus
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}