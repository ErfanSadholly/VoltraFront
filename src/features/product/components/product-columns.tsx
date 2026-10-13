"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontal, Pencil } from "lucide-react";
import { tableFeaturesConfig } from "@/components/shared/data-table/table-features";
import { TruncatedText } from "@/components/shared/TruncatedText";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { getPersianDateTime } from "@/lib/date/get-persian-datetime";
import type { ProductGetAllResponse } from "../view-models/responses/product-getAll_response";
import { ColumnSearch } from "@/components/shared/data-table/column-search";
import { BrandGetIdTitle } from "@/features/brand/api/get-idTitle";
import { ColumnDateSearch } from "@/components/shared/data-table/column-date-search";
import { ColumnComboSearch } from "@/components/shared/data-table/column-combo-search";
import { UserGetIdTitle } from "@/features/user/api/get-idTitle";
import { DataTableColumnHeader } from "@/components/shared/data-table/data-table-column-header";
import { DeleteAction } from "./product-delete-action";

const columnHelper =
    createColumnHelper<typeof tableFeaturesConfig, ProductGetAllResponse>();

export function productColumns(
    onEdit: (productId: number) => void,
    onDelete: (productId: number) => void,
    updateActiveStatus: (productId: number) => void
) {
    return columnHelper.columns([
        columnHelper.accessor("name", {
            enableSorting: true,
            header: ({ column }) => (
                <div className="flex items-center justify-start  gap-1">
                    <DataTableColumnHeader
                        column={column}
                        title="نام محصول"
                    />

                    <ColumnSearch
                        column={column}
                        placeholder="جستجوی نام محصول..."
                    />
                </div>
            ),
            cell: ({ getValue }) => {
                const productName = getValue();
                return (
                    <div className="text-right">
                        <TruncatedText
                            text={productName ?? "-"}
                            title="نام محصول"
                            maxLength={40}
                        />
                    </div>
                )
            },
        }),

        columnHelper.accessor("description", {
            header: () => (
                <div className="text-right">
                    توضیحات
                </div>
            ),
            cell: ({ getValue }) => {
                const description = getValue();
                return (
                    <div className="text-right">
                        <TruncatedText
                            text={description ?? "-"}
                            maxLength={80}
                        />
                    </div>
                );
            },
        }),

        columnHelper.accessor("brandName", {
            enableSorting: true,
            id: "brandId",
            header: ({ column }) => (
                <div className="flex items-center gap-1">
                    <DataTableColumnHeader
                        column={column}
                        title="برند"
                    />

                    <ColumnComboSearch
                        column={column}
                        placeholder="جستجوی برند..."
                        query={BrandGetIdTitle}
                        queryKey={["brands", "id-title"]}
                    />
                </div>
            ),
            cell: ({ getValue }) => (
                <div className="text-right">
                    {getValue() ?? "-"}
                </div>
            ),
        }),

        columnHelper.accessor("isActive", {
            enableSorting: true,
            header: ({ column }) => (
                <div className="text-center">
                    <DataTableColumnHeader
                        column={column}
                        title="برای فروش فعال است؟"
                    />
                </div>
            ),
            cell: ({ getValue, row }) => (
                <div className="flex justify-center">
                    <Switch
                        checked={getValue()}
                        onCheckedChange={() => updateActiveStatus(row.original.id)
                        }
                    />
                </div>
            ),
        }),

        columnHelper.accessor("createdBy", {
            header: ({ column }) => (
                <div className="text-center">
                    ثبت کننده

                    <ColumnComboSearch
                        column={column}
                        placeholder="کاربر مورد نظر را انتخاب کنید"
                        query={UserGetIdTitle}
                        queryKey={["brands", "id-title"]}
                    />
                </div>
            ),
            cell: ({ getValue }) => (
                <div className="text-center">
                    {getValue() ?? "-"}
                </div>
            ),
        }),

        columnHelper.accessor("createdOn", {
            enableSorting: true,
            header: ({ column }) => (
                <div className="flex items-center justify-center gap-1">
                    <DataTableColumnHeader
                        column={column}
                        title="زمان ثبت"
                    />

                    <ColumnDateSearch column={column} />
                </div>
            ),
            cell: ({ getValue }) => (
                <div className="text-center">
                    {getPersianDateTime(getValue())}
                </div>
            ),
        }),

        columnHelper.accessor("modifiedBy", {
            header: ({ column }) => (
                <div className="text-center">
                    ویرایش کننده


                    <ColumnComboSearch
                        column={column}
                        placeholder="کاربر مورد نظر را انتخاب کنید"
                        query={UserGetIdTitle}
                        queryKey={["brands", "id-title"]}
                    />
                </div>
            ),
            cell: ({ getValue }) => (
                <div className="text-center">
                    {getValue() ?? "-"}
                </div>
            ),
        }),

        columnHelper.accessor("modifiedOn", {
            enableSorting: true,
            sortDescFirst: true,

            header: ({ column }) => (
                <div className="flex items-center justify-center gap-1">
                    <DataTableColumnHeader
                        column={column}
                        title="زمان ویرایش"
                    />

                    <ColumnDateSearch column={column} />
                </div>
            ),
            cell: ({ getValue }) => (
                <div className="text-center">
                    {getPersianDateTime(getValue())}
                </div>
            ),
        }),

        columnHelper.display({
            id: "actions",
            header: () => (
                <div className="text-center">
                    عملیات
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center justify-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        title="ویرایش"
                        onClick={() => onEdit(row.original.id)}
                    >
                        <Pencil className="size-4" />
                        <span className="sr-only">
                            ویرایش
                        </span>
                    </Button>

                    <DeleteAction
                        productId={row.original.id}
                        onDelete={onDelete}
                    />

                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    title="سایر عملیات"
                                />
                            }
                        >
                            <span className="sr-only">
                                سایر عملیات
                            </span>

                            <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                گالری محصول
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                قیمت‌های محصول
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                موجودی محصول
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                ویژگی‌های محصول
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                دسته‌بندی‌های محصول
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
        }),
    ]);
}