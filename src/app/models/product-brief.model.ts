export interface ProductBriefModel {
  id: number;
  name: string;
  slug?: string;
  slug_name: string;
  permalink?: string;
  description: string;
  short_description: string;
  image_url: string;

  // Pricing
  regular_price: number;
  sale_price: number | null;
  current_price: number;
  discount: number;
  is_on_sale: boolean;

  // Rating
  rating?: number;
  rating_count: number;
  review_count?: number;

  // Meta
  sold_count: number;
  is_featured: boolean;
  deal_of_day?: boolean;

  // Stock
  stock_status: string;
  stock_qty?: number | null;
  backorders?: string;
  is_in_stock?: boolean;

  // BE grouped payload compatibility
  pricing?: {
    regular_price?: number;
    sale_price?: number | null;
    current_price?: number;
    discount?: number;
    is_on_sale?: boolean;
  };
  metadata?: {
    sold_count?: number;
    is_featured?: boolean;
    deal_of_day?: boolean;
  };
  rating_summary?: {
    average?: number;
    rating_count?: number;
    review_count?: number;
  };
  stock?: {
    status?: string;
    qty?: number | null;
    backorders?: string;
    is_in_stock?: boolean;
  };
}
