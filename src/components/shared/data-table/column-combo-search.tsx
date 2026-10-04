"use client";

import { useEffect, useMemo, useState } from "react";
import { ListFilter } from "lucide-react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { Button } from "@/components/ui/button";
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList, } from "@/components/ui/combobox";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { ApiError } from "@/lib/api-error";

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
};

export function ColumnComboSearch({
    column,
    placeholder = "انتخاب کنید...",
    query,
}: ColumnComboSearchProps) {
    const [items, setItems] = useState<ColumnComboSearchItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const loadQuery = query;

        async function loadItems() {
            try {
                const response = await loadQuery();
                setItems(response.data);
            } catch (error) {
                if (error instanceof ApiError) {
                    setError(error.message);
                } else {
                    setError("خطا در دریافت اطلاعات");
                }
            }
        }

        loadItems();
    }, [query]);

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
                        {error}
                    </p>
                )}
            </PopoverContent>
        </Popover>
    );
}