export type ProductGalleryGetByIdResponse = {
  id: number
  productId: number
  productName: string | null
  fileId: number
  order: number
  createdBy: string | null
  createdOn: string
  modifiedBy: string | null
  modifiedOn: string | null
}