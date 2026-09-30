"use client";

import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { PersianDatePicker } from "@/components/ui/persian-date-picker";

type ColumnDateFilterProps = {
    column: any;
};

export function ColumnDateFilter({
    column,
}: ColumnDateFilterProps) {
    const value = column.getFilterValue() as Date | undefined;

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
                <CalendarDays className="size-4" />

                <span className="sr-only">
                    فیلتر تاریخ
                </span>
            </PopoverTrigger>

            <PopoverContent
                align="start"
                className="w-auto p-2"
            >
                <PersianDatePicker
                    value={value}
                    onChange={(date) => {
                        column.setFilterValue(date);
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}