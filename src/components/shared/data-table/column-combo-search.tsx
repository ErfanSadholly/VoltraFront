"use client";

import { useEffect, useMemo, useState } from "react";
import { ListFilter } from "lucide-react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { Button } from "@/components/ui/button";
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList, } from "@/components/ui/combobox";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { ApiError } from "@/lib/api-error";
import { useQuery, type QueryKey } from "@tanstack/react-query";

type ColumnComboSearchItem = {
    id: number;
    title: string;
};

type ColumnComboSearchProps = {
    column: any;
    placeholder?: string;
    query: () => Promise<{
        data: ColumnComboSearchItem[];
    }>;
    queryKey: QueryKey;
};

export function ColumnComboSearch({
    column,
    placeholder = "انتخاب کنید...",
    query,
    queryKey
}: ColumnComboSearchProps) {

    const [open, setOpen] = useState(false);

    const {
        data: items = [],
        error,
    } = useQuery({
        queryKey,
        queryFn: async () => {
            const response = await query();
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
    });

    const comboItems = useMemo(
        () =>
            ComboboxPrimitive.createItems(items, {
                getValue: (item) => item.id,
                getLabel: (item) => item.title,
            }),
        [items]
    );

    function handleValueChange(value: number | null) {
        column.setFilterValue(value);
        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                    />
                }
            >
                <ListFilter className="size-4" />

                <span className="sr-only">
                    فیلتر
                </span>
            </PopoverTrigger>

            <PopoverContent
                align="start"
                className="w-64"
            >
                <Combobox
                    items={comboItems}
                    value={
                        (column.getFilterValue() ?? null) as number | null
                    }
                    onValueChange={handleValueChange}
                >
                    <ComboboxInput
                        autoFocus
                        showTrigger={false}
                        placeholder={placeholder}
                    />

                    <ComboboxContent>
                        <ComboboxList>
                            {(item) => (
                                <ComboboxItem
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.title}
                                </ComboboxItem>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>

                {error && (
                    <p className="mt-2 text-sm text-destructive">
                        {error instanceof ApiError
                            ? error.message
                            : "خطا در دریافت اطلاعات"}
                    </p>
                )}
            </PopoverContent>
        </Popover>
    );
}