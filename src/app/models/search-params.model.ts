export interface SearchParamsModel {
  categoryIds?: string | string[] | null;
  brandIds?: string | string[];
  attributeIds?: string | string[];
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  perPage?: number;
  searchTerm?: string;
  sortBy?: string;
  sortDirection?: string;
}