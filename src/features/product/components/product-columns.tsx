"use client";
import {
    createColumnHelper,
} from "@tanstack/react-table";

import { tableFeaturesConfig } from "@/components/shared/data-table/table-features";
import type { ProductGetAllResponse } from "../view-models/responses/ProductGetAllResponse";
import { TruncatedText } from "@/components/shared/TruncatedText";

const columnHelper =
    createColumnHelper<typeof tableFeaturesConfig, ProductGetAllResponse>();

export const productColumns = columnHelper.columns([
    columnHelper.accessor("name", {
        header: () => (
            <div className="text-right">
                نام محصول
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
                return "-";
            }
            return (
                <TruncatedText
                    text={description}
                    maxLength={80}
                />
            );
        }
    }),
    columnHelper.accessor("brandName", {
        header: () => (
            <div className="text-right">
                نام برند
            </div>
        ),
    }),
    columnHelper.accessor("isActive", {
        header: "برای فروش فعال است؟",
        cell: ({ getValue }) => (
            <div className="text-center w-full">
                {getValue() ? "فعال" : "غیرفعال"}
            </div>
        ),
    }),
    columnHelper.accessor("createdBy", {
        header: () => (
            <div className="text-center">
                ثبت کننده
            </div>
        )
    }),
    columnHelper.accessor("createdOn", {
        header: () => (
            <div className="text-center">
                زمان ثبت
            </div>
        ),
    }),
    columnHelper.accessor("modifiedBy", {
        header: () => (
            <div className="text-center">
                ویرایش کننده
            </div>
        ),
    }),
    columnHelper.accessor("modifiedOn", {
        header: () => (
            <div className="text-center">
                زمان ویرایش
            </div>
        ),
    }),
]);