"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {createSchema,type ProductFormValues,} from "../validation/add-schema";
import { ApiError } from "@/lib/api-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Add } from "../api/add";

export function ProductForm() {
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            name: "",
            description: "",
            brandId: null,
        },
    });

    async function onSubmit(values: ProductFormValues) {
        try {
            await Add(values);
        } catch (error) {
            if (error instanceof ApiError) {
                console.log(error.message);
            }
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <div className="space-y-2">
                <Label htmlFor="name">
                    نام محصول
                </Label>

                <Input
                    id="name"
                    placeholder="نام محصول را وارد کنید"
                    {...form.register("name")}
                />

                {form.formState.errors.name && (
                    <p className="text-sm text-destructive">
                        {form.formState.errors.name.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">
                    توضیحات
                </Label>

                <Textarea
                    id="description"
                    placeholder="توضیحات محصول را وارد کنید"
                    {...form.register("description")}
                />

                {form.formState.errors.description && (
                    <p className="text-sm text-destructive">
                        {form.formState.errors.description.message}
                    </p>
                )}
            </div>
        </form>
    );
}