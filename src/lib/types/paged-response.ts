export type PagedResponse<T> = {
    totalCount: number
    data: T[]
    message: string
    success: boolean
}