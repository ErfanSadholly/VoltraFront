"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";

type FormInputProps = {
    name: string;
    label?: string;
    placeholder?: string;
    type?: React.ComponentProps<"input">["type"];
};

export function FormInput({
    name,
    label,
    placeholder,
    type = "text",
}: FormInputProps) {
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

                        <Input
                            id={name}
                            type={type}
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