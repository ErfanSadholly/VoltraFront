"use client";

import { Textarea } from "@/components/ui/textarea";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type FormTextareaProps = {
    name: string;
    label?: string;
    placeholder?: string;
};

export function FormTextarea({
    name,
    label,
    placeholder,
}: FormTextareaProps) {
    const { control } = useFormContext();

    return (
        <Field className="md:col-span-2">
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

                        <Textarea
                            id={name}
                            placeholder={placeholder}
                            {...field}
                            value={field.value ?? ""}
                        />

                        <FieldError errors={[fieldState.error]} />
                    </>
                )}
            />
        </Field>
    );
}