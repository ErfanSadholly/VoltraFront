import { ProductCategoryGetByProductIdResponse } from "@/features/product-category/view-models/responses/productCategory-getByProductId-response"
import { ProductGalleryGetByIdResponse } from "@/features/product-gallery/view-models/responses/productGallery-getById-response"
import { ProductInventoryGetByProductIdResponse } from "@/features/product-inventory/view-models/responses/productIventory-getByProductId_response"
import { ProductPriceGetAllResponse } from "@/features/product-price/view-models/responses/productPrice-getAll-response"
import { ProductPropertyGetByProductIdResponse } from "@/features/product-property/view-models/responses/productProperty-getByProductId-response"
import { ProductGetAllResponse } from "./product-getAll_response"

export type ProductGetDetailsResponse = {
    product: ProductGetAllResponse | null
    productCategories: ProductCategoryGetByProductIdResponse[]
    productGalleries: ProductGalleryGetByIdResponse[]
    productInventory: ProductInventoryGetByProductIdResponse
    productPrice: ProductPriceGetAllResponse[]
    productProperties: ProductPropertyGetByProductIdResponse[]
}