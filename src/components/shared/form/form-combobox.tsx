"use client";

import { Button } from "@/components/ui/button";
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTrigger, ComboboxValue, } from "@/components/ui/combobox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useEffect, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { ApiError } from "@/lib/api-error";

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
};

export function FormCombobox({
    name,
    label,
    query,
}: FormComboboxProps) {
    const [items, setItems] = useState<FormComboboxItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadItems() {
            try {
                const response = await query();
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
                                {error}
                            </p>
                        )}
                    </>
                )}
            />
        </Field>
    );
}