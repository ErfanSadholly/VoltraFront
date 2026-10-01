export type ProductInventoryGetByProductIdResponse = {
  id: number
  productId: number
  productName: string | null
  quantity: number
  createdBy: string | null
  createdOn: string
  modifiedBy: string | null
  modifiedOn: string | null
}