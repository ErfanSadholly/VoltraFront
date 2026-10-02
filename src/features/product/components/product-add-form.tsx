"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSchema, type ProductFormValues, } from "../validation/add-schema";
import { ApiError } from "@/lib/api-error";
import { Add } from "../api/add";
import { GetIdTitle } from "@/features/brand/api/get-idTitle";
import { Button } from "@/components/ui/button";
import { FormCombobox } from "@/components/shared/form/form-combobox";
import { FormInput } from "@/components/shared/form/form-input";
import { FormTextarea } from "@/components/shared/form/form-textarea";
import { FormLayout } from "@/components/shared/form/form-layout";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

type ProductFormProps = {
    onSuccess: () => void;
};

export function ProductForm({ onSuccess }: ProductFormProps) {
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            name: "",
            description: null,
            brandId: null,
        },

    });
    const { formState: { isSubmitting } } = form;

    async function onSubmit(values: ProductFormValues) {
        try {
            await Add(values);
            onSuccess();
            toast.success("محصول با موفقیت اضافه شد");
        } catch (error) {
            if (error instanceof ApiError) {
                return toast.error(error.message);
            }
            else {
                toast.error("خطایی در ثبت محصول رخ داد");
            }
        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

                <FormLayout>
                    <FormInput
                        name="name"
                        label="نام محصول"
                        placeholder="نام محصول را وارد کنید"
                    />

                    <FormCombobox
                        name="brandId"
                        label="برند"
                        query={GetIdTitle}
                    />

                    <FormTextarea
                        name="description"
                        label="توضیحات"
                        placeholder="توضیحات محصول را وارد کنید"
                    />
                </FormLayout>


                <div className="flex justify-start mt-4">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Spinner data-icon="inline-start" />
                                در حال ذخیره...
                            </>
                        ) : (
                            "ذخیره"
                        )}
                    </Button>
                </div>
            </form >
        </FormProvider >
    );
}