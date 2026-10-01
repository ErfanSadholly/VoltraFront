"use client";

import { useEffect, useState } from "react";
import type { ColumnFiltersState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table/data-table";
import { GetAll } from "@/features/product/api/get-all";
import { productColumns } from "@/features/product/components/product-columns";
import type { ProductGetAllResponse } from "@/features/product/view-models/responses/product-getAll_response";
import { ProductSearch } from "@/features/product/search/product-search";

export default function ProductPage() {
    const [data, setData] = useState<ProductGetAllResponse[]>([]);

    async function loadProducts(filters: ColumnFiltersState = []) {

        const response = await GetAll({
            pageNo: 1,
            pageSize: 10,
            ...ProductSearch(filters)
        });

        setData(response.data);
    }

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div className="container mx-auto space-y-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">
                        محصولات
                    </h1>

                    <p className="text-muted-foregroun
                    d">
                        مدیریت محصولات فروشگاه
                    </p>
                </div>


                <Button>
                    افزودن محصول
                </Button>
            </div>

            <DataTable
                columns={productColumns}
                data={data}
                onFilter={loadProducts}
            />
        </div>
    );
}