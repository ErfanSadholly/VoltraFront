"use client";

import { Button } from "@/components/ui/button";
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTrigger, ComboboxValue, } from "@/components/ui/combobox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useEffect, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { ApiError } from "@/lib/api-error";
import { useQuery, type QueryKey } from "@tanstack/react-query";

type FormComboboxItem = {
    id: number;
    title: string;
};

type FormComboboxProps = {
    name: string;
    label?: string;
    query: () => Promise<{
        data: FormComboboxItem[];
    }>;
    queryKey: QueryKey;
};

export function FormCombobox({
    name,
    label,
    query,
    queryKey
}: FormComboboxProps) {

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

    const { control } = useFormContext();

    return (
        <Field>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                    <>
                        {label && (
                            <FieldLabel htmlFor={name}>
                                {label}
                            </FieldLabel>
                        )}

                        <Combobox
                            items={comboItems}
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                            <ComboboxTrigger
                                render={
                                    <Button
                                        variant="outline"
                                        className="w-full justify-between font-normal"
                                    />
                                }
                            >
                                <ComboboxValue placeholder="انتخاب کنید" />
                            </ComboboxTrigger>

                            <ComboboxContent>
                                <ComboboxInput
                                    showTrigger={false}
                                    placeholder="جستجو..."
                                />

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

                        <FieldError errors={[fieldState.error]} />

                        {error && (
                            <p className="text-sm text-destructive">
                                {error instanceof ApiError
                                    ? error.message
                                    : "خطا در دریافت اطلاعات"}
                            </p>
                        )}
                    </>
                )}
            />
        </Field>
    );
}