"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
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

const columnHelper =
    createColumnHelper<typeof tableFeaturesConfig, ProductGetAllResponse>();

export function productColumns(
    onEdit: (productId: number) => void
) {
    return columnHelper.columns([
        columnHelper.accessor("name", {
            header: ({ column }) => (
                <div className="flex items-center justify-center gap-1">
                    <span>نام محصول</span>

                    <ColumnSearch
                        column={column}
                        placeholder="جستجوی نام محصول..."
                    />
                </div>
            ),
            cell: ({ getValue }) => (
                <div className="text-right">
                    {getValue() ?? "-"}
                </div>
            ),
        }),

        columnHelper.accessor("description", {
            header: () => (
                <div className="text-center">
                    توضیحات
                </div>
            ),
            cell: ({ getValue }) => {
                const description = getValue();

                if (!description) {
                    return (
                        <div className="text-right">
                            -
                        </div>
                    );
                }

                return (
                    <div className="text-right">
                        <TruncatedText
                            text={description}
                            maxLength={80}
                        />
                    </div>
                );
            },
        }),

        columnHelper.accessor("brandName", {
            id: "brandId",
            header: ({ column }) => (
                <div className="flex items-center justify-rightf gap-1">
                    <span>برند</span>

                    <ColumnComboSearch
                        column={column}
                        placeholder="جستجوی برند..."
                        query={BrandGetIdTitle}
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
            header: () => (
                <div className="text-center">
                    برای فروش فعال است؟
                </div>
            ),
            cell: ({ getValue }) => (
                <div className="flex justify-center">
                    <Switch checked={getValue()} />
                </div>
            ),
        }),

        columnHelper.accessor("createdBy", {
            id: "createdBy",
            header: ({ column }) => (
                <div className="text-center">
                    ثبت کننده

                    <ColumnComboSearch
                        column={column}
                        placeholder="کاربر مورد نظر را انتخاب کنید"
                        query={UserGetIdTitle}
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
            header: ({ column }) => (
                <div className="flex items-center justify-center gap-1">
                    <span>زمان ثبت</span>

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
            id: "modifiedBy",
            header: ({ column }) => (
                <div className="text-center">
                    ویرایش کننده


                    <ColumnComboSearch
                        column={column}
                        placeholder="کاربر مورد نظر را انتخاب کنید"
                        query={UserGetIdTitle}
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
            header: ({ column }) => (
                <div className="flex items-center justify-center gap-1">
                    <span>زمان ویرایش</span>

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

                    <Button
                        variant="ghost"
                        size="icon"
                        title="حذف"
                    >
                        <Trash2 className="size-4" />
                        <span className="sr-only">
                            حذف
                        </span>
                    </Button>

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