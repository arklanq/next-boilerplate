export type Pagination = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export type PaginatedData<T> = {
  data: T[];
  pagination: Pagination;
};

export function buildPagination({
  total,
  page,
  perPage
}: {
  total: number;
  page: number;
  perPage: number;
}): Pagination {
  return {
    page,
    perPage,
    total,
    totalPages: total === 0 ? 0 : Math.ceil(total / perPage)
  };
}
