import { BreadcrumbModel } from './breadcrumb.model';

export interface ProductDetailModel {
  id: number;
  name: string;
  price?: number;
  discountPrice?: number;
  discountPct?: number;
  regular_price?: number;
  sale_price?: number | null;
  current_price?: number;
  discount?: number;
  rating: number;
  reviewCount?: number;
  rating_count?: number;
  sold_count?: number;
  images: string[];
  mainImage: string;
  description: string;
  breadcrumbs: BreadcrumbModel[];
  weights: string[];
  isFavorite?: boolean;
}
