"use client";

import { useEffect, useMemo, useState } from "react";
import type { ColumnFiltersState } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table/data-table";
import { GetAll } from "@/features/product/api/get-all";
import { productColumns } from "@/features/product/components/product-columns";
import type { ProductGetAllResponse } from "@/features/product/view-models/responses/product-getAll_response";
import { ProductSearch } from "@/features/product/search/product-search";
import { ProductAddDialog } from "@/features/product/components/product-add-dialog";
import { ProductEditDialog } from "@/features/product/components/product-update-dialog";

export default function ProductPage() {
    const [data, setData] = useState<ProductGetAllResponse[]>([]);

    async function loadProducts(filters: ColumnFiltersState = []) {

        const response = await GetAll({
            pageNo: 1,
            pageSize: 25,
            ...ProductSearch(filters)
        });

        setData(response.data);
    }

    useEffect(() => {
        loadProducts();
    }, []);

    const [selectedProductId, setSelectedProductId] =
        useState<number | null>(null);

    const columns = useMemo(
        () =>
            productColumns((productId) => {
                setSelectedProductId(productId);
            }),
        []
    );

    return (
        <div className="container mx-auto space-y-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">
                        محصولات
                    </h1>

                    <p className="text-muted-foreground">
                        مدیریت محصولات فروشگاه
                    </p>
                </div>

                <ProductAddDialog
                    onSuccess={loadProducts}
                />

                <ProductEditDialog
                    onSuccess={loadProducts}
                    productId={selectedProductId}
                    onClose={() => setSelectedProductId(null)}
                />
            </div>

            <DataTable
                columns={columns}
                data={data}
                onFilter={loadProducts}
            />
        </div>
    );
}