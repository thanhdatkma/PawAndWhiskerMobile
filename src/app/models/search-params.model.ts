export interface SearchParamsModel {
  categoryIds?: string | string[] | null;
  sectionKey?: string;
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