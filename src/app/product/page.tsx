"use client";

import { useMemo, useState } from "react";
import type { ColumnFiltersState } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table/data-table";
import { useProductGetAll } from "@/features/product/hooks/use-product-get-all";
import { productColumns } from "@/features/product/components/product-columns";
import { ProductAddDialog } from "@/features/product/components/product-add-dialog";
import { ProductEditDialog } from "@/features/product/components/product-update-dialog";

export default function ProductPage() {
    const [filters, setFilters] = useState<ColumnFiltersState>([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(25);

    const [selectedProductId, setSelectedProductId] =
        useState<number | null>(null);

    const { data, isError, isLoading, refetch } = useProductGetAll(filters, pageNo, pageSize);

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

                <ProductAddDialog />

                <ProductEditDialog
                    productId={selectedProductId}
                    onClose={() => setSelectedProductId(null)}
                />
            </div>

            <DataTable
                columns={columns}
                data={data?.data ?? []}
                onFilter={setFilters}
                pageNo={pageNo}
                pageSize={pageSize}
                totalCount={data?.totalCount ?? 0}
                onPageChange={setPageNo}
                onPageSizeChange={setPageSize}
                pinnedColumns={{
                    start: [],
                    end: ["actions"]
                }}
                isLoading={isLoading}
                isError={isError}
                onRetry={refetch}
            />
        </div>
    );
}