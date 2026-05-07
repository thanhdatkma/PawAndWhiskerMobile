export interface ProductBriefModel {
    id: number;
    name: string;
    description: string;
    short_description: string;
    slug_name: string;
    slug: string;
    permalink: string;
    discount: number;
    image_url: string;
    regular_price: number;
    sale_price: number | null;
    current_price: number;
    is_on_sale: boolean;
    stock_status: string;
    rating?: number;
    rating_count: number;
    sold_count: number;
    is_featured: boolean;
}
