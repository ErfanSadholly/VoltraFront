"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { updateSchema, ProductUpdateFormValues, } from "../validation/update-schema";
import { ProductGetByIdResponse } from "../view-models/responses/product-getById-response";
import { FormLayout } from "@/components/shared/form/form-layout";
import { FormInput } from "@/components/shared/form/form-input";
import { FormCombobox } from "@/components/shared/form/form-combobox";
import { FormTextarea } from "@/components/shared/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { BrandGetIdTitle } from "@/features/brand/api/get-idTitle";
import { useProductUpdate } from "../hooks/use-product-update";

type ProductFormProps = {
    onSuccess: () => void;
    product: ProductGetByIdResponse;
};

export function UpdateForm({ onSuccess, product }: ProductFormProps) {
    const form = useForm<ProductUpdateFormValues>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            name: product.name,
            description: product.description,
            brandId: product.brandId,
        },
    });

    const { isDirty } = form.formState;
    const { mutate, isPending } = useProductUpdate();

    function onSubmit(values: ProductUpdateFormValues) {

        if (!isDirty) {
            onSuccess();
            return;
        }

        mutate(
            {
                productId: product.id,
                values,
            },
            {
                onSuccess,
            }
        );
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
                        query={BrandGetIdTitle}
                        queryKey={["brands", "id-title"]}
                    />

                    <FormTextarea
                        name="description"
                        label="توضیحات"
                        placeholder="توضیحات محصول را وارد کنید"
                    />
                </FormLayout>

                <div className="flex justify-start mt-4">
                    <Button type="submit" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Spinner data-icon="inline-start" />
                                در حال ویرایش...
                            </>
                        ) : (
                            "ویرایش"
                        )}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}