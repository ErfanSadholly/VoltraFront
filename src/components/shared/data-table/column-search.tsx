"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";

type ColumnSearchProps = {
    column: any;
    placeholder?: string;
};

export function ColumnSearch({
    column,
    placeholder = "جستجو...",
}: ColumnSearchProps) {
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