export interface PaginationModel<T> {
  items: T[];
  totalItems: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
