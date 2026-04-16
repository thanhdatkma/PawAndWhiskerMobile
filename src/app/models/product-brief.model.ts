export interface ProductBriefModel {
    id: string;
    name: string;
    coverImage: string;
    price: number;
    discountPrice?: number;
    discountPct?: number;
    isNew?: boolean;
    rating?: number;
    reviewCount?: number;
    soldCount?: number;
    categoryName?: string;
}