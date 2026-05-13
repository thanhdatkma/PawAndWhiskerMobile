import { BreadcrumbModel } from './breadcrumb.model';
import { ProductBriefModel } from './product-brief.model';

export interface ProductImageModel {
  id?: number;
  src?: string;
  url?: string;
  alt?: string;
  name?: string;
}

export interface ProductVariationModel {
  id: number;
  sku?: string;
  attributes?: Record<string, string>;
  pricing?: {
    regular_price?: number;
    sale_price?: number | null;
    current_price?: number;
    discount?: number;
    is_on_sale?: boolean;
  };
  stock?: {
    status?: string;
    qty?: number | null;
    backorders?: string;
    is_in_stock?: boolean;
  };
}

export interface ProductTagModel {
  id: number;
  name: string;
  slug?: string;
}

export interface ProductCategoryDetailModel {
  id: number;
  name: string;
  slug?: string;
  permalink?: string;
}

export interface ProductRatingSummaryModel {
  average?: number;
  rating_count?: number;
  review_count?: number;
  distribution?: Record<string, number>;
}

export interface ProductPricingModel {
  regular_price?: number;
  sale_price?: number | null;
  current_price?: number;
  discount?: number;
  is_on_sale?: boolean;
}

export interface ProductStockModel {
  status?: string;
  qty?: number | null;
  backorders?: string;
  is_in_stock?: boolean;
}

export interface ProductMetadataModel {
  sold_count?: number;
  is_featured?: boolean;
  deal_of_day?: boolean;
}

export interface ProductDescriptionTabModel {
  key: string;
  title: string;
  content: string;
}

export interface ProductDetailModel {
  id: number;
  name: string;
  slug?: string;
  permalink?: string;
  description?: string;
  short_description?: string;
  type?: string;
  sku?: string;

  images?: ProductImageModel[] | { cover?: ProductImageModel | string; gallery?: Array<ProductImageModel | string> } | string[];
  variations?: ProductVariationModel[];
  options?: {
    weight?: string[];
    size?: string[];
  };
  categories?: ProductCategoryDetailModel[];
  tags?: ProductTagModel[];
  related_products?: ProductBriefModel[];
  description_tabs?: ProductDescriptionTabModel[];

  metadata?: ProductMetadataModel;
  rating_summary?: ProductRatingSummaryModel;
  pricing?: ProductPricingModel;
  stock?: ProductStockModel;

  // Legacy FE fields used by existing templates/components
  price?: number;
  discountPrice?: number;
  discountPct?: number;
  regular_price?: number;
  sale_price?: number | null;
  current_price?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  rating_count?: number;
  sold_count?: number;
  mainImage?: string;
  weights?: string[];

  breadcrumb?: BreadcrumbModel[];
  isFavorite?: boolean;
  breadcrumbs?: BreadcrumbModel[];
}
