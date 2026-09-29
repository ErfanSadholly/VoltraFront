export type ProductGetAllResponse = {
  id: number
  fileIds: number[]
  name: string | null
  description: string | null
  brandId: number | null
  brandName: string | null
  isActive: boolean
  createdBy: string | null
  createdOn: string
  modifiedBy: string | null
  modifiedOn: string | null
}