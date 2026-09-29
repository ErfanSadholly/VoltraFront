export type ApiResponse<T> = {
    data: T
    code: string | null
    message: string
    success: boolean
}