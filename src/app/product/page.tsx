"use client";

import { useMemo, useState } from "react";
import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table/data-table";
import { useProductGetAll } from "@/features/product/hooks/use-product-get-all";
import { productColumns } from "@/features/product/components/product-columns";
import { ProductAddDialog } from "@/features/product/components/product-add-dialog";
import { ProductEditDialog } from "@/features/product/components/product-update-dialog";
import { useProductDelete } from "@/features/product/hooks/use-product-delete";
import { UpdateActiveStatus } from "@/features/product/api/update-active-status";
import { useProductUpdateActiveStatus } from "@/features/product/hooks/use-product-active-status";

export default function ProductPage() {
    const [filters, setFilters] = useState<ColumnFiltersState>([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const [sorting, setSorting] = useState<SortingState>([]);

    const [selectedProductId, setSelectedProductId] =
        useState<number | null>(null);
    const sortBy = sorting[0]?.id;
    const desc = sorting[0]?.desc ?? false;

    const { data, isError, isLoading, refetch, isFetching } = useProductGetAll(filters, pageNo, pageSize, sortBy, desc);

    const { mutate: deleteProduct } = useProductDelete();
    const { mutate: updateActiveStatus } = useProductUpdateActiveStatus();

    const columns = useMemo(
        () =>
            productColumns(
                (productId) => {
                    setSelectedProductId(productId);
                },
                (productId) => {
                    deleteProduct(productId, {
                        onSuccess: () => {
                            if (data?.data.length === 1 && pageNo > 1) {
                                setPageNo((current) => current - 1);
                            }
                        },
                    });
                },
                (productId) => updateActiveStatus(productId)
            ),
        [deleteProduct, data?.data.length, pageNo, updateActiveStatus]
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
                onSortingChange={setSorting}
                isFetching={isFetching}
            />
        </div>
    );
}