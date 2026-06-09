export type ApiResponse<T> = {
  data: T
}

export type ApiPaginationMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type ApiListResponse<T> = {
  data: T[]
  meta: ApiPaginationMeta
}
