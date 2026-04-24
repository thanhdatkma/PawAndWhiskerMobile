export enum FilterTab {
  BRANDS = 'brands',
  PRICING = 'pricing',
  TAGS = 'tags',
  SORT = 'sort'
}

export enum SortType {
  DEFAULT = 'default',
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  BRAND_ASC = 'brand_asc',
  BRAND_DESC = 'brand_desc'
}

export const SORT_OPTIONS_MAP = new Map<SortType, string>([
  [SortType.DEFAULT, 'Default'],
  [SortType.PRICE_ASC, 'Price: Low to High'],
  [SortType.PRICE_DESC, 'Price: High to Low'],
  [SortType.BRAND_ASC, 'Brands: A to Z'],
  [SortType.BRAND_DESC, 'Brands: Z to A']
]);
