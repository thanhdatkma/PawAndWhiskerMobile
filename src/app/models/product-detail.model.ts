import { BreadcrumbModel } from './breadcrumb.model';

export interface ProductDetailModel {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  discountPct: number;
  rating: number;
  reviewCount: number;
  images: string[];
  mainImage: string;
  description: string;
  breadcrumbs: BreadcrumbModel[];
  weights: string[];
  isFavorite?: boolean;
}
