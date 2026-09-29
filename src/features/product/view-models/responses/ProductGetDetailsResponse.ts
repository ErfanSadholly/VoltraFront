import { ProductCategoryGetByProductIdResponse } from "@/features/product-category/view-models/responses/ProductCategoryGetByProductIdResponse"
import { ProductGalleryGetByIdResponse } from "@/features/product-gallery/view-models/responses/ProductGalleryGetByIdResponse"
import { ProductInventoryGetByProductIdResponse } from "@/features/product-inventory/view-models/responses/ProductInventoryGetByProductIdResponse"
import { ProductPriceGetAllResponse } from "@/features/product-price/view-models/responses/ProductPriceGetAllResponse"
import { ProductPropertyGetByProductIdResponse } from "@/features/product-property/view-models/responses/ProductPropertyGetByProductIdResponse"
import { ProductGetAllResponse } from "./ProductGetAllResponse"

export type ProductGetDetailsResponse = {
    product: ProductGetAllResponse | null
    productCategories: ProductCategoryGetByProductIdResponse[]
    productGalleries: ProductGalleryGetByIdResponse[]
    productInventory: ProductInventoryGetByProductIdResponse
    productPrice: ProductPriceGetAllResponse[]
    productProperties: ProductPropertyGetByProductIdResponse[]
}